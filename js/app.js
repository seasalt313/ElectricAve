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
