const User = require('../model/userModel')

module.exports.setAvatar = async (ctx, next) =>{
    const userId = ctx.request.params.id
    const avatarImage = ctx.request.body.image

    const userData = await User.findByIdAndUpdate(userId, {
        isAvatarImageSet: true,
        avatarImage,
    })

    return ctx.body = JSON.stringify({isSet: userData.isAvatarImageSet, image: userData.avatarImage})

}