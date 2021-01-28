const request = require("request");
const id = "kafela4127@hafutv.com";
const pw = "Sachin@123";
const puppeteer = require("puppeteer");
let gTab;
let gIdx;
let gCode;
/* =>> To Open A Browser
  =>>  By Default true
  =>>  ye Launch ki setting hai sarri object daali hai argument me */
let browserOpenPromise = puppeteer.launch({headless : false,     
                                           defaultViewport : null,
                                           args : ["--start-maximized"]
                                           }); 
//then ka function == Success CallBack
browserOpenPromise.then(function(browser){
    let pagesPromise = browser.pages();
    return pagesPromise;
})
//Pages = []; array of 1 length
.then(function(pages){
    let tab = pages[0];
    gTab = tab;
    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;
})
//Email ID Entered
.then(function(){
    let idTypePromise = gTab.type("#input-1", id);
    return idTypePromise;
})
//Password Entered
.then(function(){
    let pwTypePromise = gTab.type("#input-2", pw);
    return pwTypePromise;
})
//Login Button
.then(function(){
   let loginclickPromise =  gTab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
   return loginclickPromise;
})
/* click => navigation => click, So waitAndClickPromise, it will Search and click */
//Interview Preparation Kit
.then(function(){
    let waitAndClickPromise = waitAndClick(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
    return waitAndClickPromise;
})
//See Challenges
.then(function(){
    let waitAndClickPromise = waitAndClick(".ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link.ui-btn-styled");
    return waitAndClickPromise;
})
//Wait for allQuestions Link
.then(function(){
    let waitPromise = gTab.waitForSelector(".js-track-click.challenge-list-item", {visible : true});
    return waitPromise;
})
//All Questions Links like =>> document.querySelectorAll(".js-track-click.challenge-list-item");
.then(function(){
    let allQuesPromise = gTab.$$(".js-track-click.challenge-list-item");
    return allQuesPromise;
})
.then(function(allQuesElements){
    // [ <a href = "" ></a>, <a href = ""></a>, <ahref = ""></a>, <a></a> }
    /* href="/challenges/sock-merchant?h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=warmup" */
    let completeLinkPromise = [];
    for(let i = 0; i < allQuesElements.length; i++){
        let linkPromise = gTab.evaluate(function(elem){return elem.getAttribute("href")}, allQuesElements[i]);
        completeLinkPromise.push(linkPromise);
    }
    let pendingPromiseOfAllLinks = Promise.all(completeLinkPromise);  
    //ye jab-tk agge nhi bdne dega jaab tk pending<promise> ki jagha data na aa gya ho matlab pending ki state change na hui ho
    return pendingPromiseOfAllLinks;
})
.then(function(allLinks){

    /* console.log(allLinks);
    let completeLink = allLinks.map(function(link){
        return  `https://www.hackerrank.com${link}`;
    }) */
    let completeLinks = [];
    for(let i = 0; i < allLinks.length; i++){
        let completeLink = `https://www.hackerrank.com${allLinks[i]}`;
        completeLinks.push(completeLink);
    }
    console.log(completeLinks);
    let firstQuesSolvePromise = solveQuestion(completeLinks[0]);
    for(let i = 1; i < completeLinks.length; i++){
        firstQuesSolvePromise = firstQuesSolvePromise.then(function(){
            let nextQuesSolvePromise = solveQuestion(completeLinks[i]);
            return nextQuesSolvePromise;
        }) 
    } //ye Sarra Chaining ke andar hai issliye aisa likh diya otherwise sarra .then likha pdta
    return firstQuesSolvePromise;
})
.then(function(){
    console.log("All Question Solved");
})
.catch(function(error){
    reject(error);
})
//DownSide Code Can Solve Any Question One by One.......................
function waitAndClick(selector){
    return new Promise(function(resolve, reject){
        let waitPromise = gTab.waitForSelector(selector, {visible : true});
        waitPromise.then(function(){
            let clickPromise = gTab.click(selector);
            return clickPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    });
}
function getCode(){
    return new Promise( function(resolve, reject){
        let waitPromise = gTab.waitForSelector(".hackdown-content h3", {visible: true});
        waitPromise.then(function(){
            let allCodeNamesElementsPromise = gTab.$$(".hackdown-content h3");
            return allCodeNamesElementsPromise; 
        })
        .then(function(allCodeNamesElement){
            //[ <h3>C++</h3>, <h3>Java</h3>, <h3>Pythonh3>]
            // allCodeNamePromise = [ Promise{pending}, Promise{pending}, Promise{pending}]
            let allCodeNamePromise = [];
            for(let i = 0; i < allCodeNamesElement.length; i++){
                let namePromise = gTab.evaluate( function(elem){ return elem.textContent;  }, allCodeNamesElement[i] );
                allCodeNamePromise.push(namePromise);
            }
            let promiseOfAllCodesNames = Promise.all(allCodeNamePromise);
            return promiseOfAllCodesNames;
        })
        .then(function(codeNames){
            //[C++, Java, Python];
            let idx;
            for(let i = 0; i < codeNames.length; i++){
                if(codeNames[i] == "C++"){
                    idx = i;
                    break;
                }
            }
            gIdx = idx;
            let allCodesElementPromise = gTab.$$(".hackdown-content .highlight");
            return allCodesElementPromise;
        })
        .then(function(allCodeElement){
            //[ <div></div>, <div></div>, <div></div> ]
            let codeDiv = allCodeElement[gIdx];
            let codePromise = gTab.evaluate( function(elem){ return elem.textContent;  }, codeDiv)
            return codePromise;

        })
        .then(function(code){
            //console.log(code);
            gCode = code;
            resolve();
        })
        .catch(function(){
            reject(error);
        })
    });
}
function pasteCode(){
    return new Promise(function(resolve, reject){
    let problemTabClickPromise = gTab.click('div[data-attr2="Problem"]');
    problemTabClickPromise.then(function(){
        let waitAndClickPromise = waitAndClick('.custom-input-checkbox');
        return waitAndClickPromise;
    })
    .then(function(){
        let codeTypedPromise = gTab.type(".custominput", gCode);
        return codeTypedPromise;
    })
    .then(function(){
        let controlkeyDownPromise = gTab.keyboard.down("Control");
        return controlkeyDownPromise;
    })
    .then(function(){
        let  aKeyPressedPromise = gTab.keyboard.press("A");
        return aKeyPressedPromise;
    })
    .then(function(){
        let  xKeyPressedPromise = gTab.keyboard.press("X");
        return xKeyPressedPromise;
    })
    .then(function(){
        let clickOnCodeBlockPromise = gTab.click('.monaco-scrollable-element.editor-scrollable.vs');
        return clickOnCodeBlockPromise;
    })
    .then(function(){
        let controlkeyDownPromise = gTab.keyboard.down("Control");
        return controlkeyDownPromise;
    })
    .then(function(){
        let  aKeyPressedPromise = gTab.keyboard.press("A");
        return aKeyPressedPromise;
    })
    .then(function(){
        let  vKeyPressedPromise = gTab.keyboard.press("V");
        return vKeyPressedPromise;
    })
    .then(function(){
        let controlkeyUpPromise = gTab.keyboard.up("Control");
        return controlkeyUpPromise;
    })
    .then(function(){
        let codeSubmitPromise = gTab.click(' .pull-right.btn.btn-primary.hr-monaco-submit');
        return codeSubmitPromise;
    })
    .then(function(){
        console.log("Code Submited");
        resolve();
    })
    .catch(function(){
        reject(error);
    })
  })
}
function handleLockBt(){
    return new Promise(function(resolve, reject){
        let waitAndClickPromise = waitAndClick('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
        waitAndClickPromise.then(function(){
            //Lock Button Found
            console.log("Lock Button Found");
            resolve();
        })
        .catch(function(error){
            //Lock Button Not Found
            console.log("Lock Button Not Found");
            resolve();
        })
    })
}
function solveQuestion(quesLink){
    return new Promise(function(resolve, reject){
         let quesGotoPromise = gTab.goto(quesLink);
         quesGotoPromise.then(function(){
            let waitAndClickPromise = waitAndClick('div[data-attr2="Editorial"]');
            return waitAndClickPromise;
        })
        .then(function(){
            let lockBtnPromise = handleLockBt();
            return lockBtnPromise;
        })
        .then(function(){
            let codePromise = getCode();
            return codePromise;
        })
        .then(function(){
            let codePastedPromise = pasteCode();
            return codePastedPromise;
        })
        .then(function(){
            resolve();
        })
        .catch(function(error){
            reject(error);
        })
    });
}


 








