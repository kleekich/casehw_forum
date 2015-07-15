'use strict';

// Posts controller
angular.module('posts').controller('PostsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Posts',
	function($scope, $stateParams, $location, Authentication, Posts) {
		$scope.authentication = Authentication;
		$scope.currentCategoryIndex = 0;
		$scope.currentCategory = 'Share Your Ideas';
		$scope.postTopic = 'Business Strategy';
		$scope.categories = [
			
			{
				id: 'introduce-yourself',
				title: 'Introduce Yourself',
				snippet: 'Get to know other cashew members',
				topics: [
					{ name: 'Friends',
						numPosts: 0,
						numNewPosts:0,
					}
					]
			},
			{
				id: 'share-your-ideas',
				title: 'Share Your Ideas',
				snippet: 'Share ideas, interests, strategies',
				topics: [
					{ name: 'Business Strategy',
						numPosts: 4,
						numNewPosts:4,
					},
					{ name: 'Custommer Strategy',
						numPosts: 1,
						numNewPosts: 1,
					},
					{ name: 'Other Topics',
						numPosts: 2,
						numNewPosts: 2,
					}
				]
			},
			{
				id: 'feedback-for-cashew',
				title: 'Feedback For Cashew',
				snippet: 'We likes to hear from you!',
				topics: [
					{ name: 'Q&A',
						numPosts: 4,
						numNewPosts:4,
					},
					{ name: 'feedBack',
						numPosts: 1,
						numNewPosts: 1,
					},
					{ name: 'Other Topics',
						numPosts: 2,
						numNewPosts: 2,
					}
				]
			}
		];
		
		// Create new Post
		$scope.create = function() {
			// Create new Post object
			var post = new Posts ({
				title: this.title,
				content: this.content,
				category: this.category,
				topic: this.topic,
				postBy: this.postBy
			});

			// Redirect after save
			post.$save(function(response) {
				$location.path('posts/' + response._id);

				// Clear form fields
				$scope.title = '';
				$scope.content = '';
				$scope.category = '';
				$scope.topic = '';
				$scope.postBy = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Post
		$scope.remove = function(post) {
			if ( post ) { 
				post.$remove();

				for (var i in $scope.posts) {
					if ($scope.posts [i] === post) {
						$scope.posts.splice(i, 1);
					}
				}
			} else {
				$scope.post.$remove(function() {
					$location.path('posts');
				});
			}
		};

		// Update existing Post
		$scope.update = function() {
			var post = $scope.post;

			post.$update(function() {
				$location.path('posts/' + post._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Posts
		$scope.find = function() {
			$scope.posts = Posts.query();
		};

		// Find existing Post
		$scope.findOne = function() {
			$scope.post = Posts.get({ 
				postId: $stateParams.postId
			});
		};
	}
]);