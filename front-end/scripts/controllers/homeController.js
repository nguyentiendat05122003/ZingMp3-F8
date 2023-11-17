import convertTime from "../../util/covertTime.js";
app.controller("homeCtrl", function ($http, $rootScope, $scope, $window) {
  $rootScope.homeMenu = true;
  $rootScope.discoverMenu = false;
  $rootScope.followMenu = false;
  $rootScope.storeMenu = false;
  $rootScope.typeSongMenu = false;
  const account = JSON.parse(localStorage.getItem("account"));
  $scope.getListArtist();
  $scope.changeListSong = (playList) => {
    const playListId = playList.playListId;
    $http({
      method: "GET",
      url: `http://localhost:3002/playListSong/${playListId}`,
    }).then(
      function successCallback(response) {
        const listSong = response.data;
        [...listSong].forEach((song) => {
          song.duration = convertTime(song.duration);
        });
        $scope.songs = listSong;
        localStorage.setItem("listSongs", JSON.stringify(listSong));
      },
      function errorCallback(response) {
        console.log(response);
      }
    );
  };
  if (!account) {
    if (window.confirm("Hãy đăng nhập để có thể truy cập")) {
      $window.location.href = "./views/auth.html";
    } else {
      $window.location.href = "#/discover";
    }
  }
  $scope.getListSong = () => {
    $http({
      method: "GET",
      url: "http://localhost:3002/song",
    }).then(
      function successCallback(response) {
        const listSong = response.data;
        [...listSong].forEach((song) => {
          song.duration = convertTime(song.duration);
        });
        $scope.listSong = listSong;
      },
      function errorCallback(response) {
        console.log(response);
      }
    );
  };
  $scope.getListSong();
});
