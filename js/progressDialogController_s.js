progressDialogApp.factory('dialog',function($http){
    return $http.get('./config.json');
});

progressDialogApp.controller('progressDialogController',function($scope,$timeout,dialog){
    dialog.success(function(response){
        $scope.data = response.dialog;
        $scope.progress = $scope.progressPercent = response.dialog.config.start;

        $scope.loadStart = function(){
            angular.element(document.querySelector('#dialogBoxContainer')).css('display','block');
            $scope.status = response.dialog.messages.loading;
            angular.element(document.querySelector('.status')).css('text-align','left');
            $scope.progress+=10;
            $scope.loadTimeout = $timeout($scope.loadStart,10);
        }

        $scope.loadReset = function(){
            angular.element(document.querySelector('#dialogBoxContainer')).css('display','none');
            angular.element(document.querySelector('#resetBtn')).css('display','none');
            $scope.progress = $scope.progress = response.dialog.config.start;
        }

        $scope.$watch('progress',function(newVal,oldVal){
            if(newVal < response.dialog.config.duration){
                $scope.progressPercent = Math.ceil(newVal/2000*100);
                angular.element(document.querySelector('#progressBar')).css('width',$scope.progressPercent+'%');
            }
            else{
                $scope.status = response.dialog.messages.completed;
                $timeout.cancel($scope.loadTimeout);
                angular.element(document.querySelector('#resetBtn')).css('display','block');
                angular.element(document.querySelector('.status')).css('text-align','center');
            }
        });
    });
});
