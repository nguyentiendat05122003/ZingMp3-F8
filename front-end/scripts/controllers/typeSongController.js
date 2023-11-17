import convertTime from "../../util/covertTime.js";
app.controller("typeSongCtrl", function ($http, $rootScope, $scope, $window) {
  $rootScope.homeMenu = false;
  $rootScope.discoverMenu = false;
  $rootScope.followMenu = false;
  $rootScope.storeMenu = false;
  $rootScope.typeSongMenu = true;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;
  $scope.getListSongFollowType = () => {
    $http({
      method: "GET",
      url: `http://localhost:3002/song/typeSong`,
    }).then(
      function successCallback(response) {
        response.data.forEach((item) => {
          item.songListJson = JSON.parse(item.songListJson);
          [...item.songListJson].forEach((song) => {
            song.duration = convertTime(song.duration);
          });
        });
        console.log(response.data);
        $scope.listFollowType = response.data;
      },
      function errorCallback(response) {
        console.log(response);
      }
    );
  };
  $scope.playSongFollowType = (listSong) => {
    $rootScope.songs = listSong;
  };
  $scope.getListSongFollowType();
});
