angular
  .module("globalServices", [])
  .factory("globalService", function ($http, $q) {
    var globalApi = {};

    //Ajax Delete
    globalApi.ajaxDelete = function (url, params, callback) {
      $http({
        url: url,
        method: "DELETE",
        data: params,
      })
        .success(function (data, status, headers) {
          var config = {
            params: null,
          };
          callback(data, status, config);
        })
        .error(function (data, status, headers) {
          var config = {
            params: null,
          };
          callback(data, status, config);
        });
    };

    //Ajax Get
    globalApi.ajaxGet = function (url, params, callback) {
      $http({
        url: APP_API + url,
        method: "GET",
        data: params,
      })
        .success(function (data, status, headers) {
          var config = {
            params: null,
          };
          callback(data, status, config);
        })
        .error(function (data, status, headers) {
          var config = {
            params: null,
          };
          callback(data, status, config);
        });
    };
    //Ajax Put
    globalApi.ajaxPUT = function (url, data, headers, callback) {
      $http({
        url: url,
        method: "PUT",
        data: data,
        headers: headers,
      })
        .success(function (data, status, headers) {
          var config = {
            params: null,
          };
          callback(data, status, config);
        })
        .error(function (data, status, headers) {
          var config = {
            params: null,
          };
          callback(data, status, config);
        });
    };

    //Ajax Post
    globalApi.ajaxPUT = function (url, params, callback) {
      params.customHeaders != undefined
        ? (params.customHeaders = params.customHeaders)
        : (params.customHeaders = null);
      $http({
        url: url,
        method: "POST",
        data: params,
        headers: params.customHeaders,
      })
        .success(function (data, status, headers) {
          var config = {
            params: null,
          };
          callback(data, status, config);
        })
        .error(function (data, status, headers) {
          var config = {
            params: null,
          };
          callback(data, status, config);
        });
    };

    return globalApi;
  });
