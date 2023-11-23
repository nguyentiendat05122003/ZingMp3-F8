app.controller(
  "searchCtrl",
  function ($http, $rootScope, $scope, $window, globalService) {
    $scope.listArtistLocal = [];
    $scope.listSongInType = [];
    $scope.hideInfo = false;
    $scope.getSongInType = (id) => {
      globalService.ajaxGet(
        `/song/typeSong/${id}`,
        {},
        function (data, status, config) {
          $scope.listSongInType = [...$scope.listSongInType, ...data];
        }
      );
    };
    $scope.getInfoArtist = (id) => {
      globalService.ajaxGet(
        `user/artist/${id}`,
        {},
        function (data, status, config) {
          $scope.listArtistLocal = [...$scope.listArtistLocal, data];
        }
      );
    };
    $scope.load = () => {
      const data = $scope.listSuggestSearchSong;
      const typeSong = $scope.listSuggestSearchType;
      if (data) {
        if (data.length > 0) {
          Array.from(data).forEach((element) => {
            const artistId = element?.userId;
            $scope.getInfoArtist(artistId);
          });
        }
      }
      if (typeSong) {
        if (typeSong.length > 0) {
          $scope.hideInfo = true;
          Array.from(typeSong).forEach((element) => {
            const typeSongId = element?.typeSongId;
            $scope.getSongInType(typeSongId);
          });
        }
      }
    };
    $scope.load();
  }
);
