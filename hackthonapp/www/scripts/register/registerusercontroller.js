(function(){
	'use strict';

angular.module('registeruser.module')
	   .controller('registeruserCtrl',function($scope,$http,$state,$ionicPopup){
      
	    $scope.data = {
	    	username: '',
	    	password: '',
	    	retypepassword: '',
	    	firstname:'',
	    	lastname:'',
	    	contact:''
	    }

     	 $scope.showAlertInvalid = function() {
	     var alertPopup = $ionicPopup.alert({
	       title: 'Error Login',
	       template: 'Your Username Is Invalid'
	     });
	     alertPopup.then(function(res) {
	     });
	   };

	    $scope.showAlertPassword = function() {
	     var alertPopup = $ionicPopup.alert({
	       template: 'Please fill in all the fields'
	     });
	     alertPopup.then(function(res) {
	     });
	   };


	   $scope.showAlertSuccess = function() {
	     var alertPopup = $ionicPopup.alert({
	       title: 'Registration Successful',
	       template: 'You can now login'
	     });
	     alertPopup.then(function(res) {
	     	$state.go('login');
	     });
	   };


     	$scope.register = function(){
     		if($scope.data.password != $scope.data.retypepassword){
     			console.log("Please Retype password");
     			$scope.showAlertPassword();
     		}
     		else{	
	     	$http({
				    method: 'POST',
				    url: "http://localhost/hackathon/register.php",
				    data: {username:$scope.data.username,
				    	   password:$scope.data.password,
				    	   role:"user",
				    	   firstname:$scope.data.firstname,
				    	   lastname:$scope.data.lastname,
				    	   contact:$scope.data.contact},
				    headers: {
				    	//'Content-Type': 'application/json'
				        'Content-Type': 'application/x-www-form-urlencoded'
				       // 'Content-type': 'application/json; charset=utf-8'
				    }
				}).then(function successCallback(response) {
             if(response.data == "Invalid"){
             	$scope.showAlertInvalid();
             }else{
             	$scope.showAlertSuccess();
             }
          },function errorCallback(response){
            console.log(response);
          });	

	      }
     	}


	   });
})()