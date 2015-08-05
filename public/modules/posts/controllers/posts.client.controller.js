'use strict';


var postsApp = angular.module('posts');

// Posts controller
postsApp.controller('PostsController', ['$scope', '$stateParams', 'Authentication', 'Posts', '$modal', '$log', '$location', '$http', 'Category', '$state',
	function($scope, $stateParams, Authentication, Posts, $modal, $log, $location, $http, Category, $state) {
		$scope.forumGuideTitle = Category.sharedCategory.title;
		$scope.forumGuideSnippet = Category.sharedCategory.snippet;
		$scope.selectedCategory = Category.sharedCategory.title;
		$scope.selectedSnippet = Category.sharedCategory.snippet;
		$scope.animationsEnabled = true;
		//Forum Categories data
		$scope.categories = [
			{   
				title: 'Introduce Yourself',
				snippet: 'Get to know other cashew members, and build a cashew community!',
			},
			{
				title: 'Share Your Ideas',
				snippet: 'Share ideas, interests, strategies.',
			},
			{
				title: 'Feedback For Cashew',
				snippet: 'We likes to hear from you!',
				
			}
		];
		
		
		//Forum Topics
		$scope.topics = [
					{
						group: 'Introduce Yourself',
						label: 'Cashew Community',
						numPosts: 0
					},
					{
						group: 'Share Your Ideas',
						label: 'Business Strategy',
						numPosts: 0
						
					},
					{
						group: 'Share Your Ideas',
						label: 'Custommer Strategy',
						numPosts: 0
						
					},
					{
						group: 'Share Your Ideas',
						label: 'Other Topics',
						numPosts: 0
						
					},
					{
						group: 'Feedback For Cashew',
						label: 'Q&A',
						numPosts: 0
						
					},
					{ 
						group: 'Feedback For Cashew',
						label: 'Feed Back',
						numPosts: 0
						
					},
					{ 	
						group: 'Feedback For Cashew',
						label: 'Other Topics',
						numPosts: 0
						
					}
					
				];
		
		
		
		$scope.hideForumBoard = false;
		$scope.hideListPostClientView = true;

		
		
		$scope.selectCategory = function(categoryObj) {
		  console.log('category selected: ' + categoryObj.title);
		  $scope.forumGuideTitle = categoryObj.title;
		  $scope.forumGuideSnippet = categoryObj.snippet;
		  $scope.selectedCategory = categoryObj.title;
		  $scope.selectedSnippet = categoryObj.snippet;
		  Category.sharedCategory = categoryObj;//setting category object to Category service
		  $scope.hideForumBoard = true;
		  $scope.hideListPostClientView = false;
		};
		
	
		
		
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
				  	$state.reload();
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
					if (this.posts[i] === post) {
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
		
		Category.sharedTopic = {
						group: Category.sharedCategory.title,
						label: '',
						numPosts: 0
					};
		$scope.defaultTopic =  {
						group: Category.sharedCategory.title,
						label: '',
						numPosts: 0
					};
		
		$scope.selectTopic = function(topicObj) {
			console.log('topic selected: ' + topicObj);
			if(topicObj==='all'){
				var topicArray= $scope.topics;
				var allTopicString='';
				var i=0;
				for(i; i < topicArray.length; i++){
					allTopicString.concat(topicArray[i].name);
				}
				$scope.selectedTopic= allTopicString;
				
		  		
			}else{
				$scope.selectedTopic=  topicObj.label;
				Category.sharedTopic = topicObj;
			}
		  };
		
		$scope.reloadRoute = function() {
			$state.reload();
		};
		
		
		
		//Like System
		
		console.log('$scope.post:' + Posts.get({_id: $stateParams.postId}).toString());
		$scope.currentPost = Posts.get({postId: $stateParams.postId});
		//console.log('$scope.currentPost[postBy]:' + $scope.currentPost[{postId}]);
		/*
		if($scope.post.postBy === Authentication.user.displayName){
				$scope.likeStatus = 'Likefggf';
		}
		
		
		if($scope.post.likedBy[Authentication.user.username.toString()] === null){
			$scope.likeStatus = 'Like';
		}else{
			$scope.likeStatus = 'Unlike';
		}
		*/
		
		//increment numlike by 1 for a post
		$scope.likePost = function(likedPost) {
			var post = likedPost;
			$scope.currPost = post;
			var likeArray = likedPost.likedBy;
			console.log(typeof(likeArray));
	
			var userName = Authentication.user.username;
			
			
			if($scope.likeStatus === 'Like' && likeArray.indexOf(userName) ===-1){
				console.log('Like Clicked');
				console.log('likeArray.indexOf(userName):' + likeArray.indexOf(userName));
				$scope.likeStatus = 'Unlike';
				post.likes = parseInt(post.likes) + 1; 
				post.likedBy.push(userName);
				console.log(post.likedBy);
				post.$update(function(){
						
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}else if($scope.likeStatus === 'Unlike' && likeArray.indexOf(userName) !== -1){
				console.log('Unlike Clicked');
				$scope.likeStatus = 'Like';
				post.likes = parseInt(post.likes) - 1;
				var index = post.likedBy.indexOf(userName);
				post.likedBy.splice(index, 1);
				console.log(post.likedBy);
				
				post.$update(function(){
						
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}
		};
		
		$scope.backToList = function() { 
		 	console.log('this is right back button!!!');
    		window.history.back();
    		$scope.selectCategory(Category.sharedCategory);
    		$scope.selectTopic(Category.sharedTopic);
    		console.log(Category.sharedCategory.title);
    		console.log(Category.sharedCategory.snippet);
    		$scope.forumGuideTitle = Category.sharedCategory.title;
    		$scope.forumGuideSnippet = Category.sharedCategory.snippet;
  		};
	

	}
]);



postsApp.controller('PostsCreateController', ['$scope', 'Posts', 'Notify', 'Authentication', 'Category',
	function($scope, Posts, Notify, Authentication, Category) {
		
		$scope.categories = [
			{   
				title: 'Cashew Forum',
				snippet: 'Welcome to Cashew Forum! '
			},
			{   
				title: 'Introduce Yourself',
				snippet: 'Get to know other cashew members, and build a cashew community!',
			},
			{
				title: 'Share Your Ideas',
				snippet: 'Share ideas, interests, strategies.',
			},
			{
				title: 'Feedback For Cashew',
				snippet: 'We likes to hear from you!',
				
			}
		];
		
		
		//Forum Topics
		$scope.topics = [
					{
						group: 'Introduce Yourself',
						label: 'Cashew Community',
						numPosts: 0
					},
					{
						group: 'Share Your Ideas',
						label: 'Business Strategy',
						numPosts: 0
						
					},
					{
						group: 'Share Your Ideas',
						label: 'Custommer Strategy',
						numPosts: 0
						
					},
					{
						group: 'Share Your Ideas',
						label: 'Other Topics',
						numPosts: 0
						
					},
					{
						group: 'Feedback For Cashew',
						label: 'Q&A',
						numPosts: 0
						
					},
					{ 
						group: 'Feedback For Cashew',
						label: 'Feed Back',
						numPosts: 0
						
					},
					{ 	
						group: 'Feedback For Cashew',
						label: 'Other Topics',
						numPosts: 0
						
					}
					
				];
				
		$scope.selectedCategory = Category.sharedCategory.title;

		// Create new Post
		
		this.create = function() {
			// Create new Post object
			var post = new Posts ({
				postBy: Authentication.user.displayName,
				title: this.title,
				content: this.content,
				category: this.category,
				topic: this.topic,
				likedBy: Authentication.user.username
				
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


postsApp.controller('PostsUpdateController', ['$scope', 'Posts', 'Category',
	function($scope, Posts, Category) {
	$scope.categories = [
			{   
				title: 'Cashew Forum',
				snippet: 'Welcome to Cashew Forum! '
			},
			{   
				title: 'Introduce Yourself',
				snippet: 'Get to know other cashew members, and build a cashew community!',
			},
			{
				title: 'Share Your Ideas',
				snippet: 'Share ideas, interests, strategies.',
			},
			{
				title: 'Feedback For Cashew',
				snippet: 'We likes to hear from you!',
				
			}
		];
		
		
		//Forum Topics
		$scope.topics = [
					{
						group: 'Introduce Yourself',
						label: 'Cashew Community',
						numPosts: 0
					},
					{
						group: 'Share Your Ideas',
						label: 'Business Strategy',
						numPosts: 0
						
					},
					{
						group: 'Share Your Ideas',
						label: 'Custommer Strategy',
						numPosts: 0
						
					},
					{
						group: 'Share Your Ideas',
						label: 'Other Topics',
						numPosts: 0
						
					},
					{
						group: 'Feedback For Cashew',
						label: 'Q&A',
						numPosts: 0
						
					},
					{ 
						group: 'Feedback For Cashew',
						label: 'Feed Back',
						numPosts: 0
						
					},
					{ 	
						group: 'Feedback For Cashew',
						label: 'Other Topics',
						numPosts: 0
						
					}
					
				];
				
		$scope.selectedCategory = Category.sharedCategory.title;
		$scope.selectedTopic = Category.sharedTopic.label;

		// Update existing Post
		this.update = function(updatedPost) {
			var post = updatedPost;

			post.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]);
// Comments controller
postsApp.controller('CommentsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Comments', 'Posts',
	function($scope, $stateParams, $location, Authentication, Comments, Posts) {
		$scope.authentication = Authentication;
		$scope.currentPost = $stateParams.postId;

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
postsApp.controller('CommentsCreateCroller', ['$scope', '$stateParams', '$location', 'Authentication', 'Comments', 'Posts', '$state',
	function($scope, $stateParams, $location, Authentication, Comments, Posts, $state) {
		$scope.authentication = Authentication;
		
		// Create new Comment
		$scope.createComment = function() {
			// Create new Comment object
			
			var comment = new Comments ({
				comment: this.comment,
				commentTo: $stateParams.postId,
				commentBy: Authentication.user.displayName
				
			});

			// Redirect after save
			comment.$save(function(response) {
				console.log('asfdasdfasfd');
				
				// Clear form fields
				$scope.comment = '';
				$scope.commentTo = '';
				$scope.commentBy = '';
				$state.reload();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		 
		 
	

	}
]);



postsApp.directive('listPostsClientView', ['Posts', function(Posts){
	return{
		restrict: 'E',
		transclude: true,
		templateUrl: 'modules/posts/views/list-posts.client.view.html'
	};
	
	
}]);


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
