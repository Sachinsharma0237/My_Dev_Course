let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let eraserOptions = document.querySelector("#eraser-options");
let pencilOptions = document.querySelector("#pencil-options");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let colors = document.querySelectorAll(".pencil-colors div");
let pencilSize = document.querySelector("#pencil-size");
let eraserSize = document.querySelector("#eraser-size");
/*
let activeTool = "pencil";

pencil.addEventListener("click", function(){
    if(activeTool == "pencil"){
        
    }else{
        activeTool = "pencil";
        pencil.classList.add("active-tool");
        eraser.classList.remove("active-tool");
    }
})
eraser.addEventListener("click", function(){
    if(activeTool == "eraser"){
    }else{
        activeTool = "eraser";
        eraser.classList.add("active-tool");
        pencil.classList.remove("active-tool");
    }
})    
*/

for(let i = 0; i < colors.length; i++){
    colors[i].addEventListener("click", function(){
        if(colors[i].classList.contains("black")){
            ctx.strokeStyle = "black";
        }else if(colors[i].classList.contains("red")){
            ctx.strokeStyle = "red";
        }else if(colors[i].classList.contains("green")){
            ctx.strokeStyle = "green";
        }else if(colors[i].classList.contains("blue")){
            ctx.strokeStyle = "blue";
        }else {
            ctx.strokeStyle = "yellow";
        }
    })
}

lastPencilSize = 1;
lastEraserSize = 1;
pencilSize.addEventListener("change", function(){
    lastPencilSize = pencilSize.value;
    ctx.lineWidth = lastPencilSize;
});
eraserSize.addEventListener("change", function(){
    lastEraserSize = eraserSize.value;
    ctx.lineWidth = lastEraserSize;
});
/*
black.addEventListener("click", function(){
    ctx.strokeStyle = "black";
});
red.addEventListener("click", function(){
    ctx.strokeStyle = "red";
});
green.addEventListener("click", function(){
    ctx.strokeStyle = "green";
});
blue.addEventListener("click", function(){
    ctx.strokeStyle = "blue";
});
yellow.addEventListener("click", function(){
    ctx.strokeStyle = "yellow";
});
*/
pencil.addEventListener("click", function(){
    if(pencil.classList.contains("active-tool")){
            //open options of pencil
        if(pencilOptions.classList.contains("hide")){
            pencilOptions.classList.remove("hide");
        }else{
            pencilOptions.classList.add("hide");
        }

    }else{
        ctx.strokeStyle = "black";
        ctx.lineWidth = lastPencilSize;
        if(!eraserOptions.classList.contains("hide")){
            eraserOptions.classList.add("hide");
        }
        eraser.classList.remove("active-tool");
        pencil.classList.add("active-tool");
    }
})
eraser.addEventListener("click", function(){
    if(eraser.classList.contains("active-tool")){
        //open options of eraser
        if(eraserOptions.classList.contains("hide")){
            eraserOptions.classList.remove("hide");
        }else{
            eraserOptions.classList.add("hide");
        }
    }else{
        ctx.strokeStyle = "white";
        ctx.lineWidth = lastEraserSize;
        if(!pencilOptions.classList.contains("hide")){
            pencilOptions.classList.add("hide");
        }
        pencil.classList.remove("active-tool");
        eraser.classList.add("active-tool");
    }
})


undo.addEventListener("click", function(){
    let undoLine = db.pop();    //iss se db se to hath gyi line lekin hume to UI se bhi hatani hai
    redoDb.push(undoLine);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit("undoclick", db);
    redraw();
})

redo.addEventListener("click", function(){
    if(redoDb.length){
        socket.emit("redoclick", redoDb);
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
    
});








function redraw(){
    for(let i = 0; i < db.length; i++){
        let line = db[i];
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





























// function eraseLine(line){
//     let currentStrokeStyle = ctx.strokeStyle;
//     let currentLineWidth = ctx.lineWidth
//     ctx.strokeStyle = "white";
//     ctx.lineWidth = currentLineWidth + 2;
//     for(let i = 0; i < line.length; i++){
//         let lineObj = line[i];
//         if(lineObj.id == "md"){
//             ctx.beginPath();
//             ctx.moveTo(lineObj.x, lineObj.y);
//         }else{
//             ctx.lineTo(lineObj.x, lineObj.y);
//             ctx.stroke();
//         }
//     }
//     ctx.strokeStyle = currentStrokeStyle;
//     ctx.lineWidth = currentLineWidth;
// }

