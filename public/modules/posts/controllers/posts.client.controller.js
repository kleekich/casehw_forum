'use strict';

// Posts controller
var postsApp = angular.module('posts');

postsApp.controller('PostsController', ['$scope', '$stateParams', 'Authentication', 'Posts', '$modal', '$log', '$location', '$http',
	function($scope, $stateParams, Authentication, Posts, $modal, $log, $location, $http) {
		$scope.me = Authentication.user.lastName;
		$scope.selectedTopic = null;
		$scope.categories = [
			
			{
				id: 1,
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
				id: 2,
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
				id: 3,
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
		$scope.selectedCategory = $scope.categories[1];
		this.authentication = Authentication;
		// Find a list of Posts
		this.posts = Posts.query();
		
		// Find existing Post
		$scope.findOne = function() {
			$scope.post = Posts.get({ 
				postId: $stateParams.postId
			});
		};
		//Open a modal window to Create a single post record
		 $scope.animationsEnabled = true;
		  this.modalCreate = function (size) {
		
		    var modalInstance = $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'modules/posts/views/create-post.client.view.html',
		      controller: function ($scope, $modalInstance) {
		      	
		      	 
		      	 $scope.ok = function () {
		      	 	
				    $modalInstance.close();
		      	 	
		      	 };
				
				  $scope.cancel = function () {
				    $modalInstance.dismiss('cancel');
				  };
		      	 
		      },
		      size: size
		    });
		
		    modalInstance.result.then(function (selectedItem) {
		    }, function () {
		      $log.info('Modal dismissed at: ' + new Date());
		    });
		  };
		
		
		//Open a modal window to Update a single post record

		  this.modalUpdate = function (size, selectedPost) {
		
		    var modalInstance = $modal.open({
		      animation: $scope.animationsEnabled,
		      templateUrl: 'modules/posts/views/edit-post.client.view.html',
		      controller: function ($scope, $modalInstance, post) {
		      	 $scope.post = post;
		      	 
		      	 $scope.ok = function () {
		      	 	
				    $modalInstance.close($scope.post);
				  	
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
		  
		  
		  
		  
		  	// Remove existing Post
		this.remove = function(post) {
			if ( post ) { 
				post.$remove();
				$location.path('/posts');

				for (var i in this.posts) {
					if (this.posts [i] === post) {
						this.posts.splice(i, 1);
					}
				}
			} else {
				this.post.$remove(function() {
					//delete then direct to list
					$location.path('/posts');
				});
			}
		};
	
	
	
	$scope.comments = [
		{
			postId: '55a9aada3dd4d91b08290cf2',
			postBy: "mozzi",
			content: "I'm in Spain now",
			numLikes: 100
	
		},
	
		{	
			postId: '55a9aada3dd4d91b08290cf2',
			postBy: "Kangsik",
			content: "Have a nice trip!",
			numLikes: 3
	
		},
	
		{
		    postId: '55a9a2183dd4d91b08290cf1',
			postBy: "Nice guy",
			content: "Is this single page?",
			numLikes: 1000
	
		},
	
		{
			postId: '55a9a2183dd4d91b08290cf1',
			postBy: "Mozzi",
			content: "Nice guys!!",
			numLikes: 24
	
	
		},
	
		{
			postId: '55a9aada3dd4d91b08290cf2',
			postBy: "Jake",
			content: "Tokyo was awesome!",
			numLikes: 45
	
		}
	];
	
		
		$scope.selectTopic = function(selectedTopic) {
			if(selectedTopic=='all'){
				var topicArray= $scope.selectedCategory.topics;
				var allTopicString='';
				var i=0;
				for(i; i < topicArray.length; i++){
					allTopicString.concat(topicArray[i].name);
				}
				$scope.topic = allTopicString;
			}else{
				$scope.topic=  selectedTopic
				
			}
		  };

		
	}
]);


postsApp.controller('PostsCreateController', ['$scope', 'Posts', 'Notify', 'Authentication',
	function($scope, Posts, Notify, Authentication) {
		
		$scope.categories = [
			
			{
				id: 1,
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
				id: 2,
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
				id: 3,
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
		$scope.selectedCategory = $scope.categories[1];
		// Create new Post
		
		this.create = function() {
			// Create new Post object
			var post = new Posts ({
				postBy: Authentication.user.displayName,
				title: this.title,
				content: this.content,
				category: this.category,
				topic: this.topic,
				
			});

			// Redirect after save
			post.$save(function(response) {
				
				
				Notify.sendMsg('NewPost', {'id': response._id});
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);

postsApp.controller('PostsUpdateController', ['$scope', 'Posts',
	function($scope, Posts) {
		$scope.categories = [
			
			{
				id: 1,
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
				id: 2,
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
				id: 3,
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
		$scope.selectedCategory = $scope.categories[1];
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

postsApp.controller('SinglePostController', ['$scope', 'Posts',
	function($scope, Posts) {
	
		


	}
]);
postsApp.directive('postList', ['Posts', 'Notify', function(Posts, Notify){
	return{
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/posts/views/post-list-template.html',
		link: function(scope, element, attrs){
			
			//when a new post is added, update the post list
			
			Notify.getMsg('NewPost', function(event, data) {
				
				scope.postsCtrl.posts = Posts.query();
				
			});
		}
	};
	
}]);

postsApp.directive('commentList', ['Posts', 'Notify', function(Posts, Notify){
	return{
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/posts/views/comment-list-template.html',
		link: function(scope, element, attrs){}
		
		
	};	
}]);

	

	
		
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
		
		

	

	

	
*/