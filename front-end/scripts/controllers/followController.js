app.controller(
  "followCtrl",
  function ($http, $rootScope, $scope, $routeParams) {
    $rootScope.homeMenu = false;
    $rootScope.discoverMenu = false;
    $rootScope.followMenu = true;
    $rootScope.storeMenu = false;
    $rootScope.typeSongMenu = false;
  }
);
