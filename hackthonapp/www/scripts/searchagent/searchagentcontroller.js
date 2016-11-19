(function(){
	'use strict';
angular.module('searchagent.module')
	   .controller('searchagentCtrl',function($scope,$http,$state,userService,$cordovaGeolocation,$ionicModal){
      	
      	$scope.minimumdistance = 1;

      	$http.get("http://localhost/hackathon/findagent.php")
          .then(function successCallback(response) {
            $scope.agentlocations = response.data;
             console.log($scope.agentlocations );
             $scope.resultmap = true;
          },function errorCallback(response){
            console.log("Error");
          });	


	   	var posOptions = {timeout: 10000, enableHighAccuracy: false};
	   	/*$cordovaGeolocation
	    .getCurrentPosition(posOptions)
	    .then(function (position) {
	      $scope.lat  = position.coords.latitude
	      $scope.long = position.coords.longitude
	     // $scope.dist = calculateDistance($scope.lat, $scope.long, 7.103405, 125.643631);
	    }, function(err) {
	      // error
	    });*/

	     
	     $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
 			$scope.lat  = position.coords.latitude
	        $scope.long = position.coords.longitude
		    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		    var mapOptions = {
		      center: latLng,
		      zoom: 15,
		      mapTypeId: google.maps.MapTypeId.ROADMAP
		    };

		    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);


		    /*if($scope.resultmap == true){
		    	for(var x=0;x<$scope.agentlocations.length;x++){
		    		var latLng = new google.maps.LatLng($scope.agentlocations.latitude, $scope.agentlocations.longitude);
			    	var marker = new google.maps.Marker({
			          position: latLng,
			          map: $scope.map,
			          title: 'Hello World!'
			        });
		    	}
		    } */ 

		    /*for(var x=0;x<$scope.agentlocations.length;x++){

		    }*/
		    
/*
 		  for(var x = 0;x<$scope.agentlocations.length;x++){
 		  	var Latlng = new google.maps.Latlng($scope.agentlocations.latitude, $scope.agentlocations.longitude);
 		  	addtomap(Latlng);
 		  }

 		  function addtomap(Latlng){
 		  	var marker = google.maps.Marker({
	          position:Latlng,
	          map: $scope.map,
	          title: 'Hello World!'
	        });
 		  }*/


 		  

    	 /* var marker = new google.maps.Marker({
	          position: latLng,
	          map: $scope.map,
	          title: 'Hello World!'
	        });*/
		    

		  }, function(error){
		    console.log("Could not get location");
		  });




	    $scope.goHome = function(){
	    	$state.go('home');
	    }
		$scope.calculateDistance = function(lat1, lon1, lat2, lon2) {
			var radlat1 = Math.PI * lat1/180;
			var radlat2 = Math.PI * lat2/180;
			var radlon1 = Math.PI * lon1/180;
			var radlon2 = Math.PI * lon2/180;
			var theta = lon1-lon2;
			var radtheta = Math.PI * theta / 180;
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			dist = Math.acos(dist);
			dist = dist * 180 / Math.PI;
			dist = dist * 60 * 1.1515;
			dist = dist * 1.609344;
			return dist.toFixed(3);
		}
		
	 	

        $scope.options = {
		  loop: false,
		  effect: 'fade',
		  speed: 500,
		}

		$scope.$on("$ionicSlides.sliderInitialized", function(event, data){
		  // data.slider is the instance of Swiper
		  $scope.slider = data.slider;
		});

		$scope.$on("$ionicSlides.slideChangeStart", function(event, data){
		  console.log('Slide change is beginning');
		});

		$scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
		  // note: the indexes are 0-based
		  $scope.activeIndex = data.slider.activeIndex;
		  $scope.previousIndex = data.slider.previousIndex;
		});



	    /* var watchOptions = {
		    timeout : 3000,
		    enableHighAccuracy: false // may cause errors if true
		  };

		  var watch = $cordovaGeolocation.watchPosition(watchOptions);
		  watch.then(
		    null,
		    function(err) {
		      // error
		    },
		    function(position) {
		      $scope.lat1  = position.coords.latitude
		      $scope.long1 = position.coords.longitude
		  });*/


	   });
})()