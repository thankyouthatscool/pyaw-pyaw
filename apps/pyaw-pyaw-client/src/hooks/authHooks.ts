import { useCallback } from "react";
import { connect } from "socket.io-client";

import { useAppDispatch, useAppSelector } from ".";
import {
  removeUser,
  setPeers,
  setSelectedPeer,
  setUser,
  setWsConnected,
} from "../store/features";
import { User } from "../store/features/auth/authSlice";

const sock = connect("http://localhost:5000", { autoConnect: false });

export const useAuthHooks = () => {
  const dispatch = useAppDispatch();

  const { peers, selectedPeer, user, wsConnected } = useAppSelector(
    ({ auth }) => auth
  );

  const handleConnectSock = useCallback(() => {
    if (!!user) {
      sock.auth = { username: user.username };

      sock.connect();
    }
  }, [user]);

  const handleDisconnectSock = useCallback(() => {
    if (sock.connected) {
      sock.disconnect();
    }
  }, []);

  const handleRemoveUser = useCallback(() => {
    dispatch(removeUser());
  }, [dispatch]);

  const handleSetPeers = useCallback(
    (peers: User[]) => {
      dispatch(setPeers(peers));
    },
    [dispatch]
  );

  const handleSetSelectedPeer = useCallback(
    (peer: { id: string; socketId: string; username: string }) => {
      dispatch(setSelectedPeer(peer));
    },
    [dispatch]
  );

  const handleSetUser = useCallback(
    ({ id, socketId, username }: User) => {
      dispatch(setUser({ id, socketId, username }));
    },
    [dispatch]
  );

  const handleSetWsConnected = useCallback(
    (wsState: boolean) => {
      dispatch(setWsConnected(wsState));
    },
    [dispatch]
  );

  return {
    handleConnectSock,
    handleDisconnectSock,
    handleRemoveUser,
    handleSetPeers,
    handleSetSelectedPeer,
    handleSetUser,
    handleSetWsConnected,
    peers,
    selectedPeer,
    user,
    wsConnected,
  };
};
