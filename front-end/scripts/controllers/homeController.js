import convertTime from "../../util/covertTime.js";
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
      globalService.ajaxGet(`song`, {}, function (data, status, config) {
        const listSong = data;
        [...listSong].forEach((song) => {
          song.duration = convertTime(song.duration);
        });
        $scope.listSong = listSong;
      });
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
  }
);
