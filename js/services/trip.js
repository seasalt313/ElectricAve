module.exports = {
  name: "tripService",
  func: function($http){

    let trip_map = "";
    let trip_id = "";
    let userId = "";
    let tripList = [];


    return {
      postTrip: function(tripName, startAddress, endAddress){
        console.log("posting trip");
        //1) post trip here
        return $http.post("/new-trip", {
          "tripName": tripName,
          "startAddress": startAddress,
          "endAddress": endAddress,
        }).then(function(response){
          console.log("should be receiving route");
          console.log(response.data);
          trip_id = response.data.id;
          trip_map = response.data;

          return trip_id;
        });
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
      showMap: function(tripId){
        console.log("logging inside of show map service, trip id is : " + tripId);
        return $http.get('map/' + tripId);
        console.log("response data: " + response.data);
        //
      },

      showLocation: function(){
        return new Promise(function (resolve, reject) { // how promises work
          navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            console.log("lat: " + lat);
            console.log("long: " + long);
            resolve([lat, long]);
          });
        });
      },

    }//closing return


  }//closing func
}//closing module export
