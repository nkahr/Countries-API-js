var MapWrapper = function(coords, zoom, container) {

  this.googleMap = new google.maps.Map(container, {
    center: coords, 
    zoom: zoom
  });

}

MapWrapper.prototype = {

  addMarker: function(coords, borderNames) {

    console.log("border names: " + borderNames);

    var infowindow = new google.maps.InfoWindow({
      content: "something"
    });    

    var marker = new google.maps.Marker({
      position: coords, 
      map: this.googleMap
    });

    marker.addListener('click', function() {
      infowindow.open(this.googleMap, marker);

      var htmlFullString = "<p>Borders\n</p>\n";
      borderNames.forEach(function(borderName) {
        var func = "showCurrentCountry('"+borderName+"')";
        var htmlString = "<button onclick="+func+"> Take me to "+borderName+"</button>"
        htmlFullString += (htmlString + "\n");
      })

      infowindow.setContent(htmlFullString);
    });

  }
}