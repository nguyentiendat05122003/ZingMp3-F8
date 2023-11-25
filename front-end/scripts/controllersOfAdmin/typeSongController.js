import toast from "../js/toast.js";
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
    $scope.addType = () => {
      const input = document.querySelector("#typeSongName");
      const value = input.value;
      if (value.trim() == "") {
        return;
      } else {
        const data = { name: value };
        $http({
          method: "POST",
          url: `http://localhost:8090/admin/typeSong/add`,
          data: JSON.stringify(data),
        }).then(
          function successCallback(response) {
            toast({
              title: "Thành công!",
              message: response.data,
              type: "success",
              duration: 2000,
            });
            $scope.getListTypeSong();
            input.value = "";
          },
          function errorCallback(response) {
            console.log(response);
          }
        );
      }
    };

    $scope.deleteTypeSong = (type) => {
      const typeId = type?.typeSongId;
      $http({
        method: "DELETE",
        url: `http://localhost:8090/admin/typeSong/${typeId}/delete`,
      }).then(
        function successCallback(response) {
          toast({
            title: "Thành công!",
            message: response.data,
            type: "success",
            duration: 2000,
          });
          $scope.getListTypeSong();
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
  }
);
