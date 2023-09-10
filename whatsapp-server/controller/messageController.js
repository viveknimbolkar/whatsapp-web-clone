const Message = require("../model/message");
const Conversation = require("../model/conversation")
const newMessage = async (req, res) => {
    try {
        let msg = new Message(req.body)
        await msg.save()
        //saving latest msg
        await Conversation.findByIdAndUpdate(req.body.conversationId, { message: req.body.text })
        return res.status(200).json({ output: "Message has been sent successfullly" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.id })
        return res.status(200).json({ messages: messages })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = { newMessage, getMessages }