app.controller(
  "statisticalCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    $rootScope.userMenu = false;
    $rootScope.statisticalMenu = true;
    $rootScope.artistMenu = false;
    $rootScope.typeSongMenu = false;
    $rootScope.accountMenu = false;
    $scope.getStatistical = () => {
      $http({
        method: "GET",
        url: `http://localhost:8090/admin/statistical`,
      }).then(
        function successCallback(response) {
          $scope.totalUser = response.data.totalUser;
          $scope.totalArtistVietNam = response.data.totalArtistVietNam;
          $scope.totalArtistNational = response.data.totalArtistNational;
          $scope.totalSong = response.data.totalSong;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    $scope.getStatistical();
  }
);
