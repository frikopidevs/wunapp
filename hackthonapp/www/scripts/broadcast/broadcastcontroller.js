(function(){
	'use strict';
angular.module('broadcast.module')
	   .controller('broadcastCtrl',function($scope,$http,$state,userService){
      
	   	
	   	$scope.cancelbroadcast = function(){
	   		$http({
				    method: 'POST',
				    url: "http://localhost/hackathon/cancelbroadcast.php",
				    data: {id:userService.returnuserdetailsId()},
				    headers: {
				    	//'Content-Type': 'application/json'
				        'Content-Type': 'application/x-www-form-urlencoded'
				       // 'Content-type: application/json; charset=utf-8;'
				    }
				});
	   		
	   	$state.go('agent');
	   	}
	   });
})()