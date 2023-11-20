const app = angular.module("musicAppOfAdmin", ["ngRoute"]);

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
