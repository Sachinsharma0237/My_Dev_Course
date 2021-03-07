const express = require('express');
const requestRouter = require('./router/requestRouter');
const userRouter = require('./router/userRouter');
const app = express();



app.use( express.static("public") );

app.use( express.json() )

//for all user related functions navigate to userRouter
app.use("/api/user", userRouter);


app.use("/api/request", requestRouter);




let port = 4000;
app.listen(port, function(){
    console.log(`server started at ${port}`);
})

