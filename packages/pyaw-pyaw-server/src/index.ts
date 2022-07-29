import express from "express";
import cors from "cors";
import http from "http";
import { PrismaClient } from "@prisma/client";
import { Server } from "socket.io";
import { isBuffer } from "util";

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const prisma = new PrismaClient();

app.post("/login", async (req, res) => {
  const user = await prisma.users.findFirst({
    where: { username: req.body.username },
  });

  res
    .status(200)
    .send({ OK: "OK", body: { id: user?.id, username: user?.username } });
});

io.on("connection", (socket) => {
  console.log(`New client: ${socket.id}`);
  console.log(socket.handshake.auth.username);

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("getPeers", () => {
    const peers: string[] = [];

    io.of("/").sockets.forEach((sock) => {
      if (sock.id !== socket.id) {
        peers.push(sock.id);
      }
    });

    socket.emit("getPeersResponse", peers);
  });

  socket.on("privateMessage", (data) => {
    io.to(data.recipient).emit("privateMessage", {
      message: data.message,
      from: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected!`);
  });
});

server.listen(5000, () => {
  console.log("Server listening on port 5000...");
});
