let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");


function getMatch(link){
    request(link , cb);
}

function cb(error , response , data){
    myFun(data);
}

function myFun(html){
    let ch = cheerio.load(html);

    let bothInnings = ch('.card.content-block.match-scorecard-table .Collapsible');
    // [ <div class="Collapsible"> </div> , <div class="Collapsible"> </div>   ]
    console.log(bothInnings.length);
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = ch(bothInnings[i]).find("h5").text();
        // teamName.split("Innings"); => [ "Delhi Capitals " , " (20 overs maximum)"  ];
        teamName = teamName.split("Innings")[0].trim();
        console.log(teamName);
        let allTrs = ch(bothInnings[i]).find(".table.batsman tbody tr");
        // [ <tr></tr> , <tr></tr> , <tr></tr> , <tr></tr> , <tr></tr> , <tr></tr> , <tr></tr>]
        for(let j=0 ; j<allTrs.length-1; j++){
            let allTds = ch(allTrs[j]).find("td");
            // [  <td></td> ,<td></td> ,<td></td> ,<td></td> ,<td></td> ,<td></td> ,<td></td> ,<td></td>];
            if(allTds.length > 1){
                let batsmanName = ch(allTds[0]).find("a").text().trim();
                let runs = ch(allTds[2]).text().trim();
                let balls = ch(allTds[3]).text().trim();
                let fours = ch(allTds[5]).text().trim();
                let sixes = ch(allTds[6]).text().trim();
                let strikeRate = ch(allTds[7]).text().trim();
                // string interpolation
                // console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRate}`)
                processData(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
            }
        }

        console.log("############################################################");

    }

}


function checkTeamFolder(teamName){
    //"/IPL/Mumbai Indians"
    let teamPath = `IPL/${teamName}`;
    return fs.existsSync(teamPath);
}
function checkBatsmanFile(teamName , batsmanName){
    // " /IPL/Mumbai Indians/Hardik Pandya.json" => javascript object notation
    let batsmanPath = `IPL/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}
function updateBatsmanFile(teamName , batsmanName, runs , balls , fours , sixes , strikeRate){
    let batsmanPath = `IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = fs.readFileSync(batsmanPath);
    batsmanFile = JSON.parse(batsmanFile);
    let inning = {
        Runs : runs ,
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes ,
        SR :strikeRate 
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile));
}
function createBatsmanFile(teamName , batsmanName, runs , balls , fours , sixes , strikeRate){
    let batsmanPath = `IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let inning = {
        Runs : runs ,
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes ,
        SR :strikeRate 
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile));
}
function createTeamFolder(teamName){
    let teamPath = `IPL/${teamName}`;
    fs.mkdirSync(teamPath);
}


function processData(teamName , batsmanName, runs , balls , fours , sixes , strikeRate){
    let teamFolderExists = checkTeamFolder(teamName);
    if(teamFolderExists){
        let batsmanFileExists = checkBatsmanFile(teamName , batsmanName);
        if(batsmanFileExists){
            updateBatsmanFile(teamName , batsmanName, runs , balls , fours , sixes , strikeRate);
        }
        else{
            createBatsmanFile(teamName , batsmanName, runs , balls , fours , sixes , strikeRate);
        }
    }
    else{
        // team ka folder nahi tha
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName, runs , balls , fours , sixes , strikeRate);
    }
}


module.exports = getMatch;