'use strict'

app.factory('AuthFactory', function($http) {
	var AuthFactory = {};
	var user = {};

	AuthFactory.signup = function(newUser) {
		return $http.post('/api/users', newUser)
		.then(function (_user) {
			return AuthFactory.login(_user.data);
    });
	};

	AuthFactory.login = function(userObj) {
		return $http.post('/api/auth/login', userObj)
		.then(function (_user) {
      user = _user.data;
    });
	};

	AuthFactory.isLoggedIn = function() {
		if (user !== {}) {
			return true;
		} else {
			return false;
		}
	};

	AuthFactory.getUser = function() {
		return $http.get('/api/auth/auth/me')
		.then(function (_user) {
			return _user.data;
		});
	};

	AuthFactory.isAdmin = function() {
		if (user && user.isAdmin) {
		return true;
		} else {
			return false;
		}
	};

	return AuthFactory;
});
