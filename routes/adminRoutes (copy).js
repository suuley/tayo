const express = require('express');
const router = express.Router();
const multer = require('multer');
const ensureAuthenticated = require('../config/custonFunction')

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








router.get('/',  adminController.getAdmin);

router.get('/posts', adminController.getPosts);

router.get('/posts/edit/:id', adminController.getEditPost);

router.post('/posts/edit/:id',  upload.single('articleimage'), adminController.postEditPost);

router.get('/posts/:id',  adminController.postMovePost);

router.get('/comments',  adminController.getComment);



    
    
// Access Control
 router.use(function(req, res, next){
  res.locals.user = req.user;
  next();
})


