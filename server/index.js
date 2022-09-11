
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");


app.use(cors());


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

let allUsers = []

io.on("connection", (socket) => {


    socket.on("join", (name) => {
        socket.join(1)
        console.log("joined", name)
        const user = { userName: name , id : socket.id }
        allUsers.push(user);
        
        socket.emit("get-contact" , allUsers);
        socket.broadcast.emit("join-massage" , user)
    })

    socket.on("send-message" , (data)=>{
       socket.broadcast.emit("get-message" , data)
    })

    socket.on("disconnect", () => {
        console.log("User Disconneted", socket.id);

    });

});



server.listen(3001, () => {
    console.log("SERVER IS RUNNING");

});