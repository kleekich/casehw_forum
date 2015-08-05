'use strict';

angular.module('posts').factory('Category', [
	function() {
		// Category service logic
		// ...
		var sharedCategory ={};
		var sharedTopic={};
		var hidePostList=true;
		// Public API
		return {
			sharedCategory,
			sharedTopic,
			hidePostList
			
		};
	}
]);