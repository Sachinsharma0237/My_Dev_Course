const { createUser, getAllUsers } = require("../Controller/userController");
const express = require("express");

const userRouter = express.Router();


userRouter.route("").get(getAllUsers).post(createUser);


module.exports = userRouter;