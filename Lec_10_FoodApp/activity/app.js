const express = require("express");
const app = express();

const userRouter = require("./Router/UserRouter");

app.use( express.json() );      //adds data in req.body

//localhost:3000/api/user
app.use("/api/user", userRouter);



let port = 3000;
app.listen(port, function(){
    console.log(`app is started at port = ${port}`);
});
