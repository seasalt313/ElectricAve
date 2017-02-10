(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const app = angular.module('tripApp', ['ui.router']);


//CONTROLLERS
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
];

  for (let i = 0; i < components.length; i++) {
    console.log(components[i]);
    app.component(components[i].name, components[i].config);
  };

},{"./components/accountlogin":2,"./components/createtrip":3,"./components/newuser":4,"./components/showtrips":5,"./controllers/createtrip":6,"./controllers/login":7,"./controllers/showtrip":8,"./routes":9,"./services/account":10,"./services/trip":11}],2:[function(require,module,exports){
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
  name: 'newUser',
  config: {
    templateUrl: 'templates/newuser.html',
  },
};

},{}],5:[function(require,module,exports){
module.exports = {
  name: 'showTrips',
  config: {
    templateUrl: 'templates/showtrips.html',
  },
};

},{}],6:[function(require,module,exports){
module.exports = {
  name: "createTripController",
  func: function($scope, tripService){
    console.log("create trip controller working");
    $scope.postTrip = function(name, from, to){
      tripService.postTrip(name, from, to)
    }
    $scope.getTripNames = tripService.getTrips();
  }
}

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
module.exports = [

    {
        name: 'log-in',
        url: '/login',
        component: 'accountLogin',
    },

    {
        name: 'new-user',
        url: '',
        component: 'newUser',
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

];

},{}],10:[function(require,module,exports){
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
          userId = response.data.id;
        })
        console.log("account creation successful");
        return accountInfo;
        //2) if response === true, new-trip view should appear to user
      },
      loginAccount: function(email, pass){
        console.log("logging in");
        //1) post existing user below
        $http.post('https://dry-headland-17316.herokuapp.com/login', {
          "email": "email",
          "pass": "pass"
        }).then(function(response){
          console.log("response below");
          console.log(response.data);
        })
        console.log("existing user has logged in");
        return accountInfo; ///???
        //2) if response === true, new-trip view should appear to user.
      },

    }//closing return object

  }//closing func
}//closing module export

},{}],11:[function(require,module,exports){
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

    }//closing return


  }//closing func
}//closing module export

},{}]},{},[1]);
