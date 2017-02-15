var MapWrapper = function(coords, zoom, container) {

  this.googleMap = new google.maps.Map(container, {
    center: coords, 
    zoom: zoom
  });

}

MapWrapper.prototype = {

  addMarker: function(coords) {

    var marker = new google.maps.Marker({
      position: coords, 
      map: this.googleMap
    });
    
  }
}