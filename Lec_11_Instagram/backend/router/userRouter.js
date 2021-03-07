const multer = require("multer");
const path = require("path");
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } = require("../controller/userController");
const userRouter = require("express").Router();


const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, 'public/images/users');
    },
    filename : function (req,  file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = function (req, file, cb) {
    if( file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({storage:storage, fileFilter:fileFilter});

userRouter.route("").get(getAllUsers).post(upload.single('user'), createUser );



userRouter.route("/:id")
.get(getUserById)
.patch(upload.single('user') ,updateUserById)
.delete(deleteUserById);



module.exports = userRouter;