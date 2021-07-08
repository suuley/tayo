const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
let Post = require('../models/post');
// User Model
let User = require('../models/user');


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
    },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  } 
});
const upload = multer({storage: storage});

const adminController = require('../controllers/adminController');
const user = require('../models/user');

router.all('/*', ensureAuthenticated, (req, res, next) => {
     req.app.locals.layout = 'admin';
     console.log(req.user.isAdmin);
     if ((!req.user.isAdmin)) {
      req.flash('error', 'waad xadgudubtay waxaad iskudeydey in aad gasho bogga Mamulka')

       res.redirect('/dashboard')

       return;
     }
     next();
    })
   


router.get('/', adminController.getAdmin);
router.get('/posts/hold', adminController.getPostsHold);
router.get('/posts', adminController.getPosts);
router.get('/move/:id',  adminController.postMovePass);
router.get('/pass/:id',  adminController.postMoveHold);
router.get('/posts/pass', adminController.getPass)

router.get('/posts/edit/:id', adminController.getEditPost);

router.post('/posts/edit/:id',  upload.single('articleimage'), adminController.postEditPost);


router.get('/comments',  adminController.getComment);


    
    
// Access Control
 router.use(function(req, res, next){
  res.locals.user = req.user;
  next();
})

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error', 'waa shaqaale idman aad tahay ood logingareysaa');
    res.redirect('/');
  }
}





module.exports = router;
