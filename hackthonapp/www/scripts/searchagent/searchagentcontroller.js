(function(){
	'use strict';
angular.module('searchagent.module')
	   .controller('searchagentCtrl',function($scope,$http,$state,userService,$cordovaGeolocation){
      	
      	$scope.minimumdistance = 1;

      	$http.get("http://pldthackathon.kimseanpusod.com/api/findagent.php")
          .then(function successCallback(response) {
            $scope.agentlocations = response.data;
             console.log($scope.agentlocations );
             $scope.resultmap = true;
          },function errorCallback(response){
            console.log("Error");
          });

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

		    for(var x =0;x<$scope.agentlocations.length;x++){
		    	var myLatlng = new google.maps.LatLng($scope.agentlocations[x]['latitude'] ,$scope.agentlocations[x]['longitude']);
			    var marker = new google.maps.Marker({
			    	map: $scope.map,
				    position: myLatlng,
				    title:"Hello World!"
				});
		    }
	    	

		  }, function(error){
		    console.log("Could not get location");
		  });


      		
        $scope.movecamera = function(index){

        	$scope.map.panTo(new google.maps.LatLng($scope.agentlocations[index]['latitude'],$scope.agentlocations[index]['longitude']));
        }

	   	var posOptions = {timeout: 10000, enableHighAccuracy: false};

	     $scope.sendmessage = function(){
	     	$http({
				    method: 'POST',
				    url: "https://post.chikka.com/smsapi/request",
				    data: {message_type:"SEND",
				    	   mobile_number:"63922317527",
				    	   shortcode:"29290 504547",
				    	   message_id:"12763172638176",
				    	   message:"This is a test message from api chikka",
				    	   client_id:"4b29e355f891bd9d85b3c6fabe478d64720b86e4c287a5d0a553ec1fe8b8e2e0",
				    	   secret_key:"fc049961a9785986ea1c0d138f308499ba9e574353a8fd4e81b857d874d343ac"
				    	  },
				    headers: {
				    	// 'Content-Type': 'application/json'
				        'Content-Type': 'application/x-www-form-urlencoded'
				       // 'Content-type':'application/json; charset=utf-8'
				    }
				});
	     }
	     
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
		  console.log($scope.activeIndex);

		  $scope.movecamera($scope.activeIndex );

		});



	   });
})()