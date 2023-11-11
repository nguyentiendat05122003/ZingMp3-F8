import toast from "../js/toast.js";

app.controller(
  "uploadSongController",
  function ($http, $rootScope, $scope, $routeParams) {
    $scope.imageSong = "https://photo-zmp3.zmdcdn.me/album_default.png";
    $scope.listTypeSong = JSON.parse(localStorage.getItem("typeSong"));
    const account = JSON.parse(localStorage.getItem("account"));
    const jwt = account?.accessToken;
    $scope.nameSong = "";
    $scope.descSong = "";
    $scope.selectedProduct = 1;
    $scope.source = "";
    $scope.loadFile = function (e) {
      const imageEl = document.getElementById("img-song");
      if (e.target.files && e.target.files[0]) {
        imageEl.src = window.URL.createObjectURL(e.target.files[0]);
        $scope.imageSong = e.target.files[0];
      }
    };
    const audio = document.querySelector(".audio-preview");
    $scope.previewFile = () => {
      var preview = document.querySelector(".audio-preview");
      var file = document.querySelector(".input-audio").files[0];
      var reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          preview.src = reader.result;
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
        $scope.source = file;
      }
    };
    $scope.uploadSong = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId;
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
        url: "http://localhost:3002/song/add",
        data: data,
        headers: {
          "Content-Type": undefined,
          token: `Bearer ${jwt}`,
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
    };
  }
);
