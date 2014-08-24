var express = require('express');
var router = express.Router();
var mongoose = require ('../mongoose');

//Create the Task schema
var Schema = mongoose.Schema;

//Define the Task schema
var taskSchema = new Schema({
  title: String,
  notes: String,
  created: Date
});

//Define the Task model
var Task = mongoose.model('Task', taskSchema);

router.use('/tasks', function(req, res, next){
  if(req.session.user !== undefined) {
    next();
  }else{ //not logged in
    res.redirect('/login');
  }
});

// GET /tasks - LIST works with Jade templates
router.get('/tasks', function (req, res) {
    
    //Created a date field and sort by most recent creation 
    Task.find()
      .sort('-created')
      .exec(function (err, tasks){  

      res.render('Tasks/List.jade',{tasks: tasks});
    });
});


//GET /tasks/new - NEW form
router.get('/tasks/new', function (req, res){
  res.render('Tasks/New.jade');
  //console.log("Hello World");
});


//POST /tasks - CREATE a redirect
router.post("/tasks", function (req, res) {
  var newTask = new Task({
    title: req.param ('title'),   // This is in the express api req param name
    notes: req.param ('notes'),
    created: Date.now () 
  });

  newTask.save(function (wert, task) {
    if(wert){res.send(500, wert);}

    res.json(newTask);
  
  });

});


// GET /tasks/:id - SHOW with Jade template
router.get("/tasks/:id", function (req, res){
  var id = req.params.id;
  // console.log(id);
  Task.findOne({_id: id}, function (err, task) {
    var options = {};
    options.currentTask = task;
    res.render("Tasks/Show.jade", options);
  });
});


// GET /tasks/:id/edit - EDIT with a form
router.get("/tasks/:id/edit", function (req, res){
  Task.findOne(req.params.id, function (err, task){
    var options = {};
    options.currentTask = task;
    res.render("Tasks/Edit.jade", options);
  });
});


// PUT /tasks/:id - UPDATE with a redirect, when there is a post it saves a PUT on UPDATE
router.put ("/tasks/:id", function (req, res) {
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
router.delete ("/tasks/:id", function (req, res) {
  Task.findByIdAndRemove(req.params.id, function (err, task) {

    // if err res.send(500)
    if(err){
      res.send(500, err);
    }

    // if ok, res.send(200)
    res.send(200);

    // res.redirect("/tasks");
  });
});

module.exports = router;