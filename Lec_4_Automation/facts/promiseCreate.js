let fs = require("fs");

function createPromise(filePath){
    return new Promise( function(resolve, reject){

        fs.readFile(filePath, function(error, data){
            if(error){
                    //data nhi aya
                    reject(error);
            }else{
                    //data aa gya
                   // resolve(data);
                   resolve("Anything you Want");
            }
        })
    });
}

let f1KaPromise = createPromise("./f1.txt");
console.log(f1KaPromise);
//scb => Success CallBack
f1KaPromise.then(function (data){
    console.log("Inside scb");
    console.log("Content: " + data);
});
//fcb => Failed CallBack
f1KaPromise.catch(function (error){
    console.log("Inside fcb");
    console.log(error);
});