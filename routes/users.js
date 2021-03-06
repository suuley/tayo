const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var randomstring = require("randomstring");
var path        = require('path');
const usersController = require('../controllers/usersController')


// Bring in User Model
let User = require('../models/user');

router.all('/*', (req, res, next) => {

  req.app.locals.layout = 'default';

  next();
})

// Register Form
router.get('/register', usersController.getRegister );

// Resetpassword Form
router.get('/resetpassword', usersController.getResetpassword );

// verify Proccess
router.get('/verify', usersController.getVerify);

router.get('/verify/:secretToken', usersController.getVerifySecretTken);

router.get('/login', usersController.getLogin);

router.post('/login', usersController.postLogin);

router.get('/logout', usersController.getLogout);



module.exports = router; 
