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

var displayMap = function(latitude, longitude) {
  var container = document.getElementById('main-map');
  console.log(container);
  var centre = {
      lat:latitude, 
      lng:longitude
    };
  var zoom = 10;
  var mainmap = new MapWrapper(centre, zoom, container);
  mainmap.addMarker(centre);
}

var handleSelectChange = function(event) {
  var countryName = this.value;
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
  displayMap(lat, lng);
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
  makeRequest(url, populateDropDown);

  getCountry();

  newButton.onclick = showAllCountries;

  var dropDown = document.getElementById("dropdown");
  dropDown.onchange = handleSelectChange;
}

window.onload = app;