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
    setTimeout(() => {
      const listBtn = document.querySelectorAll(`.btn-page`);
      if (listBtn) {
        listBtn[0].classList.add("active");
      }
    }, 100);
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

    $scope.updateMultiple = () => {
      $http({
        method: "POST",
        url: `http://localhost:3001/user/editMultiple`,
        data: JSON.stringify($rootScope.listTempDataUpdate),
      }).then(
        function successCallback(response) {
          toast({
            title: "Thành công!",
            message: response.data,
            type: "success",
            duration: 2000,
          });
          $scope.getListArtist();
          $rootScope.listTempDataUpdate = [];
        },
        function errorCallback(response) {}
      );
    };
    $scope.handelChangeInput = (index, id) => {
      const element = document.querySelectorAll(`.input-${id}`);
      let tmpList = $rootScope.listTempDataUpdate.filter(
        (item) => item.userId !== id
      );
      let numberIsExist = $rootScope.listTempDataUpdate.filter(
        (item) => item.userId === id
      );
      switch (index) {
        case 0:
          if (numberIsExist.length === 0) {
            const newItem = {
              userId: id,
              name: element[0].value,
              email: element[1].dataset.email,
              country: element[2].dataset.country,
            };
            $rootScope.listTempDataUpdate = [
              ...$rootScope.listTempDataUpdate,
              newItem,
            ];
          } else {
            const newItem = {
              userId: id,
              name: element[0].value,
              email: element[1].dataset.email,
              country: element[2].dataset.country,
            };
            $rootScope.listTempDataUpdate = [...tmpList, newItem];
          }

          break;
        case 1:
          if (numberIsExist.length === 0) {
            const newItem = {
              userId: id,
              name: element[0].dataset.name,
              email: element[1].value,
              country: element[2].dataset.country,
            };
            $rootScope.listTempDataUpdate = [
              ...$rootScope.listTempDataUpdate,
              newItem,
            ];
          } else {
            const newItem = {
              userId: id,
              name: element[0].dataset.name,
              email: element[1].value,
              country: element[2].dataset.country,
            };
            $rootScope.listTempDataUpdate = [...tmpList, newItem];
          }
          break;
        case 2:
          if (numberIsExist.length === 0) {
            const newItem = {
              userId: id,
              name: element[index].dataset.name,
              email: element[1].dataset.email,
              country: element[2].value,
            };
            $rootScope.listTempDataUpdate = [
              ...$rootScope.listTempDataUpdate,
              newItem,
            ];
          } else {
            const newItem = {
              userId: id,
              name: element[index].dataset.name,
              email: element[1].dataset.email,
              country: element[2].value,
            };
            $rootScope.listTempDataUpdate = [...tmpList, newItem];
          }
          break;
        default:
          break;
      }
    };
  }
);
