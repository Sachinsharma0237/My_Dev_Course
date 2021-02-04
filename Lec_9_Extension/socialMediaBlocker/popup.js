const input = document.querySelector("#input");     //siteName
const block = document.querySelector("#block");
const sites = document.querySelector(".sites");     //blockedList
const second = document.querySelector(".time");

let localBlockList = [];

chrome.runtime.sendMessage({type : "Get"}, function(sites) {
        localBlockList = sites;
        for(let i = 0; i < localBlockList.length; i++){
            addBlockSitesToUi(localBlockList[i].site, localBlockList[i].time);
        }
  });

function addBlockSitesToUi(site, time){
    let div = document.createElement("div");
        div.classList.add("alert");
        div.classList.add("alert-danger");
        div.innerHTML = site;
        let closeButton = document.createElement("button");
        closeButton.classList.add("btn");
        closeButton.classList.add("btn-outline-danger");
        closeButton.innerHTML = "X";

        closeButton.addEventListener("click", function(){
        //closeButton.parentNode.remove();    
         div.remove();
         chrome.runtime.sendMessage({type : "Unblock", site}, function(response){
            console.log(response);
        });
     });

        let remain = document.createElement("div");
        remain.classList.add("remain");
        remain.innerHTML = time;
        div.append(remain);
        div.append(closeButton);
        sites.append(div);    
}
input.addEventListener("keyup", function(e){
    if( e.keyCode == 13 ){
        block.click();
    }
});
second.addEventListener("keyup", function(e){
    if( e.keyCode == 13 ){
        block.click();
    }
});

block.addEventListener("click", function(){
    let site = input.value;
    let time = second.value;
    if(site){
        for(let i = 0; i < localBlockList.length; i++){
            if(localBlockList[i].site.includes(site) || site.includes(localBlockList[i].site)){
                alert("Site Already Blocked");
                input.value = "";
                second.value = "";
                return;
            }
        }
        addBlockSitesToUi(site, time);
        localBlockList.push({site, time})
        input.value = "";
        second.value = "";
    }
    //yha pr popup ne bola ki iss site ko block kr de itne time k liye background ko....q ki background k pass authority hai block krne ki
    chrome.runtime.sendMessage({type:"Add", site, time}, function(response) {
        console.log(response);
      });



});