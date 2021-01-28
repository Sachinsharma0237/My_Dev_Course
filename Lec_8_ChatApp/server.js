const express = require("express");
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

let users = [];
app.use(express.static("public"));

io.on('connection', function(socket){
    console.log(`connected at socket ${socket.id}`);
    users.push({ id:socket.id });
    socket.on("join", function(userName){
        for(let i = 0; i < users.length; i++){
            if(users[i].id == socket.id){
                users[i].userName = userName;
                break;
            }
        }
        socket.broadcast.emit("chat-join", userName);
    });
    socket.on("chat", function(message){
        let userName;
        for(let i = 0; i < users.length; i++){
            if(users[i].id == socket.id){
                userName = users[i].userName;
            }
        }
        socket.broadcast.emit("chat-left",{ message, userName });
    });
    socket.on('disconnect', function(){
        let idx;
        let name;
        for(let i = 0; i < users.length; i++){
            if(users[i].id == socket.id){
                idx = i;
                name = users[i].userName;
                break;
            }
        }
        socket.broadcast.emit("leave", name);
        users.slice(idx, 1);       
    });
});






let port = 3000;
http.listen(port, function(){
  console.log(`Listening on ${port}`);
});
