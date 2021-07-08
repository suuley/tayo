const express = require('express');
const router = express.Router();
const multer = require('multer');
var striptags = require('striptags');
var path        = require('path');
const cadadoController = require('../controllers/cadadoController');

// Bring in Models
let Article = require('../models/article');




router.all('/*', ensureAuthenticated, (req, res, next) => {
  req.app.locals.layout = 'default';
  if ((!req.user.dekedda )) {
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







router.get('/', cadadoController.getCadado);
router.get('/Articles', cadadoController.getArticles)
router.get('/Articles/edit/:id', cadadoController.getEdit)
router.post('/Articles/edit/:id', cadadoController.postEdit)
router.post('/Articles', cadadoController.postAdd)







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
