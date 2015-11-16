// Constructor for Employee object
function Employee(firstName, lastName, empNum, jobTitle, reviewScore, salary) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.empNum = parseInt(empNum);
  this.jobTitle = jobTitle;
  this.reviewScore = parseInt(reviewScore);
  this.salary = parseInt(salary);
}

// Global variable declarations, and default initializations
var employeeArray = []; // Each element represents one employee as an Employee object
var employeeCost = 0;

function updateEmployeeCost(){
  employeeCost = 0;
  for (var i = 0; i < employeeArray.length; i++){
    employeeCost += employeeArray[i].salary;
  }
}

// A function to generate a random employee
function generateEmployee(){
  var firstName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5); // Generate random firstName
  var lastName = Math.random().toString(36).replace(/[^a-z]+/g, '') // Generate random lastName
  var empNum = Math.floor((Math.random() * 1000) + 1); // Generate random empNum
  var jobTitle = 'Randomly Generated'; // Generate static jobTitle
  var reviewScore = Math.floor((Math.random() * 5) + 1); // Generate random reviewScore(1-5)
  var salary = Math.floor((Math.random() * 100000) + 1); // Generate random salary
  
  // Create random Employee object from generated values, and push it to the employeeArrray
  employeeArray.push(new Employee(firstName, lastName, empNum, jobTitle, reviewScore, salary));
  updateEmployeeCost(); // Recalculate the total labor expence
  redrawArray(); // Redraw the employeeArray
}

// A function to sort employeeArray[i], optionally takes a 'how to sort' pararameter 
function sortEmployees(how){
  var sorted = [];
  var tmp = 0;
  var tmp2 = 0;
  
  switch(how) {
    case how = 'firstName': // Sort employees by First name   
      for (var i = 0; i < employeeArray.length - 1; i++){
        tmp = i;
        for (var j = i + 1; j < employeeArray.length; j++){
          if (employeeArray[j].firstName < employeeArray[i].firstName){
            tmp = j;
          }
        }
        if(tmp != i){
          tmp2 = employeeArray[tmp];
          employeeArray[tmp] = employeeArray[i];
          employeeArray[i] = tmp2;
        }
      }           
      break;
    case how = 'lastName': // Sort employees by Last name
       for (var i = 0; i < employeeArray.length - 1; i++){
        tmp = i;
        for (var j = i + 1; j < employeeArray.length; j++){
          if (employeeArray[j].lastName < employeeArray[i].lastName){
            tmp = j;
          }
        }
        if(tmp != i){
          tmp2 = employeeArray[tmp];
          employeeArray[tmp] = employeeArray[i];
          employeeArray[i] = tmp2;
        }
      }
      break;
   /* Optional implimentation for sorting by different property values      
    case how = 'empNum':
      //code block
      break;
    case how = 'jobTitle':
      //code block
      break;
    case how = 'reviewScore':
      //code block
      break;
    case how = 'salary':
      //code block
      break;
    */          
    default: // Sort the employeeArray, keeping the current order, but removing 'undefined' (empty) spaces
      for (var i = 0; i < employeeArray.length; i++){
        if ((typeof employeeArray[i]) != 'undefined') {  // Check that the current element of employeeArray is not undefined
          sorted.push(employeeArray[i]); // Push the current element of employeeArray to a sorted array
        }
      }
      return sorted;
  }
} 

// A function to draw a an Employee object for employeeArray[i]
function drawEmployee(i){
  var employee = employeeArray[i]; // Create local veriable to reference the Employee that is being drawn
  var $ul = $('<ul>'); // Create a <ul> element to hold the new employee
  var $button = $('<button>');

  // Create an <li> element for each property of the Employee and append it to the <ul> for the employee
  $ul.append($('<li>').text('First Name: ' + employee.firstName));
  $ul.append($('<li>').text('Last Name: ' + employee.lastName));
  $ul.append($('<li>').text('Employee #: ' + employee.empNum));
  $ul.append($('<li>').text('Title: ' + employee.jobTitle));
  // Enclose the numeric reviewScore in an <em> tag for CSS styling
  $ul.append($('<li>').text('Review Score (1-5): ').append($('<em>').text(employee.reviewScore)));
  $ul.append($('<li>').text('Salary: $' + employee.salary));
  
  // Append a 'remove' button to the <ul> for the employee
  $ul.append($($button).text('Delete: ' + employee.firstName + ' ' + employee.lastName));

  $button.attr('id', 'employee' + i); // Add a class to the remove button based on the Employee's position in employeeArray, #employee[i]
  $button.addClass('remove'); // Add a .remove class to the remove button
  $button.addClass('button');
  $ul.addClass('review' + employee.reviewScore); // Add a class to the <ul> based on Employee reviewScore, .review(1-5)
  $('#empList').append($ul); // Add the <ul> for the employee to <ol #empList> of employees
}

// A function to redraw the employeeArray
function redrawArray(){
  $('ol > ul').remove(); // Remove all Employee's from <ol #empList>, ie: undraw the Employee
  $('aside > h2').remove();
  $('aside').append($('<h2>').text('Total Annual Labor Cost: ' + employeeCost));
  
  // Reprint the entire employeeArray of 'test' names to the screen
  for (var i = 0; i < employeeArray.length; i++){
    drawEmployee(i); // Draw Employee i from employeeArray[i]  
  }
}

// Add a new random employee when button is clicked
$(function() { // Wait until the document is loaded and ready
  $('#random').click(function(event){ // listen for 'click' event on #random button
    generateEmployee();
  });
});

// Sort Employees by First Name when button is clicked
$(function() { // Wait until the document is loaded and ready
  $('#firstName').click(function(event){ // listen for 'click' event on #random button
    sortEmployees('firstName'); // Sort employeeArray by firstName
    redrawArray(); // Redraw the employeeArray
  });
});

// Sort Employees by Last Name when button is clicked
$(function() { // Wait until the document is loaded and ready
  $('#lastName').click(function(event){ // listen for 'click' event on #random button
    sortEmployees('lastName') // Sort employeeArray by lastName
    redrawArray(); // Redraw the employeeArray  
  });
});


// Add a new employee from the form when button is clicked
$(function() { // Wait until the document is loaded and ready
  $('#empForm').on('submit', function(event){ // Listen for 'submit' event on #empForm form
  
    var arrayEmployee = []; // Holds an new employee as an array, before it is turned into an Employee object
    var newEmployee = {}; // A new Employee object, to be added to employeeArray

    arrayEmployee = $(this).serializeArray(); // Capture form input into an array
    event.preventDefault(); // Do not send the form data
    $(this)[0].reset(); // Reset the form
    
    // Convert a newEmployee array into a new Employee object
    newEmployee = new Employee(arrayEmployee[0].value, arrayEmployee[1].value, arrayEmployee[2].value, arrayEmployee[3].value, arrayEmployee[4].value, arrayEmployee[5].value);
    employeeArray.push(newEmployee); // Add the new Employee instance to the array of employees
    updateEmployeeCost(); // Recalculate the total labor expence
    redrawArray(); // Redraw the employeeArray
  })
});

// Remove an employee
$(function() { // Wait until the document is loaded and ready
  $('#empList').on('click', 'button', function(){ // Check for a .remove Employee button click
    var employeePosition = $(this).attr('id'); // Stores the Employee's possition as the .class[i] of the .remove button
    
    // Updates Employee's position to [i], it's loctaion in employeeArray
    employeePosition = parseInt(employeePosition.slice(8, employeePosition.length)); // Extract the numeric portion of #employee[i]
    delete employeeArray[employeePosition]; // Remove the Employee from employeeArray
    
    // Remove the empty slot left by the deleted Employee, and update button #employee[i] for following employees     
    employeeArray = sortEmployees();
    updateEmployeeCost(); // Recalculate the total labor expence
    redrawArray(); // Redraw the employeeArray
  });
});
