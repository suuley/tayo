const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Article = require('../models/article');
const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');

const multer = require('multer');
var striptags = require('striptags');
var path = require('path');
const {globalVaribles} = require('../config/custonFunction');






router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());
router.use(globalVaribles);


var draft = "false" ;

module.exports = {
  

  getArticles: function(req, res){
        
   Article.find( function(err, articles){
     
    if(err){
      req.flash('error', 'waa in aad log-ingareysaa waa qalad saan')
      res.redirect('/');

    } else {
        console.log(articles.length);   
      res.Jason('listo', {
        articles: articles

      });
    }
  }).sort({ _id: -1 });
}

}







/* Form to add a post */





