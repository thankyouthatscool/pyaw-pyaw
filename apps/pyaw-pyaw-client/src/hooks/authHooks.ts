import { useCallback } from "react";
import { connect } from "socket.io-client";

import { useAppDispatch, useAppSelector } from ".";
import {
  removeUser,
  setPeers,
  setUser,
  setWsConnected,
} from "../store/features";
import { User } from "../store/features/auth/authSlice";

const sock = connect("http://localhost:5000", { autoConnect: false });

export const useAuthHooks = () => {
  const dispatch = useAppDispatch();

  const { peers, user, wsConnected } = useAppSelector(({ auth }) => auth);

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
    handleSetUser,
    handleSetWsConnected,
    peers,
    user,
    wsConnected,
  };
};
