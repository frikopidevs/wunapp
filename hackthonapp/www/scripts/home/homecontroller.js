(function(){
	'use strict';
angular.module('home.module')
	   .controller('homeCtrl',function($scope,$http,$state,userService,$cordovaGeolocation,$ionicPopup,$ionicModal){
      
     var posOptions = {timeout: 10000, enableHighAccuracy: false};

     $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
 			$scope.lat  = position.coords.latitude
	        $scope.long = position.coords.longitude
		  }, function(error){
		    console.log("Could not get location");
	  });

     $ionicModal.fromTemplateUrl('templates/modal.html', {
	    scope: $scope
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });

	 $scope.goback = function(){
	 	$scope.modal.hide();
	 }
     $scope.viewpromo = function(){
     	$scope.modal.show();
     }
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