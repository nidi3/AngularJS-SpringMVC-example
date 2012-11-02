as.controller('MainController', function ($scope, $http, i18n, $location) {
    $scope.language = function () {
        return i18n.language;
    };
    $scope.setLanguage = function (lang) {
        i18n.setLanguage(lang);
    };
    $scope.activeWhen = function (value) {
        return value ? 'active' : '';
    };

    //make as.message accessible to the current scope
    $scope.message = function () {
        return as.message;
    };

    $scope.path = function () {
        return $location.url();
    };
});

as.controller('PersonController', function ($scope, $http, i18n) {
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
});
