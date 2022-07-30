import { Button, Card, Modal, Typography } from "@mui/material";
import { useCallback } from "react";

import { useAuthHooks } from "../../hooks";
import { UserSelectionModalWrapper } from "./Styled";

export const UserSelectionModal = () => {
  const { handleSetUser, user } = useAuthHooks();

  const handleUserSelection = useCallback(
    async (username: string) => {
      try {
        const res = await fetch("http://localhost:5000/login", {
          body: JSON.stringify({ username }),
          headers: { "Content-Type": "application/json" },
          method: "post",
        });

        const data = await res.json();

        handleSetUser({ ...data });
      } catch (e) {
        console.log(e);
      }
    },
    [handleSetUser]
  );

  return (
    <Modal open={!user}>
      <UserSelectionModalWrapper>
        <Card elevation={9} style={{ padding: "1rem" }}>
          <Typography variant="h4">Available Users</Typography>
          {["Trevor", "Darren", "Sam", "Timmy", "Zach"].map((username) => {
            return (
              <Button
                color="primary"
                key={username}
                onClick={() => {
                  handleUserSelection(username);
                }}
                variant="contained"
              >
                {username}
              </Button>
            );
          })}
        </Card>
      </UserSelectionModalWrapper>
    </Modal>
  );
};
