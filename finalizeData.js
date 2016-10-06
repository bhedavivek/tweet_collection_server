var fs = require('fs');
var key = ['syria'];
for(var i=0; i<key.length;i++){
	var path = 'data/'+key[i]+'.json';	
	var json = fs.readFileSync(path);
	json = json+"";
	json = json.slice(0,json.length-1);
	json = json.replace(/color":"/g,'color":"#');
	json = json + ']';
	if(JSON.parse(json))
		fs.writeFileSync(path,json);
}