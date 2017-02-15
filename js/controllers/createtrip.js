module.exports = {
  name: "createTripController",
  func: function($scope, tripService){
    console.log("create trip controller working");



          //SHOWING MAPQUEST DIRECTIONS
          var map,
          dir;
          //
          map = L.map('map', {
          layers: MQ.mapLayer(),
          center: [ 35.247189, -80.809551 ],
          zoom: 15
          });

          dir = MQ.routing.directions();

          dir.route({
          locations: [
          '200 south blvd, charlotte, nc',
          '1304 south college st, charlotte nc'
          ]
          });

          map.addLayer(MQ.routing.routeLayer({
          directions: dir,
          fitBounds: true
          }));

          // //mapbox
          //
          // L.mapbox.accessToken = 'pk.eyJ1Ijoic2Vhc2FsdCIsImEiOiJjaXkzanV0c2UwMDEzMzNsamV1bmg0ZWVqIn0.mcvszUMDaLO4C8Ea9ytkOg';
          // var map = L.mapbox.map('map', 'mapbox.streets', {
          //     zoomControl: false
          // }).setView([40, -74.50], 9);
          //
          // // move the attribution control out of the way
          // map.attributionControl.setPosition('bottomleft');
          //
          // // create the initial directions object, from which the layer
          // // and inputs will pull data.
          // var directions = L.mapbox.directions();
          //
          // var directionsLayer = L.mapbox.directions.layer(directions)
          //     .addTo(map);
          //
          // var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
          //     .addTo(map);
          //
          // var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
          //     .addTo(map);
          //
          // var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
          //     .addTo(map);
          //
          // var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
          //     .addTo(map);

          //SHOWING USER LOCATION:
          console.log("showing location");
          let starting = map.locate({
            setView: true,
            maxZoom: 16
            });
            function onLocationFound(e) {
            var radius = e.accuracy / 2;

            L.marker(e.latlng).addTo(map)
                .bindPopup("You are within " + radius + " meters from this point").openPopup();

            L.circle(e.latlng, radius).addTo(map);
        }
        map.on('locationfound', onLocationFound);

        // //SHOWING GEOJSON LAYER:
        var geojsonFeature = {
            "type": "Feature",
            "properties": {
                "name": "My apartment",
                "amenity": "Baseball Stadium",
                "popupContent": "This is where I live !"
            },
            "geometry": {
                "type": "Point",
                "coordinates": [ 35.247189, -80.809551 ]
            }
        };
        L.geoJSON(geojsonFeature).addTo(map);


        $scope.postTrip = function(name, from, to){
          tripService.postTrip(name, from, to) //this should return the map coordinates? and send them to a differet page that will display the map ** luke
        }
        // $scope.getTripNames = tripService.getTrips();






  }
}
