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
