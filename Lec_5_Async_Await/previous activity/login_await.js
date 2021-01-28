const id = "difeh89233@chatdays.com";
const pw = "Sachin@12345";
const puppeteer = require("puppeteer");

//IIFE ==> Immediately Invoked Function
/* =>> To Open A Browser */
(async function(){

    try{
        let browser = await puppeteer.launch({
            headless : false,     
            defaultViewport : null,
            args : ["--start-maximized"],
    }); 
        let pages = await browser.pages();
        let tab = pages[0];
        await tab.goto("https://www.hackerrank.com/auth/login");
        //Page Opened
        await tab.type("#input-1", id);         //Id typed
        await tab.type("#input-2", pw);         //Pw typed
        await tab.click('button[type="submit"]');
        //await Promise.all([ tab.waitForNavigation(), tab.click(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled")]); 
        await tab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled", {visible : true});
        await tab.click(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
        await tab.waitForSelector(".ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link.ui-btn-styled", {visible : true});
        await tab.click(".ui-btn.ui-btn-normal.playlist-card-btn.ui-btn-primary.ui-btn-link.ui-btn-styled");
        await tab.waitForSelector('a[data-analytics="ChallengeListChallengeName"]', {visible : true});
        let allQuestionElements = await tab.$$('a[data-analytics="ChallengeListChallengeName"]');
        let completeLink = [];
        for(let i = 0; i < allQuestionElements.length; i++){
            let link = await tab.evaluate(function(elem){return elem.getAttribute("href")}, allQuestionElements[i]);
            completeLink.push(link);
        }
        let allLinks = [];
        for(let i = 0; i < completeLink.length; i++){
            let Link = `https://www.hackerrank.com${completeLink[i]}`;
            allLinks.push(Link);
        }
        /*Yha tk Sarre Question Ke Link aa gye*/
        await solveQuestion(allLinks[0]);
        for(let i = 1; i < allLinks.length; i++){
            await solveQuestion(allLinks[i]);
        }
        async function solveQuestion(quesLinks){
        await tab.goto(quesLinks)
        await tab.waitForSelector('div[data-attr2="Editorial"]', {visible : true});
        await tab.click('div[data-attr2="Editorial"]');
            //await tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled', {visible : true});
            //await tab.click('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
            //console.log("Lock Button Found");
            await iWantToSave(tab);

            
            
        
        await tab.waitForSelector(".hackdown-content h3", {visible: true});
        let allCodeNamesPending = await tab.$$(".hackdown-content h3");
        let allCodeNames = [];
        for(let i = 0; i < allCodeNamesPending.length; i++){
            let namePromise = await tab.evaluate( function(elem){ return elem.textContent;  }, allCodeNamesPending[i] );
            allCodeNames.push(namePromise);
        }
        console.log(allCodeNames);
        let idx;
        for(let i = 0; i < allCodeNames.length; i++){
            if(allCodeNames[i] == "C++"){
                idx = i;
                break;
            }
        }
        let allCodesElement = await tab.$$(".hackdown-content .highlight");
        let codeDiv = allCodesElement[idx];
        let code = await tab.evaluate( function(elem){ return elem.textContent;  }, codeDiv);
        await tab.click('div[data-attr2="Problem"]');
        await tab.waitForSelector('.custom-input-checkbox', {visible : true});
        await tab.click('.custom-input-checkbox');
        await tab.type(".custominput", code);
        await tab.keyboard.down("Control");
        await tab.keyboard.press("A");
        await tab.keyboard.press("X");
        await tab.click('.monaco-scrollable-element.editor-scrollable.vs');
        await tab.keyboard.down("Control");
        await tab.keyboard.press("A");
        await tab.keyboard.press("V");
        await tab.keyboard.up("Control");
        await tab.click(' .pull-right.btn.btn-primary.hr-monaco-submit');
        console.log("Code Submited");
    }
    }
    catch(error){
        console.log(error);
    }



})();
async function iWantToSave(tab){
    try{
        await tab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled", {timeout:5000});
        await tab.click(".ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled");
        console.log("Lock Button Found");
    }
    catch(error){
        console.log("Lock Button Found");
        return;
    }
}