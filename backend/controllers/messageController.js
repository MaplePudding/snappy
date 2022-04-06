const messageModel = require('../model/messageModel')

module.exports.addMessage = async (ctx, next) =>{
    const {from, to, message} = ctx.request.body
    const data = await messageModel.create({
        message: {text:message},
        users: [from, to],
        sender: from
    })
    if(data){
        return ctx.body = JSON.stringify({msg: "Message added successfully"})
    }else{
        return ctx.body = JSON.stringify({msg: "Failed to add message"})
    }

}
module.exports.getAllMessages = async (ctx, next) =>{
    const {from, to} = ctx.request.body
    const messages = await messageModel.find({users:{
            $all: [from, to]
        }}).sort({updatedAt: 1})
    const projectMessages = messages.map((msg) =>{
        return{
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text
        }
    })
    return ctx.body = JSON.stringify(projectMessages)
}

