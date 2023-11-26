import Confirm from "../js/confirm.js";
import toast from "../js/toast.js";
app.controller(
  "userCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    $rootScope.userMenu = true;
    $rootScope.statisticalMenu = false;
    $rootScope.artistMenu = false;
    $rootScope.typeSongMenu = false;
    $rootScope.accountMenu = false;

    const account = localStorage.getItem("account");
    if (account) {
      $scope.getListUser();
    }
    $scope.handleRemoveUser = (user) => {
      const accountId = user.accountId;
      Confirm.open({
        title: "Thông báo",
        message: "Bạn có muốn xóa người dùng này không ?",
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
              $scope.getListUser();
            },
            function errorCallback(response) {
              toast({
                title: "Thất bại!",
                message: "Người dùng này đã có dữ liệu chỉ nên chặn",
                type: "error",
                duration: 5000,
              });
            }
          );
        },
      });
    };
  }
);
