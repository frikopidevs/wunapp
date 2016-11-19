(function() {
	'use strict';

	angular
		.module('login.module', [
			'ionic'
		])
		.config(function($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'scripts/login/login.html',
    				controller:'loginCtrl'
				});
			$urlRouterProvider.otherwise('/login');
		});
})();
