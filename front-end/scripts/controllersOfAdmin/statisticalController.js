app.controller(
  "statisticalCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    $rootScope.userMenu = false;
    $rootScope.statisticalMenu = true;
    $rootScope.artistMenu = false;
    $rootScope.typeSongMenu = false;
    $rootScope.accountMenu = false;
  }
);
