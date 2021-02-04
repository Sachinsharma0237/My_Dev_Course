const changeImageBtn = document.querySelector("#change");



changeImageBtn.addEventListener("click", function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let tab = tabs[0];
        chrome.tabs.sendMessage(tab.id, "changeImage", function(response) {
                console.log(response);
         });
    });
});






