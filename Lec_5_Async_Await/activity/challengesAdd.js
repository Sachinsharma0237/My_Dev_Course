const id = "sachinsharma0237@gmail.com";
const pw = "Sachin@12345";
const puppeteer = require("puppeteer");
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
            
            let createChallenge = await tab.$('.btn.btn-green.backbone.pull-right');
            let createChallengeLink = await tab.evaluate( function(elem){ return elem.getAttribute('href'); } ,createChallenge );
            createChallengeLink = `https://www.hackerrank.com${createChallengeLink}`;

            for(let i=0 ; i<challenges.length ; i++){
                await addChallenges(challenges[i] , browser , createChallengeLink);
            }

        }
        catch(error){
            console.log(error);
        }
})();
async function addChallenges(challenge, browser, link){

    // {
    //     "Challenge Name": "Pep_Java_1GettingStarted_1IsPrime",
    //     "Description": "Question 1",
    //     "Problem Statement": "Take as input a number n. Determine whether it is prime or not. If it is prime, print 'Prime' otherwise print 'Not Prime.",
    //     "Input Format": "Integer",
    //     "Constraints": "n <= 10 ^ 9",
    //     "Output Format": "String",
    //     "Tags": "Basics",
    //     "Testcases": [
    //       {
    //         "Input": "7",
    //         "Output": "Prime"
    //       },
    //       {
    //         "Input": "9",
    //         "Output": "Not Prime"
    //       }
    //     ]
    // }  
    let challengeName = challenge["Challenge Name"];
    let description = challenge["Description"];
    let problem = challenge["Problem Statement"];
    let input = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let output = challenge["Output Format"];
    let tags = challenge["Tags"];


    let newTab = await browser.newPage();
    await newTab.goto(link);
    await newTab.waitForSelector('#name' , {visible:true});
    await newTab.type('#name' , challengeName);
    await newTab.type("#preview" , description);
    await newTab.waitForSelector('#problem_statement-container .CodeMirror textarea' , {visible:true});
    await newTab.type('#problem_statement-container .CodeMirror textarea' , problem);
    await newTab.type('#input_format-container .CodeMirror textarea' , input);
    await newTab.type('#constraints-container .CodeMirror textarea' , constraints);
    await newTab.type("#output_format-container .CodeMirror textarea" , output);
    await newTab.type("#tags_tag" , tags);
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green');
    await newTab.close();
}