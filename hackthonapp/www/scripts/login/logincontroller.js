(function(){
	'use strict';

angular.module('login.module')
	   .controller('loginCtrl',function($scope,$http,$state,userService){
      
	    $scope.data ={
        'username':'',
        'password':''
      }

      $scope.login = function(){
        //$state.go('home');
         $http.get("http://localhost/hackathon/loginauth.php?username="+$scope.data.username+"&&password="+$scope.data.password)
                  .then(function successCallback(response) {
                    // console.log(response.data);
                    $scope.result = response.data;
                    
                    if ($scope.result == "Invalid"){
                       console.log("Please login");
                    }
                    else if($scope.result.role == "user"){
                      userService.adduserdetails(response.data);
                       $state.go('home');
                    }
                    else if($scope.result.role == "agent"){
                      userService.adduserdetails(response.data);
                      $state.go('agent');
                    }

                    // console.log($scope.result);
                    
                  },function errorCallback(response){
                    console.log("Error");
                  });

      }

      $scope.goUserRegisterPage = function(){
        $state.go('registeruser');
      }
      
      $scope.goAgentRegisterPage = function(){
        $state.go('registeragent');
      }
	   });
})()