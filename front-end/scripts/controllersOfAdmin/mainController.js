import toast from "../js/toast.js";
app.controller(
  "mainController",
  function ($http, $rootScope, $scope, $window, $routeParams, $timeout) {
    $scope.nameUser = "";
    $scope.isHideFormArtist = true;
    $scope.nameAccount = "";
    $scope.passwordAccount = "";
    $scope.emailUser = "";
    $scope.isHideFormInfoUser = true;
    $scope.isHideFormAccount = true;
    $scope.isHideFormChangePassword = true;
    $scope.nameUserAccount = "";
    $scope.emailUserAccount = "";
    $scope.nameLogin = "";
    $scope.passwordLogin = "";
    $scope.oldPassword = "";
    $scope.newPassword = "";
    $scope.logOut = () => {
      localStorage.removeItem("account");
      localStorage.removeItem("user");
      $window.location.href = "./views/auth.html";
    };
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
            message: "Bạn đã đăng ký thành công.",
            type: "success",
            duration: 5000,
          });
          $scope.updateUser(response.data.accountId, 2);
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

    $scope.updateUser = (accountId, typeAccountId) => {
      let data = new FormData();
      if (typeAccountId === 2) {
        data.append("name", $scope.nameUser);
        data.append("email", $scope.emailUser);
        data.append("isBan", 0);
        data.append("accountId", accountId);
      } else if (typeAccountId === 1) {
        data.append("name", $scope.nameUserAccount);
        data.append("email", $scope.emailUserAccount);
        data.append("isBan", 0);
        data.append("accountId", accountId);
      }
      $http({
        method: "PUT",
        url: `http://localhost:3002/user/edit`,
        data: data,
        headers: { "Content-Type": undefined },
      }).then(
        function successCallback(response) {
          if (typeAccountId === 1) {
            $scope.getListUser();
            $scope.nameUserAccount = "";
            $scope.emailUserAccount = "";
            $scope.nameLogin = "";
            $scope.passwordLogin = "";
            $scope.isHideFormAccount = !$scope.isHideFormAccount;
          } else if (typeAccountId === 2) {
            $scope.getListArtist();
            $scope.nameUser = "";
            $scope.emailUser = "";
            $scope.passwordAccount = "";
            $scope.emailUser = "";
          }
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

    $scope.getInfoUser = () => {
      const account = JSON.parse(localStorage.getItem("account"));
      const accountId = account.account.accountId;
      $http({
        method: "GET",
        url: `http://localhost:8090/user/user/${accountId}`,
      }).then(
        function successCallback(response) {
          const user = response.data[0];
          const { name, country, email } = user;
          console.log(user);
          $scope.username = name;
          $scope.country = country;
          $scope.email = email;
          localStorage.setItem("user", JSON.stringify(user));
          $rootScope.infoAccount = user;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };

    $scope.getInfoUser();

    $scope.showFromUser = () => {
      $scope.isHideFormInfoUser = false;
      const user = JSON.parse(localStorage.getItem("user"));
      $scope.nameOfAccount = user.name;
      $scope.emailAccount = user.email;
      $scope.countryAccount = user.country;
    };
    $scope.showFromAccount = () => {
      $scope.isHideFormAccount = !$scope.isHideFormAccount;
    };
    $scope.showFromChangePassword = () => {
      $scope.isHideFormChangePassword = !$scope.isHideFormChangePassword;
    };
    $scope.hideShowFromUser = () => {
      $scope.isHideFormInfoUser = true;
    };

    $scope.updateInfoUser = () => {
      const account = JSON.parse(localStorage.getItem("account"));
      const accountId = account.account.accountId;
      let data = new FormData();
      data.append("name", $scope.nameOfAccount);
      data.append("email", $scope.emailAccount);
      data.append("country", $scope.countryAccount);
      data.append("isBan", 0);
      data.append("accountId", accountId);
      $http({
        method: "PUT",
        url: `http://localhost:3002/user/edit`,
        data: data,
        headers: { "Content-Type": undefined },
      }).then(
        function successCallback(response) {
          toast({
            title: "Thành công!",
            message: "Bạn đã lưu thông tin thành công",
            type: "success",
            duration: 5000,
          });
          $scope.getInfoUser();
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
    };

    $scope.addAccount = () => {
      let data = {
        username: $scope.nameLogin,
        password: $scope.passwordLogin,
        typeAccountId: 1,
      };
      $http({
        method: "POST",
        url: "http://localhost:8090/auth/register",
        data: JSON.stringify(data),
      }).then(
        function successCallback(response) {
          toast({
            title: "Thành công!",
            message: "Bạn đã đăng ký thành công",
            type: "success",
            duration: 3000,
          });
          $scope.updateUser(response.data.accountId, 1);
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
    $scope.getListUser = (page_index = 0, page_size = 0, name = "") => {
      $http({
        method: "GET",
        url: `http://localhost:8090/user/typeAccount/1?page_index=${page_index}&page_size=${page_size}&name=${name}`,
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

    $scope.handleClickChangePassword = () => {
      let data = {
        oldPassword: $scope.oldPassword,
        newPassword: $scope.newPassword,
      };
      const account = JSON.parse(localStorage.getItem("account"));
      const accountId = account.account.accountId;
      $http({
        method: "POST",
        url: `http://localhost:8090/admin/account/${accountId}/changePassword`,
        data: JSON.stringify(data),
      }).then(
        function successCallback(response) {
          toast({
            title: "Thành công!",
            message: "Bạn đã đổi mật khẩu thành công",
            type: "success",
            duration: 3000,
          });
          $scope.oldPassword = "";
          $scope.newPassword = "";
          $scope.isHideFormChangePassword = !$scope.isHideFormChangePassword;
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
    };
  }
);
