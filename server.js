var fs = require('fs');
var express = require('express');
var https = require('https');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');
var events = require('events');
var memwatch = require('memwatch');
var sanitizer = require('sanitizer');
var eventEmitter = new events.EventEmitter();
var route = require('./app/app.js')(eventEmitter);
var answers = {};
var scores = {};
var streak = {};
var highstreak = 0;
var visitors = 50;
memwatch.on('stats', function (stats){
	console.log(stats);
});
app.configure(function (){
	/*zapp.get('*',function(req,res,next){
  		if(req.headers['x-forwarded-proto']!='https')
    		res.redirect('https://morning-tor-3846.herokuapp.com'+req.url);
  		else
    		next(); /* Continue to other routes if we're not redirecting */

	//});
	app.use(function (req, res, next){
		var ipAddress;
		//console.log(process.env);
  		var forwardedIpsStr = req.header('x-forwarded-for');      // IP LOgger
  		if(forwardedIpsStr){
    		var forwardedIps = forwardedIpsStr.split(',');
    		ipAddress = forwardedIps[0];
  		}
  		if(!ipAddress) {    		
    		ipAddress = req.connection.remoteAddress;
  		}
  		console.log(ipAddress);
  		//console.log(req.headers);
  	
  		next();
	});	
});
mongoose.connect('mongodb://tantrik:tantrik1115@ds037907.mongolab.com:37907/heroku_app26645381');
var high = new mongoose.Schema({
	highscore : 'string'
});
var question = new mongoose.Schema({
	question : 'string',
	A : 'string',
	B : 'string',
	C : 'string',
	D : 'string',
	answer : 'string',
	id : 'number'},{
	collection : 'questions'
});
var question_temp = new mongoose.Schema({
	question : 'string',
	A : 'string',
	B : 'string',
	C : 'string',
	D : 'string',
	answer : 'string'
});
var Question = mongoose.model('Question', question);
var Question_temp = mongoose.model('Question_temp', question_temp);
var High = mongoose.model('High', high);
var total_questions = 0;
Question.find(function (err,res){
	if(err)
		return;
	total_questions = res.length;
});
High.find(function (err, res){
	if(err)
		return;
	highstreak = res[0]['highscore'];
});
var math_it = {
	'+' : function (x,y) {return x + y},
	'-' : function (x,y) {return x - y},
	'*' : function (x,y) {return x * y}
};
io.on('connection', function (socket){
	
	visitors++;
	socket.emit('visitors', visitors);
	
	function gen_question(){
		var num;
		while(1){
			num = parseInt(Math.random()*total_questions);
			if(num)
				break;
		}
		Question.findOne({id : num}, function (err, res){
			if(err){
				socket.emit('number', 'Failed To Load Question!');
				return;
			}
			//console.log(res);
			var post = {
				question : res['question'],
				'A' : res['A'], 
				'B' : res['B'], 
				'C' : res['C'], 
				'D' : res['D']
			};
			answers[socket.id] = res['answer'];
			console.log(post);
			socket.emit('number', post);
		});
	}
	socket.emit('streakhigh', highstreak);	
	socket.on('number', function (data){
		//console.log("HI!!");
		streak[socket.id] = 0;
		socket.emit('streak', streak[socket.id]);		
		gen_question();
	});
	socket.on('answer', function (data){
		var flag = true;
		console.log(data);
		if(data != 'A' && data != 'B' && data != 'C' && data != 'D'){ 
			socket.emit('answer', "Please Select an Option!");
			flag = false;
		}
		if(!answers[socket.id]){
			socket.emit('answer', "Start The Game!");
			flag = false;
		}
		if(data == answers[socket.id]){
			if(streak[socket.id])
				streak[socket.id]++;
			else
				streak[socket.id] = 1;
			if(streak[socket.id] > highstreak){
				highstreak = streak[socket.id];
				io.sockets.emit('streakhigh', highstreak);	
				var temp = new High({
					highscore : highstreak;
				});
				temp.save(function (err){
					if(err)
						console.log(err);
				});
			}
			socket.emit('answer', data.toString() + "  is correct!");
			socket.emit('streak', streak[socket.id]);
		}
		else if(flag){
			streak[socket.id] = 0;
			socket.emit('streak', streak[socket.id]);
			socket.emit('answer', "Oh Snap :(  " + data.toString() + "  is Incorrect!");
		}
		if(flag){
			gen_question();
		}
	});
	socket.on('question', function (data){
		var flag = true;
		for(var i = 0; i < data.length; i++){
			data[i] = sanitizer.sanitize(data[i]);
			console.log(data[i]);
			if(data[i].length == 0 || data[0].length < 5 || data[i].indexOf('$') != -1 || data[i].indexOf('&#36;') != '-1' || data[5].length != 1){
				flag = false;
				break;
			}

		}
		if(flag){			
			var Q = data[0], op1 = data[1], op2 = data[2], op3 = data[3], op4 = data[4], answer = data[5];
			var temp = new Question_temp({
				question : Q,
				A : op1,
				B : op2,
				C : op3,
				D : op4,
				answer : answer
			});
			temp.save(function (err){
				if(err){
					socket.emit('entered', 'Database Snapped :(');
				}
				else{
					socket.emit('entered', 'Question is now up for Review!');
				}
			});
		}
		else{
			socket.emit('entered', 'Invalid Question!');
		}
	});
	socket.on('disconnect', function (){
		delete answers[socket.id];
		delete streak[socket.id];
	});
});
app.configure(function (){
	app.use(express.static(__dirname + '/public'));
	//app.use(express.bodyParser());
});
app.configure(function (){
	/*zapp.get('*',function(req,res,next){
  		if(req.headers['x-forwarded-proto']!='https')
    		res.redirect('https://morning-tor-3846.herokuapp.com'+req.url);
  		else
    		next(); /* Continue to other routes if we're not redirecting */

	//});
	app.use(function (req, res, next){
		var ipAddress;
		//console.log(process.env);
  		var forwardedIpsStr = req.header('x-forwarded-for');      // IP LOgger
  		if(forwardedIpsStr){
    		var forwardedIps = forwardedIpsStr.split(',');
    		ipAddress = forwardedIps[0];
  		}
  		if(!ipAddress) {    		
    		ipAddress = req.connection.remoteAddress;
  		}
  		console.log(ipAddress);
  		//console.log(req.headers);
  	
  		next();
	});	
});

eventEmitter.on('sk11', function (data){
	console.log(data);
});

var PORT = Number(process.env.PORT || 5001);
var HOST = 'localhost';
app.post('/upload', function (req, res){
	//console.log(req.body.image.path);
	req.on('data', function(chunk){
		console.log(chunk);
	});
	req.on('end', function (){
		console.log("Done!");
		res.end();
	});
	
});
server.listen(PORT);



