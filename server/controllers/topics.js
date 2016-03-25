// TOPIC CONTROLLER
var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');

module.exports = (function(){

	return {

		getTopics: function(req, res){
			Topic.find({}, function(err, results){
				if(err){
					console.log("Error getting data");
				}
				else{
					res.json(results);
				}
			})
		},

		 createTopic: function(req, res){
		 	Topic.create({user_name:req.body.user_name, topic:req.body.topic, description:req.body.description, category:req.body.category, answer_count:req.body.answer_count}, function(err, results){
		 		if(err){
		 			console.log(err);
		 		}
		 		else{
		 			res.json(results);
		 		}
		 	})
		 },




		 getATopic: function(req, res, id){
		 	Topic.findById( id, function(err, results){
		 		if(err){
		 			console.log(err);
		 		}
		 		else{
		 			res.json(results);
		 		}
		 	})
		 	
		 },

		


	} // end return





})(); // end module.exports