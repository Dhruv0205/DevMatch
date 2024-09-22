
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")

app.use(express.json());  //middleware given by express to convert into javascript object

app.post("/signup", async (req, res)=>{
    
    // const user = new User({
    //     firstName: "Dhwani",
    //     lastName:"Sharma",
    //     email:"dhwanisharma0205@gmail.com",
    //     password:"dwani11",
    //     age: 22
    //  });
    
    const user = new User(req.body);

     try{
       await user.save();
        res.send("User added successfully");
     }
     catch(err){
        res.status(400).send("error saving the user");
     }
})

app.get("/feed", async(req, res)=>{
  
  const userEmail = req.body.emailId;

  try{
    const users = await User.find({email: userEmail});
    if(users.length === 0)
    {
        res.status(404).send("user not found");
    }
    else{
        res.send(user);
    }   
  }
  catch(err){
    res.status(400).send("cannot find user");
  }
})

connectDB().then(()=>{
    console.log("database connected");
    app.listen("0205", () => {
        console.log("server listening on port 0205");
      });

}).catch(()=>{
    console.log("database not connected");
})
