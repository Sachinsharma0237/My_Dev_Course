//this is another client who will consume(on)
socket.on("md", function(lineObject){
    //Save current settings of pen
    let currentStrokeStyle = ctx.strokeStyle;
    let currentPenWidth = ctx.lineWidth;
    //Set pen color and width according to lineObject
    ctx.strokeStyle = lineObject.color;
    ctx.lineWidth = lineObject.width;

    ctx.beginPath();
    ctx.moveTo(lineObject.x, lineObject.y);
    //Again set pen settings to original settings
    ctx.strokeStyle = currentStrokeStyle;
    ctx.lineWidth = currentPenWidth;
})

socket.on("mm", function(lineObject){
    //Save current settings of pen
    let currentStrokeStyle = ctx.strokeStyle;
    let currentPenWidth = ctx.lineWidth;
    //Set pen color and width according to lineObject
    ctx.strokeStyle = lineObject.color;
    ctx.lineWidth = lineObject.width;
    
    ctx.lineTo(lineObject.x, lineObject.y);
    ctx.stroke();
    //Again set pen settings to original settings
    ctx.strokeStyle = currentStrokeStyle;
    ctx.lineWidth = currentPenWidth;
})