'use strict';

//Setting up route
angular.module('posts').config(['$stateProvider',
	function($stateProvider) {
		// Posts state routing
		$stateProvider.
		state('listPosts', {
			url: '/posts',
			templateUrl: 'modules/posts/views/cashew-forum.client.view.html'
		}).

		state('viewPost', {
			url: '/posts/:postId',
			templateUrl: 'modules/posts/views/view-post.client.view.html'
		});

	}
]);