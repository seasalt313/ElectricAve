(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const app = angular.module('tripApp', ['ui.router']);


// CONTROLLERS
const controllers = [
  require('./controllers/login'),
  require('./controllers/createtrip'),
  require('./controllers/showtrip'),
  require('./controllers/showmap')
];

  for (let i = 0; i < controllers.length; i++) {
    console.log(controllers[i]);
    app.controller(controllers[i].name, controllers[i].func);
  };

//SERVICES
const services = [
  require('./services/account'),
  require('./services/trip'),
];

  for (let i = 0; i < services.length; i++) {
    console.log(services[i]);
    app.factory(services[i].name, services[i].func)
  };


//ROUTES
const routes = require('./routes');
app.config($stateProvider => {
    for (let i = 0; i < routes.length; i++) {
        $stateProvider.state(routes[i]);
    }
});


// //COMPONENTS
const components = [
  require('./components/accountlogin'),
  require('./components/createtrip'),
  require('./components/showtrips'),
  require('./components/newuser'),
  require('./components/map'),
];

  for (let i = 0; i < components.length; i++) {
    console.log(components[i]);
    app.component(components[i].name, components[i].config);
  };

},{"./components/accountlogin":2,"./components/createtrip":3,"./components/map":4,"./components/newuser":5,"./components/showtrips":6,"./controllers/createtrip":7,"./controllers/login":8,"./controllers/showmap":9,"./controllers/showtrip":10,"./routes":11,"./services/account":12,"./services/trip":13}],2:[function(require,module,exports){
module.exports = {
  name: 'accountLogin',
  config: {
    templateUrl: 'templates/login.html',
  },
};

},{}],3:[function(require,module,exports){

module.exports = {
  name: 'createTrip',
  config: {
    templateUrl: 'templates/create.html',
  },
};

},{}],4:[function(require,module,exports){

module.exports = {
  name: 'mapComponent',
  config: {
    templateUrl: 'templates/map.html',
  },
};

},{}],5:[function(require,module,exports){
module.exports = {
  name: 'newUser',
  config: {
    templateUrl: 'templates/newuser.html',
  },
};

},{}],6:[function(require,module,exports){
module.exports = {
  name: 'showTrips',
  config: {
    templateUrl: 'templates/showtrips.html',
  },
};

},{}],7:[function(require,module,exports){
module.exports = {
  name: "createTripController",
  func: function($scope, tripService, accountService, $state){

    console.log("create-trip controller working");

    $scope.postTrip = function(tripName, startAddress, endAddress){
      tripService.postTrip(tripName, startAddress, endAddress)
        .then(function (id) {
          console.log("redirecting");
            $state.go('map', {
              mapId: id,
            });
        });
      },

    $scope.viewAccount = accountService.getAccount();
  }
}

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
module.exports = {
  name: "showmapcontroller",
  func: function($scope,tripService, accountService, $state, $stateParams, $interval){

    let start = null;

    console.log("show map controller working");

    //USING LEAFLET//
    var map = L.map('map').setView([35.2271, -80.8431], 13);
    //
    L.tileLayer('https://api.mapbox.com/styles/v1/seasalt/cizab1okt00652rnqabud8ig8/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vhc2FsdCIsImEiOiJjaXkzanV0c2UwMDEzMzNsamV1bmg0ZWVqIn0.mcvszUMDaLO4C8Ea9ytkOg', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.mapbox-traffic-v1',
    accessToken: 'pk.eyJ1Ijoic2Vhc2FsdCIsImEiOiJjaXkzanV0c2UwMDEzMzNsamV1bmg0ZWVqIn0.mcvszUMDaLO4C8Ea9ytkOg'
    }).addTo(map);

    /////////////////////////RENDERING MAP:
        tripService.showMap($stateParams.mapId).then(function (response) {
            L.geoJson(response.data).addTo(map);
            console.log("starting coordinates");
            start = response.data.features[0].geometry.coordinates[0];

            console.log("ending coordinates:");
            let end = response.data.features[0].geometry.coordinates.pop();
            console.log(end);

            L.marker([start[1], start[0]]).addTo(map)
                .bindPopup("<h1>starting here</h1>")
                .openPopup();

            L.marker([end[1], end[0]]).addTo(map)
                .bindPopup()
                .openPopup();

           map.setView([start[1], start[0]], 13);
        });







    // adding popup// wanna add current location here:

    $interval(function () {
      tripService.showLocation().then(function(location){
        L.marker(location).addTo(map)
          .bindPopup('Your current location')
          .openPopup();
        });
    }, 30000);

    $scope.viewAccount = accountService.getAccount();
    $scope.postNote = accountService.postNote();

  }

}

},{}],10:[function(require,module,exports){
module.exports = {
  name: "showTripController",
  func: function($scope, tripService, accountService, $state, $stateParams){

  console.log("show-trip controller working");

      $scope.trips = tripService.getTrips($stateParams.userId);

      $scope.getAccount = accountService.getAccount();

      // $scope.getTripNames = tripService.getTrips();


  }
}

},{}],11:[function(require,module,exports){
module.exports = [

    {
        name: 'log-in',
        url: '/login',
        component: 'accountLogin',
    },

    {
        name: 'newtrip',
        url: '/new-trip',
        component: 'createTrip',
    },

    {
        name: 'triplist',
        url: '/trip-list',
        component: 'showTrips',
    },

    {
        name: 'map',
        url: '/show-map/:mapId',
        component: 'mapComponent',
    },

];

},{}],12:[function(require,module,exports){
module.exports = {
  name: "accountService",
  func: function($http){
    let accountInfo = {};
    let userId= "";

    return {
      makeAccount: function(name, email, pass, car){
        console.log("new user");
        //1) post this info here.
        $http.post('https://dry-headland-17316.herokuapp.com/new-user', {
          "name": "name",
          "email": "email",
          "pass": "pass",
          "car": "car"
        }).then(function(response){
          console.log("response below");
          console.log(response.data);
          accountInfo = response.data;
          // userId = response.data.id;
        })
        console.log("account creation successful");
        return accountInfo;
        //2) if response === true, new-trip view should appear to user
      },
      loginAccount: function(email, pass){
        console.log("logging in");
        //1) post existing user below
        $http.post('https://dry-headland-17316.herokuapp.com/login', {
          "emailAddress": "emailAddress",
          "password": "password"
        }).then(function(response){
          console.log("response below");
          console.log(response.data);
        })
        console.log("existing user has logged in");
        return accountInfo867; ///???
        //2) if response === true, new-trip view should appear to user.
      },
      getAccount: function(){
        //1) GET request here
        let account = $http.get('/account').then(function(response){
          const incoming = response.data;
          console.log("should be receiving account info below: ");
          console.log(incoming);
          angular.copy(response.data, accountInfo)
          return response.data
        })
        //2) return trip names, and send to controller to display on page.
        return accountInfo;
      },
      postNote: function(){
        console.log("posting note");
        //1) post existing user below
        $http.post('https://dry-headland-17316.herokuapp.com/', {//figure out what goes here
          "note": "note",
        }).then(function(response){
          console.log("response below");
          console.log(response.data);
        })
        return accountInfo; ///???
        //2) if response === true, new-trip view should appear to user.
      },

    }//closing return object

  }//closing func
}//closing module export

},{}],13:[function(require,module,exports){
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
      getTrips: function(tripId){
        //1) GET request here
        let tripHistory = $http.get('/trip-list' ).then(function(response){
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

},{}]},{},[1]);
