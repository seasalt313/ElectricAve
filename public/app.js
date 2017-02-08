(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./controllers/createtrip":2,"./controllers/login":3,"./controllers/showtrip":4}],2:[function(require,module,exports){
module.exports = {
  name: "createTripController",
  func: function($scope, tripService){
    console.log("create trip controller working");
    $scope.postTrip = function(name, from, to){
      tripService.postTrip(name, from, to)
    }
    $scope.getTripNames = tripService.getTripNames();
  }
}

},{}],3:[function(require,module,exports){
module.exports = {
  name: "loginController",
  func: function($scope, accountService){
    console.log("account controller working");
    $scope.makeAccount = function(name, email, pass, car){
      accountService.makeAccount(name, email, pass, car);
    }
    $scope.login = function(email, pass){
      accountService.loginAccount(email, pass);
    }
  }
}

},{}],4:[function(require,module,exports){
module.exports = {
  name: "showTripController",
  func: function($scope, tripService, $state){
    console.log("trip controller working");
    $scope.showMap = function(trip){
      tripService.showMap(trip);
    },
    $scope.trips = tripService.getTrips();
  },
}

},{}]},{},[1]);
