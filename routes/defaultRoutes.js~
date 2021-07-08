const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');





router.all('/*', (req, res, next) => {

    req.app.locals.layout = 'default';

    next();
})


router.get('/Articles', defaultController.getArticles);

router.get('/Articles/add', defaultController.addArticle)
    
    


module.exports = router;
