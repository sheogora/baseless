app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider
		.when ('/proj1', {
			templateUrl: '/proj1.html',
			controller: 'Proj1Ctrl'
		})
		.otherwise({
			redirectTo: '/'
		});
		
	$locationProvider.html5Mode(true);
	
}]);