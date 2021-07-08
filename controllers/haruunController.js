const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Article = require('../models/article');
const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');


 module.exports = {
    

  getHaruun: function(req, res){
    res.render('haruun');
  }, 


 }


      

