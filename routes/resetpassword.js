const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const resetpasswordController = require('../controllers/resetpasswordController')


// Bring in User Model
let User = require('../models/user');


// Reset Proccess
router.post('/', resetpasswordController.postResetpassword);

module.exports = router;
