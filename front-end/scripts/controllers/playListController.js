import toast from "../js/toast.js";
import Confirm from "../js/confirm.js";
app.controller("playListCtrl", function ($http, $rootScope, $scope, $window) {
  $rootScope.homeMenu = false;
  $rootScope.discoverMenu = false;
  $rootScope.followMenu = false;
  $rootScope.storeMenu = false;
  const user = JSON.parse(localStorage.getItem("user"));
  $scope.listPlayList;
  $scope.IsShowEditPlayList = true;
  $scope.valueNamePlayList = true;
  const userId = user?.userId;
  $scope.username = user.name;
  $scope.idPlayListDelete;
  $scope.idPlayListEdit;
  $scope.deletePlayList = ($event, playList) => {
    Confirm.open({
      title: "Thông báo",
      message: "Bạn có muốn xóa playList này không ?",
      onok: () => {
        $scope.idPlayListDelete = playList.playListId;
        $http({
          method: "DELETE",
          url: `http://localhost:3002/playList/${$scope.idPlayListDelete}/delete`,
        }).then(
          function successCallback(response) {
            toast({
              title: "Thành công!",
              message: "Đăng bài hát thành công",
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
      },
    });
  };
  $scope.showEditPlayList = (playListId, playListName) => {
    $scope.IsShowEditPlayList = false;
    $scope.idPlayListEdit = playListId;
    $scope.valueNamePlayList = playListName;
  };
  $scope.editPlayList = () => {
    const data = {
      name: $scope.valueNamePlayList,
      userId: userId,
    };
    $http({
      method: "PUT",
      url: `http://localhost:3002/playList/${$scope.idPlayListEdit}/edit`,
      data: JSON.stringify(data),
    }).then(
      function successCallback(response) {
        toast({
          title: "Thành công!",
          message: response.data,
          type: "success",
          duration: 2000,
        });
        $rootScope.$emit("CallParentMethod");
        $scope.IsShowEditPlayList = true;
      },
      function errorCallback(response) {
        toast({
          title: "Thành công!",
          message: response.data,
          type: "success",
          duration: 2000,
        });
      }
    );
  };
  $scope.ShowHideEditPlayList = function () {
    $scope.IsShowEditPlayList = !$scope.IsShowEditPlayList;
  };
});
