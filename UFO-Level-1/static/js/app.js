//Went fancy with the config
var dropdownConfig = config;
var tableData = data;

var dIDs = [];

//Get a reference to the table body
var tbody = d3.select("tbody");

renewTable();

//dynamically create each dropdown based on config file
config.forEach((cfig) => {
    //console.log (cfig) //sanity check
    var dropdown = document.getElementById(cfig.htmlTag);
    const list = returnList(cfig.name,cfig.sorted);
    getValues(dropdown, list);
    dIDs.push(cfig.htmlTag);
});
//console.log(dIDs); //sanity check

//Build out filter section
// Select the drop down
var filters = d3.selectAll("select");
var refresh = d3.selectAll("button");
//console.log(filters);

//Create event handlers 
filters.on("change", runFilter);
refresh.on("click", deafultFilters)

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
}};

//Complete the event handler function for the form
function runFilter() {
    //Prevent the page from refreshing
    d3.event.preventDefault();

    //Get selected value
    var dropdownKey = d3.select(this).property("id");
    var dropdownValue = d3.select(this).property("value");
    
    //Get field name from json based on Key
    var filteredConfig = dropdownConfig.filter(rec => rec["htmlTag"] === dropdownKey);
    var key = Object.keys(filteredConfig)[0];
    var field = filteredConfig[key]['name'];
    
    // Get the value property of the input element
    var filteredData = tableData.filter(rec => rec[field] === dropdownValue);
    //console.log(filteredData); //sanity check

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

//
function deafultFilters(){
    window.location.reload();
    return false();
}

//Create initial data table
function renewTable() {
    data.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
    });
}