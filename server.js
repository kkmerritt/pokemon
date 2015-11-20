// NOTE: ----------------------  Kevin Merritt
// NOTE: ----------------------  Pokemon Project
// NOTE: ----------------------  server.js

var express        = require('express'),
    server         = express(),
    ejs            = require('ejs'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    expressLayouts = require('express-ejs-layouts'),
    morgan         = require('morgan'),
    session        = require('express-session'),
    User           = require('./models/user.js'),
    logger         = require('./lib/logger.js'),
    eyes           = require('eyespect'),

PORT = process.env.PORT || 3000, server = express(),
MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017/pokemon",
  dbname = "pokemon", mongoose = require('mongoose');

// NOTE: ---------------------- Activate / Use Middleware
server.set('view engine', 'ejs'); // tells the render method, what to use
server.set('views', './views'); // tells the renderer where to find templates

server.use(session({
  secret: "1234",
  resave: true,
  saveUninitialized: true
}));

server.use(express.static(__dirname + '/public')); //location for static files (e.g. css, js, img)
server.use(bodyParser.urlencoded({extended: true})); // So we can parse incoming forms into Objects
server.use(methodOverride('_method'));
server.use(morgan('dev'));
server.use(expressLayouts);
server.use(logger);

// NOTE: ---------------------- Server & Database Connections
mongoose.connect(MONGOURI + "/" + dbname)
server.listen(PORT,function(){console.log("SERVER IS UP ON PORT:", PORT);})
mongoose.set('debug', true);

var db = mongoose.connection;
db.on('error', function(){console.log("DATABASE: CONNECTION ERROR: for fuck's sake. " + dbname)})
db.once('open', function(){console.log("DATABASE: CONNECTED: " + dbname)})


// NOTE: ---------------------- Server Routes
server.get('/', function(req, res){res.render('index');});
server.get('/404', function(req,res){res.render('404')})//error page.


//log off function, destroys local variables and the session. restricts commenting / post submission
server.get('/logoff', function(req,res){
  req.session.destroy();
  server.locals.username = null;
  res.render('logoff')
})

// display the submit user form
server.get('/users/newuser', function(req,res){
  if (req.session.currentUser){ res.render("welcome")}
  else {res.render('users/newuser');}
});

server.post('/users/newuser', function(req, res){
  if (req.body.user.username == ""){res.redirect(302, "/404");}
  if (req.body.user.password == ""){res.redirect(302, "/404");}
  var newUser = new User(req.body.user);
  newUser.save(function(err, thisUser){
    if(err){console.log("NEW USER ENTRY ERROR: for fuck's sake. "), res.redirect(302,"/users/newuser");}
    else {console.log("NEW DB USER Document Processed", thisUser), res.render("users/verify")};
  })
})
