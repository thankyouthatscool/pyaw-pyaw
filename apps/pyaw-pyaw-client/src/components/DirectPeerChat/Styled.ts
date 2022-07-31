import styled from "styled-components";

interface ChatMessageWrapperProps {
  mine: boolean;
}

export const ChatMessageWrapper = styled.div<ChatMessageWrapperProps>`
  display: flex;

  justify-content: ${(props) => (props.mine ? "end" : "start")};

  padding: 1rem;
`;

export const ChatWrapper = styled.div`
  flex: 1;

  overflow: hidden auto;
`;

export const DirectPeerChatWrapper = styled.div`
  display: flex;

  flex-direction: column;

  height: 100%;
`;
