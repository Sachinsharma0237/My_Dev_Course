const fs = require("fs");
const express = require("express");
const app = express();

const usersDb = require("./Model/usersDb.json");

app.use( express.json() );      //adds data in req.body

function createUser(req, res){
    let userData = req.body;
    if(userData.name){
        usersDb.push(userData);
        fs.writeFileSync("./Model/usersDb.json", JSON.stringify(usersDb));
        res.status(200).json({
            message: "user created succesfully!!"
        })
    }else{
        res.status(200).json({
            message: "user not created!!"
        })
    }
}

app.post("/api/user", createUser); 


let port = 3000;
app.listen(port, function(){
    console.log(`app is started at port = ${port}`);
});
