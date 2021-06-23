var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Create initial data table
data.forEach((sighting) => {
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

//Create Drop Down References 
var dropdownDate = document.getElementById("selectDate");
var dropdownCity = document.getElementById("selectCity");
var dropdownState = document.getElementById("selectState");
var dropdownCountry = document.getElementById("selectCountry");
var dropdownShape = document.getElementById("selectShape");

//Return list of values in array
// const dateList = [...new Set( data.map(obj => obj.datetime)) ];
const dateList = returnList('datetime',false);
const cityList = returnList('city', true);
const stateList = returnList('state', true);
const countryList = returnList('country', false);
const shapeList = returnList('shape', true);

//console.log(shapeList); //sanity checks

//Call methods to populate each dropdown
getValues(dropdownDate, dateList);
getValues(dropdownCity, cityList);
getValues(dropdownState, stateList);
getValues(dropdownCountry, countryList);
getValues(dropdownShape, shapeList);

//Build out filter section


/////////function section
//Returns a list of values either sorted or not depending on parameters
function returnList(attr, sort) {
    var list = [...new Set(data.map(obj => obj[attr]))];
    if (sort === true)
        list = list.sort();
    return list;
};

//Gets values from list and appends them to a dropdown 
function getValues(dropdown, list) {
for(var i = 0; i < list.length; i++){
    var newOption = list[i];

    var el = document.createElement("option");
    el.textContent = newOption;
    el.value = newOption;

    dropdown.append(el);
}
};

// Complete the event handler function for the form
function runFilter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("tbody");

    // Get the value property of the input element
    var inputValue = inputElement.property("value");

    var filteredData = tableData.filter(rec => rec.datetime === inputValue);

    // console.log(filteredData); //sanity check

    var tbody = d3.select("tbody");

    tbody.html("");

    filteredData.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });
}

// // Select the button
// var button = d3.select("#filter-btn");

// // Create event handlers 
// button.on("click", runFilter);

// // Complete the event handler function for the form
// function runFilter() {

//     // Prevent the page from refreshing
//     d3.event.preventDefault();

//     // Select the input element and get the raw HTML node
//     var inputElement = d3.select("#datetime");

//     // Get the value property of the input element
//     var inputValue = inputElement.property("value");

//     var filteredData = tableData.filter(rec => rec.datetime === inputValue);

//     // console.log(filteredData); //sanity check

//     var tbody = d3.select("tbody");

//     tbody.html("");

//     filteredData.forEach((sighting) => {
//         var row = tbody.append("tr");
//         Object.entries(sighting).forEach(([key, value]) => {
//           var cell = row.append("td");
//           cell.text(value);
//         });
//       });
// }