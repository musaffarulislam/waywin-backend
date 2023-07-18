import app from "./interfaces/config/app";
import env from "./app/environment/environment";
import http from "http";
import { Server, Socket  } from "socket.io";

const PORT = env.getPort();

const server = http.createServer(app); 
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000", 
  },
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected");
 
  socket.on("chatMessage", (message: string) => {
    console.log("Received message:", message);
    io.emit("newMessage", message); 
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
