(function(){
	'use strict';
angular.module('home.module')
	   .controller('homeCtrl',function($scope,$http,$state,userService,$cordovaGeolocation,$ionicPopup){
      
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
	   };


     $scope.searchagent = function(){
     	if($scope.lat){
     		$state.go('searchagent');
     	}else{
     		$scope.showAlertInvalid();
     	}
      
      // console.log("hello");
     }

     $scope.logout = function(){
     	$state.go('login');
     }

	   });
})()