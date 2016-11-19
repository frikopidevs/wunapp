(function(){
	'use strict';
angular.module('agent.module')
	   .controller('agentCtrl',function($scope,$http,$state,userService,$cordovaGeolocation,$timeout, $ionicLoading){
      
        var posOptions = {timeout: 10000, enableHighAccuracy: false};   
	     $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
 			$scope.lat  = position.coords.latitude
	        $scope.long = position.coords.longitude
		  }, function(error){
		    console.log("Could not get location");
		  });
    	
    	$scope.show = function() {
		    $ionicLoading.show({
		      template: '<ion-spinner icon="spiral"></ion-spinner>'
		    }).then(function(){
		       console.log("The loading indicator is now displayed");
		    });
		};

		$scope.hide = function(){
	  	   $ionicLoading.hide().then(function(){
	       console.log("The loading indicator is now hidden");
	       });
	  	  }

	   	$scope.broadcast = function(){
	   		console.log($scope.lat);
	   		$scope.show();
	   		$timeout(function () {
		        $http({
				    method: 'POST',
				    url: "http://pldthackathon.kimseanpusod.com/api/agentlocation.php",
				    data: {id:userService.returnuserdetailsId(),
				    	   latitude:$scope.lat,
				    	   longitude:$scope.long},
				    headers: {
				    	//'Content-Type': 'application/json'
				        'Content-Type': 'application/x-www-form-urlencoded'
				       // 'Content-type: application/json; charset=utf-8;'
				    }
				}).then(function successCallback(response) {
                    $state.go('broadcast');
                  },function errorCallback(response){
                    console.log("Error");
                  });
		    }, 5000).then(function successCallback(response) {
                    $scope.hide();});

	     	
	   	}

	   	$scope.logout = function(){
	   		$state.go('login');
	   	}

	   });
})()