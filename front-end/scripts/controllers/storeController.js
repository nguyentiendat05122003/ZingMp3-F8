import convertTime from "../../util/covertTime.js";
app.controller("storeCtrl", function ($http, $rootScope, $scope, $window) {
  $rootScope.homeMenu = false;
  $rootScope.discoverMenu = false;
  $rootScope.followMenu = false;
  $rootScope.storeMenu = true;
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;
  $scope.getListSong = () => {
    $http({
      method: "GET",
      url: `http://localhost:3002/song/artist/${userId}`,
    }).then(
      function successCallback(response) {
        $scope.nameSinger = response.data[0].name;
        const listSong = JSON.parse(response.data[0].list_json_song);
        [...listSong].forEach((song) => {
          song.duration = convertTime(song.duration);
        });
        $scope.songs = listSong;
      },
      function errorCallback(response) {
        console.log(response);
      }
    );
  };
  if (user) {
    $scope.getListSong();
  }
});
