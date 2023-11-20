app.controller(
  "artistCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    $rootScope.userMenu = false;
    $rootScope.statisticalMenu = false;
    $rootScope.artistMenu = true;
    $rootScope.typeSongMenu = false;
    $rootScope.accountMenu = false;
  }
);
