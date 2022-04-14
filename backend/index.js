const koa = require('koa')
const socket = require('socket.io')
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const userRouter = require('./router')
const mongoose = require("mongoose")

require('dotenv').config()

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("DB connect successfully")
}).catch((err) =>{
    console.log(err)
})

const app = new koa()

app.use(cors())
app.use(bodyParser())
app.use(userRouter.routes()).use(userRouter.allowedMethods());



app.listen(process.env.PORT)

console.log(`listen ${process.env.PORT}`)

const io = socket(5001, {
    cors: true,
    origin: ["http://47.117.127.171:1233"],
    credentials: true
})

global.onlineUsers = new Map()

io.on('connection', (socket) =>{
    global.chatSocket = socket
    socket.on('add-user', (userId) =>{
        onlineUsers.set(userId, socket.id)
    })

    socket.on('send-msg', (data) =>{
        const sendUserSocket = onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receiver", data.msg)
        }
    })
})
