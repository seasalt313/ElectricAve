module.exports = {
  name: "createTripController",
  func: function($scope, tripService){
    console.log("create trip controller working");
    $scope.postTrip = function(name, from, to){
      tripService.postTrip(name, from, to)
    }
    $scope.getTripNames = tripService.getTripNames();
  }
}
