(function(){
	'use strict';
angular.module('agent.module')
	   .controller('agentCtrl',function($scope,$http,$state,userService,$cordovaGeolocation){
      
      var posOptions = {timeout: 10000, enableHighAccuracy: false};   
	     $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
 			$scope.lat  = position.coords.latitude
	        $scope.long = position.coords.longitude
		  }, function(error){
		    console.log("Could not get location");
		  });

	   	$scope.broadcast = function(){
	   		$state.go('broadcast');
	   		console.log($scope.lat);
	     	$http({
				    method: 'POST',
				    url: "http://localhost/hackathon/agentlocation.php",
				    data: {id:userService.returnuserdetailsId(),
				    	   latitude:$scope.lat,
				    	   longitude:$scope.long},
				    headers: {
				    	//'Content-Type': 'application/json'
				        'Content-Type': 'application/x-www-form-urlencoded'
				       // 'Content-type: application/json; charset=utf-8;'
				    }
				});


	   	}

	   });
})()