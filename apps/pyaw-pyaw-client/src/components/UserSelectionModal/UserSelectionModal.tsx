import { Button, Card, Modal, Typography } from "@mui/material";

import { useAppSelector, useAppDispatch, useUiHooks } from "../../hooks";
import { setUser } from "../../store/features";
import { UserSelectionModalWrapper } from "./Styled";

export const UserSelectionModal = () => {
  const dispatch = useAppDispatch();

  const { availableUsers, user } = useAppSelector(({ auth }) => auth);

  const { handleUserSelectionModalToggle } = useUiHooks();

  return (
    <Modal
      onClose={() => {
        if (user) {
          handleUserSelectionModalToggle();
        }
      }}
      open={!user}
    >
      <UserSelectionModalWrapper>
        <Card elevation={9} style={{ padding: "1rem" }}>
          <Typography variant="h4">Available Users</Typography>
          {availableUsers.map((user) => {
            return (
              <Button
                color="primary"
                key={user.id}
                onClick={() => {
                  dispatch(setUser(user));
                  handleUserSelectionModalToggle();
                }}
                variant="contained"
              >
                {user.username}
              </Button>
            );
          })}
        </Card>
      </UserSelectionModalWrapper>
    </Modal>
  );
};
