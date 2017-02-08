module.exports = {
  name: "loginController",
  func: function($scope, accountService){
    console.log("account controller working");
    $scope.makeAccount = function(name, email, pass, car){
      accountService.makeAccount(name, email, pass, car);
    }
    $scope.login = function(email, pass){
      accountService.loginAccount(email, pass);
    }
  }
}
