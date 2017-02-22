module.exports = {
  name: "showTripController",
  func: function($scope, tripService, accountService, $state, $stateParams){

  console.log("show-trip controller working");

      $scope.trips = tripService.getTrips($stateParams.userId);

      $scope.getAccount = accountService.getAccount();

  }
}
