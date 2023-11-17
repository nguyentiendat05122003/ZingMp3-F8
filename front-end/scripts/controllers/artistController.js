import convertTime from "../../util/covertTime.js";
app.controller(
  "artistCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    $rootScope.homeMenu = false;
    $rootScope.discoverMenu = false;
    $rootScope.followMenu = false;
    $rootScope.storeMenu = false;
    const artistId = $routeParams.artistId;
    $scope.getListSong = () => {
      $http({
        method: "GET",
        url: `http://localhost:3002/song/artist/${artistId}`,
      }).then(
        function successCallback(response) {
          $scope.artist = response.data[0];
          const listSong = JSON.parse(response.data[0].list_json_song);
          if (!listSong) return;
          [...listSong].forEach((song) => {
            song.duration = convertTime(song.duration);
          });

          $scope.songsOfArtist = listSong;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    $scope.getListSong();
    $scope.clickSongOfArtist = () => {
      $http({
        method: "GET",
        url: `http://localhost:3002/song/artist/${artistId}`,
      }).then(
        function successCallback(response) {
          $scope.artist = response.data[0];
          const listSong = JSON.parse(response.data[0].list_json_song);
          if (!listSong) return;
          [...listSong].forEach((song) => {
            song.duration = convertTime(song.duration);
            song.nameArtist = response.data[0].name;
          });
          console.log(listSong);
          $rootScope.songs = listSong;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
  }
);
