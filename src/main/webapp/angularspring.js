//define the main module
var as = angular.module('angularspring', []);

//configure $http to catch message responses and show them
as.config(function ($httpProvider) {
    $httpProvider.responseInterceptors.push(function ($q) {
        var setMessage = function (response) {
            //is the response has a text and a type, save it into as.message
            if (response.data.text && response.data.type) {
                as.message = {
                    text: response.data.text,
                    type: response.data.type,
                    show: true
                };
            }
        };
        return function (promise) {
            return promise.then(
                //this is called after each successful server request
                function (response) {
                    setMessage(response);
                    return response;
                },
                //this is called after each unsuccessful server request
                function (response) {
                    setMessage(response);
                    return $q.reject(response);
                }
            );
        };
    });
});

//the controller handles all actions on a page
as.controller('Controller', function ($scope, $http, i18n) {
    var actionUrl = 'action/person/',
        load = function () {
            $http.get(actionUrl).success(function (data) {
                $scope.persons = data;
            });
        };

    load();

    $scope.delete = function (person) {
        $http.delete(actionUrl + person.id).success(function () {
            load();
        });
    };

    $scope.save = function () {
        $http.post(actionUrl, $scope.person).success(function () {
            load();
        });
    };

    $scope.order = '+firstName';

    $scope.orderBy = function (property) {
        $scope.order = ($scope.order[0] === '+' ? '-' : '+') + property;
    };

    $scope.orderIcon = function (property) {
        return property === $scope.order.substring(1) ? $scope.order[0] === '+' ? 'icon-chevron-up' : 'icon-chevron-down' : '';
    };

    //make as.message sccessible to the current scope
    $scope.message = function () {
        return as.message;
    };

    $scope.language = function () {
        return i18n.language;
    };
    $scope.setLanguage = function (lang) {
        i18n.setLanguage(lang);
    };
    $scope.active = function (value) {
        return value ? 'active' : '';
    }
});

as.service('i18n', function () {
    var self = this;
    this.setLanguage = function (language) {
        $.i18n.properties({
            name: 'messages',
            path: 'i18n/',
            mode: 'map',
            language: language,
            callback: function () {
                self.language = language;
            }
        });
    };
    this.setLanguage('de');
});

as.directive('msg', function () {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
            var key = attrs.key;
            if (attrs.keyExpr) {
                scope.$watch(attrs.keyExpr, function (value) {
                    key = value;
                    element.text($.i18n.prop(value));
                });
            }
            scope.$watch('language()', function (value) {
                element.text($.i18n.prop(key));
            });
        }
    };
});