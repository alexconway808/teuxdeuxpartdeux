
var mongoose = require ('mongoose');
var jade = require ('jade');
var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var methodOverride = require ('method-override');
var session = require ('express-session');

var tasks = require('./routes/tasks');


//This is from the express api documentation
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/Templates');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(session({ secret : 'sauce' }));

app.use('/', tasks);

//Create fake username and password for testing
var fakeusername = "Alex";
var fakepassword = "Alex";



//Authentication

//Render the login.jade page
app.get('/login', function (req, res) {
  res.render('Users/Login.jade');
});


//Add the username and password fields
app.post('/login', function (req, res) {
  var errors = '';
  if (req.param ('username') === undefined || req.param ('username') === ''){
    errors += 'Missing Username';
  }
  if (req.param ('password') === undefined || req.param ('password') === ''){
    errors += 'Missing Password';
  }

  //Authenticate
  if(req.param ('username') === "Alex" && req.param ('password') === "Alex"){
    //User is authenticated and directed to Tasks
    var user = {
      id: 1,
      username : fakeusername,
      password : fakepassword
    };

    req.session.user = user;  //store in the session
    res.redirect('/tasks');
    return;
  }else {
    errors += 'Incorrect Username or Password'
  }

  //Create locals, objects of key value pairs available in template
    res.render('Users/Login.jade', { errors : errors } );

});

app.get('/logout', function (req, res){
  req.session.user = undefined;
  res.redirect('/login');
});

//Store sessions with the server so you don't have to keep logging in
//Sessions can hold any amount of data, such as last visit
//We want to store User by setting it to something to retrieve user id
//When you log out you kill the session
//If the user is not looged in they can not get to tasks


// CRUD task items

// INDEX





app.listen(1337, function () {
  console.log('%s listening at %s', app.name, app.url);
});


