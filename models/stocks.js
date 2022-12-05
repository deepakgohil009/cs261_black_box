const mongoose = require("mongoose")

const stock_schema = mongoose.Schema({
    stock_name: {
        type: String,
        required: true
    },
    data: {
        type: [Object],
        required: true
    }
})

module.exports = mongoose.model("stock", stock_schema)
