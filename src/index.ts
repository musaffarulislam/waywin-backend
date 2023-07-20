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

io.on("connection", (socket) => {
  let userData: any;

  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    if (!userData || !userData._id) { 
      return console.log("Invalid userData");
    }
    console.log("userData : ",userData); 
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat; 
  
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user: any) => {
      if (user == newMessageReceived.sender._id) return; 
      socket.in(user).emit("message received", newMessageReceived);
    });
  }); 

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED");
    if (userData) {
      socket.leave(userData._id);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
