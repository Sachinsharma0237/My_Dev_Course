function createSticky() {

    /* <div class="sticky">
        <div class="sticky-header">
            <div class="minimize">-</div>
            <div class="close">x</div>
        </div>
        <div class="sticky-content">
            <textarea name="sticky-text" id="sticky-text" cols="30" rows="10"></textarea>
        </div>
    </div>    */
     //We Made this HTML using javaScript in util.js
        let sticky = document.createElement("div");
        sticky.classList.add("sticky");
    
    
        let stickyHeader = document.createElement("div");
        stickyHeader.classList.add("sticky-header");
    
    
        let stickyContent = document.createElement("div");
        stickyContent.classList.add("sticky-content");
    
    
        let minimize = document.createElement("div");
        minimize.classList.add("minimize");
        minimize.textContent = "-";
    
    
        let close = document.createElement("div");
        close.textContent = "x";
        close.classList.add("close");
    
    
        let confirmClose = document.createElement("div");
        confirmClose.classList.add("confirm-close");
        confirmClose.classList.add("hide");
        confirmClose.textContent = "Are you sure?";
    
    
        let yes = document.createElement("button");
        yes.classList.add("yes");
        yes.textContent = "Yes";
    
    
        let no = document.createElement("button");
        no.classList.add("no");
        no.textContent = "No";
    
        yes.addEventListener("click", function () {
            sticky.remove();
        })
    
        no.addEventListener("click", function () {
            confirmClose.classList.add("hide");
        })
    
        close.addEventListener("click", function () {
            if(confirmClose.classList.contains("hide")){
                confirmClose.classList.remove("hide");
            }
        })
    
        
        minimize.addEventListener("click", function () {
            stickyContent.style.display = stickyContent.style.display == "none" ? "inline-block" : "none";
        });
    
    
        stickyHeader.append(minimize);
        stickyHeader.append(close);
    
        confirmClose.append(yes);
        confirmClose.append(no);
        sticky.append(confirmClose);
    
        sticky.append(stickyHeader);
        sticky.append(stickyContent);
        /* html ki body ke last me add hoga even script ke bd */
        document.body.append(sticky);    
    
    
    
        //-----------------------------------Sticky Move Logic--------------------------------------------------------------
        let initialX;
        let initialY;
        let isStickyHold = false;
        stickyHeader.addEventListener("mousedown", function (e) {
            initialX = e.clientX;
            initialY = e.clientY;
            isStickyHold = true;
        })
        stickyHeader.addEventListener("mousemove", function (e) {
            if (isStickyHold) {
                let finalX = e.clientX;
                let finalY = e.clientY;
                let dx = finalX - initialX;
                let dy = finalY - initialY;
    
                let { top: stickyTop, left: stickyLeft } = sticky.getBoundingClientRect();
                sticky.style.top = stickyTop + dy + "px";
                sticky.style.left = stickyLeft + dx + "px";
                initialX = finalX;
                initialY = finalY;
            }
        })
        stickyHeader.addEventListener("mouseup", function (e) {
            isStickyHold = false;
        })
        //-----------------------------------Sticky Move Logic-----------------------------------------------------
    
        return stickyContent;   //ye issliye return kr rhe hai q ki hume text area stickyContent me hi add krna hai
    }