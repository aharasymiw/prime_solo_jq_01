// Constructor for Employee object
function Employee(firstName, lastName, empNum, title, reviewScore, salary) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.empNum = empNum;
  this.title = title;
  this.reviewScore = reviewScore;
  this.salary = salary;
}

// Global variable declarations, and default initializations
var employeeArray = []; // Each element represents one employee as an Employee object

// MAKE STURE TO DELETE THIS BLOCK!!!!! (It's For testing, yo)
 // Add the new Employee instances to the array of employees
employeeArray.push(new Employee('Andrew', 'Harasymiw', 42, 'Cool Guy', 5, 65000));
employeeArray.push(new Employee('Lauren', 'Jelenchick', 1, 'Love of Life', 5, 25000));
employeeArray.push(new Employee('Derek', 'Roche', 99, 'Cool Guy', 3, 55000));
employeeArray.push(new Employee('Gwen', 'Paul', 83, 'Cool Girl', 4, 60000));
employeeArray.push(new Employee('John', 'Crimmings', 3, 'Cool Guy', 4, 70000));

// Print the entire employeeArray of 'test' names to the screen
for (var i = 0; i < employeeArray.length; i++){
  drawEmployee(i); // Draw the most newly input employee
}

// A function to sort employeeArray[i], optionally takes a 'how to sort' pararameter 
function sortEmployees(toSort, how){
  var sorted = [];
  
  switch(how) {
    /* // Optional implimentation for sorting by different property values
    case how = 'firstName':
      //code block
      break;
    case how = 'lastName':
      //code block
      break;
    case how = 'empNum':
      //code block
      break;
    case how = 'title':
      //code block
      break;
    case how = 'reviewScore':
      //code block
      break;
    case how = 'salary':
      //code block
      break;
    */          
    default:
      for (var i = 0; i < toSort.length; i++){
        if ((typeof toSort[i]) != 'undefined') {
          sorted.push(toSort[i]);
          sorted[i]
        }
      }
  }
  return sorted;      
} 

// A function to draw a an Employee object for employeeArray[i]
function drawEmployee(i){
  var employee = employeeArray[i]; // 
  var $ul = $('<ul>'); // Create a <ul> element to hold the new employee
  var $button = $('<button>');

  // Create an <li> element for each property of the Employee and append it to the <ul> for the employee
  $ul.append($('<li>').text('First Name: ' + employee.firstName));
  $ul.append($('<li>').text('Last Name: ' + employee.lastName));
  $ul.append($('<li>').text('Employee #: ' + employee.empNum));
  $ul.append($('<li>').text('Title: ' + employee.title));
  $ul.append($('<li>').text('Review Score (1-5): ' + employee.reviewScore));
  $ul.append($('<li>').text('Salary: $' + employee.salary));
  
  // Append a 'remove' button to the <ul> for the employee
  $ul.append($($button).text('Delete: ' + employee.firstName + ' ' + employee.lastName));

  $button.attr('id', 'employee' + i); // Add a class to the remove button based on the Employee's position in employeeArray, #employee[i]
  $button.addClass('remove'); // Add a .remove class to the remove button 
  $ul.addClass('review' + employee.reviewScore); // Add a class to the <ul> based on Employee reviewScore, .review(1-5)
  $('#empList').append($ul); // Add the <ul> for the employee to <ol #empList> of employees
}

// Add new employee
$(function() { // Wait until the document is loaded and ready
  $('#empForm').on('submit', function(event){ // Check for a form submission
  
    var arrayEmployee = []; // Holds an new employee as an array, before it is turned into an Employee object
    var newEmployee = {}; // A new Employee object, to be added to employeeArray

    arrayEmployee = $(this).serializeArray(); // Capture form input into an array
    event.preventDefault(); // Do not send the form data
    $(this)[0].reset(); // Reset the form
    
    // Convert a newEmployee array into a new Employee object
    newEmployee = new Employee(arrayEmployee[0].value, arrayEmployee[1].value, arrayEmployee[2].value, arrayEmployee[3].value, arrayEmployee[4].value, arrayEmployee[5].value);
    employeeArray.push(newEmployee); // Add the new Employee instance to the array of employees
    drawEmployee(employeeArray.length - 1); // Draw the most newly input employee
  })
});

// Remove an employee
$(function() { // Wait until the document is loaded and ready
  $('#empList').on('click', 'button', function(){ // Check for a .remove Employee button click
    var employeePosition = $(this).attr('id'); // Stores the Employee's possition as the .class[i] of the .remove button
    
    // Updates Employee's position to [i], it's loctaion in employeeArray
    employeePosition = parseInt(employeePosition.slice(8, employeePosition.length)); // Extract the numeric portion of #employee[i]
    delete employeeArray[employeePosition]; // Remove the Employee from employeeArray
    $(this).closest('ul').remove(); // Remove the Employee from <ol #empList>, ie: undraw the Employee
    
    // Remove the empty slot left by the deleted Employee, and update button #employee[i] for following employees     
    employeeArray = sortEmployees(employeeArray);
  });
});
