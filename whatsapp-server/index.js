require('dotenv').config()
const app = require("express")();
const { Server } = require("socket.io");
const httpServer = require("http").createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

const bodyParser = require('body-parser');
const connection = require('./database/db')
const routes = require('./routes/route')
const cors = require('cors')

connection();

app.use(cors())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))


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

    // started typing signal
    socket.on("start-typing", data => {
        socket.broadcast.emit("start-typing", socket.id)
    })

    // stopped typing
    socket.on("stop-typing", data => {
        socket.broadcast.emit("stop-typing", socket.id)
    })
});

app.use('/', routes)

httpServer.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}...`);
})