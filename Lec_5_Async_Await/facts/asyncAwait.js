//Async KeyWord
let fs = require("fs");
console.log("Start")
async function sayHi(){
    try{
    let f1KaData =  await fs.promises.readFile("./f1.txt");
        console.log(f1KaData + "");
    }
    catch(error){
        console.log(error);
    }
}
sayHi();
console.log("End");