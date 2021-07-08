const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Article = require('../models/article');
const Comment = require('../models/comment');
const User = require('../models/user');
const Post = require('../models/post');
var randomstring = require("randomstring");



 module.exports = {
  
  getCadado: function(req, res){
    res.render('cadado');
  }, 
  getArticles: function(req, res){
        
    Article.find({city: "cadado"}, function(err, articles){
      
     if(err){
       req.flash('error', 'waa in aad log-ingareysaa waa qalad saan')
       res.redirect('/');
 
     } else {
         console.log(articles.length);   
       res.render('cadado/Articles', {
         articles: articles
 
       });
     }
   }).sort({ _id: -1 });
 },


  postAdd: function(req, res, next){

    randomstring.generate();
    console.log(randomstring);

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
      article.magac = req.body.magac;
      article.dhashay = req.body.dhashay;
      article.hooyo = req.body.hooyo;
      article.deggan = req.body.deggan;
      article.city = req.body.city;
      article.idNumber = idNumber;
      article.articleimage = req.file.filename;
      
      console.log(randomstring);

       console.log(req.file)
      
      
  
      article.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
          req.flash('success_msg','Maqaalku aad qoetay waxa loo gudbiyey mamulka si loo ansixiyo');
         res.redirect('/cadado/Articles');
        }
      })
    }
  },
  getEdit: function (req, res) {
    
    Article.findById(req.params.id, function(err, article)
     { console.log(article);
      res.render('cadado/Articles/edit_article', {
        article: article
      });
    });
  
  
  },
    postEdit:  function (req, res) {
    
      Article.findById(req.params.id, function(err, article)
       { 
        if(!req.body.canshuu) {
          console.log('Fadlan geli canshuurta');
          return;
      } else {
      
        article.canshuur = article.canshuur + req.body.canshuu * -1

        console.log(article.canshuur)
        article.save()
        res.redirect('/cadado/Articles');
        }
          
      })
    }   
    
    
    
    }
  
      

  