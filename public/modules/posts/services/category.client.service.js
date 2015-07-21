'use strict';

angular.module('posts').factory('Category', [
	function() {
		// Category service logic
		// ...
		var sharedCategory ={};
		var sharedTopic={};
		// Public API
		return {
			sharedCategory,
			sharedTopic
		};
	}
]);