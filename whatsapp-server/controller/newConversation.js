const Conversation = require("../model/conversation")
const newConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const isConversationExits = await Conversation.findOne({
            members: {
                $all: [senderId, receiverId]
            }
        })

        if (isConversationExits) {
            return res.status(200).json({ output: "Conversation already exits" })
        }

        const createConversation = new Conversation({
            members: [senderId, receiverId]
        })

        await createConversation.save();
        return res.status(200).json({ output: "Conversation saved" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}

const getConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        let conversation = await Conversation.findOne({ members: { $all: [senderId, receiverId] } })
        return res.status(200).json({ conversations: conversation })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}

module.exports = { newConversation,getConversation }