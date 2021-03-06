//Went fancy with the config
var dropdownConfig = config;
var tableData = data;
var filteredData = tableData;

var dIDs = [];

//Get a reference to the table body
var tbody = d3.select("tbody");
var filterForm = d3.select("form")

//Creates the initial data table and dropdowns
initTable();

//Dynamically create each dropdown based on config file
config.forEach((cfig) => {
    var select = filterForm.append("select").attr("id",cfig.htmlTag)
 //   console.log(select);

    Object.entries(cfig).forEach(([key, value]) => {
        if(key === "option") {
            var option = select.append("option").attr("value"," ")
            option.text(value);
        }
    });
});

//Populate each dropdown
populateDropDowns();

//Build out filter section
// Select the drop down
var filters = d3.selectAll("select");
var refresh = d3.selectAll("button");

//Create event handlers 
filters.on("change", runFilter);
refresh.on("click", deafultFilters)

/////////function section
//Populate drop down
function populateDropDowns() {
    config.forEach((cfig) => {
        var dropdown = document.getElementById(cfig.htmlTag);
    
        const list = returnList(cfig.name,cfig.sorted);
        getDropDownValues(dropdown, list);
        dIDs.push(cfig.htmlTag);
    });
}

//Returns a list of values either sorted or not depending on parameters
function returnList(attr, sort) {
    var list = [...new Set(filteredData.map(obj => obj[attr]))];
    if (sort === true)
        list = list.sort();
    return list;
};

//Gets values from list and appends them to a dropdown 
function getDropDownValues(dropdown, list) {
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
    console.log(dropdownKey);
    console.log(dropdownValue);

    //Get field name from json based on Key
    var filteredConfig = dropdownConfig.filter(rec => rec["htmlTag"] === dropdownKey);
    var key = Object.keys(filteredConfig)[0];
    var field = filteredConfig[key]['name'];
    
    //Get the value property of the input element
    filteredData = filteredData.filter(rec => rec[field] === dropdownValue);
    //console.log(filteredData); //sanity check

    //Select table body for inserting records
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

//Refreshes the page
function deafultFilters(){
    window.location.reload();
    return false();
}

//Create initial data table
function initTable() {
    tableData.forEach((sighting) => {
        var row = tbody.append("tr");

        Object.entries(sighting).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
        });
    });
}