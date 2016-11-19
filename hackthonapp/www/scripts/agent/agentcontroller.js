(function(){
	'use strict';
angular.module('agent.module')
	   .controller('agentCtrl',function($scope,$http,$state,userService){
      
	   	$scope.broadcast = function(){
	   		$state.go('broadcast');
	   	}

	   });
})()