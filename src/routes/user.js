const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

userRouter.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;

    const connectionRequests = await connectionRequest.find({
      toUserId: loginUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName photoUrl skills about age gender");

    res.json({ message: "Recieved Request", connectionRequests });
  } catch (err) {
    res.status(404).send("Error: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;

    const Connections = await connectionRequest.find({
      $or:[{toUserId: loginUser._id, status:"accepted"},
      {fromUserId: loginUser._id, status:"accepted"},],
    }).populate("fromUserId", "firstName lastName photoUrl about gender age").populate("toUserId", "firstName lastName photoUrl about gender age");

  const Connection = Connections.map(user => {
    if(user.fromUserId._id.toString() === loginUser._id.toString())
    {
      return user.toUserId;
    }
    return user.fromUserId;
  })
   
    res.json({ message: "Your Connections", data: Connection });
  } catch (err) {
    res.status(404).send("Error: " + err.message);
  }
});


// userRouter.get("/feed", userAuth, async (req, res) => {
//   try {
//     const loginUser = req.user;
//     const page = parseInt(req.query.page) || 1;
//     let limit = parseInt(req.query.limit) || 10;
//     limit = limit>50?50:limit;
//     const skip = (page-1) * limit;

//     const ConnectionRequests = connectionRequest.find({
//       $or: [{ fromUserId: loginUser._id }, { toUserId: loginUser._id }],
//     });
//     console.log(ConnectionRequests);
//     const hideUserFromFeed = new Set();
//     ConnectionRequests.forEach((req) => {
//       hideUserFromFeed.add(req.fromUserId.toString());
//       hideUserFromFeed.add(req.toUserId.toString());
//     });

//   console.log(hideUserFromFeed);

//     const FeedUser = User.find({
//       $and: [
//         { _id: { $nin: Array.from(hideUserFromFeed) } },
//         { _id: { $ne: loginUser._id } },
//       ],
//     }).skip(skip).limit(limit);

//     res.send(FeedUser);
//   } catch (err) {
//     res.status(404).send("Error: " + err.message);
//   }
// });

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
      const loginUser = req.user;
      const page = parseInt(req.query.page) || 1;
      let limit = parseInt(req.query.limit) || 10;
      limit = limit > 50 ? 50 : limit;
      const skip = (page - 1) * limit;

      // Find connected users with accepted connections
      const connectedUserIds = await connectionRequest.find({
          $or: [
              { fromUserId: loginUser._id },
              { toUserId: loginUser._id, status: "accepted" }
          ]
      }).distinct("_id");

      // Create a set of connected user IDs
      const hideUserFromFeed = new Set(connectedUserIds.map(id => id.toString()));

      // Fetch feed users, excluding connected users and the logged-in user
      const feedUsers = await User.find({
          _id: { $nin: Array.from(hideUserFromFeed), $ne: loginUser._id }
      }).skip(skip).limit(limit);

      res.send(feedUsers);
  } catch (err) {
      res.status(404).send("Error: " + err.message);
  }
});

module.exports = userRouter;
