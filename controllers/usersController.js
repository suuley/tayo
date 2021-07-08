const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var randomstring = require("randomstring");

// Bring in User Model
let User = require('../models/user');

router.all('/*', (req, res, next) => {
    
    req.app.locals.layout = 'default';
    
    next();
});

// User route logic

module.exports = {
    getRegister: function(req, res){
        res.render('users/register');
      },
    getResetpassword: function(req, res){
      res.render('users/resetpassword');
    },
    getVerify: function (req, res) {
        res.render('users/verify')
      },
    getVerifySecretTken: async (req, res, next) => {
  try {
    const secretToken = req.params.secretToken;
    console.log(secretToken);
    const user = await User.findOne({'secretToken': secretToken });
    if(!user) {
				req.flash('error', 'waa la waayey recorkaaga');
				res.redirect('/users/verify');
				return;
			}
       user.active = 'true';
			 user.secretToken = '';
			 user.save();
    

        req.flash('success', 'waad hakhiijisay Emaikaaga SOO DHAWOOW');
				res.redirect('/users/login');
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
},

   getLogin: function(req, res){
    res.render('users/login')
  },

   postLogin: function(req, res, next){
    passport.authenticate('local', {
      successRedirect:'/dashboard',
      failureRedirect:'/users/verify',
      failureFlash: true,
      successFlash: true,
    })(req, res, next);
  },
   getLogout: function(req, res){
  req.logout();
  req.flash('success', 'Waa Logoutgareysey');
  res.redirect('/users/login');
}
    
}
