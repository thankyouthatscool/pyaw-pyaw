import { useCallback, useEffect, useRef } from "react";

import { Sidebar, UserSelectionModal } from "./components";
import { useAuthHooks, useUiHooks } from "./hooks";
import { ContentWrapper, RootWrapper, SideBarWrapper } from "./Styled";

export const App = () => {
  const { handleConnectSock, handleDisconnectSock, handleSetUser, user } =
    useAuthHooks();
  const { isSidebarOpen, handleUserSelectionModalToggle } = useUiHooks();

  const initialLoadRef = useRef<boolean>(false);

  const handleLogin = useCallback(async () => {
    const res = await fetch("http://localhost:5000/login", {
      body: JSON.stringify({ username: user?.username }),
      headers: { "Content-Type": "application/json" },
      method: "post",
    });

    const data = await res.json();

    console.log(data);
  }, [user]);

  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      if (!user) {
        handleUserSelectionModalToggle();
      }
    }
  }, [handleUserSelectionModalToggle, initialLoadRef, user]);

  useEffect(() => {
    if (!!user) {
      handleLogin();
      handleConnectSock();
    }

    if (!user) {
      handleDisconnectSock();
    }
  }, [handleConnectSock, handleDisconnectSock, handleLogin, user]);

  return (
    <RootWrapper>
      {!user && <UserSelectionModal />}
      {isSidebarOpen && (
        <SideBarWrapper>
          <Sidebar />
        </SideBarWrapper>
      )}
      <ContentWrapper></ContentWrapper>
    </RootWrapper>
  );
};
