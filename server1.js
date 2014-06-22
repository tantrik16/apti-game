var fs = require('fs');
var express = require('express');
var https = require('https');
app = express();

app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
    res.redirect('https://morning-tor-3846.herokuapp.com'+req.url);
  else
    next(); /* Continue to other routes if we're not redirecting */

});
app.configure(function (){
	app.use(express.static(__dirname + '/public'));
});
app.use(function (req, res, next){
	var ipAddress;
  	var forwardedIpsStr = req.header('x-forwarded-for');      // IP LOgger
  	if(forwardedIpsStr){
    	var forwardedIps = forwardedIpsStr.split(',');
    	ipAddress = forwardedIps[0];
  	}
  	if(!ipAddress) {    		
    	ipAddress = req.connection.remoteAddress;
  	}
  	console.log(ipAddress);
  	console.log(req.headers);
  	
  	next();
});	
var PORT = Number(process.env.PORT || 5000);
var HOST = 'localhost';


app.get('/', function(req, res) {
    res.send('HEY!');
});
app.post('/ho', function(req, res) {
    res.send('HO!');
});
app.listen(PORT);



