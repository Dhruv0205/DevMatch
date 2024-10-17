const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
   const fromUserId = req.user._id;
   const toUserId = req.param.toUserId;
   const status = req.param.status;
     
 const allowedStatus = ["ignore", "interested"];
  
 if(!allowedStatus.includes(status)){
  return res.status(400).json({message: "Invalid status type: " + status});
  }

 const toUser =  await User.findById(toUserId);
 if(!toUser){
  return res.status(400).send("User not found");
 }

const existingConnectionRequest = await ConnectionRequest.findOne({
  $or: [
    {fromUserId, toUserId,},
    {fromUserId: toUserId, toUserId:fromUserId,},
  ],
});

if(existingConnectionRequest){
return res.status(400).json({message: "Already connected"});
}

  const ConnectionRequest = new connectionRequest({
    fromUserId, toUserId, status,
   });

   const data = await ConnectionRequest.save();

   res.json({
      message: "Connection Request Sent Successfully!",
      data,
   });

    } catch (err) {
      res.status(404).send("Error: " + err.message);
    }
  }
);

module.exports = requestRouter;
