import convertTime from "../../util/covertTime.js";
app.controller(
  "typeSongCtrl",
  function ($http, $rootScope, $scope, $window, globalService) {
    $rootScope.homeMenu = false;
    $rootScope.discoverMenu = false;
    $rootScope.followMenu = false;
    $rootScope.storeMenu = false;
    $rootScope.typeSongMenu = true;
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    $scope.getListSongFollowType = () => {
      globalService.ajaxGet(
        `song/typeSong`,
        {},
        function (data, status, config) {
          data.forEach((item) => {
            item.songListJson = JSON.parse(item.songListJson);
            [...item.songListJson].forEach((song) => {
              song.duration = convertTime(song.duration);
            });
          });
          $scope.listFollowType = data;
        }
      );
    };
    $scope.playSongFollowType = (listSong) => {
      $rootScope.songs = listSong;
    };
    $scope.getListSongFollowType();
  }
);
