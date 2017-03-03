//require depenciess
var express = require('express');
var router = require('./app/routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session= require('express-session');
var passport = require('passport');
var flash    = require('connect-flash');
var DB_URI = "mongodb://localhost:27017/mini_project";
var Student= require('./app/models/Student');
var app = express();

app.set('view engine', 'ejs');

// configure app
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret: "sjdhffnrnf", resave:false, saveUninitialized: true}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//app.use(multer());

//configure passport

require('./passport')(passport);

mongoose.connect(DB_URI);
app.use(router);





// start the server
app.listen(3000, function(){
    console.log("server is listening on port 3000");
})