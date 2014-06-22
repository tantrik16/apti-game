var express = require('express'),
    cheerio = require('cheerio'),
    app     = express(),
    querystring = require('querystring'),
    http    = require('http'),
    requestify = require('requestify');

requestify.post('http://ggsipuresults.nic.in/cet2014results/260514/cet14res260514.htm',{
    regno : "9720002",
    select : "131"
    })
    .then(function(response) {

    response.getBody();
    console.log(response.body);
    req.end(response.body);
});
      


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;