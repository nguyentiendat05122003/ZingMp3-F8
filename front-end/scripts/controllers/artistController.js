import convertTime from "../../util/covertTime.js";
import toast from "../js/toast.js";
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
        url: `http://localhost:8090/song/artist/${artistId}`,
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
        url: `http://localhost:8090/song/artist/${artistId}`,
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
    $scope.getListFollow = () => {};
    const account = JSON.parse(localStorage.getItem("account"));
    $scope.checkFollowing = () => {
      if (!account) {
        $scope.isFollow = true;
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.userId;
        const useIdFollowed = artistId;
        $http({
          method: "GET",
          url: `http://localhost:8090/follow/status?useIdFollowed=${useIdFollowed}&userId=${userId}`,
        }).then(
          function successCallback(response) {
            $scope.isFollow = response.data[0].isFollowing;
          },
          function errorCallback(response) {
            console.log(response);
          }
        );
      }
    };
    if (account) {
      $scope.checkFollowing();
    }

    $scope.follow = () => {
      if (!account) {
        toast({
          title: "Cảnh báo",
          message: "Vui lòng đăng nhập để trải nghiệm tốt nhất",
          type: "warning",
          duration: 3000,
        });
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.userId;
        $http({
          method: "POST",
          url: `http://localhost:8090/follow/add?useIdFollowed=${artistId}&userId=${userId}`,
        }).then(
          function successCallback(response) {
            $scope.isFollow = true;
            toast({
              title: "Thành công!",
              message: "Bạn đã lưu thông tin thành công",
              type: "success",
              duration: 2000,
            });
          },
          function errorCallback(response) {
            console.log(response);
          }
        );
      }
    };

    $scope.unFollow = () => {
      if (!account) {
        toast({
          title: "Cảnh báo",
          message: "Vui lòng đăng nhập để trải nghiệm tốt nhất",
          type: "warning",
          duration: 2000,
        });
      } else {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.userId;
        $http({
          method: "POST",
          url: `http://localhost:8090/follow/delete?useIdFollowed=${artistId}&userId=${userId}`,
        }).then(
          function successCallback(response) {
            $scope.isFollow = false;
            toast({
              title: "Thành công!",
              message: "Bạn đã lưu thông tin thành công",
              type: "success",
              duration: 2000,
            });
          },
          function errorCallback(response) {
            console.log(response);
          }
        );
      }
    };
    $scope.countFollow = () => {
      $http({
        method: "GET",
        url: `http://localhost:8090/follow/${artistId}`,
      }).then(
        function successCallback(response) {
          $scope.numberFollow = response.data[0].userFollownumber;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };

    $scope.countFollow();
  }
);
