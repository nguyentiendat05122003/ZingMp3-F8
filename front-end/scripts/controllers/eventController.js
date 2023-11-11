import toast from "../js/toast.js";
app.controller(
  "eventController",
  function ($http, $rootScope, $scope, $routeParams) {
    $scope.imageUser = "https://avatar.talk.zdn.vn/default";
    const account = JSON.parse(localStorage.getItem("account"));
    const accountId = account?.account.accountId;
    const typeAccount = account?.account.typeAccountId;
    $rootScope.loading = true;
    $rootScope.isLogin = account;
    $scope.IsHidden = true;
    $scope.IsShowDetailSong = true;
    $scope.listPlayList;
    $scope.IsShowPlayList = true;
    $scope.username = "";
    $scope.namePlayList = "";
    $scope.date = "";
    $scope.country = "";
    $scope.email = "";
    $scope.desc = "";
    $scope.getInfoUser = () => {
      $http({
        method: "GET",
        url: `http://localhost:3002/user/${accountId}`,
      }).then(
        function successCallback(response) {
          const user = response.data[0];
          const { name, birthDay, country, email, desc, image } = user;
          $scope.username = name;
          $scope.date = new Date(birthDay);
          $scope.country = country;
          $scope.email = email;
          $scope.desc = desc;
          $scope.imageUser = image;
          localStorage.setItem("user", JSON.stringify(user));
          console.log(user);
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    if (account) {
      $scope.getInfoUser();
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    if (typeAccount == 2) {
      $rootScope.isArtist = true;
    } else {
      $rootScope.isArtist = false;
    }
    $scope.ShowHide = function () {
      $scope.IsHidden = !$scope.IsHidden;
    };
    $scope.ShowDetailSong = function (id) {
      const detailSong = document.querySelector(`.list-detail-song-${id}`);
      if (detailSong.classList.contains("active")) {
        detailSong.classList.remove("active");
      } else {
        detailSong.classList.add("active");
      }
    };
    $scope.ShowHideCreatePlayList = function () {
      $scope.IsShowPlayList = !$scope.IsShowPlayList;
    };
    $scope.logOut = () => {
      localStorage.removeItem("account");
      localStorage.removeItem("user");
      $rootScope.isLogin = false;
      window.location.reload();
    };
    $scope.updateInfoUser = function () {
      let data = new FormData();
      data.append("name", $scope.username);
      data.append("birthDay", $scope.date);
      data.append("country", $scope.country);
      data.append("email", $scope.email);
      data.append("desc", $scope.desc);
      data.append("isBan", 0);
      data.append("accountId", accountId);
      data.append("image", $scope.imageUser);
      $http({
        method: "PUT",
        url: "http://localhost:3002/user/edit",
        data: data,
        headers: { "Content-Type": undefined },
      }).then(
        function successCallback(response) {
          $scope.getInfoUser();
          toast({
            title: "Thành công!",
            message: "Bạn đã lưu thông tin thành công",
            type: "success",
            duration: 5000,
          });
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
    $scope.hide = function () {
      $scope.IsHidden = true;
    };
    $scope.createNewPlayList = () => {
      const data = {
        userId: userId,
        name: $scope.namePlayList,
      };
      $http({
        method: "POST",
        url: "http://localhost:3002/playList/add",
        data: JSON.stringify(data),
      }).then(
        function successCallback(response) {
          $scope.namePlayList = "";
          toast({
            title: "Thành công!",
            message: "Đăng nhập thành công",
            type: "success",
            duration: 5000,
          });
          $scope.getListPlayList();
        },
        function errorCallback(response) {
          $scope.namePlayList = "";
          toast({
            title: "Thất bại!",
            message: response.data,
            type: "error",
            duration: 5000,
          });
        }
      );
    };
    $scope.getListPlayList = () => {
      $http({
        method: "GET",
        url: `http://localhost:3002/playList/${userId}`,
      }).then(
        function successCallback(response) {
          $scope.listPlayList = response.data;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    $rootScope.$on("CallParentMethod", function () {
      $scope.getListPlayList();
    });
    if (userId) {
      $scope.getListPlayList();
    }
    $scope.loadFile = function (e) {
      const imageEl = document.getElementById("img-user");
      if (e.target.files && e.target.files[0]) {
        imageEl.src = window.URL.createObjectURL(e.target.files[0]);
        $scope.imageUser = e.target.files[0];
      }
    };
    $scope.addSongIntoPlayList = (playListId, songId) => {
      const data = {
        playListId,
        songId,
      };
      $http({
        method: "POST",
        url: "http://localhost:3002/playListSong/add",
        data: JSON.stringify(data),
      }).then(
        function successCallback(response) {
          console.log(response);
          toast({
            title: "Thành công!",
            message: "Đăng nhập thành công",
            type: "success",
            duration: 2000,
          });
        },
        function errorCallback(response) {
          $scope.namePlayList = "";
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
