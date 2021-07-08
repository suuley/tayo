const express = require('express');
const router = express.Router();
const multer = require('multer');
var striptags = require('striptags');
var path        = require('path');
const airoportController = require('../controllers/airoportController');

// Bring in Models
let Article = require('../models/article');




router.all('/*', ensureAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'airport';
  console.log(req.user.airporka);
  if ((!req.user.airporka)) {
   req.flash('error', 'waad xadgudubtay waxaad iskudeydey in aad gasho bog aadan fasax u heysan')

    res.redirect('/dashboard')

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







router.get('/', airoportController.getAiroport);





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