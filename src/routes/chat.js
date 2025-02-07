const express = require('express');
const chatRouter = express.Router();
const { userAuth} = require('../middlewares/auth');
const Chat = require('../models/chat');

chatRouter.get('/chat/:targetUserId', userAuth,  async (req, res) => {
const { targetUserId} = req.params;

const userId = req.user._id;

try {
    let chat = await Chat.findOne({
        participants: { $all: [userId, targetUserId]},
        }).populate({
            path: "messages.senderId",
            select:"firstName lastName"}
        );

    if(!chat){
        chat = new Chat({
            participants: [userId, targetUserId],
            messages: [],
        });
        await chat.save();
    }
    res.json(chat);
     }   

catch(err){
    console.log(err);
    // res.status(500).send('Internal Server Error');
}
});

// chatRouter.get('/chat/:targetUserId', userAuth,  async (req, res) => {
//     const { targetUserId } = req.params;
//     const userId = req.user._id;

//     try {
//         let chat = await Chat.findOne({
//             participants: { $all: [userId, targetUserId] },
//         }).populate({
//             path: "messages.senderId",
//             select: "firstName lastName"
//         });

//         if (!chat) {
//             // If no chat exists, return an empty list of messages
//             return res.json({ messages: [] });
//         }

//         // Extract the messages with sender's first and last name
//         const chatMessages = chat.messages.map(msg => ({
//             firstName: msg.senderId.firstName,
//             lastName: msg.senderId.lastName,
//             text: msg.text,
//         }));

//         res.json({ data: chatMessages });

//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });


module.exports = chatRouter;