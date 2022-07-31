import express from "express";
import cors from "cors";
import http from "http";
import { PrismaClient } from "@prisma/client";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const prisma = new PrismaClient();

app.post("/login", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { username },
    });

    res.status(200).send({ id: user?.id, username: user?.username });
  } catch (e) {
    console.log(e);

    await prisma.user.create({ data: { username } });
  }
});

app.get("/peers", async (req, res) => {
  const peers = await prisma.sessionData.findMany({
    include: { user: true },
  });

  res.status(200).json({ peers });
});

app.post("/getConversation", async (req, res) => {
  const { recipient, sender } = req.body;

  const messages = await prisma.message.findMany({
    where: {
      recipientId: { in: [recipient, sender] },
      senderId: { in: [recipient, sender] },
    },
  });

  res.status(200).json({ messages });
});

app.post("/privateMessage", async (req, res) => {
  const { from, message, recipientId, senderId, to } = req.body;

  io.to(to).emit("private-message", { from, message, senderId });

  await prisma.message.create({
    data: { body: message, recipientId, senderId },
  });

  res.status(200).json({ message: "Message Sent" });
});

io.on("connection", async (socket) => {
  const { id, username } = socket.handshake.auth;

  try {
    await Promise.all([
      await prisma.sessionData.deleteMany({ where: { userId: id } }),

      await prisma.sessionData.create({
        data: { userId: id, socketId: socket.id },
      }),
    ]);
  } catch (e) {
    console.log(e);
  }

  socket.broadcast.emit("peer-connected", {
    id,
    username,
    socketId: socket.id,
  });

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("privateMessage", (data) => {
    io.to(data.recipient).emit("privateMessage", {
      message: data.message,
      from: socket.id,
    });
  });

  socket.on("disconnect", async () => {
    const { id, username } = socket.handshake.auth;

    try {
      await prisma.sessionData.delete({
        where: { socketId: socket.id },
      });

      console.log(`Client ${socket.id} disconnected!`);

      socket.broadcast.emit("peer-disconnected", {
        id,
        username,
        socketId: socket.id,
      });
    } catch (e) {
      console.log(e);
    }
  });
});

server.listen(5000, () => {
  console.log("Server listening on port 5000...");
});
