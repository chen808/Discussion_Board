// Comment (model)

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// creating CommentSchema
var CommentSchema = new mongoose.Schema({
	user_name:String,
	comment:String,
	// referencing to indicate it belogns to Answer model
	_answer: {type: Schema.Types.ObjectId, ref:'Answer'}
});

mongoose.model('Comment', CommentSchema);