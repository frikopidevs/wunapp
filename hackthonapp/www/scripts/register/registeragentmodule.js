(function() {
	'use strict';

	angular
		.module('registeragent.module', [
			'ionic'
		])
		.config(function($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('registeragent', {
					url: '/registeragent',
					templateUrl: 'scripts/register/registeragent.html',
    				controller:'registeragentCtrl'
				});
		});
})();
