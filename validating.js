var fs = require('fs');
var key = ['usopen','appleevent','syria','got','election'];
var count={};
var lang = {};
for(var i=0; i<key.length;i++){
	var path = 'data/'+key[i]+'.json';
	var json = fs.readFileSync(path);
	json = json.slice(0,json.length-1);
	json = json + ']';
	json = JSON.parse(json);
	var ids = [];
	var final =[];
	if(key[i]=='syria'){
		var count=0;
		json.forEach(function(status){
			if(status.lang=='en' || status.lang=='es'){
				if(count<=3000){
					if(status.text.substr(0,2)!='RT'){
						if(ids.indexOf(status.id)==-1){
							ids.push(status.id);
							final.push(status);
							if(lang[status.lang])
								lang[status.lang]++;
							else
								lang[status.lang]=1;
						}
					}
					else{
						count++;
					}
				}
				else{
					if(ids.indexOf(status.id)==-1){
						ids.push(status.id);
						final.push(status);
						if(lang[status.lang])
							lang[status.lang]++;
						else
							lang[status.lang]=1;
					}
				}
			}
			else if(status.lang=='ko'|| status.lang=='tr'){
				if(ids.indexOf(status.id)==-1){
					ids.push(status.id);
					final.push(status);
					if(lang[status.lang])
						lang[status.lang]++;
					else
						lang[status.lang]=1;
				}
			}
		});
	}
	else{
		json.forEach(function(status){
			if(status.lang=='en'|| status.lang=='es'|| status.lang=='ko'|| status.lang=='tr')
				if(ids.indexOf(status.id)==-1){
					ids.push(status.id);
					final.push(status);
					if(lang[status.lang])
						lang[status.lang]++;
					else
						lang[status.lang]=1;
				}
		});
	}
	count[key[i]]=final.length;
	final =  JSON.stringify(final);
	final = final.slice(0,final.length-1);
	final = final+',';
	fs.writeFileSync(path,final);
	console.log(json.length);	
}
count.lang=lang;
fs.writeFileSync('count.json',JSON.stringify(count));
