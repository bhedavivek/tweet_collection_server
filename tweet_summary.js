exports.summary = function(){
	var fs = require('fs');
	var dateCount = {};
	var tweet_summary = {
		'retweets' : 0,
		'retweet_p' : 0,
		'total_count' : 0,
		'total_remaining' : 50000,
		'es_count' : 0,
		'tr_count' : 0,
		'ko_count' : 0,
		'en_count' : 0,
		'other_count' : 0,
		'usopen':0
	};
	var key = ['usopen','appleevent','got','election','syria'];
	for(var i=0; i<key.length;i++){
		var path = 'data/'+key[i]+'.json';	
		var json = fs.readFileSync(path);
		json = json.slice(0,json.length-1);
		json = json + ']';
		json = JSON.parse(json);
		tweet_summary[key[i]]=json.length;
		json.forEach(function(tweet){
			tweet_summary.total_count++;
			tweet_summary.total_remaining--;
			var date = new Date(tweet.created_at);
			var newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			newDate = newDate.toISOString();
			if(dateCount[newDate])
				dateCount[newDate]++;
			else
				dateCount[newDate]=1;
			if(tweet.text)
				if(tweet.text.slice(0,2)=='RT'){
					tweet_summary.retweets++;
				}
			switch(tweet.lang){
				case 'en':
					tweet_summary.en_count++;
					break;
				case 'es':
					tweet_summary.es_count++;
					break;
				case 'ko':
					tweet_summary.ko_count++;
					break;
				case 'tr':
					tweet_summary.tr_count++;
					break;
				default:
					tweet_summary.other_count++;
			}
			tweet_summary.retweet_p = tweet_summary.retweets/tweet_summary.total_count;
		});
	}
	tweet_summary.dateCount = dateCount;
	fs.writeFileSync('count.json',JSON.stringify(tweet_summary));
}

exports.extractKorean = function(){
	var fs = require('fs');
	var key = ['usopen','appleevent','got','election','syria'];
	var korean = [];
	for(var i=0; i<key.length;i++){
		var path = 'data/'+key[i]+'.json';	
		var json = fs.readFileSync(path);
		json = json.slice(0,json.length-1);
		json = json + ']';
		json = JSON.parse(json);
		json.forEach(function(tweet){
			switch(tweet.lang){
				case 'en':
					break;
				case 'es':
					break;
				case 'ko':
					korean.push(tweet);
					break;
				case 'tr':
					break;
				default:
					break;
			}
		});
	}
	fs.writeFileSync('data/korean.json',JSON.stringify(korean));
}
