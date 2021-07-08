const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Article = require('../models/article');
const Comment = require('../models/comment');
var randomstring = require("randomstring");
const User = require('../models/user');
const Post = require('../models/post');

const multer = require('multer');
var striptags = require('striptags');
var path = require('path');
const {globalVaribles} = require('../config/custonFunction');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
  }
});


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
      }
  }
});

router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());
router.use(globalVaribles);


var draft = "false" ;

module.exports = {
  

      getArticles: function(req, res){
        
   Article.find({status: "unregistered"}, function(err, articles){
     
    if(err){
      req.flash('error', 'waa in aad log-ingareysaa waa qalad saan')
      res.redirect('/');

    } else {
           
      res.render('Articles/articles/index', {
        articles: articles

      });
    }
  }).sort({ _id: -1 });
},
getPass: function(req, res){
        
  Article.find({status: "pass"}, function(err, articles){
    
   if(err){
   console.log(err);
   req.flash('error', 'waa in aad log-ingareysaa waa qalad saan')
   res.redirect('/');

   } else {
          
    res.render('Articles/gate/pass', {
       articles: articles

     });
   }
 }).sort({ _id: -1 });
},


postMovePost: function(req, res){
  Article.findByIdAndUpdate(req.params.id, {"status": "inspection"}, function(err, post){

    if(err){
        res.send(err)
    }
    else{
      req.flash('success_msg', 'waad ku guleysatay in aad maamulka u gudbiso')
      res.redirect('/Articles');
    }

})
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
    let article = new Article();
    article.magac = req.body.magac;
    article.dhashay = req.body.dhashay;
    article.hooyo = req.body.hooyo;
    article.city = req.body.city
    article.deggan = req.body.deggan;
    article.idNumber = randomstring.generate({
      length: 7,
      charset: 'alphanumeric',
      capitalization: 'uppercase'
    });
    article.image = req.file.filename;
    
     console.log(req.file)
    
    

    article.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success_msg','Waad ku guuleysatay Diwaangelisay Qofkii/Gaarigii ');
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