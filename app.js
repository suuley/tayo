const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {globalVariables} = require('./config/custonFunction');

var cron = require('node-cron');




mongoose.connect(config.database);
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

// Init App
const app = express();

// Bring in Models
let Article = require('./models/article');

const hbs = exphbs.create({
  defaultLayout: 'default'

})


/* Setup View Engine To Use Handlebars */
app.engine('handlebars', hbs.engine);
app.set('view engine' , 'handlebars');

// custom helpers
app.use(cors())
app.use(express.json())


// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Express Messages Middleware
app.use(require('connect-flash')());


app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

// Home Route
app.get('/', function(req, res){
  res.render('index', { layout: 'landing' });
});

cron.schedule('0-0 0-59 0-23 * * 0-6', function(req, res) {


Article.find({}, function(err, articles) {

    // optional but i would recommend to use it so that you can see possible errors with your query
    if (err) throw err;
  
    // iterate over all users of all the users
    articles.forEach(function(article) {
      article.canshuur = article.canshuur + 7
      console.log("Systemku daqiqadiiba 7 Dollar oo canshuur ah " + " " + article.canshuur);
    


      
      article.save(function(err){
        if(err){
          console.log(err);
          return;
        } 
      });
      })
  });

}) 


app.get('/flash', function(req, res){
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('success', 'Flash is back!')
  res.redirect('/');
});

app.get('/listo', function (req, res){
  Article.find({}, function(err, articles){
      if(err){
        console.log(err);
      } else{
         res.json(articles);
      }
  })
});

app.get('/listo/:idNumber', function(req, res) {
  Article.findOne({idNumber: req.params.idNumber})
    .then(article => {
      if(!article) {
        res.status(404).json({message: 'User/Babur ID does not EXIST'})
      } else {
        res.json(article);
      }
   })
});



let articles = require('./routes/articles');
let dashboard = require('./routes/dashboard');
let cadado = require('./routes/cadado');
let gaalkacyo = require('./routes/gaalkacyo');
let adminController = require('./routes/adminRoutes');
let users = require('./routes/users');
let register = require('./routes/register');
let resetpassword = require('./routes/resetpassword');

app.use('/Articles', articles);
app.use('/dashboard', dashboard);
app.use('/cadado', cadado);
app.use('/gaalkacyo', gaalkacyo);
app.use('/admin', adminController);
app.use('/users', users);
app.use('/register', register);
app.use('/resetpassword', resetpassword);








// Route Files
/* Routes */









// Start Server
app.listen(3000, function(){
  console.log('Server started on port 3000...');
});
