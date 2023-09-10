const User = require('../model/user')

const addUser = async (req, res) => {
    try {
        let userExits = await User.findOne({ sub: req.body.data.sub })
        if (userExits) {
            res.status(200).json(userExits);
            return;
        }
        const newUser = new User(req.body.data);
        await newUser.save();
        return res.status(200).json({ output: newUser })
    } catch (error) {
        return res.status(200).json({ output: error.message })

    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find({})
        return res.status(200).json({ users: allUser })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const updateBio = async (req, res) => {
    try {
        const findUser = await User.findOneAndUpdate({ sub: req.body.userid }, { bio: req.body.bio }, { new: true });
        return res.status(200).json(findUser)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const updateChatWallpaper = async (req, res) => {
    try {
        const findUser = await User.findOneAndUpdate({ sub: req.body.userid }, { chatWallpaper: req.body.color }, { new: true });
        return res.status(200).json({
            output: "Chat wallpaper updated successfully!",
            status: 200,
            color: req.body.color
        })

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const getChatWallpaper = async (req, res) => {
    try {
        const findUser = await User.findOne({ sub: req.body.userid });
        return res.status(200).json(findUser.chatWallpaper)

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = { addUser, getAllUsers, updateBio, updateChatWallpaper, getChatWallpaper }