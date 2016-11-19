(function() {
	'use strict';

	angular
		.module('searchagent.module', [
			'ionic'
		])
		.config(function($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('searchagent', {
					url: '/searchagent',
					templateUrl: 'scripts/searchagent/searchagent.html',
    				controller:'searchagentCtrl'
				});
		});
})();
