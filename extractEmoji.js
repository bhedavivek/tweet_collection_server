var fs = require('fs');
var key = ['syria','usopen','got','election','appleevent'];
for(var i=0; i<key.length;i++){
	var path = 'finalData/'+key[i]+'.json';	
	var json = fs.readFileSync(path);
	json = JSON.parse(json);
	emoticons=[];
	json.forEach(function(tweet){
		if(tweet.tweet_text)
			var text = tweet.tweet_text;
			while(text.search(/[\uD83C-\uDBFF\uDC00-\uDFFF]/g)!=-1){
				emoticons.push(emojiSearch(text.substr(text.search(/[\uD83C-\uDBFF\uDC00-\uDFFF]/g),2)));
				var start = text.search(/[\uD83C-\uDBFF\uDC00-\uDFFF]/g);
				var end = start+2;
				text=text.slice(end,text.length-start-1);
			}
	});
	fs.writeFileSync('temp.txt',JSON.stringify(emoticons));
}

function emojiSearch(str){
	return str.substr(0,2);
}