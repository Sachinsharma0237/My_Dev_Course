let request = require("request");
let cheerio = require("cheerio");
const getMatch = require("./match");

function getAllMAtches(link){
    request(link, cb);
}
function cb(error, response, data){
    myFun(data);
}
function myFun(html){
    let ch = cheerio.load(html);
    let allATags = ch('a[data-hover="Scorecard"]');
    // [ <a></a>, <a></a>, <a></a>, ...... 60 attributes ]
    //console.log(allATags.length);

    for(let i = 0; i < allATags.length; i++){
        let link = ch(allATags[i]).attr("href");
        let completeLink = "https://www.espncricinfo.com" + link;
        getMatch(completeLink);
    }
}

module.exports = getAllMAtches;