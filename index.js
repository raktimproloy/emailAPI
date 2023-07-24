const express = require("express")
const cors = require("cors")
const contactUs = require("./routerHandler/contactUsHandle.js")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/contactus", contactUs)
// Checking update

const errorHandler = (err, req, res, next) => {
    if(res.headerSent){
        return next(err)
    }
    res.status(500).json({error: err})
}
app.use(errorHandler)

app.listen(3002, () => {
    console.log(`Listening 3000`);
})