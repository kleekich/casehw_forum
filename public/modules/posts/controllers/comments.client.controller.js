'use strict';


var postsApp = angular.module('posts');

// Posts controller
postsApp.controller('CommentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Comments', 'Posts',
	function($scope, $stateParams, $location, Authentication, Comments, Posts) {
		$scope.authentication = Authentication;
		
		// Create new Comment
		$scope.create = function() {
			// Create new Comment object
			
			var comment = new Comments ({
				comment: this.comment,
				commentTo: $stateParams.postId,
				commentBy: Authentication.user.displayName
				
			});

			// Redirect after save
			comment.$save(function(response) {

				// Clear form fields
				$scope.comment = '';
				$scope.commentTo = '';
				$scope.commentBy = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Comment
		$scope.remove = function(comment) {
			if ( comment ) { 
				comment.$remove();

				for (var i in $scope.comments) {
					if ($scope.comments [i] === comment) {
						$scope.comments.splice(i, 1);
					}
				}
			} else {
				$scope.comment.$remove(function() {
					$location.path('posts/' + $stateParams.postId);
				});
			}
		};

		// Update existing Comment
		$scope.update = function() {
			var comment = $scope.comment;

			comment.$update(function() {
				$location.path('posts/' + $stateParams.postId);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Comments
		$scope.find = function() {
			$scope.comments = Comments.query();
		};

	}
]);