'use strict'

app.factory('LoginFactory', function($http) {
	var LoginFactory = {};

	LoginFactory.submit = function(credentials) {
		return $http.post('/api/users/login', credentials);
	};

	return LoginFactory;
});
