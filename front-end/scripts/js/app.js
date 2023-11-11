const app = angular.module("musicApp", ["ngRoute"]);
app.directive("customOnChange", function () {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.on("change", onChangeHandler);
      element.on("$destroy", function () {
        element.off();
      });
    },
  };
});
app.directive("clickOutside", function ($document) {
  return {
    restrict: "A",
    scope: {
      clickOutside: "&",
    },
    link: function (scope, el, attr) {
      $document.on("click", function (e) {
        if (el !== e.target && !el[0].contains(e.target)) {
          scope.$apply(function () {
            scope.$eval(scope.clickOutside);
          });
        }
      });
    },
  };
});
app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "views/client/home.html",
      controller: "homeCtrl",
    })
    .when("/discover", {
      templateUrl: "views/client/discover.html",
      controller: "discoverCtrl",
    })
    .when("/follow", {
      templateUrl: "views/client/follow.html",
      controller: "followCtrl",
    })
    .when("/store", {
      templateUrl: "views/client/store.html",
      controller: "storeCtrl",
    })
    .when("/playList", {
      templateUrl: "views/client/playList.html",
      controller: "playListCtrl",
    })
    .when("/playList/:playListId", {
      templateUrl: "views/client/playListDetail.html",
      controller: "playListDetailCtrl",
    })
    .otherwise({ redirectTo: "/discover" });
});
