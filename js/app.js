const app = angular.module('tripApp', []); //always create app first

const controllers = [
  require('./controllers/login'),
  require('./controllers/createtrip'),
  require('./controllers/showtrip')
];

for (let i = 0; i < controllers.length; i++) {
  console.log(controllers[i]);
  app.controller(controllers[i].name, controllers[i].func);
};

app.factory("accountService", function($http){
  let accountInfo = {};
  let userId= "";

  return {
    makeAccount: function(name, email, pass, car){
      console.log("new user");
      //1) post this info here.
      $http.post('url/new-user', {
        "name": "name",
        "email": "email",
        "pass": "pass",
        "car": "car"
      }).then(function(response){
        console.log("response below");
        console.log(response.data);
        accountInfo = response.data;
        userId = response.data.id;
      })
      console.log("account creation successful");
      return accountInfo;
      //2) if response === true, new-trip view should appear to user
    },
    loginAccount: function(email, pass){
      console.log("logging in");
      //1) post existing user below
      $http.post('url/login', {
        "name": "name",
        "email": "email"
      }).then(function(response){
        console.log("response below");
        console.log(response.data);
      })
      console.log("existing user has logged in");
      return accountInfo; ///???
      //2) if response === true, new-trip view should appear to user.
    }
  }
})

app.factory("tripService", function($http){
  let trip_map = "";
  let userId = ""; ///needs to be global?
  let tripList = [];

  return {
    postTrip: function(name, from, to){
      console.log("posting trip");
      //1) post trip here
      $http.post("url/new-trip", {
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
      let tripHistory = $http.get('url/trip-list/' + userId).then(function(response){
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
    }
  }
})
