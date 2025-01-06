import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const socketUserMap = [];

io.on("connection", (socket) => {

  socket.on("clientData", (data) => {
    let userFound = false; // Flag to track if user exists


    // Iterate over socketUserMap to find the user and update their socket
    socketUserMap.forEach((user) => {
      if (user.userId === data.userId) {
        user.socket = data.socket; // Update the socket of the matched user
        userFound = true; // Mark that the user is found and updated
      }
    });

    // If user is not found, add a new user to the map
    if (!userFound) {
      socketUserMap.push(data); // Add the new user data
    }

    // Log the updated socketUserMap
  });


  socket.on('sendMessage', (data) => {
    socketUserMap.map((user) => {
        if(user.userId === data.contactId){
            const message = {
                userId: data.userId,
                text: data.message,
                file: data?.file || null
            }
            io.to(user.socket).emit('recieveMessage', message)
        }
    })

});

  socket.on("disconnect", () => {

  });
});

export { app, io, server };
