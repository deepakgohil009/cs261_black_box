const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cookie_parser = require("cookie-parser")
const main = require("./routes/main")
const auth = require("./routes/auth")

const PORT = process.env.PORT || 3000
dotenv.config()

const app = express()

const connect = () => {
    mongoose.connect(process.env.MONGO)
        .then(() => {
            console.log("Connected to Database")
        })
        .catch((err) => {
            console.log(err)
            throw new Error
        })
}

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(cookie_parser())

app.use("/public", express.static("./public/"))
app.use("/auth",auth)
app.use(main)
app.use((req, res) => {
    console.log(req.err)
    res.status(400).send(`Something Went Wrong. Error ${req.err}`)
})

app.listen(PORT, () => {
    connect()
    console.log("Server Started")
})