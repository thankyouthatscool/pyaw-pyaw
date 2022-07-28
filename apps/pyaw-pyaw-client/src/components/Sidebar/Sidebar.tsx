import { Button, Typography } from "@mui/material";

import { useAuthHooks } from "../../hooks";
import { SidebarWrapper, StyledDivider } from "./Styled";

const rooms: string[] = ["General", "Silly", "Goofy"];
const users: string[] = [];

export const Sidebar = () => {
  const { handleRemoveUser, user } = useAuthHooks();

  return (
    <SidebarWrapper>
      {user && (
        <div style={{ display: "flex" }}>
          <Typography variant="h4">{user.username}</Typography>
          <Button
            color="error"
            onClick={() => {
              handleRemoveUser();
            }}
            variant="contained"
          >
            Out
          </Button>
        </div>
      )}
      <Typography variant="h6">Rooms</Typography>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {rooms.map((room) => {
          return (
            <Button key={room} variant="contained">
              {room}
            </Button>
          );
        })}
      </div>
      <StyledDivider />
      {!!users.length && (
        <>
          <Typography variant="h6">Users</Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {users.map((user) => {
              return (
                <Button color="secondary" key={user} variant="contained">
                  {user}
                </Button>
              );
            })}
          </div>
          <StyledDivider />
        </>
      )}
    </SidebarWrapper>
  );
};
