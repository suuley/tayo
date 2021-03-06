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

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
    },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  } 
});
const upload = multer({storage: storage})
router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());
router.use(globalVaribles);


var draft = "false" ;

module.exports = {
  
      getArticles: function(req, res){
  Article.find({}, function(err, articles){
     
    if(err){
    
      console.log(err);
    } else {
      res.render('Articles/index', {
        title:'Qoraalo',
        articles: articles
      });
    }
  }).sort({ _id: -1 });
},

getSingleArticle: function(req, res) {
  Article.findById(req.params.id)
    .populate('comments')
    .exec()
    .then(article => {
      if(!article) {
        res.status(404).json({message: 'article not found'})
      } else {
        res.render('Articles/article',{article:article});
      }
    }) 
      
  
},




/* Form to add a post */
getAdd: function(req, res, next){
  res.render('Articles/add_article', {
    title:'Add Article'
  });
},

postAdd: function(req, res, next){
  req.checkBody('title','Title is required').notEmpty();
  //req.checkBody('author','Author is required').notEmpty();
  req.checkBody('body','Body is required').notEmpty();
  console.log(req.file)
  let draft = "draft";
  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_article', {
      title:'Add Article',
      errors:errors
    });
  } else {
    let post = new Post();
    post.title = req.body.title;
    post.author = req.user.name;
    post.body = req.body.body;
    post.articleimage = req.file.filename;
    
     console.log(req.file)
     console.log(req.body)
    
    

    post.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success_msg','Maqaalku aad qoetay waxa loo gudbiyey mamulka si loo ansixiyo');
       res.redirect('/Articles');
      }
    });
  }
},


submitComment: (req, res) => {
  let comment = new Comment({
        author:req.user.name,
        body:req.body.body,
        article:req.body.id 
      });
      comment.save(function(err){
        if(err){
          console.log(err);
          return;
        } else {
    
        }
      });
      Article.findOneAndUpdate({_id: req.params.id}, 
        {
          "$push": {
            comments: comment
          }
        }, {
         new: true //to return updated document
        })
        .exec(function(error, article) {
          if (error) {
            return res.status(400).send({message: 'Failed to add comment due to invalid params!'});
          }
          req.flash('success_msg', 'qoraalFikirkagii waad ku guleysatay gudbintiisii')
          res.redirect('/Articles/article/'+ article._id);
          return res.status(200);
          
        });
      
       
    
     
           
    }
     
}

  


  
  

