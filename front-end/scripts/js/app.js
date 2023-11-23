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

app.factory("refreshToken", function ($http) {
  return {
    getNewRefreshToken: function () {
      return $http.get("http://localhost:8090/user/typeAccount/3");
    },
  };
});

app.controller("httpRequestInterceptor", function (refreshToken) {
  return {
    request: function (config) {
      const account = JSON.parse(localStorage.getItem("account"));
      const token = account?.accessToken;
      config.headers["token"] = `Bearer ${token}`;
      function jwtDecode(t) {
        let token = {};
        token.raw = t;
        token.header = JSON.parse(window.atob(t.split(".")[0]));
        token.payload = JSON.parse(window.atob(t.split(".")[1]));
        return token.payload;
      }
      if (token) {
        const expiration = jwtDecode(token).exp;
        const date = new Date();
        if (expiration < date.getTime() / 1000) {
          console.log(refreshToken);
          console.log("Token expired. Refreshing token...");
        }
      }
      return config;
    },
  };

  // Function to refresh the token
  // function refreshToken() {
  //   return $injector
  //     .get("$http")({
  //       method: "GET",
  //       url: "http://localhost:8090/user/typeAccount/3",
  //     })
  //     .then((response) => {
  //       console.log(response.data);

  //       return $q.resolve();
  //     })
  //     .catch((error) => {
  //       console.error("Token refresh failed:", error);
  //       return $q.reject(error);
  //     });
  // }
});

function authService($window) {
  return {
    getToken: function () {
      return $window.localStorage.getItem("JWT");
    },
    getRefreshToken: function () {
      return $window.localStorage.getItem("Refresh-JWT");
    },
    setRefreshToken: function (token) {
      $window.localStorage.setItem("Refresh-JWT", token);
    },
    setToken: function (token) {
      $window.localStorage.setItem("JWT", token);
    },
    clearAllToken: function () {
      $window.localStorage.removeItem("JWT");
      $window.localStorage.removeItem("Refresh-JWT");
    },
    clearToken: function () {
      $window.localStorage.removeItem("JWT");
    },
    isLoggedIn: function () {
      if ($window.localStorage.getItem("JWT") === null) {
        return false;
      } else {
        return true;
      }
    },
    toLogin: function () {
      $window.location.href = "http://" + $window.location.host + "/tprt/login";
    },
  };
}

app.factory("authService", authService);

app.factory("AuthInterceptor", function ($q, $injector, authService) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      const account = JSON.parse(localStorage.getItem("account"));
      const token = account?.accessToken;
      if (token) {
        config.headers.token = "Bearer " + token;
      }
      return config;
    },
    responseError: function (response) {
      switch (response.status) {
        case 401:
          console.log(response);
          break;
        case 403:
          // var deferred = $q.defer();
          // const account = JSON.parse(localStorage.getItem("account"));
          // const token = account?.refreshToken;
          // var inflightAuthRequest = $injector.get("$http")({
          //   method: "POST",
          //   url: "http://localhost:3003/auth/refresh",
          //   headers: {
          //     a: `${token}`,
          //   },
          // });
          // inflightAuthRequest.then(function (r) {
          //   const account = JSON.parse(localStorage.getItem("account"));
          //   const newAccount = { ...account, accessToken: r.data.accessToken };
          //   localStorage.setItem("account", JSON.stringify(newAccount));
          //   // return r.data.accessToken;
          // });
          break;
        default:
          break;
      }
      return $q.reject(response);
    },
  };
});
app.config(function ($httpProvider) {
  // $httpProvider.defaults.withCredentials = true;
  $httpProvider.interceptors.push("AuthInterceptor");
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
      controller: "searchCtrl",
    })
    .otherwise({ redirectTo: "/discover" });
});
