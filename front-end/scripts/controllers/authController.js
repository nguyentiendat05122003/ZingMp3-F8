import toast from "../js/toast.js";
angular
  .module("authController", [])
  .controller("authCtrl", function ($window, $http, $rootScope, $scope) {
    $scope.username = "";
    $scope.password = "";
    $scope.usernameLogin = "";
    $scope.passwordLogin = "";
    $scope.message = "";
    $scope.register = () => {
      let data = {
        username: $scope.username,
        password: $scope.password,
        typeAccountId: 3,
      };
      $http({
        method: "POST",
        url: "http://localhost:8090/auth/register",
        data: JSON.stringify(data),
      }).then(
        function successCallback(response) {
          toast({
            title: "Thành công!",
            message: "Bạn đã đăng ký thành công tài khoản tại F8.",
            type: "success",
            duration: 5000,
          });
        },
        function errorCallback(response) {
          if (
            response.data.errors[0].message ==
            "UQ__Accounts__F3DBC572C017D43E must be unique"
          ) {
            toast({
              title: "Thất bại!",
              message: "Tên tài khoản của bạn đã được đặt",
              type: "error",
              duration: 5000,
            });
          } else {
            toast({
              title: "Thất bại!",
              message: response.data,
              type: "error",
              duration: 5000,
            });
          }
        }
      );
    };
    $scope.login = async () => {
      let data = {
        username: $scope.usernameLogin,
        password: $scope.passwordLogin,
      };
      $scope.showLoader = true;
      $http({
        method: "POST",
        url: "http://localhost:8090/auth/login",
        data: JSON.stringify(data),
      }).then(
        function successCallback(response) {
          $scope.showLoader = false;
          toast({
            title: "Thành công!",
            message: "Đăng nhập thành công",
            type: "success",
            duration: 5000,
          });
          localStorage.setItem("account", JSON.stringify(response.data));
          const typeId = response.data.account.typeAccountId;
          if (typeId == 3 || typeId == 2) {
            $window.location.href = "../index.html";
          } else {
            $window.location.href = "../index2.html";
          }
        },
        function errorCallback(response) {
          $scope.showLoader = false;
          if (response.status == 0) {
          }

          toast({
            title: "Thất bại!",
            message: response.data,
            type: "error",
            duration: 5000,
          });
        }
      );
    };
  });
