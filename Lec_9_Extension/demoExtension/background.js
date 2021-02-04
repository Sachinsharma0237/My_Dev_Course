chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

    console.log(tab);
    if( tab.status == "complete"){
        if( tab.url.includes("facebook") ){
            chrome.tabs.remove(tabId, function(){
                console.log("removed Tab!!!!");
            });
        }
    }
});
