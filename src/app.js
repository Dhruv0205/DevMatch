const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser"); 
const cors = require("cors");

app.use(cors({
    origin:"http://localhost:205",
    credentials:true,
}))
app.use(express.json());  //middleware given by express to convert into javascript object
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

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

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

connectDB().then(()=>{
    console.log("database connected");
    app.listen("0205", () => {
        console.log("server listening on port 0205");
      });

}).catch(()=>{
    console.log("database not connected");
})
