module.exports = {
  name: "tripService",
  func: function($http){

    let trip_map = "";
    let userId = ""; ///needs to be global?
    let tripList = [];

    return {
      postTrip: function(name, from, to){
        console.log("posting trip");
        //1) post trip here
        $http.post("https://dry-headland-17316.herokuapp.com/new-trip", {
          "trip_name": "name",
          "trip_start": "from",
          "trip_end": "end",
        }).then(function(response){
          console.log("should be receiving route");
          console.log(response.data);
          trip_map = response.data;
        })

        console.log("trip has posted, should redirect to map view");
        return trip_map;
        //2) the return should include the route which will then display on the show trips page.
      },
      getTrips: function(){
        //1) GET request here
        let tripHistory = $http.get('https://dry-headland-17316.herokuapp.com/trip-list' + userId).then(function(response){
          const incoming = response.data;
          console.log("should be receiving a list of trips below: ");
          console.log(incoming);
          angular.copy(response.data, tripList)
        })
        //2) return trip names, and send to controller to display on page.
        console.log(tripList);
        return tripList;
      },
      showMap: function(trip){
        //POST trip names
        //response = maps
      },
      showLeaflet : function(){
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
            '1600 pennsylvania ave, washington dc',
            '935 pennsylvania ave, washington dc'
            ]
            });

            map.addLayer(MQ.routing.routeLayer({
            directions: dir,
            fitBounds: true
            }));

      },

    }//closing return


  }//closing func
}//closing module export
