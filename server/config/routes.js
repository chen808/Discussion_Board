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
		console.log(req);
		topic.getATopic(req, res, req.params.id);
	})

	app.get('/get_all', function(req, res){
		topic.get_all(req, res);
	})

	app.get('/getThisTopicAnswer/:id', function(req, res){
		topic.get_this_topic_answer(req, res, req.params.id);
	})

	app.get('/getThisAnswerComment/:id', function(req, res){
		topic.get_this_answer_comment(req, res, req.params.id);
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

	app.post('/add_comment/:id', function(req, res){
		topic.addComment(req, res, req.params.id);
	})

	// once user creates a topic, update topic count
	app.post('/update_user_topic_count/', function(req, res){
		topic.updateUserTopicCount(req, res);
	})

	// once user answers a topic, update post count
	app.post('/update_user_post_count/', function(req, res){
	// once user answers a topic, update post count
		topic.updateUserPostCount(req, res);
	})

	app.post('/get_this_User_Profile/:name', function(req, res){
		topic.get_User_Profile(req, res);
	})	



};