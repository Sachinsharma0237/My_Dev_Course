const usersDb = require("../Model/usersDb.json");
const fs = require("fs");


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
function getAllUsers(req, res){
    res.json({
        message : "Succesfully got all Users",
        usersDb
    })
}
function getUserById(req, res){

}
function deleteUserById(req, res){

}
function updateUserById(req, res){

}
//object ki key bna k export kra gya hai
module.exports.createUser = createUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
module.exports.deleteUserById = deleteUserById;
module.exports.updateUserById = updateUserById;