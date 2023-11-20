import Confirm from "../js/confirm.js";
import toast from "../js/toast.js";
app.controller(
  "artistCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    $rootScope.userMenu = false;
    $rootScope.statisticalMenu = false;
    $rootScope.artistMenu = true;
    $rootScope.typeSongMenu = false;
    $rootScope.accountMenu = false;

    const account = localStorage.getItem("account");
    $scope.getListArtist = () => {
      $http({
        method: "GET",
        url: `http://localhost:8090/user/typeAccount/2`,
      }).then(
        function successCallback(response) {
          [...response.data].forEach((item) => {
            item.isBan = item.isBan ? "Ban" : "";
          });
          $scope.listArtist = response.data;
          $scope.qualityArtist = response.data.length;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    if (account) {
      $scope.getListArtist();
    }
    $scope.handleBanAccount = (artist) => {
      const artistId = artist.userId;
      const isBan = artist.isBan;
      if (isBan) {
        Confirm.open({
          title: "Thông báo",
          message: "Bạn có bỏ chặn nghệ sĩ này không ?",
          onok: () => {
            $http({
              method: "POST",
              url: `http://localhost:8090/admin/banAccount/delete/${artistId}`,
            }).then(
              function successCallback(response) {
                toast({
                  title: "Thành công!",
                  message: response.data,
                  type: "success",
                  duration: 2000,
                });
                $scope.getListArtist();
              },
              function errorCallback(response) {
                toast({
                  title: "Thất bại!",
                  message: response.data,
                  type: "error",
                  duration: 5000,
                });
              }
            );
          },
        });
      } else {
        Confirm.open({
          title: "Thông báo",
          message: "Bạn có muốn chặn nghệ sĩ này không ?",
          onok: () => {
            $http({
              method: "POST",
              url: `http://localhost:8090/admin/banAccount/add/${artistId}`,
            }).then(
              function successCallback(response) {
                toast({
                  title: "Thành công!",
                  message: response.data,
                  type: "success",
                  duration: 2000,
                });
                $scope.getListArtist();
              },
              function errorCallback(response) {
                toast({
                  title: "Thất bại!",
                  message: response.data,
                  type: "error",
                  duration: 5000,
                });
              }
            );
          },
        });
      }
    };
  }
);
