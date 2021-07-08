const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var randomstring = require("randomstring");


// Bring in User Model
let User = require('../models/user');

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});



// verify Proccess
router.get('/verify', function (req, res) {
  res.render('verify')
})
router.get('/verify/:secretToken', async (req, res, next) => {
  try {
    const secretToken = req.params.secretToken;
    console.log(secretToken);
    const user = await User.findOne({'secretToken': secretToken });
    if(!user) {
				req.flash('error', 'waa la waayey recorkaaga');
				res.redirect('/users/verify');
				return;
			}
       user.active = true;
			 user.secretToken = '';
			 await user.save();
    

        req.flash('success', 'waad hakhiijisay Emaikaaga SOO DHAWOOW');
				res.redirect('/users/login');
  } catch (e) {
    //this will eventually be handled by your error handling middleware
    next(e) 
  }
});
// Login Form
router.get('/login', function(req, res){
  res.render('login')
})

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/verify',
    failureFlash: true
  })(req, res, next);
})

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Waa Logoutgareysey');
  res.redirect('/users/login');
})

module.exports = router; 
