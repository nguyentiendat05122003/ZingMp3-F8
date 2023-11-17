const app = angular.module("musicAppOfAdmin", ["ngRoute"]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/admin/user.html",
      controller: "userCtrl",
    })
    .when("/statistical", {
      templateUrl: "views/admin/statistical.html",
      controller: "statisticalCtrl",
    })
    .otherwise({ redirectTo: "/" });
});
