let fs = require("fs");

console.log("start");

let content = fs.readFileSync("./f1.txt");
console.log(content + "");

console.log("End");
