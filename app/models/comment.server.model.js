'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	commentTo: {
		type: String,
		default: '',
		requried: 'postID requried',
		trim: true
	},
	
	comment: {
		type: String,
		default: '',
		required: 'Please fill comment content',
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
	commentBy: {
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
		type: Number,
		default: 0,
		trim: true
	}
});

mongoose.model('Comment', CommentSchema);