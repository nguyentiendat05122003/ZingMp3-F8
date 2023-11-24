import convertTime from "../../util/covertTime.js";
import toast from "../js/toast.js";
app.controller(
  "playListDetailCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams, globalService) {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    const playListId = $routeParams.playListId;
    $scope.getListSongInPlayList = () => {
      globalService.ajaxGet(
        `playListSong/${playListId}`,
        {},
        function (data, status, config) {
          const listSong = data;
          [...listSong].forEach((song) => {
            song.duration = convertTime(song.duration);
          });
          $scope.listSong = listSong;
          $rootScope.songs = listSong;
        }
      );
    };
    $scope.removeSongOnPlayList = (songId) => {
      $http({
        method: "DELETE",
        url: `http://localhost:3002/playListSong/${playListId}/delete/${songId}`,
      }).then(
        function successCallback(response) {
          toast({
            title: "Thành công!",
            message: response.data,
            type: "success",
            duration: 2000,
          });
          $scope.getListPlayList();
          $scope.getListSongInPlayList();
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
    };
    if (user) {
      $scope.getListSongInPlayList();
    }
  }
);
