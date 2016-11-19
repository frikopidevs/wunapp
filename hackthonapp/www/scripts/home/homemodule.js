(function() {
	'use strict';

	angular
		.module('home.module', [
			'ionic'
		])
		.config(function($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: 'scripts/home/home.html',
    				controller:'homeCtrl'
				});
		});
})();
