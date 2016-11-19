(function(){
	'use strict';

angular.module('login.module')
	   .controller('loginCtrl',function($scope,$http,$state,userService,$cordovaGeolocation,$ionicPopup){
      
	    $scope.data ={
        'username':'',
        'password':''
      }
      var posOptions = {timeout: 10000, enableHighAccuracy: false};

      $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
      $scope.lat  = position.coords.latitude
          $scope.long = position.coords.longitude
      }, function(error){
        console.log("Could not get location");
    });


     $scope.showAlertInvalid = function() {
       var alertPopup = $ionicPopup.alert({
         title: 'Need GPS',
         template: 'Please Turn on the GPS and Restart the App'
       });
       alertPopup.then(function(res) {
       });

       var posOptions = {timeout: 10000, enableHighAccuracy: false};
      
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
      $scope.lat  = position.coords.latitude
          $scope.long = position.coords.longitude
      }, function(error){
        console.log("Could not get location");
    });

     };


      $scope.login = function(){
        //$state.go('home');
        if($scope.lat){
         $http.get("http://pldthackathon.kimseanpusod.com/api/loginauth.php?username="+$scope.data.username+"&&password="+$scope.data.password)
                  .then(function successCallback(response) {
                    // console.log(response.data);
                    $scope.result = response.data;
                    
                    if ($scope.result == "Invalid"){
                       console.log("Please login");
                    }
                    else if($scope.result.role == "user"){
                      userService.adduserdetails(response.data);
                       $state.go('home');
                       $scope.data.password = '';
                    }
                    else if($scope.result.role == "agent"){
                      userService.adduserdetails(response.data);
                      $state.go('agent');
                    }

                    // console.log($scope.result);
                    
                  },function errorCallback(response){
                    console.log("Error");
                  });
        }else{
          $scope.showAlertInvalid();
        }

      }

      $scope.goUserRegisterPage = function(){
        $state.go('registeruser');
      }
      
      $scope.goAgentRegisterPage = function(){
        $state.go('registeragent');
      }
	   });
})()