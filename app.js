
var mongoose = require ('mongoose');
var jade = require ('jade');
var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var methodoverride = require ('method-override');

mongoose.connect('mongodb://user1:1234@ds037607.mongolab.com:37607/teuxdeuxpartdeux');

//This is from the express api documentation
app.use(express.static(__dirname + '/public'));

//Create the Task schema
var Schema = mongoose.Schema;

//Define the Task schema
var taskSchema = new Schema({
  title: String,
  notes: String
});

//Define the Task model
var Task = mongoose.model('Task', taskSchema);

app.set('views', __dirname + '/Templates');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// CRUD task items

// INDEX

// GET /tasks - LIST works with Jade templates
app.get('/tasks', function (req, res) {
  Task.find(function (err, tasks){
    //console.log(tasks);
    res.render('Tasks/List.jade',{tasks: tasks});
  });
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
  TaskItem.findOne(
    {_id: id}, 
    {
      title: req.param('title'),
      title: req.param('notes')
    },
    function (err, task) {
      res.redirect('/tasks');
    }  
  )
});  


// DEL /tasks/:id - DESTROY with a redirect
app.delete ("/tasks/:id", function (req, res) {
  Task.findOne(req.params.id, function (err, task) {
    res.redirect("/tasks")
  });
});



app.listen(1337, function () {
  console.log('%s listening at %s', app.name, app.url);
});









//Need this?
// var server = restify.createServer({
//   name: 'app',
//   version: '0.0.0'

// });

// server.use(restify.acceptParser(server.acceptable));
// server.use(restify.queryParser());
// server.use(restify.bodyParser());

