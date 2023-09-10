const mongoose = require("mongoose");


const messageSchema = mongoose.Schema({
    conversationId: {
        type: String
    },
    senderId: {
        type: String
    },
    receiverId: {
        type: String
    },
    type: {
        type: String
    },
    text: {
        type: String
    },
}, { timestamps: true })

const Message = mongoose.model("message", messageSchema)

module.exports = Message