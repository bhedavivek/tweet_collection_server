var fs = require('fs');
var key = ['usopen','appleevent','got','election','syria'];
var count =0;
for(var i=0; i<key.length;i++){
	var seperate = [];
	var final = [];
	var path = 'data/'+key[i]+'.json';	
	var json = fs.readFileSync(path);
	json = json.slice(0,json.length-1);
	json = json + ']';
	json = JSON.parse(json);
	json.forEach(function(tweet){
		if(tweet.lang == 'es' || tweet.lang == 'ko' || tweet.lang == 'tr'){
			if(tweet.lang =='es'){
				if(count<2500){
					if(tweet.text.slice(0,2)=='RT'){
						seperate.push(tweet);
						count++;
					}
					else{
						final.push(tweet);
					}
				}
				else{
					final.push(tweet);
				}				
			}
			else{
				final.push(tweet);
			}
		}
		else{
			if(tweet.text.slice(0,2)!='RT'){
				final.push(tweet);
			}
		}
	});
	final = JSON.stringify(final);
	final = final.slice(0,final.length-1);
	final = final + ',';
	fs.writeFileSync(path,final);
	seperate = JSON.stringify(seperate);
	seperate = final.slice(0,seperate.length-1);
	fs.writeFileSync('data/'+key[i]+'_seperate.json',seperate);
}