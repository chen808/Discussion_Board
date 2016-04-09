// TOPIC CONTROLLER
var mongoose = require('mongoose');
var Topic = mongoose.model('Topic');
var Answer = mongoose.model('Answer');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment')

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


		 get_User_Profile: function(req, res){
		 	console.log('=========OMG HEY====');
		 	console.log(req.params.name);
		 	// req.body now contains the user name
		 	User.find({user_name:req.params.name}, function(err, results){
		 		console.log('===OMG===');
		 		console.log(results);
		 		if(err){
		 			console.log('Error getting user profile info');
		 		}
		 		else{
		 			res.json(results);
		 			console.log('=========== OMG');
		 			console.log(results);
		 		}
		 	})
		 },




		 // *** look in to this (extra code??)
		 get_all: function(req, res){
		 	Topic.find({})
		 		.populate('answers')
		 		.exec(function(err, answer){
		 			res.json('answer', {answer});
		 		})
		 },

		 // *** extra code, same as bottom??
		 get_this_topic_answer: function(req, res){
		 	Topic.findOne({_id: req.params.id})
		 		.populate('answers')
		 		.exec(function(err, answer){
		 			res.json('answer', {answer});
		 		})
		 },


		 get_this_answer_comment: function(req, res){
		 	Answer.findOne({_id: req.params.id})
		 		.populate('comments')
		 		.exec(function(err, comment){
		 			res.json('comment', {comment});
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

		 // add answer(post) ==================================================================================
		 addAnswer: function(req, res, id){
		 	// console.log(req.body[0].user_name[0]);
		 	// console.log(req.body[0].answer);
		 	// console.log(id);

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


		 addComment: function(req, res, id){
		 	// console.log(req.body[0].user_name[0]);
		 	// console.log(req.body[0].comment);
		 	// console.log(id);

		 	Answer.findOne({_id:req.params.id}, function(err, answer){
		 		var comment = new Comment({user_name:req.body[0].user_name[0], comment:req.body[0].comment});

		 		comment._answer = answer._id;

		 		answer.comments.push(comment);

		 		comment.save(function(err){
		 			answer.save(function(err){
		 				if(err){
		 					console.log('error saving');
		 				}
		 				else{
		 					res.redirect('/');
		 				}
		 			})
		 		})
		 	})

		 },













		 // Up vote count =====================================================================================
		 upvote_this_count: function(req, res, id){
		 	// find the specific answer using incoming id, then increment by 1
		 	Answer.findOneAndUpdate( {_id: id}, {$inc:{upvote: 1}}, function(err, Answer){
		 		if(err){
		 			console.log('error incrementing');
		 		}
		 		else{
		 			console.log('increment success!');
		 			// return the json data (which includes the upvote count)
		 			res.json(Answer);
		 		}
		 	} );
		 },

		 // Down vote count ===================================================================================
 		 downvote_this_count: function(req, res, id){
		 	// find the specific answer using incoming id, then increment by 1
		 	Answer.findOneAndUpdate( {_id: id}, {$inc:{downvote: -1}}, function(err, Answer){
		 		if(err){
		 			console.log('error downvoting');
		 		}
		 		else{
		 			console.log('downvote success!');
		 			// return the json data (which includes the upvote count)
		 			console.log(Answer);
		 			res.json(Answer);
		 		}
		 	} );
		 },


		 // Update User topic count ==========================================================================
		 updateUserTopicCount: function(req, res){
		 	// req.body contains the current user name
		 	
		 	// lets target the User table and find if current user exists
		 	User.count({user_name:req.body}, function(err, count){
		 		if(count > 0){
		 			// if count is over 0, user exists! then we'll just update topic count
		 			User.findOneAndUpdate( {user_name:req.body}, {$inc:{topic_count: 1}}, function(err, User){
		 				if(err){
		 					console.log('error updating topic count');
		 				}
		 				else{
		 					console.log('successfully updated topic count');
		 				}
		 			})
		 		}
		 		// if count is < 0, user does not exist. Now we'll create user
		 		else{
		 			// creating the new user
		 			User.create({user_name:req.body}, function(err, results){
		 				if(err){
		 					console.log('error creating new user in User Collection');
		 				}
		 				else{
		 					console.log('successfully created new user in User Collection');
		 				}
		 			})
		 			// update the topic count
		 			User.findOneAndUpdate( {user_name:req.body}, {$inc:{topic_count: 1}}, function(err, User){
		 				if(err){
		 					console.log('error updating topic count');
		 				}
		 				else{
		 					console.log('successfully updated topic count');
		 				}
		 			})
		 		}
		 	})
		 },


		 // Update User post count ============================================================================
		 updateUserPostCount: function(req, res){
		 	// req.body contains the current user name

		 	User.count({user_name:req.body}, function(err, count){
	 		if(count > 0){
	 			// if count is over 0, user exists! then we'll just update post count
	 			User.findOneAndUpdate( {user_name:req.body}, {$inc:{post_count: 1}}, function(err, User){
	 				if(err){
	 					console.log('error updating post count');
	 				}
	 				else{
	 					console.log('successfully updated post count');
	 				}
	 			})
	 		}
	 		// if count is < 0, user does not exist. Now we'll create user
	 		else{
	 			// creating the new user
	 			User.create({user_name:req.body}, function(err, results){
	 				if(err){
	 					console.log('error creating new user in User Collection');
	 				}
	 				else{
	 					console.log('successfully created new user in User Collection');
	 				}
	 			})
	 			// update the post count
	 			User.findOneAndUpdate( {user_name:req.body}, {$inc:{post_count: 1}}, function(err, User){
	 				if(err){
	 					console.log('error updating post count');
	 				}
	 				else{
	 					console.log('successfully updated post count');
	 				}
	 			})
	 		}
	 	})
		},





		


	} // end return





})(); // end module.exports