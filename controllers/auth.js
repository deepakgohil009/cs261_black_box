const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res, next) => {
    try {
        let salt = bcrypt.genSaltSync(10)
        let hash_password = bcrypt.hashSync(req.body.password, salt)

        let user = new User({
            email: req.body.email,
            password: hash_password,
        })

        await user.save()
        res.redirect("/public/login.html")

    } catch (error) {
        req.err = error
        next()
    }
}


const login = async (req, res, next) => {
    try {


        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).send({ error: "user not found" })
            return
        }
        let is_valid = bcrypt.compareSync(req.body.password, user.password)
        if (!is_valid) {
            res.status(400).send({ error: "wrong password" })
            return
        }
        let token = jwt.sign({
            id: user._id,
        }, process.env.JWT)

        res.cookie("access_token", token, { httpOnly: true }).redirect("/")
    } catch (error) {
        req.err = error
        next(error)
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("access_token").redirect("/")
    } catch (error) {
        req.err = error
        next(error)
    }
}

module.exports = { register, login, logout }