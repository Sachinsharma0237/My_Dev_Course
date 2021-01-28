socket.on("chat-join", function(userName){
    let chat = document.createElement("div");
        chat.classList.add("join");
        chat.innerHTML = userName + " joined the chat !";
        chatList.append(chat);
});

socket.on("chat-left", function(messageObj){
    let chat = document.createElement("div");
        chat.classList.add("chat");
        chat.classList.add("left");
        chat.innerHTML = messageObj.userName + ":" + messageObj.message ;
        chatList.append(chat);
});
socket.on("leave", function(userName){
    let chat = document.createElement("div");
        chat.classList.add("leave");
        chat.innerHTML = userName + " left the chat !";
        chatList.append(chat);
})