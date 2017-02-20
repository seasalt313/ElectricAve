module.exports = {
  name: "createTripController",
  func: function($scope, tripService, accountService, $state){

    console.log("create-trip controller working");

    $scope.postTrip = function(tripName, startAddress, endAddress){
      tripService.postTrip(tripName, startAddress, endAddress)
        .then(function (id) {
          console.log("redirecting");
            $state.go('map', {
              mapId: id,
            });
        });
      },

    $scope.viewAccount = accountService.getAccount();
  }
}
