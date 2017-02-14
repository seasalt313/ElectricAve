module.exports = {
  name: "createTripController",
  func: function($scope, tripService){
    console.log("create trip controller working");
    $scope.postTrip = function(name, from, to){
      tripService.postTrip(name, from, to) //this should return the map coordinates? and send them to a differet page that will display the map ** luke
    }
    $scope.getTripNames = tripService.getTrips();

    $scope.map = function(){
      var map,
          dir;

          map = L.map('map', {
          layers: MQ.mapLayer(),
          center: [ 38.895345, -77.030101 ],
          zoom: 15
          });

          dir = MQ.routing.directions();

          dir.route({
          locations: [
          '200 south church st, charlotte, nc',
          '1304 south college st, charlotte nc'
          ]
          });

          map.addLayer(MQ.routing.routeLayer({
          directions: dir,
          fitBounds: true
          }));

          // tripService.showLocation();
          console.log("showing location");
          map.locate({setView: true, maxZoom: 16});



    }

  }
}
