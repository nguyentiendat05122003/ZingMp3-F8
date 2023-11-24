import convertTime from "../../util/covertTime.js";
import toast from "../js/toast.js";
app.controller(
  "homeCtrl",
  function ($http, $rootScope, $scope, $window, globalService) {
    $rootScope.homeMenu = true;
    $rootScope.discoverMenu = false;
    $rootScope.followMenu = false;
    $rootScope.storeMenu = false;
    $rootScope.typeSongMenu = false;
    const account = JSON.parse(localStorage.getItem("account"));
    if (!account) {
      if (window.confirm("Hãy đăng nhập để có thể truy cập")) {
        return ($window.location.href = "./views/auth.html");
      } else {
        return ($window.location.href = "#/discover");
      }
    }
    $scope.changeListSong = (playList) => {
      const playListId = playList.playListId;
      globalService.ajaxGet(
        `playListSong/${playListId}`,
        {},
        function (data, status, config) {
          const listSong = data;
          [...listSong].forEach((song) => {
            song.duration = convertTime(song.duration);
          });
          $scope.songs = listSong;
          localStorage.setItem("listSongs", JSON.stringify(listSong));
        }
      );
    };
    $scope.getListSong = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId;
      globalService.ajaxGet(
        `favoriteSong/${userId}`,
        {},
        function (data, status, config) {
          const listSong = data;
          console.log(listSong);
          [...listSong].forEach((song) => {
            song.duration = convertTime(song.duration);
          });
          $scope.listSong = listSong;
        }
      );
    };
    $scope.getListArtistFollow = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId;
      globalService.ajaxGet(
        `follow/artist/${userId}`,
        {},
        function (data, status, config) {
          $scope.listArtist = data;
        }
      );
    };
    $scope.getListSong();
    $scope.getListArtistFollow();
    $scope.getListPlayList();

    $scope.handleRemoveFavoriteSong = (song) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.userId;
      const songId = song.songId;
      $http({
        method: "DELETE",
        url: `http://localhost:8090/user/favoriteSong/delete?songId=${songId}&userId=${userId}`,
      }).then(
        function successCallback(response) {
          toast({
            title: "Thành công!",
            message: "Xóa thành công",
            type: "success",
            duration: 2000,
          });
          $scope.getListSong();
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
  }
);
