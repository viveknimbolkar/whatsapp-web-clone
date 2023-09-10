const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    iss: {
        type: String,
    },
    azp: {
        type: String,
    },
    aud: {
        type: String,
    },
    sub: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    email_verified: {
        type: Boolean,
    },
    nbf: {
        type: Number,
    },
    picture: {
        type: String,
    },
    given_name: {
        type: String,
    },
    locale: {
        type: String,
    },
    iat: {
        type: Number,
    },
    exp: {
        type: Number,
    },
    jti: {
        type: String,
    },
    name: {
        type: String,
    },
    bio: {
        type: String,
        default: "Available"
    },
    chatWallpaper: {
        type: String,
        default: "image-background"
    },
});
const User = mongoose.model('user', userSchema)

module.exports = User