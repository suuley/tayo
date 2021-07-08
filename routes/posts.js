const express = require('express');
const router = express.Router();
const multer = require('multer');
var striptags = require('striptags');
var path        = require('path');
const ArticlesController = require('../controllers/ArticlesController');

// Bring in Models
let Article = require('../models/article');




router.all('/*', ensureAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'default';
  if ((!req.user)) {
   req.flash('error', 'waad xadgudubtay waxaad iskudeydey in aad gasho bog aadan fasax u heysan')

    res.redirect('/')

    return;
  }
  next();
 })


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
    },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  } 
});
const upload = multer({storage: storage});




// Add Route
router.get('/add', ensureAuthenticated, ArticlesController.getAdd);

// Add Submit POST Route
router.post('/add', upload.single('image'), ArticlesController.postAdd);


// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user.name){
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    }
    res.render('Articles/edit_article', {
      title:'Edit Article',
      article:article
    });
  });
});
    
// Update Submit POST Route
router.post('/edit/:id', upload.single('articleimage'), function(req, res, next){
  let article = {};
  article.title = req.body.title;
  article.author = req.user.name;
  article.body = req.body.body;
  if (req.file){
  article.articleimage = req.file.originalname;
  } else {
  article.articleimage = 'noimage.jpg';
  }
  

  let query = {_id:req.params.id}

  Article.update(query, article, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Article Updated');
      res.redirect('/');
    }
  });
});

// Delete Article
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user.name){
      res.status(500).send();
    } else {
      Article.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});


router.get('/pass', ensureAuthenticated, ArticlesController.getPass)
router.get('/', diwan, ensureAuthenticated, ArticlesController.getArticles);
router.get('/:id',  ArticlesController.postMovePost);


router.get('/article/:id', ArticlesController.getSingleArticle);

router.post('/article/:id', ArticlesController.submitComment);



// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error', 'waa shaqaale idman aad tahay ood logingareysaa');
    res.redirect('/');
  }
}

// Access Control
function diwan(req, res, next){
  if(req.user.isDiwan){
    return next();
  } else {
    req.flash('error', 'waa shaqaale idman aad tahay ood logingareysaa');
    res.redirect('/');
  }
}


module.exports = router;
