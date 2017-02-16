(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const app = angular.module('tripApp', ['ui.router']);


// CONTROLLERS
const controllers = [
  require('./controllers/login'),
  require('./controllers/createtrip'),
  require('./controllers/showtrip')
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


//   //leaflet
//   var mymap = L.map('mapid').setView([51.505, -0.09], 13);
//
//   L.tileLayer('https://api.mapbox.com/styles/v1/seasalt/ciz05osm200022srz742acakx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vhc2FsdCIsImEiOiJjaXkzanV0c2UwMDEzMzNsamV1bmg0ZWVqIn0.mcvszUMDaLO4C8Ea9ytkOg', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.mapbox-traffic-v1',
//     accessToken: 'pk.eyJ1Ijoic2Vhc2FsdCIsImEiOiJjaXkzanV0c2UwMDEzMzNsamV1bmg0ZWVqIn0.mcvszUMDaLO4C8Ea9ytkOg'
// }).addTo(mymap);

},{"./components/accountlogin":2,"./components/createtrip":3,"./components/map":4,"./components/newuser":5,"./components/showtrips":6,"./controllers/createtrip":7,"./controllers/login":8,"./controllers/showtrip":9,"./routes":10,"./services/account":11,"./services/trip":12}],2:[function(require,module,exports){
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
  func: function($scope, tripService){
    console.log("create-trip controller working");

    $scope.postTrip = function(name, from, to){
      console.log("posting trip from controller");
      tripService.postTrip(name, from, to) //this should return the map coordinates? and send them to a differet page that will display the map ** luke
    }
    console.log("posted thru");

    $scope.getTripNames = tripService.getTrips();

    // //USING LEAFLET//
    var map = L.map('map').setView([35.2271, -80.8431], 13);
    // var start;
    // end;

    L.tileLayer('https://api.mapbox.com/styles/v1/seasalt/ciz05osm200022srz742acakx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vhc2FsdCIsImEiOiJjaXkzanV0c2UwMDEzMzNsamV1bmg0ZWVqIn0.mcvszUMDaLO4C8Ea9ytkOg', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.mapbox-traffic-v1',
    accessToken: 'pk.eyJ1Ijoic2Vhc2FsdCIsImEiOiJjaXkzanV0c2UwMDEzMzNsamV1bmg0ZWVqIn0.mcvszUMDaLO4C8Ea9ytkOg'
    }).addTo(map);

    //adding popup// wanna add current location here:

    // let location = tripService.showLocation();
    // L.marker([location]).addTo(map)
    // .bindPopup('Your current location')
    // .openPopup();
    //
    // L.marker([35.2271, -80.8431]).addTo(map)
    // .bindPopup('Charlotte!')
    // .openPopup();

    /////////////////////////////

        tripService.showMap().then(function (response) {
            L.geoJson(response.data).addTo(map);
            console.log("starting coordinates");
          //   start = response.data.features[0].geometry.coordinates[0];
           //
          //   console.log(start);
           //
           //
          //  let loc = tripService.showLocation();
        });

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
  name: "showTripController",
  func: function($scope, tripService, accountService, $state){
    console.log("show-trip controller working");

      $scope.showMap = function(trip){
        tripService.showMap(trip);
      }

      $scope.trips = tripService.getTrips();

      $scope.getAccount = accountService.getAccount();
  }
}

},{}],10:[function(require,module,exports){
module.exports = [

    {
        name: 'log-in',
        url: '/login',
        component: 'accountLogin',
    },

    // {
    //     name: 'new-user',
    //     url: '',
    //     component: 'newUser',
    // },

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
        url: '/show-map',
        component: 'mapComponent',
    },

];

},{}],11:[function(require,module,exports){
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
        return accountInfo; ///???
        //2) if response === true, new-trip view should appear to user.
      },
      getAccount: function(){
        //1) GET request here
        let account = $http.get('https://dry-headland-17316.herokuapp.com/account/' + userId).then(function(response){
          const incoming = response.data;
          console.log("should be receiving account info below: ");
          console.log(incoming);
          angular.copy(response.data, accountInfo)
        })
        //2) return trip names, and send to controller to display on page.
        return accountInfo;
      }

    }//closing return object

  }//closing func
}//closing module export

},{}],12:[function(require,module,exports){
module.exports = {
  name: "tripService",
  func: function($http){

    let trip_map = "";
    let userId = ""; ///needs to be global?
    let tripList = [];

    return {
      postTrip: function(tripName, startAddress, endAddress){
        console.log("posting trip");
        //1) post trip here
        $http.post("/new-trip", {
          "tripName": "tripName",
          "startAddress": "startAddress",
          "endAddress": "endAddress",
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

},{}]},{},[1]);
