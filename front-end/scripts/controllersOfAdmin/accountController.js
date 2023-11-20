app.controller(
  "accountCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    $rootScope.userMenu = false;
    $rootScope.statisticalMenu = false;
    $rootScope.artistMenu = false;
    $rootScope.typeSongMenu = false;
    $rootScope.accountMenu = true;
    const account = JSON.parse(localStorage.getItem("account"));
    const user = JSON.parse(localStorage.getItem("user"));
    $scope.getInfoAccount = () => {
      const info = { ...account, ...user };
      $scope.infoAccount = info.account;
    };
    if (account) {
      $scope.getInfoAccount();
    }
  }
);
