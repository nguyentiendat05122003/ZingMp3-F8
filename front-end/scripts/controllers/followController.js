app.controller(
  "followCtrl",
  function ($http, $rootScope, $scope, $routeParams, $window) {
    $rootScope.homeMenu = false;
    $rootScope.discoverMenu = false;
    $rootScope.followMenu = true;
    $rootScope.storeMenu = false;
    $rootScope.typeSongMenu = false;
    const account = JSON.parse(localStorage.getItem("account"));
    if (!account) {
      if (window.confirm("Hãy đăng nhập để có thể truy cập")) {
        return ($window.location.href = "./views/auth.html");
      } else {
        $window.location.href = "#/discover";
      }
    }
  }
);
