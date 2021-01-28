//npm install express nodemon socket.io
//This is my Server/Backend Side
const express = require("express");
const app = express();
//Socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);

let port = 3000;
http.listen(port, function(){
    console.log(`Server Started at ${port}`);
})
app.use(express.static("public"));
app.get("/", function(req, res){
    res.send("Welcome to homePage");
})



io.on('connection', function(socket){
  console.log(`User connected ${socket.id}`);

  socket.on("mousedown", function(lineObject){
      socket.broadcast.emit("md", lineObject);
  })
  socket.on("mousemove", function(lineObject){
    socket.broadcast.emit("mm", lineObject);
  })
  socket.on("undoclick", function(undoLines){
    socket.broadcast.emit("undosocket", undoLines);
  })
  socket.on("redoclick", function(redoDb){
    socket.broadcast.emit("redosocket", redoDb);
  })
  socket.on("resize", function(resizeDb){
    console.log(resizeDb);
    socket.broadcast.emit("resizewindow",resizeDb);
  })
});
