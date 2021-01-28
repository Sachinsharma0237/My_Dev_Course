const sendButton = document.querySelector("#send-chat");
const chatMessage = document.querySelector("#chat-message");
const chatList = document.querySelector(".chat-list");

let userName = prompt("Enter Your Name");

if(userName){
    socket.emit( "join", userName);
}

chatMessage.addEventListener("keyup", function(e){
    if(e.keyCode == 13){
        sendButton.click();
    }
});

sendButton.addEventListener("click", function(){
    let message = chatMessage.value;
    if( message){
        let chat = document.createElement("div");
        chat.classList.add("chat");
        chat.classList.add("right");
        chat.innerHTML = message;
        chatList.append(chat);
        chatMessage.value = "";
        socket.emit("chat", message);
    }
});
