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
