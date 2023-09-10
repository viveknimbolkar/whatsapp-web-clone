require('dotenv').config()
const { Server } = require("socket.io");

const io = new Server(process.env.PORT, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

let activeUsers = []; // all currently active users

const addUser = (userData, socketId) => {
    let isCurrentUserExistinActiveUser = activeUsers.some(user => user.sub === userData.sub);
    if (!isCurrentUserExistinActiveUser) {
        activeUsers.push({ ...userData, socketId, isTyping: false })
    }
}

const getUser = (userId) => {
    return activeUsers.find(user => user.sub === userId)
}

//change typing status
const updateTyping = (senderId) => {
    var indexOfSender = activeUsers.findIndex(user => user.sub === senderId)
    activeUsers[indexOfSender].isTyping = true;
}

io.on("connection", (socket) => {
    console.log('socket server: up and running...');

    // create a list of online users
    socket.on('add-user', userData => {
        addUser(userData, socket.id)
        io.emit('get-active-users', activeUsers)
    })

    // sent message to the receiver
    socket.on('send-message', data => {
        // get the receiver socker id
        const user = getUser(data.receiverId);
        if (activeUsers.length) {
            io.to(user.socketId).emit("get-message", data)
        }
    })

    // get typing signal
    socket.on("typing", data => {
       var temp ={...data}
       temp.isTyping = true
       console.log(temp);
        if (data.isTyping) {
            io.emit("show-typing", temp)
        }
    })
});

