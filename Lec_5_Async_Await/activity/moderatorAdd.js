const id = "sachinsharma0237@gmail.com";
const pw = "Sachin@12345";
const puppeteer = require("puppeteer");
const { concat } = require("./challenges");
const challenges = require("./challenges");

// IIFE => Immediately Invoked Function Expressions
// waitForSelector
// waitForNavigation
(async function(){
        try{
            let browser = await puppeteer.launch({
                headless : false,
                defaultViewport : null,
                args: ["--start-maximized"]
            });
            let pages = await browser.pages();
            let tab = pages[0];
            await tab.goto("https://www.hackerrank.com/auth/login");
            await tab.type("#input-1", id);
            await tab.type("#input-2", pw);
            await Promise.all( [tab.waitForNavigation() ,tab.click(".ui-btn.ui-btn-large.ui-btn-primary")]);
            await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]', {visible:true});
            await tab.click('div[data-analytics="NavBarProfileDropDown"]');
            await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]')
            await Promise.all( [tab.waitForNavigation() ,tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]')]);
            await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav li', {visible:true});
            let bothLis = await tab.$$('.nav-tabs.nav.admin-tabbed-nav li');
            let manageChallenge = bothLis[1];
            // // <li></li>
            await manageChallenge.click();
            await tab.waitForSelector(".btn.btn-green.backbone.pull-right",{visible:true});
            

            await addModerator(browser, tab);

        }
        catch(error){
            console.log(error);
        }
})();
async function addModerator(browser, tab){
    await tab.waitForSelector(".backbone.block-center", {visible:true});
    let allATags = await tab.$$(".backbone.block-center");
    let completeLinks = [];
    for(let i = 0 ; i < allATags.length; i++){
        let link = await tab.evaluate(function(elem){ return elem.getAttribute("href"); } ,allATags[i] );
        link = `https://www.hackerrank.com${link}`
        completeLinks.push(link);
    }
    //console.log(completeLinks);
    let allModeratorAddPromise = [];
    for(let i = 0; i < completeLinks.length; i++){
        let moderatorAddPromise = addModeratorToSingleQuestion(completeLinks[i], browser);
        allModeratorAddPromise.push(moderatorAddPromise);
    }
    await Promise.all(allModeratorAddPromise);
    let allLis = await tab.$$('.pagination li');
    let nextBtn = allLis[allLis.length - 2];
    let isDisabled = await tab.evaluate(function(elem){ return elem.classList.contains("disabled");}, nextBtn);   //False
    if(!isDisabled){
        await Promise.all( [ tab.waitForNavigation({waitUntil:"networkidle2"}), nextBtn.click() ]);
        await addModerator(browser, tab);
        
    }else{
        return;
    }
    
}
async function confirmModal(tab){
    try{
        await tab.waitForSelector("#confirmBtn", {timeout:5000});
        await tab.click("#confirmBtn");
        console.log("Save button found");
    }
    catch(error){
        console.log("Save button not found");
        return;
    }
}
async function addModeratorToSingleQuestion(link, browser){
     let newTab = await browser.newPage();
     await newTab.goto(link);
     await confirmModal(newTab);
     await newTab.waitForSelector('li[data-tab="moderators"]', {visible:true});
     await newTab.click('li[data-tab="moderators"]');
     await newTab.waitForSelector("#moderator", {visible:true});
     await newTab.type("#moderator", "Sachin");
     await newTab.click(".btn.moderator-save");
     await newTab.click(".save-challenge.btn.btn-green");
     await newTab.close();
     
}