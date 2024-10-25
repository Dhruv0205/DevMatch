// we will use express routers to manage our api efficiently and group our api's into different types routers and those router will handle api.

const express = require('express');
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user")
const bcrypt = require('bcrypt');
const JWT = require("jsonwebtoken");

authRouter.post("/signup", async (req, res)=>{
    
    // const user = new User({
    //     firstName: "Dhwani",
    //     lastName:"Sharma",
    //     email:"dhwanisharma0205@gmail.com",
    //     password:"dwani11",
    //     age: 22
    //  });
    
  
     try{
       
      validateSignUpData(req);

      const{firstName, lastName, email, password, photoUrl, age} = req.body;

      const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({firstName, lastName, email, password:hashPassword, photoUrl, age});


       await user.save();
        res.send("User added successfully");
     }
     catch(err){
        res.status(400).send("Error : " + err.message);
     }
})

authRouter.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    try{
      const user = await User.findOne({email:email});
         if(!user){
          throw new Error("User not found");
         }
         const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if(isPasswordValid){
         const Token = await JWT.sign({_id: user._id}, "MumbaiTrip@2024",);
         console.log(Token);
          res.cookie("Token", Token);
          res.send("Login successfull");
        }
        else{
          throw new Error("Password not valid");
        }
    }catch(err){
      res.status(400).send("Error :" + err.message);
    }
  })

authRouter.post("/logout", async(req,res)=>{
   res.cookie("token", null, {expires: new Date(Date.now()),
});
res.send("Logout"); 
})  

module.exports = authRouter;