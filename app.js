
var mongoose = require ('mongoose');
var jade = require ('jade');
var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var methodOverride = require ('method-override');
var session = require ('express-session');

mongoose.connect('mongodb://user1:1234@ds037607.mongolab.com:37607/teuxdeuxpartdeux');

//This is from the express api documentation
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/Templates');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(session({ secret : 'sauce' }));

//Create fake username and password for testing
var fakeusername = "Alex";
var fakepassword = "Alex";

//Create the Task schema
var Schema = mongoose.Schema;

//Define the Task schema
var taskSchema = new Schema({
  title: String,
  notes: String
});

//Define the Task model
var Task = mongoose.model('Task', taskSchema);



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
    username : fakepassword
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

//Store sessions with the server so you don't have to keep logging in
//Sessions can hold any amount of data, such as last visit
//We want to store User by setting it to something to retrieve user id
//When you log out you kill the session
//If the user is not looged in they can not get to tasks


// CRUD task items

// INDEX

// GET /tasks - LIST works with Jade templates
app.get('/tasks', function (req, res) {
  
  if(req.session.user !== undefined) {
    Task.find(function (err, tasks){
      //console.log(tasks);
      res.render('Tasks/List.jade',{tasks: tasks});
    });
  }else{ //not logged in
    res.redirect('/login');
}
});


//GET /tasks/new - NEW form
app.get('/tasks/new', function (req, res){
  res.render('Tasks/New.jade');
  console.log("Hello World");
});


//POST /tasks - CREATE a redirect
app.post("/tasks", function (req, res) {
  var newTask = new Task({
    title: req.param ('title'),   // This is in the express api req param name
    notes: req.param ('notes') 
  })

  newTask.save(function (wert, task) {
    if(wert){res.send(500, wert);}

    res.redirect("/tasks");
  
  });

});


// GET /tasks/:id - SHOW with Jade template
app.get("/tasks/:id", function (req, res){
  var id = req.params.id;
  // console.log(id);
  Task.findOne({_id: id}, function (err, task) {
    var options = {};
    options.currentTask = task;
    res.render("Tasks/Show.jade", options);
  });
});


// GET /tasks/:id/edit - EDIT with a form
app.get("/tasks/:id/edit", function (req, res){
  Task.findOne(req.params.id, function (err, task){
    var options = {};
    options.currentTask = task;
    res.render("Tasks/Edit.jade", options);
  });
});


// PUT /tasks/:id - UPDATE with a redirect, when there is a post it saves a PUT on UPDATE
app.put ("/tasks/:id", function (req, res) {
  var id = req.params.id;  
  Task.findOneAndUpdate(
    {_id: id}, 
    {
      title: req.param('taskTitle'),
      notes: req.param('taskNotes')
    },
    function (err, task) {
      res.redirect('/tasks');
    }  
  )
});  


// DEL /tasks/:id - DESTROY with a redirect
app.delete ("/tasks/:id", function (req, res) {
  Task.findByIdAndRemove(req.params.id, function (err, task) {
    res.redirect("/tasks")
  });
});



app.listen(1337, function () {
  console.log('%s listening at %s', app.name, app.url);
});


