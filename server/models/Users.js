const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    city: String,
    date: {
        type: Date,
        default: Date.now  // Optional: default to current date
    }
})

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel
