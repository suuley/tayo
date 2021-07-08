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

// Register Proccess
router.post('/register', function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'Qor Magacaga').notEmpty();
  req.checkBody('email', 'Email haga qor').notEmpty();
  req.checkBody('email', 'Email aad qortay sax maha').isEmail();
  req.checkBody('username', 'Username in la qoro waa qasab').notEmpty();
  req.checkBody('password', 'Password waa qasab').notEmpty();
  req.checkBody('password2', 'labada Passwords aad qortay isma laha').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        req.flash('danger', 'emailku waa jiraa fadlan Login');
        res.redirect('/users/login');
        return;
      }
  
  else {
    const secretToken = randomstring.generate();
    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password,
      secretToken:secretToken,
      active:false
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','Waad diwaanGashay fadlan Emailkaga kala soo bax TokenSireed');
            res.redirect('/users/verify');
          }
        });
      });
    });
  }
  })
  }
});

// verify Proccess
router.get('/verify', function (req, res) {
  res.render('verify')
})
router.post('/verify/', async (req, res, next) => {
  try {
    const secretToken = req.body.secretToken;
    const user = await User.findOne({'secretToken': secretToken});
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
  res.render('login');
});

// Login Process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/users/verify',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'Waa Logoutgareysey');
  res.redirect('/users/login');
});

module.exports = router;
