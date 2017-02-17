module.exports = {
  name: "showmapcontroller",
  func: function($scope,tripService, accountService, $state, $stateParams){

    console.log("show map controller working");

    tripService.showMap($stateParams.mapId);

    //USING LEAFLET//
    var map = L.map('map').setView([35.2271, -80.8431], 13);
    //
    L.tileLayer('https://api.mapbox.com/styles/v1/seasalt/ciz05osm200022srz742acakx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2Vhc2FsdCIsImEiOiJjaXkzanV0c2UwMDEzMzNsamV1bmg0ZWVqIn0.mcvszUMDaLO4C8Ea9ytkOg', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.mapbox-traffic-v1',
    accessToken: 'pk.eyJ1Ijoic2Vhc2FsdCIsImEiOiJjaXkzanV0c2UwMDEzMzNsamV1bmg0ZWVqIn0.mcvszUMDaLO4C8Ea9ytkOg'
    }).addTo(map);

    // adding popup// wanna add current location here:

    // let location = tripService.showLocation();
    // L.marker([location]).addTo(map)
    // .bindPopup('Your current location')
    // .openPopup();

    L.marker([35.2271, -80.8431]).addTo(map)
    .bindPopup('Charlotte!')
    .openPopup();

    ///////////////////////////

        // tripService.showMap().then(function (response) {
        //     L.geoJson(response.data).addTo(map);
        //     console.log("starting coordinates");
        //   //   start = response.data.features[0].geometry.coordinates[0];
        //    //
        //   //   console.log(start);
        //    //
        //    //
        //   //  let loc = tripService.showLocation();
        // });


  }
}
