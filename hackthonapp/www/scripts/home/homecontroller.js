(function(){
	'use strict';
angular.module('home.module')
	   .controller('homeCtrl',function($scope,$http,$state,userService){
      

     $scope.searchagent = function(){
      $state.go('searchagent');
      // console.log("hello");
     }

	   });
})()