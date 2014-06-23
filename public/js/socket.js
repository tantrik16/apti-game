(function (){
var opt = ['A', 'B', 'C', 'D'];
var socket = io.connect();
var btn = document.getElementById('button');
btn.addEventListener('click', function (){
socket.emit('number', 'start');
    document.getElementById('result').innerHTML = '';
    document.getElementById('button').innerHTML = 'Next Question';
});            
socket.on('number', function (data){    
    document.getElementById('game').innerHTML = '<h2>' + data['question'] + '<h2>';    
    for(var i = 0; i < 4; i++){
        document.getElementById('opt' + (i+1).toString()).style.display = 'block';
        document.getElementById(opt[i]).innerHTML = data[opt[i]];
    }
});
var sub = document.getElementById('submit');
sub.addEventListener('click', function (){ 
    var num = 0;
    for(var i = 0; i < 4; i++){
        if(document.getElementsByName('Q')[i].checked){               
            num = opt[i];
            document.getElementsByName('Q')[i].checked = false;
            break;
        }
    }
    if(num.length != 1 || num == 0){
        document.getElementById('result').innerHTML = "<h2> Please Select An Option </h2>";
        return;
    }
    //document.getElementById('ans').value = '';
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
})();
