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
		console.log('==========');
		console.log(res);
		topic.get_all(req, res);
	})



	// POSTS ===========================================
	app.post('/createTopic', function(req, res){
		topic.createTopic(req, res);
	})

	app.post('/add_answer/:id', function(req, res){
		topic.addAnswer(req, res, req.params.id);
	})




};