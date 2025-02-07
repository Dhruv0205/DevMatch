const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
        senderId: { type: mongoose.Schema.Types.ObjectId, ref:"User", required: true }, //reference to the user collection
        text: { type: String, required: true },
    
}, { timestamps: true,});

const chatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref:"User", required: true }],
    messages: [messageSchema],

},
{ timestamps: true, }
);

const Chat = new mongoose.model("Chat", chatSchema);
module.exports = Chat;