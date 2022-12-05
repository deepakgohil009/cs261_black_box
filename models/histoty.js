const mongoose = require("mongoose")

const history_schema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    stock_name: {
        type: String,
        required: true
    },
    net_profit: {
        type: mongoose.Types.Decimal128,
        required: true
    }
})

module.exports = mongoose.model("history", history_schema)
