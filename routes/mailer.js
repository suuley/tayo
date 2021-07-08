const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");    



// create reusable transporter object using the default SMTP transport

	var nodemailer = require('nodemailer');

				var transporter = nodemailer.createTransport({
					service: 'gmail',
					auth: {
						user: 'egalyare2000@gmail.com',
						pass: 'waberi2000'
					}
				});


				transporter.sendMail(mailOptions, function(error, info){
					if (error) {
						console.log(error);
					} else {
						console.log('Email sent: ' + info.response);
					}
				});
				 
