const express = require("express")
const { register, login, logout } = require("../controllers/auth")

const route = express.Router()

route.post("/register", register)
route.post("/login", login)
route.get("/logout", logout)

module.exports = route