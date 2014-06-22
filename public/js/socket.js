var socket = io.connect();
socket.on('test', function (data){
    console.log(data);
});
var btn = document.getElementById('button');
btn.addEventListener('click', function (){
socket.emit('number', 'start');
    document.getElementById('result').innerHTML = '';
    document.getElementById('button').innerHTML = 'Next Question';
});            
socket.on('number', function (data){
    document.getElementById('game').innerHTML = '<h2>' + data + '<h2>';
});
var sub = document.getElementById('submit');
sub.addEventListener('click', function (){                
    var num = document.getElementById('ans').value;
    if(isNaN(num) || num.length == 0){
        document.getElementById('result').innerHTML = "<h2> Please Enter a Number </h2>";
        return;
    }
    document.getElementById('ans').value = '';
    socket.emit('answer', num);
                
});
socket.on('answer', function (data){
    document.getElementById('result').innerHTML = "<h2>" + data + "</h2>";
});
socket.on('streak', function (data){
    if(!isNaN(data))
        document.getElementById('streak').innerHTML = "Your Streak : " + data;    
});
socket.on('streakhigh', function (data){

    if(!isNaN(data))
        document.getElementById('streakhigh').innerHTML = "Highest Streak : " + data; 
});
socket.on('visitors', function (data){
    if(!isNaN(data))
        document.getElementById('visit').innerHTML = "Total Visitors : " + data;
});
