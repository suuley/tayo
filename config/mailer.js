const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");    



// create reusable transporter object using the default SMTP transport

   let smtpTransport = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'egalyare2000@gmail.com', // generated ethereal user
      pass: 'waberi2000' // generated ethereal password
    }
  });

   
     // setup email data with unicode symbols
     let mailOptions = {
       from: '"shaqadone" <egalyare2000@gmail.com>', // sender address
       to: "suule2000@gmail.com",// list of receivers
       subject: "Hello ✔", // Subject line
       text: "Hello world?", // plain text body
       html: output // html body
     };
   
     // send mail with defined transport object
     smtpTransport.sendMail(mailOptions, (error, info) => {
        if(error) {
           return console.log(error);
        }
     
   
     console.log("Message sent: %s", info.messageId);
     // Preview only available when sending through an Ethereal account
     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
   
     res.render('contact', {msg: 'EMAILKII WAA DIRNAY'});
   });
});
module.exports = router;
