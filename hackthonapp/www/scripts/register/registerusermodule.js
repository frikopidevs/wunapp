(function() {
	'use strict';

	angular
		.module('registeruser.module', [
			'ionic'
		])
		.config(function($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('registeruser', {
					url: '/registeruser',
					templateUrl: 'scripts/register/registeruser.html',
    				controller:'registeruserCtrl'
				});
		});
})();
