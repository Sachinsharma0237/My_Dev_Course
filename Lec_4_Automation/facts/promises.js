let fs = require("fs");
let pendingPromise = fs.promises.readFile("./f1.txt");

//console.log(pendingPromise);
//scb => Success CallBack
pendingPromise.then(function (data){
    console.log("Inside scb");
    console.log(data + "");
});
//fcb => Failed CallBack
pendingPromise.catch(function (error){
    console.log("Inside fcb");
    console.log(error);
});