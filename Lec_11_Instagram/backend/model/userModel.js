const { mongoose } = require("./db");

let userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    bio:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isPublic:{
        type:String,
        required:true,
        default:true
    },
    profilePic:{
        type:String,
        default:"public/images/users/default.png"
    },
})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;