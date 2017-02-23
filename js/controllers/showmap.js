module.exports = {
    name: "showmapcontroller",
    func: function($scope, tripService, accountService, $state, $stateParams, $interval) {

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
        tripService.showMap($stateParams.mapId).then(function(response) {

            L.geoJson(response.data.features[0]).addTo(map);
            console.log("starting coordinates");
            start = response.data.features[0].geometry.coordinates[0];

            console.log("ending coordinates:");
            let end = response.data.features[0].geometry.coordinates.pop();
            console.log(end);

            L.marker([start[1], start[0]]).addTo(map)
                .bindPopup()
                .openPopup();

            L.marker([end[1], end[0]]).addTo(map)
                .bindPopup()
                .openPopup();

            map.setView([start[1], start[0]], 13);

            // Add markers to map
            // Ionicons
            L.AwesomeMarkers.Icon.prototype.options.prefix = 'ion';

            for (let i = 1; i < response.data.features.length; i++) {
                console.log(response.data.features[i].geometry.coordinates);
                let long = response.data.features[i].geometry.coordinates[0];
                let lat = response.data.features[i].geometry.coordinates[1];

                L.marker([lat, long], {
                    icon: L.AwesomeMarkers.icon({
                        icon: 'flash',
                        iconColor: '#ff9200',
                        markerColor: 'white'
                    })
                }).addTo(map);
            }



        });


        $interval(function() {
            tripService.showLocation().then(function(location) {
                console.log('circle at');
                console.log(location);

                L.circle(L.latLng(location[0], location[1]), 200, {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 200
                }).addTo(map);
            });
        }, 30000);




        function onMapClick(e) {
            prompt("You clicked the map at " + e.latlng + ". Would you like to leave a note?");
        }

        map.on('click', onMapClick);

        $scope.viewAccount = accountService.getAccount();
        $scope.postNote = accountService.postNote();

    }

}
