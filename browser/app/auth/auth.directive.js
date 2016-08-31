'use strict';

app.directive('auth', function ($state, AuthFactory, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: '/browser/app/auth/auth.template.html',
    scope: '=',
    link: function(scope, element, attrs) {
      scope.buttonName = $state.current.name;
      scope.submit = function() {
        if ($state.current.name === 'signup') {
          AuthFactory.signup(scope.user);
        } else if ($state.current.name === 'login') {
          AuthFactory.login(scope.user);
        }
      };
    }
  };
});
