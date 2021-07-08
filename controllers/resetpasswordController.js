const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var randomstring = require("randomstring");
const nodemailer = require("nodemailer");

// Bring in User Model
let User = require('../models/user');



module.exports = {
    postResetpassword: function(req, res){
        const email = req.body.email;
        const password = req.body.password;
        const password2 = req.body.password2;
        const secretToken = randomstring.generate();
        
        
        req.checkBody('email', 'Email haga qor').notEmpty();
        req.checkBody('email', 'Email aad qortay sax maha').isEmail();
        req.checkBody('password', 'Password waa qasab').notEmpty();
        req.checkBody('password2', 'labada Passwords aad qortay isma laha').equals(req.body.password);
        
        let errors = req.validationErrors();
      
        if(errors){
          res.render('resetpassword', {
            errors:errors
          });
        } else {
          User.findOne({ email: email }).then(user => {
            if (!user) {
              req.flash('danger', 'Rekordkaga ma heyno');
              res.redirect('/users/register');
              return;
            }
        
        else {
                
                user.password = password,
                  user.active = false,
                    user.secretToken = secretToken
                            
              
          bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(user.password, salt, function(err, hash){
              if(err){
                console.log(err);
              }
              user.password = hash;
              user.save(function(err){
                if(err){
                  console.log(err);
                  return;
                } else {
                       res.redirect('/users/verify');
                       req.flash('success','Waad diwaanGashay fadlan Emailka aan kuu soo dirna dubble clikgaree markaas ayaad diwaangaleesaa');
                }
              });
            });
    
          });
        consol.log(secretToken);
      }
    })
    };
    
          // create reusable transporter object using the default SMTP transport
    
       let smtpTransport = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: 'egalyare2000@gmail.com', // generated ethereal user
          pass: 'waberi2000' // generated ethereal password
        }
      });
         
        var mailOptions = { from: 'no-reply@yourwebapplication.com', to:email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Fadlan xakhiji Emailkaga oo laboclikgaree linkiga hoostan ku yaal: \nhttp:\/\/' + req.headers.host + '\/users/verify\/' + secretToken + '.\n' };
       
         // send mail with defined transport object
         smtpTransport.sendMail(mailOptions, (error, info) => {
            if(error) {
               return console.log(error);
            }
         
       
         console.log("Message sent: %s", info.messageId);
         // Preview only available when sending through an Ethereal account   
         res.render('/users/verify', {msg: 'EMAILKII WAA DIRNAY'});
       });
    
    },
}
