app.controller(
  "userCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    $rootScope.userMenu = true;
    $rootScope.statisticalMenu = false;
  }
);
