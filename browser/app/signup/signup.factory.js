'use strict'

app.factory('SignupFactory', function($http) {
	var SignupFactory = {};

	SignupFactory.submit = function(newUser) {
		return $http.post('/api/users', newUser);
	};

	return SignupFactory;
});
