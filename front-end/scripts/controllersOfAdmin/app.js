const app = angular.module("musicAppOfAdmin", ["ngRoute"]);
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
    .when("/user", {
      templateUrl: "views/admin/user.html",
      controller: "userCtrl",
    })
    .when("/statistical", {
      templateUrl: "views/admin/statistical.html",
      controller: "statisticalCtrl",
    })
    .when("/artist", {
      templateUrl: "views/admin/artist.html",
      controller: "artistCtrl",
    })
    .when("/typeSong", {
      templateUrl: "views/admin/typeSong.html",
      controller: "typeSongCtrl",
    })
    .when("/typeSong", {
      templateUrl: "views/admin/typeSong.html",
      controller: "typeSongCtrl",
    })

    .when("/account", {
      templateUrl: "views/admin/account.html",
      controller: "accountCtrl",
    })
    .otherwise({ redirectTo: "/statistical" });
});
