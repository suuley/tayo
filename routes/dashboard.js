const express = require('express');
const router = express.Router();
const multer = require('multer');
var striptags = require('striptags');
var path        = require('path');
const dashboardController = require('../controllers/dashboardController');

// Bring in Models
let Article = require('../models/article');




router.all('/*', ensureAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'dashboard';
  if ((!req.user)) {
   req.flash('error', 'waad xadgudubtay waxaad iskudeydey in aad gasho bog aadan fasax u heysan')

    res.redirect('/')

   return;
  }
  next();
 })









router.get('/', dashboardController.getDashboard);





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
