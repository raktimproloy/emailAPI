const express = require("express")
const router = express.Router()
const nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'raktimproloy@gmail.com',
      pass: 'dowayjyiorhrggzl'
    }
  });

router.post("/send/:email", async(req, res) => {
    try {
        const gmailCheck = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g
        const peramsSlice = req.params.email.split("&")
        if(peramsSlice.length === 2){
            const peramsTo = peramsSlice[0].split(":")
            const peramsSub = peramsSlice[1].split(":")
            if(peramsTo[0] === "to" && peramsSub[0] === "sub"){
                if(peramsTo[0] !== "" && peramsTo[1].match(gmailCheck)){
                    console.log("Body", req.body)
                    const data = req.body
                    const objectKey = Object.keys(data)
                    let text = ""
                    const subjectText =  peramsSub[1].replace("_", " ")
            
                    for (let index = 0; index < objectKey.length; index++) {
                        text = text + `${objectKey[index]}: ${data[objectKey[index]]} \n`
                    }
            
                    var mailOptions = {
                        from: 'raktimproloy@gmail.com',
                        to: peramsTo[1],
                        subject: subjectText,
                        text:  text
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        res.status(500).json({
                            error: "Server side error"
                        })
                    } else {
                        res.status(200).json({
                            message: "Email sent successful"
                        })
                    }
                    });
                }else{
                    res.status(500).json({
                        error: "Server side error"
                    })
                }
            }else{
                res.status(500).json({
                    error: "Server side error"
                })
            }
        }else{
            res.status(500).json({
                error: "Server side error"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({
            error: "Server side error"
        })
    }
})

module.exports = router