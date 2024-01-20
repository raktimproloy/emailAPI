# emailAPI
# send-api

<!-- For single mail with from -->
http://localhost:3000/contactus/send/to:address@gmail.com&sub:emailSubject

body
{
    "body": "Icha"
}


<!-- For multiple send mail  -->
http://localhost:3002/send-mail/send

body=>
{
    "email": ["avilashlasker01@gmail.com", "mdmishkathosen@gmail.com", "glakjldsa", "raktimproloy01@gmail.com"],
    "subject": "Tester",
    "body": "Ja icha tai"
}