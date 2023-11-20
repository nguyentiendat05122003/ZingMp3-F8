app.controller(
  "typeSongCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    $rootScope.userMenu = false;
    $rootScope.statisticalMenu = false;
    $rootScope.artistMenu = false;
    $rootScope.typeSongMenu = true;
    $rootScope.accountMenu = false;
    const account = localStorage.getItem("account");
    $scope.getListTypeSong = () => {
      $http({
        method: "GET",
        url: `http://localhost:8090/admin/typeSong`,
      }).then(
        function successCallback(response) {
          $scope.typeSongList = response.data;
          $scope.typeSongQuantity = response.data.length;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };

    if (account) {
      $scope.getListTypeSong();
    }
  }
);
