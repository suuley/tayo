const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Article = require('../models/article');
const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');

module.exports = {
    

  getGaalkacyo: function(req, res){
    res.render('gaalkacyo');
  }, 

  getArticles: function(req, res){
        
    Article.find({city: "gaalkacyo"}, function(err, articles){
      
     if(err){
       req.flash('error', 'waa in aad log-ingareysaa waa qalad saan')
       res.redirect('/');
 
     } else {
         console.log(articles.length);   
       res.render('gaalkacyo/Articles', {
         articles: articles
 
       });
     }
   }).sort({ _id: -1 });
 },
  postAdd: function(req, res, next){
  
    console.log(req.file)
    let draft = "draft";
    // Get Errors
    let errors = req.validationErrors();
  
    if(errors){
      res.render('cadado/Articles', {
        title:'Add Article',
        errors:errors
      });
    } else {
      let article = new Article();
      article.idNumber = req.body.idNumber;
      article.magac = req.body.magac;
      article.dhashay = req.body.dhashay;
      article.hooyo = req.body.hooyo;
      article.deggan = req.body.deggan;
      article.city = req.body.city;
      article.articleimage = req.file.filename;
      
       console.log(req.file)
      
      
  
      article.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          req.flash('success_msg','Maqaalku aad qoetay waxa loo gudbiyey mamulka si loo ansixiyo');
         res.redirect('/cadado/Articles');
        }
      });
    }
  },

 }
