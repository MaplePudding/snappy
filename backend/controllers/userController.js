const User = require('../model/userModel')
const bcrypt = require("bcrypt")

module.exports.login = async (ctx, next) =>{
    const {username, password} = ctx.request.body
    const user = await User.findOne({username})
    if(!user){
        return ctx.body = JSON.stringify({msg: "Incorrect username or password", status: false})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return ctx.body = JSON.stringify({msg: "Incorrect username or password", status: false})
    }
    delete user.password;
    return ctx.body = JSON.stringify({status: true, user})
}

module.exports.register = async (ctx, next) =>{
    const {username, password, email} = ctx.request.body
    const usernameCheck = await User.findOne({username})
    if(usernameCheck){
        return ctx.body = JSON.stringify({msg: "Username already existed", status: false})
    }
    const emailCheck = await User.findOne({email})
    if(emailCheck){
        return ctx.body = JSON.stringify({msg: "Email already existed", status: false})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        email,
        username,
        password:hashedPassword
    })
    delete user.password;
    return ctx.body = JSON.stringify({status: true, user})
}

module.exports.getAllUsers = async (ctx, next) =>{
    const users = await User.find({_id: {$ne: ctx.request.params.id}}).select([
        "email",
        "username",
        "avatarImage",
        "_id"
    ])

    return ctx.body = JSON.stringify(users)
}