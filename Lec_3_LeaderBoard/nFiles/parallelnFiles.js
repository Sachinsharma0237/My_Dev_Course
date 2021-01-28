 let fs = require("fs");
 let files = ["./f1.txt", "./f2.txt", "./f3.txt"]  // single . for same folder double dot for diff folder

 for(let i = 0; i < files.length; i++){
     fs.readFile(files[i], function cb(error, data){
            console.log(data + "");
     })
 }