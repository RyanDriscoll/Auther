'use strict';

app.controller('StoryDetailCtrl', function ($scope, story, users, AuthFactory) {
	$scope.isAdmin = AuthFactory.isAdmin();
  $scope.story = story;
  $scope.isAuthor = AuthFactory.getUser().id === story.author_id;
  $scope.users = users;
  $scope.$watch('story', function () {
    $scope.story.save();
  }, true);
});
