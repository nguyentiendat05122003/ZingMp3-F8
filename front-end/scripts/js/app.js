const app = angular.module("musicApp", ["ngRoute", "globalServices"]);
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
app.factory("httpRequestInterceptor", function () {
  return {
    request: function (config) {
      const account = JSON.parse(localStorage.getItem("account"));
      const token = account?.accessToken;
      config.headers["token"] = `Bearer ${token}`;
      return config;
    },
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push("httpRequestInterceptor");
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
    .when("/discover/artist/:artistId", {
      templateUrl: "views/client/artist.html",
      controller: "artistCtrl",
    })
    .when("/follow", {
      templateUrl: "views/client/follow.html",
      controller: "followCtrl",
    })
    .when("/store", {
      templateUrl: "views/client/store.html",
      controller: "storeCtrl",
    })
    .when("/typeSong", {
      templateUrl: "views/client/type.html",
      controller: "typeSongCtrl",
    })
    .when("/playList", {
      templateUrl: "views/client/playList.html",
      controller: "playListCtrl",
    })
    .when("/playList/:playListId", {
      templateUrl: "views/client/playListDetail.html",
      controller: "playListDetailCtrl",
    })
    .when("/search?:q", {
      templateUrl: "views/client/search.html",
    })
    .otherwise({ redirectTo: "/discover" });
});
