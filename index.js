const express = require("express")
const cors = require("cors")
const contactUs = require("./router/contactUsHandle.js")
const sendMail = require("./router/sendMail.js")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/contactus", contactUs)
app.use("/send-mail", sendMail)
// Checking update

const errorHandler = (err, req, res, next) => {
    if(res.headerSent){
        return next(err)
    }
    res.status(500).json({error: err})
}
app.use(errorHandler)

app.listen(3002, () => {
    console.log(`Listening ${3002}`);
})