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
        let tripHistory = $http.get('https://dry-headland-17316.herokuapp.com/trip-list/' + userId).then(function(response){
          const incoming = response.data;
          console.log("should be receiving a list of trips below: ");
          console.log(incoming);
          angular.copy(response.data, tripList)
        })
        //2) return trip names, and send to controller to display on page.
        console.log(tripList);
        return tripList;
      },
      // get data for a particular trip
      showMap: function(trip){
        return $http.get('https://polar-tor-56907.herokuapp.com');
        console.log(response.data);
        //
      },
      showLocation: function(){
        navigator.geolocation.getCurrentPosition(function(position) {
          do_something(position.coords.latitude, position.coords.longitude);
        });
      },

    }//closing return


  }//closing func
}//closing module export
