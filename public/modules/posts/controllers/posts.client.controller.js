'use strict';

// Posts controller
var postsApp = angular.module('posts');

postsApp.controller('PostsController', ['$scope', '$stateParams', 'Authentication', 'Posts', '$modal', '$log',
	function($scope, $stateParams, Authentication, Posts, $modal, $log) {
		
		this.authentication = Authentication;
		// Find a list of Posts
		this.posts = Posts.query();
		
		
		//Open a modal window to Update a single post record

		  this.modalUpdate = function (size, selectedPost) {
		
		    var modalInstance = $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'modules/posts/views/edit-post.client.view.html',
		      controller: function ($scope, $modalInstance, post) {
		      	 $scope.post = post;
		      	 
		      	 $scope.ok = function () {
		      	 	if(updatePostForm.$valid){
				    $modalInstance.close($scope.post);
				  }
		      	 };
				
				  $scope.cancel = function () {
				    $modalInstance.dismiss('cancel');
				  };
		      	 
		      },
		      size: size,
		      resolve: {
		        post: function () {
		          return selectedPost;
		        }
		      }
		    });
		
		    modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		  };


		
	}
]);

postsApp.controller('PostsCreateController', ['$scope', 'Posts',
	function($scope, Posts) {
	
	}
]);

postsApp.controller('PostsUpdateController', ['$scope', 'Posts',
	function($scope, Posts) {
		
		// Update existing Post
		this.update = function(updatedPost) {
			var post = updatedPost;

			post.$update(function() {
				//redirection
				//$location.path('posts/' + post._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);
		
		
/*		
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

	
		// Find existing Post
		$scope.findOne = function() {
			$scope.post = Posts.get({ 
				postId: $stateParams.postId
			});
		};
*/