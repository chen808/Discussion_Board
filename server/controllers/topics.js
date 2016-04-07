// TOPIC CONTROLLER
var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var Answer = mongoose.model('Answer');

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


		 addAnswer: function(req, res, id){
		 	console.log(req.body[0].user_name[0]);
		 	console.log(req.body[0].answer);
		 	console.log(id);

		 	Topic.findOne({_id:req.params.id}, function(err, topic){
		 		var answer = new Answer({user_name:req.body[0].user_name[0], answer:req.body[0].answer});

		 		answer._topic = topic._id;

		 		topic.answers.push(answer);

		 		answer.save(function(err){
		 			topic.save(function(err){
		 				if(err){
		 					console.log('error');
		 				}
		 				else{
		 					res.redirect('/');
		 				}
		 			})
		 		})
		 	})
		 },



		 get_all:function(req,res){
			Topic.findOne({})
			.populate({
				path:'topics',
				model:'Topic',
				populate: {
					path:'answers',
					model:'Answer',
					populate:{
						path:'comments',
						model:'Comment',
						populate: {
							path: 'likes',
							model: 'Like'
						}
					}
				}
			})
			.exec(function(err, user){
				if(err)
				{
					console.log(err);
				}
				else
				{
					// console.log(user);
					res.json(user);
				}
			})

		},

		


	} // end return





})(); // end module.exports