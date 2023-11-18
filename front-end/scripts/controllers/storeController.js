import convertTime from "../../util/covertTime.js";
import toast from "../js/toast.js";
import Confirm from "../js/confirm.js";
app.controller("storeCtrl", function ($http, $rootScope, $scope, $window) {
  $rootScope.homeMenu = false;
  $rootScope.discoverMenu = false;
  $rootScope.followMenu = false;
  $rootScope.storeMenu = true;
  $rootScope.typeSongMenu = false;
  const account = JSON.parse(localStorage.getItem("account"));
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
        $scope.listSongInStore = listSong;
      },
      function errorCallback(response) {
        console.log(response);
      }
    );
  };
  if (user) {
    $scope.getListSong();
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
            $scope.getListSong();
            toast({
              title: "Thành công!",
              message: response.data,
              type: "success",
              duration: 2000,
            });
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
});
