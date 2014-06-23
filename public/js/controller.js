(function (){
	var app = angular.module('aptitutor', []);
	var socket = io.connect();
	var obj = app.controller('QuestionController', function (){		
		//this.question = questions;	
		var obj = this;	
		this.question = '';
		this.new_question = function (){
			socket.emit('number', 'start');					
		}
		socket.on('number', function (data){
			console.log(data);
			obj.question = data;
			//console.log(obj.question);
		});

	});
	

	
	
})();