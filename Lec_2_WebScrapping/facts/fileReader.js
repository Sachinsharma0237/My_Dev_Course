//File System
let fs = require("fs");
let cheerio = require("cheerio");
let fileContent = fs.readFileSync("./f1.txt");
console.log( fileContent );
console.log( fileContent + "");     //Stringify ho jayega abb ye

let html = fs.readFileSync("./index.html","utf-8"); // stringify ki jagha plane text me bhi le sakte hai

console.log(html);

let ch = cheerio.load(html);

let h1Tag = ch("h1").text();
console.log(h1Tag);

let pTag = ch(".inside.p").text();
console.log(pTag);

let insidePtag = ch("ul .inside").text();
console.log(insidePtag);
let insidePtag1 = ch("ul p").text();
console.log(insidePtag1);
let thTag = ch("th").text();
console.log(thTag);