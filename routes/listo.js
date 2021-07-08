const express = require('express');
const router = express.Router();
const multer = require('multer');
var striptags = require('striptags');
var path        = require('path');
const listoController = require('../controllers/listoController');

// Bring in Models
let Article = require('../models/article');









// Update Submit POST Route


// Delete Article

router.get('/', listoController.getArticles);





// Access Control


// Access Control



module.exports = router;
