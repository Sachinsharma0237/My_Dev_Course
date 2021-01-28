//This is for client B
socket.on("md", function(lineObject){
    
    let currentStrokeStyle = ctx.strokeStyle;
    let currentPenWidth = ctx.lineWidth;

    ctx.strokeStyle = lineObject.color
    ctx.lineWidth = lineObject.width;

    ctx.beginPath();
    ctx.moveTo(lineObject.x, lineObject.y);

    ctx.strokeStyle = currentStrokeStyle;
    ctx.lineWidth = currentPenWidth;

});
socket.on("mm", function(lineObject){
    let currentStrokeStyle = ctx.strokeStyle;
    let currentPenWidth = ctx.lineWidth;

    ctx.strokeStyle = lineObject.color
    ctx.lineWidth = lineObject.width;

    ctx.lineTo(lineObject.x, lineObject.y);
    ctx.stroke();

    ctx.strokeStyle = currentStrokeStyle;
    ctx.lineWidth = currentPenWidth;
});

socket.on("undosocket", function(undoDb){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawSocket(undoDb);
});
socket.on("redosocket", function(redoDb){
    if(redoDb.length){
        let redoLine = redoDb.pop();
        for(let i = 0; i < redoLine.length; i++){
            let redoObj = redoLine[i];
            ctx.strokeStyle = redoObj.color;
            ctx.lineWidth = redoObj.width;
            if(redoObj.id == "md"){
                ctx.beginPath();
                ctx.moveTo(redoObj.x, redoObj.y);
            }else{
                ctx.lineTo(redoObj.x, redoObj.y);
                ctx.stroke();
            }
        }
    }
})
socket.on("resizewindow", function(resizeDb){
    redrawSocket(resizeDb);
})






function redrawSocket(socketDb){
    for(let i = 0; i < socketDb.length; i++){
        let line = socketDb[i];
        for(let j = 0; j < line.length; j++){
            let lineObj = line[j];
            ctx.strokeStyle = lineObj.color;
            ctx.lineWidth = lineObj.width;
            if(lineObj.id == "md"){
                ctx.beginPath();
                ctx.moveTo(lineObj.x, lineObj.y);
            }else{
                ctx.lineTo(lineObj.x, lineObj.y);
                ctx.stroke();
            }
        }
    }
}