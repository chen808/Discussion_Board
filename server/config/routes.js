// ROUTES.JS

// require topic controller
var topic = require('./../controllers/topics.js');

// require comment controller
var comment = require('./../controllers/comments.js');

// require answer controller
var answer = require('./../controllers/answers.js');



module.exports = function(app){

	// GETS ===========================================
	app.get('/getTopics', function(req, res){
		topic.getTopics(req, res);
	})

	app.get('/getthisTopic/:id', function(req, res){
		topic.getATopic(req, res, req.params.id);
	})

	app.get('/get_all', function(req, res){
		topic.get_all(req, res);
	})
	app.get('/getThisTopicAnswer/:id', function(req, res){
		topic.get_this_topic_answer(req, res, req.params.id);

	})

	app.get('/upvote_count/:id', function(req, res){
		topic.upvote_this_count(req, res, req.params.id);
	})

	app.get('/downvote_count/:id', function(req, res){
		topic.downvote_this_count(req, res, req.params.id);
	})



	// POSTS ===========================================
	app.post('/createTopic', function(req, res){
		topic.createTopic(req, res);
	})

	app.post('/add_answer/:id', function(req, res){
		topic.addAnswer(req, res, req.params.id);
	})




};