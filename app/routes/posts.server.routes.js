'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var posts = require('../../app/controllers/posts.server.controller');

	// Posts Routes
	app.route('/forum')
		.get(posts.list)
		.post(users.requiresLogin, posts.create);

	app.route('/forum/:postId')
		.get(posts.read)
		.put(users.requiresLogin, posts.hasAuthorization, posts.update)
		.delete(users.requiresLogin, posts.hasAuthorization, posts.delete);

	// Finish by binding the Post middleware
	app.param('postId', posts.postByID);
};
