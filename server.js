var fs = require('fs');
var express = require('express');
var https = require('https');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');
var answers = {};
var scores = {};
var streak = {};
var highstreak = 0;
var visitors = 50;
mongoose.connect('mongodb://tantrik:tantrik1115@ds037907.mongolab.com:37907/heroku_app26645381');
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
var Question = mongoose.model('Question', question);
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
			num = parseInt(Math.random()*55);
			if(num)
				break;
		}
		Question.findOne({id : num}, function (err, res){
			if(err){
				socket.emit('number', 'Failed To Load Question!');
				return;
			}
			console.log(res);
			var post = {
				question : res['question'],
				'A' : res['A'], 
				'B' : res['B'], 
				'C' : res['C'], 
				'D' : res['D']
			};
			answers[socket.id] = res['answer'];
			socket.emit('number', post);
		});
	}
	socket.emit('streakhigh', highstreak);	
	socket.on('number', function (data){
		streak[socket.id] = 0;
		socket.emit('streak', streak[socket.id]);		
		gen_question();
	});
	socket.on('answer', function (data){
		var flag = true;
		console.log(data);
		if(isNaN(data))
			socket.emit('answer', "Please Enter a Number!");
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



