var todos = [];
//this base url should point to where the BFF Server is running
var baseurl = 'http://localhost:8080';

//when a mouse enters the list items, show the x delete button
$(document).ready(function() {
  // $(document)
  //   .on('mouseenter', '.items', function() {
  //     $(this).find(':button').show();
  //   })
  //   .on('mouseleave', '.items', function() {
  //     $(this).find(':button').hide();
  //   });

  // check for keydown inside the input text field.
  $('#inputText').keydown(function(e) {
    var item = $('#inputText').val();
    //if the keydown was enter and there is an item in the field
    if (e.which == 13 && item.length > 0) {
      //set the input text back to blank and make POST request
      $('#inputText').val('');
      $.ajax({
        method: 'POST',
        url: baseurl + '/todoitems',
        contentType: 'application/json',
        data: JSON.stringify({ todo: item }),
      }).done(function(data) {
        //reload the items
        loadItems();
      });
    }
  });
});
//load the list items from the bff api
function loadItems() {
  $.get(baseurl + '/todoitems').done(function(data) {
    if (data.length > 0) {
      todos = [];
      for (var i = 0; i < data.length; i++) {
        todos.push(data[i]);
      }
      refreshList();
    }
  });
}
//on page load, call load items
loadItems();

const oldTodoItem = () => {
  return (
    '<li class="items"><input class="toggle" type="checkbox">' +
    todos[i].todo +
    '<button class="button" onclick="deleteItem(' +
    i +
    ')">X</button></li>'
  );
};
//refresh the list by first emptying it, then appending items from todo array
function refreshList() {
  $('#todoList').empty();
  for (var i = 0; i < todos.length; i++) {
    $('#todoList').append(
      `<li class="item">
        <input id="bx--checkbox-${i}" class="bx--checkbox" type="checkbox" value="green" name="checkbox">
        <label for="bx--checkbox-${i}" class="bx--checkbox-label">
          <span class="bx--checkbox-appearance">
            <svg class="bx--checkbox-checkmark" idth="12" height="9" viewBox="0 0 12 9" fill-rule="evenodd">
              <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z"></path>
            </svg>
          </span>
        </label>
        ${todos[i].todo}
        <button class="button bx--btn bx--btn--primary" onclick="deleteItem(${i})">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z"></path>
        </svg>
        </button>
      </li>`
    );
  }
}

//delete items from the todos array and from db via DELETE request
function deleteItem(index) {
  console.log('hi');
  var id = todos[index]._id;
  $.ajax({
    method: 'DELETE',
    url: baseurl + '/todoitem/' + id,
    contentType: 'application/json',
  });
  todos.splice(index, 1);
  refreshList();
}
