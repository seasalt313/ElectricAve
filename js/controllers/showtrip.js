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
