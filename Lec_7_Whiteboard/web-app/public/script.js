let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');
let {top : canvasTop} = canvas.getBoundingClientRect();

canvas.height = window.innerHeight - canvasTop;
canvas.width = window.innerWidth;

let db = [];
let line = [];
let redoDb = [];

window.addEventListener("resize", function(){
    canvas.height = window.innerHeight - canvasTop;
    canvas.width = window.innerWidth; 
    socket.emit("resize", db);
    redraw();
})
let isPenDown = false;
canvas.addEventListener("mousedown", function(e){
    isPenDown = true;
    let x = e.clientX;
    let y = e.clientY - canvasTop;
    ctx.beginPath();
    ctx.moveTo(x,y);
    let pointObj = {
        id : "md",
        x : x,
        y : y,
        width : ctx.lineWidth,
        color : ctx.strokeStyle
    }
    line.push(pointObj);
    socket.emit("mousedown", pointObj);
})
canvas.addEventListener("mousemove", function(e){
    if(isPenDown){
        let x = e.clientX;
        let y = e.clientY - canvasTop;
        ctx.lineTo(x,y);
        ctx.stroke();
        let pointObj = {
            id : "mm",
            x : x,
            y : y,
            width : ctx.lineWidth,
            color : ctx.strokeStyle
        }
        line.push(pointObj);
        socket.emit("mousemove", pointObj);
    }
})
canvas.addEventListener("mouseup", function(){
    isPenDown = false;
    db.push(line);
    line = [];
})