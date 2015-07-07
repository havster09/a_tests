var sampleApp = angular.module('routTest',['ngRoute']);

sampleApp.config(function($routeProvider){
    $routeProvider.when('/',
        {
            templateUrl:"test.html",
            controller:"AppCtrl"
        }
    ).when('/junkee',
        {
            templateUrl:"test2.html",
            controller:"junkeeCtrl"
        }
    )
});

sampleApp.controller('AppCtrl',function($scope){
    $scope.message = 'fkn work knt';
});

sampleApp.controller('junkeeCtrl',function($scope){
    $scope.message = 'isme dad ey';
});