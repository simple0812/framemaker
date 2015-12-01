define([
    'lib/angular'
], function () {
    var moduleSvc =  angular.module('moduleSvc', []);

    moduleSvc.factory('svc', ['$http', function($http) {
        return {
            delete: function(ids) {
                var def = $.Deferred();
                var promise = def.promise();

                $.ajax({
                    type: "DELETE",
                    url: "/workOvertime",
                    data: JSON.stringify(ids),
                    dataType:"json",
                    contentType: "application/json"
                }).success(function (json, status, headers, config) {
                    if (!json) return def.reject('未知的错误');
                    if (!json.status || json.status == 'error')  return def.reject(json.message);
                    def.resolve();
                }).error(function(data, status, headers, config) {
                    def.reject(data);
                });

                return promise;
            },

            update: function(model) {
                var def = $.Deferred();
                var promise = def.promise();
                $http.put('/workOvertime', model).success(function(json) {
                    if (!json.status || json.status == 'error') return def.reject(json ? json.message : '未知的错误');
                    def.resolve(json.result);
                }).error(function(data, status, headers, config) {
                    def.reject(data);
                });

                return promise;
            },

            create: function(model) {
                var def = $.Deferred();
                var promise = def.promise();
                $http.post('/workOvertime', model).success(function(json) {
                    if (!json.status || json.status == 'error') return def.reject(json ? json.message : '未知的错误');
                    def.resolve(json.result);
                }).error(function(data, status, headers, config) {
                    def.reject(data);
                });

                return promise;
            },

            retrieve:function() {
                var def = $.Deferred();
                var promise = def.promise();

                $http.get('/workOvertime', {params : query_list}).success(function(json) {
                    if (!json) return def.reject('未知的错误');
                    if (!json.status || json.status == 'error')  return def.reject(json.message);
                    def.resolve(json);
                }).error(function(data, status, headers, config) {
                    def.reject(data);
                });

                return promise;
            },

            pageUsers:function() {
                var def = $.Deferred();
                var promise = def.promise();

                $http.get('/workOvertime/users', {params : pager.condition}).success(function(json) {
                    if (!json) return def.reject('未知的错误');
                    if (!json.status || json.status == 'error')  return def.reject(json.message);
                    def.resolve(json);
                }).error(function(data, status, headers, config) {
                    def.reject(data);
                });

                return promise;
            },

            exportExcel: function(month) {
                var def = $.Deferred();
                var promise = def.promise();
                console.log(month);

                $http.get('/workOvertime/excel', {params : {month: month}}).success(function(json) {
                    if (!json) return def.reject('未知的错误');
                    if (!json.status || json.status == 'error')  return def.reject(json.message);
                    def.resolve(json);
                }).error(function(data, status, headers, config) {
                    def.reject(data);
                });

                return promise;
            }
        };
    }])

});