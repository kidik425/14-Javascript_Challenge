var tableData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Create Initial Table
data.forEach((sighting) => {
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });

//Create Date Drop Down Reference 
var dateDrop = d3.select("dropdownMenuButtonDate");

var dateList = returnVals();

console.


dateList.forEach((dateVal) => {
    var date = dateDrop.append("div");
    Object.entries(dateVal).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
});

// Select the button
var button = d3.select("#filter-btn");

// Create event handlers 
button.on("click", runFilter);

// Function to return unique values
function uniqueVals(value, index, self) {
    return self.indexOf(value) === index;
  }

// Return a distinct list of values.  To be used for the dropdowns
function returnVals() {
    return list = data.datetime.filter(uniqueVals)
}

  // Complete the event handler function for the form
function runFilter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    var inputElement = d3.select("#datetime");

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