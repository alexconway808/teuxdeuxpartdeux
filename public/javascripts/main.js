$(document).ready(function(){

  $('#form').submit(function(event){
    event.preventDefault();
    //console.log($('form').serialize());
    $.ajax('/tasks', {
      method: "POST",
      data: $('#form').serialize(),
      success: function(newTask){
        addNewTask(newTask);
      },
      failure: function(error){
        console.log(error);
      }
    });
  });

});

function addNewTask(newTask){
  //Declare variables for building tasks
  var container = $('<li>');
  var taskForm = $('<form>');
  var deleteButton = $('<input type="submit>", value="Delete">');
  var title = $('<span>').html(newTask.title);
  var notes = $('<span>').html(newTask.notes);
  var breakOne = $('<br>');
  var breakTwo = $('<br>');
  
  //Append 
  container.append(taskForm);
  container.append(title);
  container.append(breakOne);
  container.append(notes);
  container.append(breakTwo);
  container.append(deleteButton);

  //Inject into DOM
  $('#taskcontainer').prepend(container);
  // $('#taskcontainer').prepend(notes); 
  // $('#taskcontainer').prepend(title);
}

