var testDirectiveApp = angular.module('testDirective',['ngRoute']);

testDirectiveApp.config(function($routeProvider){
    $routeProvider.when('/',
        {
            templateUrl:"test.html",
            controller:"testDirectiveController"
        }
    ).when('/junkee',
        {
            templateUrl:"test2.html",
            controller:"testDirectiveController"
        }
    )
});



testDirectiveApp.controller('testDirectiveController',function($scope){
    $scope.somevar = 'shity';
    $scope.ctrlFlavor = "blackberry";
    $scope.message = 'haven i';

    $scope.callHome = function(message){
        alert(message);
    }

    $scope.data = {
      time:new Date()
    };

    $scope.updateTime = function(){
        $scope.data.time = new Date();
    };

    document.getElementById("updateTimeButton")
        .addEventListener('click', function() {
            $scope.$apply(function(){
                console.log("update time clicked");
                $scope.data.time = new Date();
                $scope.somevar = 'sweet';
            });
        });



    $scope.loadMoreTweets = function(){
        console.log("Loading tweets!");
    }

    $scope.sayHi = function(){
        alert('hi');
    }
});



testDirectiveApp.directive("phone",function(){
   return{
       restrict:'E',
       scope:{dial:"&"},
       template:'<input type="text" ng-model="value">' +
       '<div ng-click="dial({message:value})">Call home</div><div ng-transclude></div>',
       transclude:true
   }
});



testDirectiveApp.directive('someshit',function(){
   return{
       restrict:"E",
       scope:{},
       controller:function($scope){
           $scope.abilities = [];
           this.addStrength = function(){
               $scope.abilities.push('strength');
           }
           this.addSpeed = function(){
               $scope.abilities.push('speed');
           }
           this.addFlight = function(){
               var flight = ['flight']
               $scope.abilities = $scope.abilities.concat(flight);
           }
       },
       link:function(scope,element){
           element.on('click',function(event){
               console.log(scope.abilities);
           });
       }
   }
});

testDirectiveApp.directive('strength',function(){
   return{
       require:"someshit",
       link:function(scope,element,attrs,shitCtrl){
           shitCtrl.addStrength();
       }
   }
});

testDirectiveApp.directive('speed',function(){
    return{
        require:"someshit",
        link:function(scope,element,attrs,shitCtrl){
            shitCtrl.addSpeed();
        }
    }
});

testDirectiveApp.directive('flight',function(){
    return{
        require:"someshit",
        link:function(scope,element,attrs,shitCtrl){
            shitCtrl.addFlight();
        }
    }
});

testDirectiveApp.directive("enter",function(){
   return{
       restrict:"A",
       link:function(scope,element,attrs){
           element.bind('mouseenter',function(){
               console.log(attrs);
               scope.$apply(attrs.enter);
           });
       }
   }
});

testDirectiveApp.directive("leave",function(){
    return{
        restrict:"A",
        link:function(scope,element,attrs){
            element.bind('mouseleave',function(){
                console.log('leave');
                element.removeClass(attrs.leave);
            });
        }
    }
});