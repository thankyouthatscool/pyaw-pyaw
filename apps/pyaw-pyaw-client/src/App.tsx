import { useCallback, useEffect, useRef } from "react";
import { connect } from "socket.io-client";

import { Sidebar, UserSelectionModal } from "./components";
import { useAuthHooks } from "./hooks";
import { ContentWrapper, RootWrapper, SideBarWrapper } from "./Styled";

const socket = connect("http://localhost:5000", { autoConnect: false });

export const App = () => {
  const {
    handleSetPeers,
    handleSetUser,
    handleSetWsConnected,
    peers,
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
        <pre>{JSON.stringify({ peers, user, wsConnected }, null, 2)}</pre>
      </ContentWrapper>
    </RootWrapper>
  );
};
