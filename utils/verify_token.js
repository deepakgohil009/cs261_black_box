const jwt = require("jsonwebtoken")

const verify_token = (req, res, next) => {

    const token = req.cookies.access_token

    if (!token) {
        res.redirect("/public/login.html")
    }
    else {
        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) {
                res.status(400).send({ error: "invalid token!" })
            }
            else {
                req.user = user
                next()
            }
        })
    }
}

module.exports = verify_token