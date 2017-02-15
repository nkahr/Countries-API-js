var countries;



var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function() {
  if(this.status != 200) { //'this' refers to request
    return;
  }
  populateList(countries);
}

var populateList = function(countries) {
  var ul = document.getElementById('country-list');
  countries.forEach(function(country) {
    var li = document.createElement('li');
    li.innerText = country.name;
    ul.appendChild(li);
  })
}

var showAllCountries = function() {
  var url = "https://restcountries.eu/rest/v1";
  makeRequest(url, requestComplete);
}

// var hideCountryList = function(){
//   var hideLi = document.getElementById('country-list');
//   hideLi.innerHTML = "";
// }

var populateDropDown = function(url){
  var dropDown = document.getElementById("dropdown");
  var jsonString = this.responseText;
  countries = JSON.parse(jsonString);

  countries.forEach(function(country){
    var option = document.createElement('option')
    option.innerText = country.name;
    dropDown.appendChild(option);
  })
}

var displayMap = function(latitude, longitude, borderingCountries) {
  var container = document.getElementById('main-map');
  console.log(container);
  var centre = {
      lat:latitude, 
      lng:longitude
    };
  var zoom = 5;
  var mainmap = new MapWrapper(centre, zoom, container);

  var borderNames = [];
  console.log("bordering countries: " + borderingCountries);
  borderingCountries.forEach(function(country){
    console.log("alpha 3 code: " + country.alpha3Code);
    var name = findNameFromAlpha3Code(country);
    borderNames.push(name);
  })
  console.log("border names: " + borderNames);
  mainmap.addMarker(centre, borderNames);
}

var handleSelectChange = function(event) {
  var countryName = this.value;
  showCurrentCountry(countryName);
}


var showCurrentCountry = function(countryName) {
  var currentCountry;
  countries.forEach(function(country) {
    if (country.name === countryName) {
      currentCountry = country;
    }
  })

  var Ptag = document.getElementById("ptag");
  var savedCountry = ("country name: " + currentCountry.name + " \npopulation: " + currentCountry.population + " \ncapital city: " + currentCountry.capital);
  Ptag.innerText = savedCountry;
  saveCountry(savedCountry);
  var lat = currentCountry.latlng[0];
  var lng = currentCountry.latlng[1];
  var borders = currentCountry.borders;
  var borderingCountries = "Borders: ";
  if (borders.length === 0) {
    borderingCountries = "None";
  } else {
    borders.forEach(function(border) {
      borderingCountries += (border + " ");
    })
  }
  displayMap(lat, lng, borders);
}

var findNameFromAlpha3Code = function(a3Code) {
  var currentCountryName;
  countries.forEach(function(country) {
    if (country.alpha3Code === a3Code) {
      currentCountryName = country.name;
    }
  })
  return currentCountryName;
}

var saveCountry = function(countryInfo){
  localStorage.setItem("lastCountry", countryInfo);
}

var getCountry = function(){
  var lastCountryString = localStorage.getItem("lastCountry");
  var Ptag = document.getElementById("ptag");
  Ptag.innerText = lastCountryString;
}

var app = function(){
  var url = "https://restcountries.eu/rest/v1";
  var newButton = document.getElementById('country-button');
  // var hideButton = document.getElementById('hide-button');
  makeRequest(url, populateDropDown);

  getCountry();

  newButton.onclick = showAllCountries;
  // hideButton.onclick = hideCountryList;


  var dropDown = document.getElementById("dropdown");
  dropDown.onchange = handleSelectChange;
}

window.onload = app;