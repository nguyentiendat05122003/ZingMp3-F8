import toast from "../js/toast.js";
app.controller(
  "mainController",
  function ($http, $rootScope, $scope, $window, $routeParams, $timeout) {
    $scope.nameUser = "";
    $scope.nameAccount = "";
    $scope.passwordAccount = "";
    $scope.emailUser = "";
    $scope.logOut = () => {
      localStorage.removeItem("account");
      localStorage.removeItem("user");
      $window.location.href = "./views/auth.html";
    };
    $scope.isHideFormArtist = true;
    $scope.showFormArtist = (type) => {
      $scope.isHideFormArtist = false;
    };
    $scope.hideFormArtist = () => {
      $scope.isHideFormArtist = true;
    };
    $scope.addArtist = () => {
      let data = {
        username: $scope.nameAccount,
        password: $scope.passwordAccount,
        typeAccountId: 2,
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
          $scope.updateUser(response.data.accountId);
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

    $scope.updateUser = (accountId) => {
      let data = new FormData();
      data.append("name", $scope.nameUser);
      data.append("email", $scope.emailUser);
      data.append("isBan", 0);
      data.append("accountId", accountId);
      $http({
        method: "PUT",
        url: `http://localhost:3002/user/edit`,
        data: data,
        headers: { "Content-Type": undefined },
      }).then(
        function successCallback(response) {
          $scope.getListArtist();
          $scope.nameUser = "";
          $scope.emailUser = "";
          $scope.passwordAccount = "";
          $scope.emailUser = "";
        },
        function errorCallback(response) {}
      );
    };

    $scope.getListArtist = (page_index = 1, page_size = 7, name = "") => {
      $http({
        method: "GET",
        url: `http://localhost:8090/user/typeAccount/2?page_index=${page_index}&page_size=${page_size}&name=${name}`,
      }).then(
        function successCallback(response) {
          [...response.data].forEach((item) => {
            item.isBan = item.isBan ? "Ban" : "";
          });
          const data = response.data;
          $scope.listArtist = data;
          $scope.qualityArtist = data[0].RecordCount;
          $scope.renderPage(data[0].RecordCount);
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };

    $scope.renderPage = (totalPage) => {
      $scope.pageNumber = Math.ceil(totalPage / 5);
      const array = Array.from({ length: $scope.pageNumber }, (v, i) => i);
      $scope.listPage = array;
    };
    $scope.getListArtist();

    $scope.handleClickPage = (index) => {
      $scope.getListArtist(index + 1);
      const listBtn = document.querySelectorAll(`.btn-page`);
      [...listBtn].forEach((item, idx) => {
        if (index == idx) {
          const btnActive = document.querySelector(`.btn-page-${index}`);
          btnActive.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    };
    window.onload = () => {
      const listBtn = document.querySelectorAll(`.btn-page`);
      listBtn[0].classList.add("active");
    };
  }
);
