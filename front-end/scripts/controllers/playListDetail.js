import convertTime from "../../util/covertTime.js";
import toast from "../js/toast.js";
app.controller(
  "playListDetailCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.userId;
    const playListId = $routeParams.playListId;
    $scope.getListSongInPlayList = () => {
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
        },
        function errorCallback(response) {
          console.log(response);
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
