const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser"); 
const JWT = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(express.json());  //middleware given by express to convert into javascript object
app.use(cookieParser());

app.post("/signup", async (req, res)=>{
    
    // const user = new User({
    //     firstName: "Dhwani",
    //     lastName:"Sharma",
    //     email:"dhwanisharma0205@gmail.com",
    //     password:"dwani11",
    //     age: 22
    //  });
    
  
     try{
       
      validateSignUpData(req);

      const{firstName, lastName, email, password} = req.body;

      const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({firstName, lastName, email, password:hashPassword});


       await user.save();
        res.send("User added successfully");
     }
     catch(err){
        res.status(400).send("Error : " + err.message);
     }
})

app.post("/login", async(req,res)=>{
  const {email, password} = req.body;
  try{
    const user = await User.findOne({email:email});
       if(!user){
        throw new Error("User not found");
       }
       const isPasswordValid = await bcrypt.compare(password, user.password);

      if(isPasswordValid){
       const Token = await JWT.sign({_id: user._id}, "MumbaiTrip@2024", {expiresIn: "0d",});
       console.log(Token);
        res.cookie("Token", Token);
        res.send("Login Successfull");
      }
      else{
        throw new Error("Password not valid");
      }
  }catch(err){
    res.status(400).send("Error :" + err.message);
  }
})

// app.get("/feed", async(req, res)=>{
  
//   const userEmail = req.body.emailId;

//   try{
//     const users = await User.find({email: userEmail});
//     if(users.length === 0)
//     {
//         res.status(404).send("user not found");
//     }
//     else{
//         res.send(user);
//     }   
//   }
//   catch(err){
//     res.status(400).send("cannot find user");
//   }
// })

// app.get("/getuser", async(req,res)=>{
//     const userId = req.body.userid;
//     try{
//     const user = await User.findById(userId)
//     await res.send(user);
//     }
//     catch(err){
//         res.status(404).send("User not found");
//     }
// })

app.get("/profile", userAuth ,async(req,res)=>{
  try{
   const user = req.user;
   res.send(user);
  }  
  catch(err){
    res.status(400).send("Error: "+ err.message);
  }
})

app.post("/sendConnectionRequest", userAuth ,async(req,res)=>{
  const user = req.user;
  res.send("connection request send by: " + user.firstName);   
})

// app.delete("/deleteuser", async(req,res)=>{
//    const userId = req.body.userid;

//    try{
//     const user = await User.findByIdAndDelete(userId);
//     res.send("user deleted successfully");
//    }
//    catch(err){
//     res.status(404).send("User not found");
//    }
// })

// app.patch("/updateuser", async(req,res)=>{
//     const userId = req.body.userId;
//     const data = req.body;

//     try{
//        await User.findByIdAndUpdate({_id:userId}, data);
//        res.send("User updated successfully");
//     }
//     catch(err){
//         res.status(404).send("cannot find user");
//     }
// })

connectDB().then(()=>{
    console.log("database connected");
    app.listen("0205", () => {
        console.log("server listening on port 0205");
      });

}).catch(()=>{
    console.log("database not connected");
})
