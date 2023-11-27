import toast from "../js/toast.js";

app.controller(
  "uploadSongController",
  function ($http, $rootScope, $scope, $routeParams, globalService) {
    $scope.imageSong = "https://photo-zmp3.zmdcdn.me/album_default.png";
    $scope.listTypeSong = JSON.parse(localStorage.getItem("typeSong"));
    const account = JSON.parse(localStorage.getItem("account"));
    const jwt = account?.accessToken;
    $scope.selectedProduct = 1;
    $scope.loadFile = function (e) {
      const imageEl = document.getElementById("img-song");
      if (e.target.files && e.target.files[0]) {
        imageEl.src = URL.createObjectURL(e.target.files[0]);
        $scope.imageSong = e.target.files[0];
      }
    };
    $scope.addSong = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const account = JSON.parse(localStorage.getItem("account"));
      const userId = user?.userId;
      const isBan = user?.isBan;
      if (isBan) {
        return;
      } else {
        const audio = document.querySelector(".audio-preview");
        let data = new FormData();
        data.append("name", $scope.nameSong);
        data.append("desc", $scope.descSong);
        data.append("userId", userId);
        data.append("image", $scope.imageSong);
        data.append("source", $scope.source);
        data.append("duration", audio.duration);
        data.append("typeSongId", $scope.selectedProduct);
        $scope.showLoader = true;
        $http({
          method: "POST",
          url: `${APP_API}/song/add/${account.accountId}`,
          data: data,
          headers: {
            "Content-Type": undefined,
          },
        }).then(
          function successCallback(response) {
            $scope.showLoader = false;
            toast({
              title: "Thành công!",
              message: "Đăng bài hát thành công",
              type: "success",
              duration: 3000,
            });
            $scope.nameSong = "";
            $scope.descSong = "";
            $scope.imageSong = "https://photo-zmp3.zmdcdn.me/album_default.png";
            $scope.source = null;
            $scope.getListSongInStore();
            $scope.ShowFormInfoSong();
          },
          function errorCallback(response) {
            $scope.showLoader = false;
            toast({
              title: "Thất bại!",
              message: response.data,
              type: "error",
              duration: 5000,
            });
          }
        );
      }
    };
  }
);
