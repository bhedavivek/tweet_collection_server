var schedule = require('node-schedule');
var script = require('./scripts');
var express = require('express');
var tweets = require('./tweet_summary');
var app = express();

var twitter_search = function(){
	script.apple();
	script.usopen();
	script.election();
	script.syria();
	script.got();
};
//schedule.scheduleJob('*/1 * * * *',twitter_search);

setInterval(twitter_search,6000);

app.use('*', function(req, res){
	tweets.summary();
	var fs = require('fs');
	var count = fs.readFileSync('count.json');
	res.json(JSON.parse(count));
});
app.listen(8000);
console.log('Server is running');
