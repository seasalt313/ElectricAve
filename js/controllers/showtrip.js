module.exports = {
  name: "showTripController",
  func: function($scope, tripService, accountService, $state){
    console.log("trip controller working");

      $scope.showMap = function(trip){
        tripService.showMap(trip);
      }

      $scope.trips = tripService.getTrips();

      $scope.getAccount = accountService.getAccount();
  }
}
