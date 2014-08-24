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
  var title = $('<a>', {
    href: "/tasks/" + newTask._id,
    text: newTask.title
  });
  var notes = $('<a>', {
    href: "/tasks/" + newTask._id,
    text: newTask.notes
  });
  var breakOne = $('<br>');
  var breakTwo = $('<br>');
  
  //Append to container
  container.append(taskForm);
  container.append(title);
  container.append(breakOne);
  container.append(notes);
  container.append(breakTwo);
  container.append(deleteButton);


  //Inject container into DOM
  $('#taskcontainer').prepend(container);
  // $('#taskcontainer').prepend(notes); 
  // $('#taskcontainer').prepend(title);
}

