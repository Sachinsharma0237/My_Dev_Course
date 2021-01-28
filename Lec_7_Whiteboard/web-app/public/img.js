let imgUpload = document.querySelector("#photo-upload");
let photo = document.querySelector("#photo");
let download = document.querySelector("#download");

//---------------------------------------Image Upload Logic------------------------------------------------------------
imgUpload.addEventListener("change", function(e){
    let photo = e.target.files[0];
    let src = URL.createObjectURL(photo);
    let img = document.createElement("img");
    img.setAttribute("src", src);
    let stickyContent = createSticky();
    stickyContent.append(img);
})

photo.addEventListener("click", function(){
    imgUpload.click();
})
//---------------------------------------Image Upload Logic------------------------------------------------------------

download.addEventListener("click", function(){
    let image = canvas.toDataURL("image/png");
    let aTag = document.createElement("a");
    aTag.download = "canvas.png";
    aTag.href = image;
    aTag.click();
})