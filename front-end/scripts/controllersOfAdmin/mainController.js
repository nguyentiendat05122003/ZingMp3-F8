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
    $rootScope.listTempDataUpdate = [];
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
            $scope.nameAccount = "";
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
          if (response.data) {
            [...response.data].forEach((item) => {
              item.isBan = item.isBan ? "Ban" : "";
            });
            let data = response.data;
            if ($rootScope.listTempDataUpdate.length > 0) {
              for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < $rootScope.listTempDataUpdate.length; j++) {
                  if (
                    data[i].userId === $rootScope.listTempDataUpdate[j].userId
                  ) {
                    data[i] = {
                      ...data[i],
                      ...$rootScope.listTempDataUpdate[j],
                    };
                  }
                }
              }
            }

            $scope.listArtist = data;
            $scope.qualityArtist = data[0].RecordCount;
            $scope.renderPage(data[0].RecordCount);
          }
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };

    $scope.renderPage = (totalPage) => {
      $scope.pageNumber = Math.ceil(totalPage / 7);
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
          $rootScope.listUser = response.data;
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

    $scope.renderChart = () => {
      var listsale = document.getElementsByClassName("sales");
      var listsalew = document.getElementsByClassName("sales_week");
      function Bieutuan() {
        var chart = new CanvasJS.Chart("chartContainerTuan", {
          animationEnabled: true,
          theme: "light2",
          title: {
            text: "Thống kê theo tuần",
            fontWeight: "bolder",
            fontColor: "#008B8B",
            fontfamily: "tahoma",
            fontSize: 30,
            padding: 10,
          },
          data: [
            {
              type: "column",
              dataPoints: [
                { label: "Thứ 2", y: 46 },
                { label: "Thứ 3", y: 87 },
                { label: "Thứ 4", y: 76 },
                { label: "Thứ 5", y: 39 },
                { label: "Thứ 6", y: 87 },
                { label: "Thứ 7", y: 42 },
                { label: "Chủ nhật", y: 60 },
              ],
            },
          ],
        });
        chart.render();
      }
      function Bieuthang() {
        var chart = new CanvasJS.Chart("chartContainerthang", {
          animationEnabled: true,
          theme: "light2",
          title: {
            text: "Thống kê theo tháng",
            fontWeight: "bolder",
            fontColor: "#008B8B",
            fontfamily: "tahoma",
            fontSize: 25,
            padding: 10,
          },
          data: [
            {
              type: "column",
              dataPoints: [
                { label: "1", y: 46 },
                { label: "2", y: 27 },
                { label: "3", y: 26 },
                { label: "4", y: 39 },
                { label: "5", y: 37 },
                { label: "6", y: 42 },
                { label: "7", y: 60 },
                { label: "8", y: 91 },
                { label: "9", y: 82 },
                { label: "10", y: 79 },
                { label: "11", y: 76 },
                { label: "12", y: 72 },
                { label: "13", y: 26 },
                { label: "14", y: 39 },
                { label: "15", y: 37 },
                { label: "16", y: 42 },
                { label: "17", y: 60 },
                { label: "18", y: 91 },
                { label: "19", y: 82 },
                { label: "20", y: 79 },
                { label: "21", y: 76 },
                { label: "22", y: 72 },
                { label: "23", y: 26 },
                { label: "24", y: 39 },
                { label: "25", y: 37 },
                { label: "26", y: 42 },
                { label: "27", y: 60 },
                { label: "28", y: 91 },
                { label: "29", y: 82 },
                { label: "30", y: 79 },
              ],
            },
          ],
        });
        chart.render();
      }
      function Bieunam() {
        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          theme: "light2",
          title: {
            text: "Thống kê theo năm",
            fontWeight: "bolder",
            fontColor: "#008B8B",
            fontfamily: "tahoma",
            fontSize: 25,
            padding: 10,
          },
          data: [
            {
              type: "column",
              padding: 20,
              dataPoints: [
                { label: "Tháng 1", y: 46 },
                { label: "Tháng 2", y: 27 },
                { label: "Tháng 3", y: 26 },
                { label: "Tháng 4", y: 39 },
                { label: "Tháng 5", y: 37 },
                { label: "Tháng 6", y: 42 },
                { label: "Tháng 7", y: 60 },
                { label: "Tháng 8", y: 91 },
                { label: "Tháng 9", y: 82 },
                { label: "Tháng 10", y: 79 },
                { label: "Tháng 11", y: 76 },
                { label: "Tháng 12", y: 72 },
              ],
            },
          ],
        });
        chart.render();
      }
      function Thongke() {
        if ($("#txt_over").val() == "tuan") {
          [...listsale].forEach((item) => {
            item.style.display = "none";
          });

          [...listsalew].forEach((item) => {
            item.style.display = "none";
          });
          listsale[0].style.display = "block";
          listsalew[0].style.display = "grid";
          Bieutuan();
        }
        if ($("#txt_over").val() == "thang") {
          for (x of listsale) {
            x.style.display = "none";
          }
          for (y of listsalew) {
            y.style.display = "none";
          }
          listsale[1].style.display = "block";
          listsalew[1].style.display = "grid";
          Bieuthang();
        }
        if ($("#txt_over").val() == "nam") {
          for (x of listsale) {
            x.style.display = "none";
          }
          for (y of listsalew) {
            y.style.display = "none";
          }
          listsale[2].style.display = "block";
          listsalew[2].style.display = "grid";
          Bieunam();
        }
      }
      Thongke();
    };
    window.onload = () => {
      $scope.renderChart();
    };
  }
);
