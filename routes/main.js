const express = require("express");
const verifyToken = require("../utils/verify_token")
const { dashboard, stock, backtest, history } = require("../controllers/main")

const route = express.Router();

route.get("/", verifyToken, dashboard)
route.get("/stock", verifyToken, stock)
route.get("/backtest/:symbol", verifyToken, backtest)
route.get("/history", verifyToken, history)

module.exports = route
