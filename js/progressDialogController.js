progressDialogApp.factory("getDataFile", function ($http, $q) {
    var getData = function () {
        var deferred = $q.defer();
        $http.get("./config.json")
            .success(function (result) {
                deferred.resolve(result);
            })
            .error(function () {
                deferred.reject('problem with file');
            });
        return deferred.promise;
    };
    return{getData:getData};
});

progressDialogApp.controller('progressDialogController',function($scope,$timeout,getDataFile){
    var data = getDataFile.getData()
        .then(function(response){
            $scope.data = response.dialog;
            $scope.progress = 0;
            return response;
        })
        .then(
        function(response){
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

            $scope.$watch('progress',
                function(newVal,oldVal){
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

        },
        function(msg){
            console.log(msg);
        }
    );
});

progressDialogApp.directive('superman',function(){
   return{
       restrict:"E",
       template:"<div>going to save the day</div>"
   }
});