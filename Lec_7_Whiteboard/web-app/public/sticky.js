let stickyAddBtn = document.querySelector("#sticky");

    stickyAddBtn.addEventListener("click", function(){
    
    let stickyContent = createSticky();
    let textArea = document.createElement("textarea");
    textArea.setAttribute("cols" , "30");
    textArea.setAttribute("rows" , "10");
    textArea.setAttribute("id" , "sticky-text");
    
    stickyContent.append(textArea);
    }) 