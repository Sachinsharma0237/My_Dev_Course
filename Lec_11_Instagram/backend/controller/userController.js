/* CRUD ============>>>>>> Create Read Update Delete */ 
const userModel = require("../model/userModel");

async function createUser(req, res){  
    try{
        let userObject = req.body;
        if(req.file){
            let profilePicPath = req.file.destination.substring(6) + "/" + req.file.filename;
            userObject.profilePic = profilePicPath;
            console.log(userObject);
        }     
        let userCreated = await userModel.create(userObject);
        res.json({
            message:"user created Succesfully",
            userCreated
        })
        
    }
    catch(error){
        console.log(error);
        res.json({
            message:"user not created!!!",
            error
        })
    }
}
async function getAllUsers(req, res){
    try{
        let allUsers = await userModel.find({});
        console.log(allUsers);
        res.json({
            message:"got all users",
            allUsers
        })
    }
    catch(error){
        res.json({
            message:"failed to get all users",
        })
    }
}
async function getUserById(req, res){
    try{
        let id = req.params.id;
        let user = await userModel.findById(id);
        res.json({
            message:"successfully got user!",
            user
        })
    }
    catch(error){
        res.json({
            message:"failed to get user!!",
            error
        })
    }
}
async function updateUserById(req, res){
    try{
        let id = req.params.id;
        let updateObject = req.body;
        let user = await userModel.findById(id);
        
        for(let key in updateObject){
            user[key] = updateObject[key];
        }
        if(req.file){
            let profilePicPath = req.file.destination.substring(6) + "/" + req.file.filename;
            user.profilePic = profilePicPath;
        } 
        let updatedUser = await user.save();
        res.json({
            message:"user updated Sucessfully",
            updatedUser
        })
    }
    catch(error){
        res.json({
            message:"failed to update user!!!",
            error
        })
    }

}
async function deleteUserById(req, res){
    try{
        let id = req.params.id;
         let deletedUser =  await userModel.findByIdAndDelete(id);
         res.json({
             message:"user deleted",
             deletedUser
         })
    }
    catch(error){
        res.json({
            message:"failed to delete",
            error
        })
    }
}



module.exports.createUser = createUser;
module.exports.getAllUsers = getAllUsers;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.deleteUserById = deleteUserById;