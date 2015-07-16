'use strict';

//Posts service used to communicate Posts REST endpoints
angular.module('posts')

	.factory('Posts', ['$resource',
		function($resource) {
			return $resource('posts/:postId', { postId: '@_id'
			}, {
				update: {
					method: 'PUT'
				}
			});
		}
	])
	
	.factory('Notify', ['$rootScope', function($rootScope) {
			var notify = {};
			
			notify.sendMsg = function(msg, data){
				data = data || {};
				$rootScope.$emit(msg, data);
				
				console.log('message sent!');
			};
			
			notify.getMsg = function(msg, func, scope) {
				var unbind = $rootScope.$on(msg, func);
				
				if (scope) {
					scope.$on('destroy', unbind)
				}
			};
			
			return notify;
			
		}
	]);