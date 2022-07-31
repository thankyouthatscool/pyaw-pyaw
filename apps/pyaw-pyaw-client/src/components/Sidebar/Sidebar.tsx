import { Button, Typography } from "@mui/material";

import { useAuthHooks } from "../../hooks";
import {
  PeersContainer,
  SidebarWrapper,
  StyledDivider,
  UserDetailsWrapper,
} from "./Styled";

export const Sidebar = () => {
  const { handleRemoveUser, handleSetSelectedPeer, peers, user } =
    useAuthHooks();

  return (
    <SidebarWrapper>
      {!!user && (
        <>
          <UserDetailsWrapper>
            <Typography variant="h5">{user.username}</Typography>
            <Button
              color="error"
              onClick={() => {
                handleRemoveUser();
              }}
              size="small"
              variant="contained"
            >
              Logout
            </Button>
          </UserDetailsWrapper>
          <StyledDivider />
        </>
      )}
      {!!peers.length && (
        <>
          <Typography variant="h6">Peers</Typography>
          <PeersContainer>
            {peers.map((peer) => {
              return (
                <Button
                  key={peer.id}
                  onClick={() => {
                    handleSetSelectedPeer({
                      // @ts-ignore
                      id: peer.userId,
                      socketId: peer.socketId!,
                      // @ts-ignore
                      username: peer.user.username,
                    });
                  }}
                  variant="contained"
                >
                  {/* @ts-ignore */}
                  {peer.user.username}
                </Button>
              );
            })}
          </PeersContainer>
          <StyledDivider />
        </>
      )}
    </SidebarWrapper>
  );
};
