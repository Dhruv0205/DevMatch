const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateEditProfile} = require("../utils/validation");


profileRouter.get("/profile/view", userAuth ,async(req,res)=>{
    try{
     const user = req.user;
     res.send(user);
    }  
    catch(err){
      res.status(400).send("Error: "+ err.message);
    }
  })

profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
  try{
  if(!validateEditProfile(req)){
    throw new Error("Invalid Edit Request");
  }
  const loginuser = req.user;
  // const editallowed = [firstName, lastName, age, gender, photoUrl];

  object.keys(req.body).forEach((key) => (loginuser[key] = req.body[key]));

  await loginuser.save();
  res.send("Edit successfull");
 }
 catch(err){
  res.status(400).send("Error: " + err.message);
 }
})

module.exports = profileRouter;  