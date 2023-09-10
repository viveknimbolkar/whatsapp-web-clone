const router = require('express').Router();
const { uploadFile, getFile } = require('../controller/fileController');
const { newMessage, getMessages } = require('../controller/messageController');
const { newConversation, getConversation } = require('../controller/newConversation');
const { addUser, getAllUsers, updateBio, updateChatWallpaper, getChatWallpaper } = require('../controller/userController');
const handleFileUpload = require('../utils/handleFileUpload')

router.post("/add", addUser)
router.get('/users', getAllUsers)
router.post('/users/update/bio', updateBio)
router.post('/users/update/chatwallpaper', updateChatWallpaper)
router.post('/users/get/chatwallpaper', getChatWallpaper)

router.post("/conversation/add", newConversation)
router.post("/conversation/get", getConversation)

router.post("/message/add", newMessage)
router.get("/message/get/:id", getMessages)

router.post("/file/upload", handleFileUpload.single("file"), uploadFile)
router.get("/file/:filename", getFile)

module.exports = router;