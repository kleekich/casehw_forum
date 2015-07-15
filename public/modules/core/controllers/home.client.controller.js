'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 
	function($scope, Authentication) {
	
		
		// This provides Authentication context.
		$scope.authentication = Authentication;
		
		
		// 
		$scope.hideForumCategory = false;
		$scope.hidePostView = true;
		$scope.hideSearchBar = false;
		$scope.hideNewPost = true;
		$scope.orderProp = '-postDate';
		$scope.coverTitle = 'Cashew Forum';
		$scope.coverSnippet = 'This is a place to build community!';
		$scope.currentCategoryIndex = 0;
		$scope.currentCategory = null;
		$scope.newPostTopic = null;
		
		
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
		$scope.posts = [
			
			{
				postNumber: '0',
				postCategory: 'share-your-ideas',
				postTopic: 'business-strategy',
				title: 'I have a good strategy!',
				postDate : '1288323623006',
				lastUpdate : '1288323623006',
				postBy: 'Eminem',
				content: 'I m a rap god. So, listen.',
				numLikes: 23,
				numComments: '3',
		
			},
		
			{
				postNumber: '1',
				postCategory: 'share-your-ideas',
				postTopic: 'customer-strategy',
				title: 'Here is my idea',
				postDate :'1388323623006',
				lastUpdate :'1388323623006',
				postBy: 'Mozzi',
				content: 'Hey, did you guys know this?',
				numLikes: 100,
				numComments: '4',
		
			},
		
			{
				postNumber: '2',
				postCategory: 'share-your-ideas',
				postTopic: 'business-strategy',
				title: 'My idea is the best!',
				postDate : '1282564643406',
				lastUpdate : '1282564643406',
				postBy: 'Jake',
				content: 'Cashew is awsome!',
				numLikes: 8,
				numComments: '2',
		
			},
		
			{
				postNumber: '3',
				title: 'hello, all of you!',
				postCategory: 'introduce-yourself',
				postTopic: 'greetings',
				postDate : '1282323623006',
				lastUpdate : '1282323623006',
				postBy: 'kleekich',
				content: 'Cashew is amazing!',
				numLikes: 89,
				numComments: '5',
		
			},
		
			{
				postNumber: '4',
				postCategory: 'introduce-yourself',
				postTopic: 'greetings',
				title: 'Hi, I am mozzi',
				postDate : '1282564643406',
				lastUpdate : '1282564643406',
				postBy: 'mozzi',
				content: 'mozzi loves cashew!!!!!',
				numLikes: 45,
				numComments: '2',
		
			}
		
		
		];
		$scope.newPost = {
			postNumber: '',
			postCategory:  '',
			postTopic:  '',
			title:  '',
			postDate : '',
			lastUpdate :  '',
			postBy:  '',
			content:  '',
			numLikes:  '',
			numComments:  '',
			
		};
		
		$scope.errorMessage = 'hi';
		$scope.createNewPost = function(){
			
				$scope.newPost.postNumber= '1';
				$scope.newPost.postCategory= 'share-your-ideas';

				$scope.newPost.postDate = Date.now();
				$scope.newPost.lastUpdate = Date.now();
				$scope.newPost.postBy= 'Tester2';
			
				$scope.newPost.numLikes= 100;
				$scope.newPost.numComments= '4';
				$scope.posts.push($scope.newPost);
			
				/*reset*/
				$scope.newPost = {
				postNumber: '',
				postCategory:  '',
				postTopic:  '',
				title:  '',
				postDate : '',
				lastUpdate :  '',
				postBy:  '',
				content:  '',
				numLikes:  '',
				numComments:  '',
			
				};
				$scope.errorMessage = 'post request for ' + $scope.authentication;
			
		};
		
		
		
		
		$scope.comments = [
			
			{
				commentNumber: '0',
				postId: '0',
				postDate : '1282163623006',
				lastUpdate : '1282163623006',
				postBy: 'mozzi',
				content: 'Hi! I love your song!',
				numLikes: 4
			},
			{	
				commentNumber: '1',
				postId: '0',
				postDate : '1282164623006',
				lastUpdate : '1282164623006',
				postBy: 'kleekich',
				content: 'I love mozzi',
				numLikes: 1
		
			},
			{
				commentNumber: '3',
				postId: '1',
				postDate : '1282164643006',
				lastUpdate : '1282164643006',
				postBy: 'kleekich',
				content: 'What is your phone number?',
				numLikes: 4
		
			},
			{
				commentNumber: '4',
				postId: '1',
				postDate: '1282164643406',
				lastUpdate : '1282164643406',
				postBy: 'jake.jooyoung',
				content: 'I own cashew',
				numLikes: 100
		
		
			},
			{
				commentNumber: '5',
				postId: '1',
				postDate : '1282564643406',
				lastUpdate : '1282564643406',
				postBy: 'kevin',
				content: 'cashew is going to be successful!',
				numLikes: 1000,
		
			}
		];
		

		
		
		$scope.showCover = function(category) {
			$scope.currentCategory = category;
		  $scope.coverTitle = category.title;
		  $scope.coverSnippet = category.snippet;
		  $scope.currentCategoryIndex = 1;
		  $scope.hideForumCategory = true;
		  $scope.hidePostView = false;
		  $scope.hideSearchBar = true;
		  $scope.hideNewPost = true;
		
		};
		$scope.backToForumPostView = function() {
		  $scope.currentCategoryIndex = 1;
		  $scope.hideForumCategory = true;
		  $scope.hidePostView = false;
		  $scope.hideSearchBar = true;
		  $scope.hideNewPost = true;
		
		};
		
		$scope.backToForumHome = function(){
			$scope.currentCategory = null;
		  $scope.coverTitle = 'Cashew Forum';
		  $scope.coverSnippet = 'This is a place to build community!';
		  $scope.currentCategoryIndex = 0;
		  $scope.hideForumCategory = false;
		  $scope.hidePostView = true;
		  $scope.hideSearchBar = false;
		  $scope.hideNewPost = true;
			
		};
		
		
		
		$scope.showNewPost = function(){
			$scope.hideNewPost = false;
		};
		
	
		/*	
				
		
		
		
		
		*/
		$scope.tests = [
			{name: 'kangsik'}
			
			];
		
		$scope.test = function(){
			$scope.tests.push({name: $scope.testName});
			$scope.testName = '';
		};
		
		
		
	}
]);
/*Controllers*/
angular.module('core').controller('PostController', function ($scope){
	
	
	
});



/*Directives*/

angular.module('core').directive('forumCover', function() { 
  return { 
    restrict: 'E', 
    transclude:'true',
    templateUrl: 'modules/core/directives/forum-cover.html' 
  };
});

angular.module('core').directive('forumBoard', function() { 
  return { 
    restrict: 'E', 
    transclude:'true',

    templateUrl: 'modules/core/directives/forum-board.html' 
  }; 
});

angular.module('core').directive('forumGuide', function() { 
  return { 
    restrict: 'E', 
    transclude:'true',
    templateUrl: 'modules/core/directives/forum-guide.html' 
  }; 
});

angular.module('core').directive('forumPostView', function() { 
  return { 
    restrict: 'E', 
    transclude:'true',
    templateUrl: 'modules/core/directives/forum-post-view.html' 
  }; 
});

angular.module('core').directive('postListNavbar', function(){
  return { 
    restrict: 'E', 
    transclude:'true',
    templateUrl: 'modules/core/directives/post-list-navbar.html' 
  }; 
});

angular.module('core').directive('popularPostsSlides', function(){
  return { 
    restrict: 'E', 
    transclude:'true',
    templateUrl: 'modules/core/directives/popular-posts-slides.html' 
  }; 
});

angular.module('core').directive('postNavbar', function(){
  return {
    restrict: 'E',
    transclude: 'true',
    templateUrl: 'modules/core/directives/post-navbar.html' 
  };
});

angular.module('core').directive('posts', function(){
  return {
    restrict: 'E',
    transclude: 'true',
    templateUrl: 'modules/core/directives/posts.html' 
  };
});
angular.module('core').directive('pagenation', function(){
  return {
    restrict: 'E',
    transclude: 'true',
    templateUrl: 'modules/core/directives/pagenation.html' 
  };
});

angular.module('core').directive('newPost', function(){
  return {
    restrict: 'E',
    transclude: 'true',
    templateUrl: 'modules/core/directives/new-post.html' 
  };
});

