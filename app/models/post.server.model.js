'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * LikedBy Schema
 * 
 **/
var LikedBySchema = new Schema({
	username: {
		type: String,
		required: 'username is required',
		trim: true
	}
});


/**
 * Post Schema
 */
var PostSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Post title',
		trim: true
	},
	content: {
		type: String,
		default: '',
		required: 'Please fill Post content',
		trim: true
	},
	category: {
		type: String,
		default: '',
		required: 'Please choose Post category',
		trim: true
	},
	topic: {
		type: String,
		default: '',
		required: 'Please choose Post topic',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	postBy: {
		type: String,
		default: '',
		//required: 'please identify author',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	
	likes: {
		type: String,
		default: '0',
		trim: true
	},
	likedBy: {
		type: String,
		default: [LikedBySchema]
	},
	comments: {
		type: String,
		default: '0',
		trim: true
	},
	hot: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Post', PostSchema);