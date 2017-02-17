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
