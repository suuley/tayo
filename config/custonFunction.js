const User = require('../models/user');
const passport = require('passport');



module.exports = {          

    globalVaribles: (req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        next();
      },
  
    ensureAuthenticated: (req, res, next) => {
      if(req.user){
        return next();
      } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }

  
  },

  diwan: (req, res, next) => {
    if(req.user.isDiwan){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/users/login');
  }


}
  
}