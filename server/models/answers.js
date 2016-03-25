// Answer (model)

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// creating AnswerSchema
var AnswerSchema = new mongoose.Schema({
	user_name:String,
	answer:String,
	upvote:Number,
	downvote:Number,
	// creating association to Comment
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
	// referencing to indicate it belongs to Topic model
	_topic: {type: Schema.Types.ObjectId, ref:'Topic'}
});

mongoose.model('Answer', AnswerSchema);