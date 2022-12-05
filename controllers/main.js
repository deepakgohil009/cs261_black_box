const Stock = require("../models/stocks")
const History = require("../models/histoty")
const blackbox = require("../blackbox/blackbox")
const verifyToken = require("../utils/verify_token")

const dashboard = (req, res) => {
    res.render("dashboard")
}

const stock = async (req, res, next) => {
    try {
        let stocks_list = await Stock.find({}, { stock_name: 1, _id: 0 })
        res.render("purchase", { "stocks_list": stocks_list })
    } catch (error) {
        req.err = error
        next()
    }
}

const backtest = async (req, res, next) => {
    try {
        let data = await Stock.findOne({ stock_name: req.params.symbol })
        result = await blackbox(data.data, 100000)
        result.stock_name = data.stock_name

        console.table(result.order_signal)

        console.log({ "stock_name": result.stock_name, "net_profit": result.net_profit, "rcap": result.rcap })
        let hist = History({
            user: req.user.id,
            stock_name: result.stock_name,
            net_profit: result.net_profit
        })

        await hist.save()
        res.render("backtest", { "result": result })

    } catch (error) {
        req.err = error
        next()
    }
}

const history = async (req, res, next) => {
    try {
        let hist = await History.find({ user: req.user.id })
        res.render("history", { "hist": hist })
    } catch (error) {
        req.err = error
        next()
    }
}

module.exports = { dashboard, stock, backtest, history }