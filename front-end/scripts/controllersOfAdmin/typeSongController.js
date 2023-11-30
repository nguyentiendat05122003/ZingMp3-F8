import toast from "../js/toast.js";
app.controller(
  "typeSongCtrl",
  function ($http, $rootScope, $scope, $window, $routeParams) {
    $rootScope.userMenu = false;
    $rootScope.statisticalMenu = false;
    $rootScope.artistMenu = false;
    $rootScope.typeSongMenu = true;
    $rootScope.accountMenu = false;
    $scope.isHideBtnRemove = true;
    $scope.newListItem = [];
    $scope.listSelect = [];
    const account = localStorage.getItem("account");
    $scope.getListTypeSong = () => {
      $http({
        method: "GET",
        url: `http://localhost:8090/admin/typeSong`,
      }).then(
        function successCallback(response) {
          $scope.typeSongList = response.data;
          $scope.typeSongQuantity = response.data.length;
        },
        function errorCallback(response) {
          console.log(response);
        }
      );
    };
    if (account) {
      $scope.getListTypeSong();
    }
    $scope.addType = () => {
      const input = document.querySelector("#typeSongName");
      const value = input.value;
      if (value.trim() == "") {
        return;
      } else {
        const data = { name: value };
        $http({
          method: "POST",
          url: `http://localhost:8090/admin/typeSong/add`,
          data: JSON.stringify(data),
        }).then(
          function successCallback(response) {
            toast({
              title: "Thành công!",
              message: response.data,
              type: "success",
              duration: 2000,
            });
            $scope.getListTypeSong();
            input.value = "";
          },
          function errorCallback(response) {
            console.log(response);
          }
        );
      }
    };

    $scope.deleteTypeSong = (type) => {
      const typeId = type?.typeSongId;
      $http({
        method: "DELETE",
        url: `http://localhost:8090/admin/typeSong/${typeId}/delete`,
      }).then(
        function successCallback(response) {
          toast({
            title: "Thành công!",
            message: response.data,
            type: "success",
            duration: 2000,
          });
          $scope.getListTypeSong();
        },
        function errorCallback(response) {}
      );
    };

    $scope.saveData = () => {
      let listDataChange = [];
      let listDataAdd = [];
      document.querySelectorAll(".input-type").forEach((item, idx) => {
        if (idx < $scope.typeSongList.length) {
          if (item.value !== $scope.typeSongList[idx].name) {
            listDataChange = [
              ...listDataChange,
              { typeSongId: item.dataset.id, name: item.value, status: "2" },
            ];
          }
        } else {
          listDataAdd = [
            ...listDataAdd,
            {
              typeSongId: "null",
              name: item.value,
              status: "1",
            },
          ];
        }
      });
      let data = [...listDataChange, ...listDataAdd];
      $http({
        method: "POST",
        url: `http://localhost:3001/typeSong/customApi`,
        data: JSON.stringify(data),
      }).then(
        function successCallback(response) {
          toast({
            title: "Thành công!",
            message: response.data,
            type: "success",
            duration: 2000,
          });
          $scope.getListTypeSong();
          $scope.newListItem = [];
        },
        function errorCallback(response) {}
      );
    };

    $scope.handleClickAddItem = () => {
      $scope.newListItem = [...$scope.newListItem, { value: "" }];
    };

    $scope.handleRemoveUi = (index) => {
      $scope.newListItem.splice(index, 1);
    };

    $scope.handleChangeCheckBox = () => {
      const listCheck = document.querySelectorAll(".input-check");
      const inputAllElement = document.querySelector(".input-all");
      let elementCheckNumber = document.querySelectorAll(
        'input[name="input-check"]:checked'
      ).length;
      let isCheckAll = listCheck.length === elementCheckNumber;
      listCheck.forEach((item) => {
        if (isCheckAll) {
          $scope.isHideBtnRemove = false;
          inputAllElement.checked = true;
          $scope.valueSelectAll = true;
        } else if (elementCheckNumber != 0) {
          $scope.isHideBtnRemove = false;
          inputAllElement.checked = false;
        } else {
          $scope.isHideBtnRemove = true;
          inputAllElement.checked = false;
        }
      });
    };

    $scope.handleRemoveItem = () => {
      const listCheck = document.querySelectorAll(".input-check");
      const isCheckedAll = listCheck.forEach((item) => {
        if (item.checked) {
          $scope.listSelect = [
            ...$scope.listSelect,
            {
              typeSongId: item.dataset.id,
              name: item.dataset.value,
              status: "3",
            },
          ];
        }
      });
      $http({
        method: "POST",
        url: `http://localhost:3001/typeSong/customApi`,
        data: JSON.stringify($scope.listSelect),
      }).then(
        function successCallback(response) {
          toast({
            title: "Thành công!",
            message: response.data,
            type: "success",
            duration: 2000,
          });
          $scope.getListTypeSong();
          $scope.newListItem = [];
        },
        function errorCallback(response) {}
      );
    };

    $scope.handelChangeAll = () => {
      const inputSelectAll = document.querySelector(".input-all");
      const listCheck = document.querySelectorAll(".input-check");
      if (inputSelectAll.checked) {
        $scope.isHideBtnRemove = false;
        listCheck.forEach((item) => {
          item.checked = true;
          $scope.isHideBtnRemove = false;
        });
      } else {
        $scope.isHideBtnRemove = true;
        listCheck.forEach((item) => {
          item.checked = false;
        });
      }
    };
  }
);
