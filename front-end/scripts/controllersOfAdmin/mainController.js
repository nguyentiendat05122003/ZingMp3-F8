app.controller(
  "mainController",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    $scope.logOut = () => {
      localStorage.removeItem("account");
      localStorage.removeItem("user");
      $window.location.href = "./views/auth.html";
    };
  }
);
