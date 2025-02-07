const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");

const getSecretRoomId = (userId, targetUserId) =>{
    return crypto.createHash("sha256").update([userId, targetUserId].sort().join("_")).digest("hex");
};

const initalizeSocket = (server) => {
    const io = socket(server, {
        cors:{
            origin:"http://localhost:5173",
        },
    });
    
    io.on("connection", (socket) => {
        console.log("Socket connected: ", socket.id);

        socket.on("joinChat", ({firstName ,userId, targetUserId}) => {
            const roomId = getSecretRoomId(userId, targetUserId);
            console.log(firstName +" Joined room: " + roomId);
            socket.join(roomId);
        });

        socket.on("sendMessage", async ({firstName, lastName, userId, targetUserId, text}) => {
            try {
                const roomId = getSecretRoomId(userId, targetUserId);
                console.log(firstName + " " + text);
                
                let chat = await Chat.findOne({
                    participants: { $all: [userId, targetUserId] },
                });
        
                // If no chat is found, create a new chat object
                if (!chat) {
                    chat = new Chat({
                        participants: [userId, targetUserId],
                        messages: [], // Initialize messages array
                    });
                }
        
                //  Ensure messages array exists
                if (!chat.messages) {
                    chat.messages = []; // Initialize messages if undefined
                }
        
                // Push new message to the chat
                chat.messages.push({
                    senderId: userId,
                    text,
                });
        
                await chat.save(); // Save the updated chat to the database
        
                // Emit the message to the room
                io.to(roomId).emit("messageRecieved", {
                    firstName,
                    lastName,
                    text,
                });
            } catch (err) {
                console.log(err);
            }
        });
    
        socket.on("disconnect", () => {});
    });   
};

module.exports = initalizeSocket;