import convertTime from "../../util/covertTime.js";
import toast from "../js/toast.js";
import Confirm from "../js/confirm.js";
app.controller(
  "storeCtrl",
  function ($http, $rootScope, $scope, $window, globalService) {
    $rootScope.homeMenu = false;
    $rootScope.discoverMenu = false;
    $rootScope.followMenu = false;
    $rootScope.storeMenu = true;
    $rootScope.typeSongMenu = false;
    const account = JSON.parse(localStorage.getItem("account"));
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    if (user) {
      $scope.getListSongInStore();
    }
    $scope.deleteSong = (song) => {
      const songId = song.songId;
      const jwt = account?.accessToken;
      const accountId = account?.account.accountId;
      Confirm.open({
        title: "Thông báo",
        message: "Bạn có muốn xóa bài hát này không ?",
        onok: () => {
          $http({
            method: "DELETE",
            url: `http://localhost:3002/song/${accountId}/delete/${songId}`,
          }).then(
            function successCallback(response) {
              toast({
                title: "Thành công!",
                message: response.data,
                type: "success",
                duration: 2000,
              });
              $scope.getListSongInStore();
            },
            function errorCallback(response) {
              toast({
                title: "Thất bại!",
                message: response.data,
                type: "error",
                duration: 5000,
              });
            }
          );
        },
      });
    };
    $scope.runListSong = () => {
      $rootScope.songs = $scope.listSongInStore;
    };
  }
);
