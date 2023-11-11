import listSong from "../../data/InfoSong.js";
import playlists from "../../data/StoragePlayLists.js";
import singers from "../../data/StorageSinger.js";
app.controller("homeCtrl", function ($http, $rootScope, $scope, $window) {
  $rootScope.homeMenu = true;
  $rootScope.discoverMenu = false;
  $rootScope.followMenu = false;
  $rootScope.storeMenu = false;
  //call api
  $rootScope.songs = listSong;
  $rootScope.playLists = playlists;
  $rootScope.singers = singers;

  const account = JSON.parse(localStorage.getItem("account"));
  if (!account) {
    if (window.confirm("Hãy đăng nhập để có thể truy cập")) {
      $window.location.href = "./views/auth.html";
    } else {
      $window.location.href = "#/discover";
    }
  }

  //check account
});
