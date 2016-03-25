// Topic (model)

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// creating TopicSchema
var TopicSchema = new mongoose.Schema({
	user_name:String,
	topic:String,
	description:String,
	category:String,
	answer_count:Number,
	// creating association to Answer
	answers: [{type: Schema.Types.ObjectId, ref:'Answer'}]
});

mongoose.model('Topic', TopicSchema);