/*
  map.js file to put Google map locations on the site

  Ryan Dunton
  November 10, 2016

*/


// Declare variables
var map;
var infowindow; 
var allMarkers = [];  

// Array of objects with title, location for work locations
var workLocations = [
    {title: 'Google', location: {lat: 37.422613, lng: -122.084004}},
    {title: 'Apple', location: {lat: 37.332050, lng: -122.031191}}
]



function initializeMap() {
  // creates map variable from Google API
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.388792, lng: -122.071365},
    zoom: 10,
    mapTypeControl: false
  });

  // add info window for marker
  infowindow = new google.maps.InfoWindow({
    content: "hold"
  })

  // center map on screen resize
  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });  

  // iterate through workLocations to place markers
  for (var i = 0; i < workLocations.length; i++) {
      var marker = new google.maps.Marker({
        position: workLocations[i].location,
        title: workLocations[i].title,
        map: map,
        animation: google.maps.Animation.DROP
      }) ;

      // define highlighted marker with different color
      var highlightedIcon = makeMarkerIcon('FFFF24');


      // add mouseover and mouseout functionality
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });

      marker.addListener('mouseout', function() {
        this.setIcon();
      })

      // push to allMarkers array
      allMarkers.push(marker);
    };

    // add info windows to markers
    for (var i = 0; i < allMarkers.length; i++) {
      var marker = allMarkers[i];

      google.maps.event.addListener(marker, 'click', function() {
        var infoContent = '<div class="infowindow"><strong>' + this.title + '</strong></div>';
        infowindow.setContent(infoContent);
        infowindow.open(map, this);
      })
    };

}
  
// create new marker image for color
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
          return markerImage;
    };

// call function
initializeMap();







 