const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const registerController = require('../controllers/registerController')


router.all('/*', (req, res, next) => {

  req.app.locals.layout = 'default';

  next();
})

// Bring in User Model
let User = require('../models/user');


// Register Proccess
router.post('/', registerController.postRegister);

module.exports = router;
