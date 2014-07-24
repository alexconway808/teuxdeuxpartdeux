
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
  task_data: String
});

//Define the Task model
var Task = mongoose.model('Task', taskSchema);

app.set('views', __dirname + '/Templates');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Is express running?

//Is jade running?


// CRUD task items

// INDEX

// GET /tasks - LIST works with Jade templates
app.get('/tasks', function (req, res) {
  Task.find(function (err, tasks){
    console.log(tasks);
    res.render('Tasks/List.jade',{tasks: tasks});
  });
});


// //Post /tasks - CREATE a redirect
// app.post("/tasks", function (req, res) {
//   // console.log("Receive task post?")
//   var task = new TaskItem ({
//     title: req.param ('title'),   // This is in the express api req param name
//     notes: req.param ('notes') 

//   task.save(function (wert, task) {
//     if(wert){res.send(500, wert);}

//     res.redirect("/");
  
//   });

// });


// //GET /tasks/:id - SHOW with Jade template

// //GET /tasks/:id/edit - EDIT with a form

// //PUT /tasks/:id - UPDATE with a redirect, when there is a post it saves a PUT on UPDATE
// app.put ("/tasks/:id", function (req, res) {
//   var id = req.param(‘id’);  NOTE: This is just an example don’t just copy, find the ID in Mongolab and copy and paste it in

//   TaskItem.findOne({_id: id}, fucntion () {



// //DEL /tasks/:id - DESTROY with a redirect

// //GET /tasks/new - NEW form


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

