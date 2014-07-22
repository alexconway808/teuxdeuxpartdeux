
var mongoose = require ('mongoose');
var jade = require ('jade');
var express = require ('express');
var bodyparser = require ('body-parser');
var methodoverride = require ('method-override')

mongoose.connect = 


// CRUD task items

// INDEX

// GET /

// GET 
// GET /tasks

// SHOW

// GET /tasks/:id

// NEW

// GET /tasks/new

// CREATE
// Post /tasks

// EDIT
// GET /tasks/

// UPDATE
// DELETE


//Create the Task schema
var Schema = mongoose.Schema;

//Define the Task schema
var taskSchema = new Schema({
  task_data: String
});

//Define the Task model
var Task = mongoose.model('Task', taskSchema);


var server = restify.createServer({
  name: 'app',
  version: '0.0.0'

});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());


server.get("/", function (req, res) {

   //Display the Tasks in the browser at localhost: 1337
  // Task.find(function (err, Tasks){
  //   for (i in Tasks){
  //     body += Tasks[i].task_data + '<br>';
  //   }
  //   res.writeHead(200, {
  //     'Content-Length': Buffer.byteLength(body),
  //     'Content-Type' : 'text/html'
  //   });

  //   res.write(body);
  //   res.send();
  // });
  var options = {};
  var html = jade.renderFile('./templates/index.jade', options);

  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(html),
    'Content-Type': 'text/html'
  });
  
  res.write(html);
  res.end();

});


server.post('/task', function (req, res){
  // console.log("Receive task post?")
  var task = new Task ({
    task_data: req.body.task_data
  });
  // console.log(task);
  task.save(function (err){
    // console.log(err);
    if (err) res.send(err);

    res.send("Your Tasks have been saved");
});

});


server.listen(1337, function () {
  console.log('%s listening at %s', server.name, server.url);
});