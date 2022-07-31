import { Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

import { useAuthHooks } from "../../hooks";
import {
  ChatMessageWrapper,
  ChatWrapper,
  DirectPeerChatWrapper,
} from "./Styled";

interface Message {
  body: string;
  createdAt: string;
  id: number;
  recipientId: number;
  senderId: number;
}

export const DirectPeerChat = () => {
  const [messageBody, setMessageBody] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const { selectedPeer, user } = useAuthHooks();

  const handleGetConversation = useCallback(async () => {
    const convoRes = await fetch("http://localhost:5000/getConversation", {
      // @ts-ignore
      body: JSON.stringify({ sender: user?.id, recipient: selectedPeer.id }),
      headers: { "Content-Type": "application/json" },
      method: "post",
    });

    const { messages } = await convoRes.json();

    setMessages(() => messages);
  }, [selectedPeer, user]);

  useEffect(() => {
    if (selectedPeer) {
      handleGetConversation();
    }
  }, [handleGetConversation, selectedPeer]);

  return (
    <DirectPeerChatWrapper>
      <Typography variant="h5">
        Chatting with {selectedPeer?.username}
      </Typography>
      <ChatWrapper>
        {messages.map((message) => {
          return (
            <ChatMessage
              body={message.body}
              key={message.id}
              mine={message.recipientId !== parseInt(user!.id)}
            />
          );
        })}
      </ChatWrapper>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const res = await fetch("http://localhost:5000/privateMessage", {
            body: JSON.stringify({
              message: messageBody,
              from: user?.socketId,
              // @ts-ignore
              to: selectedPeer.socketId,
              senderId: user!.id,
              // @ts-ignore
              recipientId: selectedPeer.id,
            }),
            headers: { "Content-Type": "application/json" },
            method: "post",
          });

          const data = await res.json();

          console.log(data);
        }}
      >
        <input
          onChange={(e) => {
            setMessageBody(() => e.target.value);
          }}
          placeholder="Message..."
          value={messageBody}
        />
        <button>Send</button>
      </form>
    </DirectPeerChatWrapper>
  );
};

interface ChatMessageProps {
  body: string;
  mine: boolean;
}

export const ChatMessage = ({ body, mine }: ChatMessageProps) => {
  return <ChatMessageWrapper mine={mine}>{body}</ChatMessageWrapper>;
};
