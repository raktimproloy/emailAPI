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

  router.post("/send", async (req, res) => {
    const gmailCheck = /([a-zA-Z0-9]+)([\.{1}])?([a-zA-Z0-9]+)\@gmail([\.])com/g;
    const { email, subject, body } = req.body;
    const successMail = [];
    const unsuccessMail = [];
    let processedCount = 0;

    try {
        if (!Array.isArray(email)) {
            res.status(400).send({
                error: "Email data must be an array!",
            });
        } else if (email.length === 0) {
            res.status(400).send({
                error: "There are no email!",
            });
        } else {
            email.forEach((mail) => {
                if (mail.match(gmailCheck)) {
                    var mailOptions = {
                        from: "raktimproloy@gmail.com",
                        to: mail,
                        subject: subject ? subject : "",
                        text: body ? body : "",
                    };
                    transporter.sendMail(mailOptions, function (error, info) {
                        processedCount++;

                        if (error) {
                            unsuccessMail.push(mail);
                        } else {
                            successMail.push(mail);
                        }

                        if (processedCount === email.length) {
                            // All emails have been processed
                            if (successMail.length === 0) {
                                // No successful emails
                                res.status(500).send({
                                    error: "All emails failed to send!",
                                });
                            } else {
                                // At least one successful email
                                res.status(200).send({
                                    message: "Email send successful",
                                    successMail,
                                    unsuccessMail,
                                });
                            }
                        }
                    });
                } else {
                    processedCount++;
                    unsuccessMail.push(mail);

                    if (processedCount === email.length) {
                        // All emails have been processed
                        if (successMail.length === 0) {
                            // No successful emails
                            res.status(500).send({
                                error: "All emails failed to send!",
                            });
                        } else {
                            // At least one successful email
                            res.status(200).send({
                                message: "Emal",
                                successMail,
                                unsuccessMail,
                            });
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Server side error!",
        });
    }
});


module.exports = router