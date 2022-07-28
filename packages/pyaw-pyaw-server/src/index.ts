import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(`New client: ${socket.id}`);
  console.log(socket.handshake.auth.username);
  console.log(socket.handshake.auth.userId);

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
