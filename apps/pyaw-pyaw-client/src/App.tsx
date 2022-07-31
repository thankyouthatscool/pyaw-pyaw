import { useCallback, useEffect, useRef } from "react";
import { connect } from "socket.io-client";

import { DirectPeerChat, Sidebar, UserSelectionModal } from "./components";
import { useAuthHooks } from "./hooks";
import { ContentWrapper, RootWrapper, SideBarWrapper } from "./Styled";

const socket = connect("http://localhost:5000", { autoConnect: false });

export const App = () => {
  const {
    handleSetPeers,
    handleSetUser,
    handleSetWsConnected,
    selectedPeer,
    user,
    wsConnected,
  } = useAuthHooks();

  const socketInitRef = useRef<boolean>(false);

  const handleGetPeers = useCallback(async () => {
    if (!!user) {
      const res = await fetch("http://localhost:5000/peers", {
        headers: { "Content-Type": "application/json" },
        method: "get",
      });

      const { peers } = await res.json();

      handleSetPeers(peers.filter((peer: any) => peer.userId !== user!.id));
    }
  }, [handleSetPeers, user]);

  useEffect(() => {
    if (!socketInitRef.current) {
      if (!!user) {
        socketInitRef.current = true;

        socket.on("connect", () => {
          handleSetWsConnected(true);

          handleSetUser({
            id: user!.id,
            socketId: socket.id,
            username: user!.username,
          });
        });

        socket.on("peer-connected", (data) => {
          handleGetPeers();
        });

        socket.on("peer-disconnected", (data) => {
          handleGetPeers();
        });

        socket.on("private-message", (data) => {
          console.log(data);
        });
      }
    }
  }, [
    handleGetPeers,
    handleSetUser,
    handleSetWsConnected,
    socketInitRef,
    user,
  ]);

  useEffect(() => {
    if (!!user) {
      socket.auth = { id: user.id, username: user.username };
      socket.connect();
    }

    if (!user) {
      socket.disconnect();

      handleSetPeers([]);
      handleSetWsConnected(false);
    }
  }, [handleSetPeers, handleSetWsConnected, user]);

  useEffect(() => {
    if (!!wsConnected) {
      handleGetPeers();
    }
  }, [handleGetPeers, wsConnected]);

  return (
    <RootWrapper>
      <UserSelectionModal />
      <SideBarWrapper>
        <Sidebar />
      </SideBarWrapper>
      <ContentWrapper>
        {!!selectedPeer && (
          <>
            <DirectPeerChat />
            <div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  const res = await fetch(
                    "http://localhost:5000/privateMessage",
                    {
                      body: JSON.stringify({
                        message: "Funk the polis",
                        from: user?.socketId,
                        to: selectedPeer.socketId,
                        senderId: user!.id,
                        // @ts-ignore
                        recipientId: selectedPeer.id,
                      }),
                      headers: { "Content-Type": "application/json" },
                      method: "post",
                    }
                  );

                  const data = await res.json();

                  console.log(data);
                }}
              >
                {/*          <input defaultValue="message go here" type="text" />
                <button type="submit">Send</button> */}
              </form>
            </div>
          </>
        )}
      </ContentWrapper>
    </RootWrapper>
  );
};
