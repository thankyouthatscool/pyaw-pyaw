import { useCallback } from "react";
import { connect } from "socket.io-client";

import { useAppDispatch, useAppSelector } from ".";
import { removeUser } from "../store/features";

const sock = connect("http://localhost:5000", { autoConnect: false });

export const useAuthHooks = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(({ auth }) => auth);

  const handleConnectSock = useCallback(() => {
    if (!!user) {
      sock.auth = { userId: user.id, username: user.username };

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

  const handleSetUser = useCallback(() => {}, []);

  return {
    handleConnectSock,
    handleDisconnectSock,
    handleRemoveUser,
    handleSetUser,
    user,
  };
};
