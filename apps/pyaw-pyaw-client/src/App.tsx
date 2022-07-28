import { useEffect, useRef } from "react";

import { Sidebar, UserSelectionModal } from "./components";
import { useAuthHooks, useUiHooks } from "./hooks";
import { ContentWrapper, RootWrapper, SideBarWrapper } from "./Styled";

export const App = () => {
  const { handleConnectSock, handleDisconnectSock, user } = useAuthHooks();
  const { isSidebarOpen, handleUserSelectionModalToggle } = useUiHooks();

  const initialLoadRef = useRef<boolean>(false);

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
      handleConnectSock();
    }

    if (!user) {
      handleDisconnectSock();
    }
  }, [handleConnectSock, handleDisconnectSock, user]);

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
