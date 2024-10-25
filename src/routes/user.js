const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionRequest = require("../models/connectionRequest");

userRouter.get("/user/request/recieved", userAuth, async (req,res)=>{
    try{
     const loginUser = req.user;

    const connectionRequest = await connectionRequest.find({toUserId: loginUser._id, status:"interested"});

    res.json({message:"Recieved Request", connectionRequest});

    }catch(err){
        res.status(404).send("Error: " + err.message);
    }
})

userRouter.get("/user/request/recieved", userAuth, async (req,res)=>{
    try{
     const loginUser = req.user;
     await connectionRequest.find({})
    }catch(err){
        res.status(404).send("Error: " + err.message);
    }
})

module.exports = userRouter;