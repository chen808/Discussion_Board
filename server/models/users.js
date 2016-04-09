// User (model)

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// creating UserSchema
var UserSchema = new mongoose.Schema({
	user_name:String,
	topic_count:Number,
	post_count:Number,
	comment_count:Number
});

mongoose.model('User', UserSchema);