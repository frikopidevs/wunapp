(function() {
	'use strict';

	angular
		.module('agent.module', [
			'ionic'
		])
		.config(function($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('agent', {
					url: '/agent',
					templateUrl: 'scripts/agent/agent.html',
    				controller:'agentCtrl'
				});
		});
})();
