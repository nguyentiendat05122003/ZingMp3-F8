app.controller(
  "userCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    $rootScope.userMenu = true;
    $rootScope.statisticalMenu = false;
    $rootScope.artistMenu = false;
    $rootScope.typeSongMenu = false;
    $rootScope.accountMenu = false;

    const account = localStorage.getItem("account");
    $scope.getListUser = (page_index = 0, page_size = 0, name = "") => {
      $http({
        method: "GET",
        url: `http://localhost:8090/user/typeAccount/3?page_index=${page_index}&page_size=${page_size}&name=${name}`,
      }).then(
        function successCallback(response) {
          $scope.listUser = response.data;
          $scope.qualityUser = response.data.length;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    if (account) {
      $scope.getListUser();
    }
  }
);
