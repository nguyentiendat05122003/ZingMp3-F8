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
    window.onload = () => {
      const listBtn = document.querySelectorAll(`.btn-page`);
      if (listBtn) {
        listBtn[0].classList.add("active");
      }
    };
    $scope.handleRemoveArtist = (artist) => {
      const accountId = artist.accountId;
      Confirm.open({
        title: "Thông báo",
        message: "Bạn có muốn xóa nghệ sĩ này không ?",
        onok: () => {
          $http({
            method: "DELETE",
            url: `http://localhost:8090/admin/account/${accountId}/delete`,
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
                message: "Ca sĩ này đã có dữ liệu chỉ nên chặn",
                type: "error",
                duration: 5000,
              });
            }
          );
        },
      });
    };
    $scope.handleChangeSearch = () => {
      const input = document.querySelector("#search-artist");
      $scope.valueSearch = input.value.trim();
      let value = input.value.trim();
      if (value !== "") {
        $scope.getListArtist(0, 0, $scope.valueSearch);
      } else {
        $scope.getListArtist();
      }
    };
  }
);
