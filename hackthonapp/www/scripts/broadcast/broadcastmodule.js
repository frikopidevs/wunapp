(function() {
	'use strict';

	angular
		.module('broadcast.module', [
			'ionic'
		])
		.config(function($stateProvider,$urlRouterProvider) {
			$stateProvider
				.state('broadcast', {
					url: '/broadcast',
					templateUrl: 'scripts/broadcast/broadcast.html',
    				controller:'broadcastCtrl'
				});
		});
})();
