import { Divider } from "@mui/material";
import styled from "styled-components";

export const PeersContainer = styled.div`
  display: flex;

  flex-direction: column;
`;

export const SidebarWrapper = styled.div`
  background-color: #eee;
  border-right: 1px solid rgba(0, 0, 0, 0.12);

  height: 100%;

  padding: 0.5rem;
`;

export const StyledDivider = styled(Divider)`
  padding-top: 0.75rem;
`;

export const UserDetailsWrapper = styled.div`
  align-items: center;

  display: flex;

  justify-content: space-between;
`;
