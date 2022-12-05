const mongoose = require("mongoose")

const user_schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("user", user_schema)