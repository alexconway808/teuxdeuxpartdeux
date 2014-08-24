$(document).ready(function(){

  $('#form').submit(function(event){
    event.preventDefault();
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

  //Delete button
  $('ul.taskcontainer').on('click', '.delete', function(event){
    $(this).parent().submit();
  });

  $('ul.taskcontainer').on('submit', '.deleteForm', function(event){
    alert("Hey");
    event.preventDefault();
    var URL = $(this).attr("action");
    var currentTask = $(this);
    $.ajax(URL, {
      method: "POST",
      success: function (){
        currentTask.closest('li').remove();
      },
      //if it gets a 200, remove element from DOM
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
  var title = $('<a>', {
    href: "/tasks/" + newTask._id,
    text: newTask.title
  });
  var notes = $('<a>', {
    href: "/tasks/" + newTask._id,
    text: newTask.notes
  });
  var deleteButton = $('<button>').html("Delete");
  var deleteFormSchema = {
    class: "delete",
    action: '/tasks/' + newTask._id + '?_method=DELETE',
    method: "POST",
    enctype: "application/x-www-form-urlencoded"
  };
  var deleteForm = $('<form>', deleteFormSchema);
  var breakOne = $('<br>');
  var breakTwo = $('<br>');
  
  //Append to container
  container.append(taskForm);
  container.append(title);
  container.append(breakOne);
  container.append(notes);
  container.append(breakTwo);
  deleteForm.append(deleteButton);
  container.append(deleteForm);

  //Inject container into DOM
  $('.taskcontainer').prepend(container);
}
