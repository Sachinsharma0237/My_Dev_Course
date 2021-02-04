let images = document.querySelectorAll("img");

function changeImages(){
  let localImages = [
    "./images/download1.jpg",
    "./images/download2.jpg",
    "./images/download3.jpg",
    "./images/download4.jpg",
    "./images/download5.jpg",
    "./images/download6.jpg",
    "./images/download7.jpg",
    "./images/download8.jpg",
    "./images/download9.jpg",
  ];
  
  for (let i = 0; i < images.length; i++) {
    let idx = Math.floor(Math.random() * localImages.length);
    let absolutePath = chrome.extension.getURL(localImages[idx]);
    images[i].src = absolutePath;
  }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("request", message);
    if(message == "changeImage"){
      changeImages();
    }
    sendResponse("Image has been changed");
});
