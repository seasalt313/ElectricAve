module.exports = {
  name: "showTripController",
  func: function($scope, tripService, accountService, $state, $stateParams){

  console.log("show-trip controller working");

      $scope.trips = tripService.getTrips();

      $scope.getAccount = accountService.getAccount();

      $scope.getTripNames = tripService.getTrips();


  }
}
