var twit = require('twit');
var fs = require('fs');
var schedule = require('node-schedule');
var twitter_search = function(){
			//Connecting & Authenticating Connection to Twitter
			var twitter = new twit(require('./config/twitter.js'));
			//Making Search Query to Twitter
			var language = ['en','ko','tr','es'];
			var q = [
			'#usopen',
			'usopen murray',
			'andy murray',
			'usopen wawrinka',
			'usopen djokovic',
			'us open',
			'usopen women quaterfinal',
			'usopen women semifinal',
			'usopen women final',
			'usopen Wozniacki',
			'usopen Martina Hingis',
			'usopen McEnroe',
			'#serena #usopen',
			'#djokovic #usopen'
			];
			var option = {};
			option.language = language[Math.round(Math.random()*language.length-1)];
			option.q=q[Math.round(Math.random()*q.length-1)];
			console.log(option);
			twitter.get('search/tweets',option, function(err, data, response) {
			  var tempData = [];
			  data.statuses.forEach(function(status){
			  		if(status.text.substr(0,2)!='RT')
		  				tempData.push(status);
			  		
			  });
			  if(tempData.length!=0){
			  	var count = JSON.parse(fs.readFileSync('count.json'));
			  	count.usopen = count.usopen + tempData.length;
			  	fs.appendFile('./data/usopen.json',
			  	JSON.stringify(tempData).slice(1,JSON.stringify(tempData).length-1)+',',
			  	function(err){
			  		console.log(err);	
			  	});
			  	console.log('Data added to usopen.json');
				fs.writeFileSync('count.json', JSON.stringify(count));
			  }
			});
};

schedule.scheduleJob('*/1 * * * *',twitter_search);
console.log('Server is running');
