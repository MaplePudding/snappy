const Router = require('@koa/router')
const userController = require('./controllers/userController')
const avatarController = require('./controllers/avatarController')
const messageController = require('./controllers/messageController')

const userRouter = new Router({prefix: '/api'})

userRouter.post('/auth/register', userController.register)
userRouter.post('/auth/login', userController.login)
userRouter.post('/auth/setAvatar/:id', avatarController.setAvatar)
userRouter.get('/auth/allusers/:id', userController.getAllUsers)
userRouter.post('/messages/addmsg', messageController.addMessage)
userRouter.post('/messages/getmsg', messageController.getAllMessages)


module.exports = userRouter