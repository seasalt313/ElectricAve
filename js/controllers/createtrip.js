module.exports = {
  name: "createTripController",
  func: function($scope, tripService){
    console.log("create trip controller working");
    $scope.postTrip = function(name, from, to){
      tripService.postTrip(name, from, to) //this should return the map coordinates? and send them to a differet page that will display the map ** luke
    }
    $scope.getTripNames = tripService.getTrips();

    $scope.map = tripService.showLeaflet();

  }
}
