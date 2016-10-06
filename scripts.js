exports.apple = function(){
	var twit = require('twit');
	var fs = require('fs');
	//Connecting & Authenticating Connection to Twitter
	var twitter = new twit(require('./config/twitter.js'));
	//Making Search Query to Twitter
	var language = ['ko','tr','es','en'];
	var q = [
		[
		'#AppleEvent',
		'#iphone7',
		'사과 earpods',
		'사과 airpods',
		'애플 이벤트',
		'사과 시계',
		'#ios10',
		'사과 시계 (2)',
		'#applewatch2',
		'애플 헤드폰 잭',
		'사과 시계',
		'사과 시계 (2)',
		'ios10',
		'아이폰 7 카메라',
		'아이폰 7 이상',
		'#iphone7plus',
		'아이폰 (7)',
		'#AppleEvent',
		'#의 iphone7',
		'사과 earpods',
		'사과 airpods',
		'애플 이벤트',
		'사과 시계 2',
		'#의 applewatch2',
		'사과 시계',
		'ios10',
		'iphone7 카메라',
		'iphone7 플러스',
		'iphone7plus'
		],
		[
		'#AppleEvent',
		'#iphone7',
		'ios10',
		'apple earpods',
		'apple airpods',
		'apple event',
		'ios10',
		'apple watch 2',
		'#applewatch2',
		'apple watch',
		'iphone7 camera',
		'iphone7 plus',
		'#iphone7plus',
		'#AppleEvent',
		'iphone',
		'Elma earpods',
		'Elma airpods',
		'Elma olayı',
		'Elma izle 2',
		'# Applewatch2',
		'Elma izle',
		'Iphone7 kamera',
		'Iphone7 artı',
		'# Iphone7plus'
		],
		[
		'#AppleEvent',
		'#iphone7',
		'apple earpods',
		'apple airpods',
		'ios10',
		'apple event',
		'apple watch 2',
		'#applewatch2',
		'apple watch',
		'iphone7 camera',
		'iphone7 plus',
		'#iphone7plus',
		'ios10',
		'#AppleEvent',
		'EarPods de Apple',
		'airpods de Apple',
		'Evento de Apple',
		'Reloj de manzana 2',
		'# Applewatch2',
		'Reloj de manzana',
		'Cámara iphone7',
		'Iphone7 plus',
		'#Iphone7plus'
		],
		[
		'#AppleEvent',
		'#iphone7',
		'apple earpods',
		'apple airpods',
		'ios10',
		'apple event',
		'apple watch 2',
		'#applewatch2',
		'apple watch',
		'iphone7 camera',
		'iphone7 plus',
		'ios10',
		'#iphone7plus'
		]
	];
	var option = {};
	var rand = 3;
	option.q=q[rand][Math.round(Math.random()*(q[rand].length-1))];
	
	option.since='2016-06-06';
	//console.log(option);
	twitter.get('search/tweets',option, function(err, data, response) {
		if(!err){
			var existing = fs.readFileSync('data/appleevent.json');
			var count = JSON.parse(fs.readFileSync('count.json'));
			existing = existing.slice(0,existing.length-1);
			existing = existing + ']';
			existing = JSON.parse(existing);
			var ids = [];
			existing.forEach(function(status){
				ids.push(status.id);
			});
			
			var tempData = [];
			data.statuses.forEach(function(status){
				if(status.text.substr(0,2)!='RT'){
					if(ids.indexOf(status.id)==-1){
						if(status.lang=='tr' || status.lang =='en' || status.lang == 'ko' || status.lang == 'es'){
							tempData.push(status);
						}
					}
				}
				else{
					if(ids.indexOf(status.id)==-1){
						if(status.lang=='tr' || status.lang =='en' || status.lang == 'ko' || status.lang == 'es'){
							tempData.push(status);
						}
					}
				}
			});
			if(tempData.length!=0){
			  	count.appleevent = count.appleevent + tempData.length;
			  	fs.appendFile('./data/appleevent.json',
			  	JSON.stringify(tempData).slice(1,JSON.stringify(tempData).length-1)+',',
			  	function(err){
			  		if(err)
			  			console.log(err);	
			  	});
			  	console.log('Data added to applevent.json');
			  	//fs.writeFileSync('count.json',JSON.stringify(count));
			}
		}
		else{
			option.type = "appleevent";
			console.log(option);
			console.log(err);
		}
	});
}


exports.election = function(){
	var twit = require('twit');
	var fs = require('fs');
	//Connecting & Authenticating Connection to Twitter
	var twitter = new twit(require('./config/twitter.js'));
	//Making Search Query to Twitter
	var language = ['ko','tr','es','en'];
	var q = [
		['도널드 트럼프 선거',
		'도날드 트럼프',
		'미국 선거',
		'hillary',
		'clinton',
		'미국 의 선거 여론 조사',
		'trump 선거',
		'hillary 선거',
		'힐러리 클린턴',
		'clinton 선거',
		'미국 선거',
		'america presidential poll',
		'presidential polls',
		'힐러리 트럼프',
		'2016 대통령 선거',
		'비장의 선거',
		'우리 선거',
		'trump',
		'우리는 선거 여론 조사',
		'#trump 선거',
		'힐러리 선거',
		'클린턴 재단 스캔들',
		'클린턴 선거',
		'미국 선거',
		'미국 대선 여론 조사',
		'대선 여론 조사',
		'2016 대통령 선거'
		],
		['trump elections',
		'us elections',
		'us election poll',
		'#trump election',
		'hillary election',
		'clinton foundation scandal',
		'clinton election',
		'america elections',
		'america presidential poll',
		'presidential polls',
		'2016 presidential election',
		'Koz seçimleri',
		'Bize seçimler',
		'Bizi seçim anketi',
		'#trump Seçim',
		'Hillary seçim',
		'Clinton vakıf skandalı',
		'Clinton seçim',
		'Amerika seçimleri',
		'Amerika başkanlık anket',
		'Başkanlık anketler',
		'2016 başkanlık seçimlerinde'
		],
		['trump elections',
		'us elections',
		'us election poll',
		'#trump election',
		'hillary election',
		'clinton foundation scandal',
		'clinton election',
		'america elections',
		'america presidential poll',
		'presidential polls',
		'2016 presidential election',
		'elecciones de Trump',
		'nosotros elecciones',
		'Nos encuesta electoral',
		'Elección #trump',
		'Elección de Hillary',
		'Fundación Clinton escándalo',
		'Elección de Clinton',
		'elecciones de Estados Unidos',
		'Elecciones presidenciales de Estados Unidos',
		'encuestas presidenciales',
		'2016 elección presidencial',
		],
		['trump elections',
		'us elections',
		'us election poll',
		'#trump election',
		'hillary election',
		'clinton foundation scandal',
		'clinton election',
		'america elections',
		'america presidential poll',
		'presidential polls',
		'2016 presidential election'
		]
	];
	var option = {};
	var rand = 3;
	option.q=q[rand][Math.round(Math.random()*(q[rand].length-1))];
	
	option.since='2016-06-06';
	//console.log(option);
	twitter.get('search/tweets',option, function(err, data, response) {
		if(!err){
			var existing = fs.readFileSync('data/election.json');
			var count = JSON.parse(fs.readFileSync('count.json'));
			existing = existing.slice(0,existing.length-1);
			existing = existing + ']';
			existing = JSON.parse(existing);
			var ids = [];
			existing.forEach(function(status){
				ids.push(status.id);
			});
			
			var tempData = [];
			data.statuses.forEach(function(status){
				if(status.text.substr(0,2)!='RT'){
					if(ids.indexOf(status.id)==-1){
						if(status.lang=='tr' || status.lang =='en' || status.lang == 'ko' || status.lang == 'es'){
							tempData.push(status);
						}
					}
				}
				else{
					if(ids.indexOf(status.id)==-1){
						if(status.lang=='tr' || status.lang =='en' || status.lang == 'ko' || status.lang == 'es'){
							tempData.push(status);
						}
					}
				}
				
			});
			if(tempData.length!=0){
			  	count = JSON.parse(fs.readFileSync('count.json'));
			  	count.election = count.election + tempData.length;
			  	fs.appendFile('./data/election.json',
			  	JSON.stringify(tempData).slice(1,JSON.stringify(tempData).length-1)+',',
			  	function(err){
			  		if(err)
			  			console.log(err);	
			  	});
			  	console.log('Data added to election.json');
			  	//fs.writeFileSync('count.json',JSON.stringify(count));
			}
		}
		else{
			option.type = "election";
			console.log(option);
			console.log(err);
		}
	});
}

exports.usopen = function(){
	var twit = require('twit');
	var fs = require('fs');
	//Connecting & Authenticating Connection to Twitter
	var twitter = new twit(require('./config/twitter.js'));
	//Making Search Query to Twitter
	var language = ['ko','tr','es','en'];
	var q = [
		['#usopen',
		'us open 머레이',
		'andy 머레이',
		'usopen wawrinka',
		'조 코 비치',
		'usopen 조 코 비치',
		'US 오픈',
		'usopen women quaterfinal',
		'usopen women semifinal',
		'usopen women final',
		'usopen men quaterfinal',
		'usopen men semifinal',
		'usopen men final',
		'매켄로',
		'세레나 williams us open',
		'#serena #usopen',
		'djokovic usopen',
		'#usopen',
		'usopen 머레이',
		'앤디 머레이',
		'usopen wawrinka',
		'usopen 조 코 비치',
		'우리는 열',
		'usopen 여성 quaterfinal',
		'usopen 여성 준결승',
		'usopen 여성 최종',
		'usopen 남자 quaterfinal',
		'usopen 남자 준결승',
		'usopen 남성 최종',
		'usopen 보즈 니아',
		'usopen 힝기스',
		'usopen 매켄로',
		'#serena #usopen',
		'조 코 비치 usopen',
		'화가 usopen'
		],
		[
		'#usopen',
		'usopen murray',
		'andy murray',
		'usopen wawrinka',
		'usopen djokovic',
		'us open',
		'usopen women quaterfinal',
		'usopen women semifinal',
		'usopen women final',
		'usopen men quaterfinal',
		'usopen men semifinal',
		'usopen men final',
		'usopen Wozniacki',
		'usopen Hingis',
		'usopen McEnroe',
		'#serena #usopen',
		'djokovic usopen',
		'usopen upset',
		'#usopen',
		'Usopen Murray',
		'Andy murray',
		'Usopen Wawrinka',
		'Usopen Djokovic',
		'Bize açmak',
		'Usopen kadın quaterfinal',
		'Usopen kadınlar yarı final',
		'Usopen kadınlar son',
		'Usopen erkek quaterfinal',
		'Usopen erkekler yarı final',
		'Usopen erkekler son',
		'Usopen Wozniacki',
		'Usopen Hingis',
		'Usopen McEnroe',
		'#serena #usopen',
		'Djokovic usopen',
		'Üzgün ​​usopen'
		],
		['#usopen',
		'usopen murray',
		'andy murray',
		'usopen wawrinka',
		'usopen djokovic',
		'us open',
		'usopen women quaterfinal',
		'usopen women semifinal',
		'usopen women final',
		'usopen men quaterfinal',
		'usopen men semifinal',
		'usopen men final',
		'usopen Wozniacki',
		'usopen Hingis',
		'usopen McEnroe',
		'#serena #usopen',
		'djokovic usopen',
		'usopen upset',
		'USOPEN murray',
		'Andy Murray',
		'Wawrinka USOPEN',
		'Djokovic USOPEN',
		'Mujeres USOPEN quaterfinal',
		'Mujeres USOPEN semifinal',
		'Mujeres USOPEN final',
		'Hombres USOPEN quaterfinal',
		'Hombres USOPEN semifinales',
		'Hombres USOPEN final',
		'USOPEN Wozniacki',
		'USOPEN Hingis',
		'USOPEN McEnroe',
		'#serena #usopen',
		'Djokovic USOPEN',
		'USOPEN molestar'
		],
		['#usopen',
		'usopen murray',
		'andy murray',
		'usopen wawrinka',
		'usopen djokovic',
		'us open',
		'usopen women quaterfinal',
		'usopen women semifinal',
		'usopen women final',
		'usopen men quaterfinal',
		'usopen men semifinal',
		'usopen men final',
		'usopen Wozniacki',
		'usopen Hingis',
		'usopen McEnroe',
		'#serena #usopen',
		'djokovic usopen',
		'usopen upset'
		]
	];
	var option = {};
	var rand = 3;
	
	option.q=q[rand][Math.round(Math.random()*(q[rand].length-1))];
	
	option.since='2016-06-06';
	//console.log(option);
	twitter.get('search/tweets',option, function(err, data, response) {
		if(!err){
			var existing = fs.readFileSync('data/usopen.json');
			count = JSON.parse(fs.readFileSync('count.json'));
			existing = existing.slice(0,existing.length-1);
			existing = existing + ']';
			existing = JSON.parse(existing);
			var ids = [];
			existing.forEach(function(status){
				ids.push(status.id);
			});
			
			var tempData = [];
			data.statuses.forEach(function(status){
				if(status.text.substr(0,2)!='RT'){
					if(ids.indexOf(status.id)==-1){
						if(status.lang=='tr' || status.lang =='en' || status.lang == 'ko' || status.lang == 'es'){
							tempData.push(status);
						}
					}
				}
				else{
					if(ids.indexOf(status.id)==-1){
						if(status.lang=='tr' || status.lang =='en' || status.lang == 'ko' || status.lang == 'es'){
							tempData.push(status);
						}
					}
				}
			});
			if(tempData.length!=0){
			  	count = JSON.parse(fs.readFileSync('count.json'));
			  	count.usopen = count.usopen + tempData.length;
			  	fs.appendFile('./data/usopen.json',
			  	JSON.stringify(tempData).slice(1,JSON.stringify(tempData).length-1)+',',
			  	function(err){
			  		if(err)
			  			console.log(err);	
			  	});
			  	console.log('Data added to usopen.json');
			  	//fs.writeFileSync('count.json',JSON.stringify(count));
			}
		}
		else{
			option.type="usopen";
			console.log(option);
			console.log(err);
		}
	});
};

exports.syria = function(){
	var twit = require('twit');
	var fs = require('fs');
	//Connecting & Authenticating Connection to Twitter
	var twitter = new twit(require('./config/twitter.js'));
	//Making Search Query to Twitter
	var language = ['ko','tr','es','en'];
	var q = [
		[
			'syria',
			'시리아',
			'syria civil war',
			'시리아 내전',
			'syria 알레포',
			'시리아 알레포',
			'syria isis',
			'syria russia',
			'시리아 , 러시아',
			'syria kid',
			'fleeing syria',
			'시리아 를 탈출',
			'syria us',
			'시리아',
			'시리아 내전',
			'시리아의 알레포',
			'시리아의 이시스',
			'시리아의 러시아',
			'시리아 아이',
			'도망 시리아'
		],
		[
			'syria',
			'syria civil war',
			'syria aleppo',
			'syria isis',
			'syria russia',
			'syria kid',
			'fleeing syria',
			'syria us',
			'SURİYE',
			'Suriye iç savaş',
			'Suriye Halep',
			'Suriye isis',
			'Suriye rusya',
			'Suriye çocuk',
			'Kaçan suriye',
			'Suriye bize'
		],
		[
			'syria',
			'syria civil war',
			'syria aleppo',
			'syria isis',
			'syria russia',
			'syria kid',
			'fleeing syria',
			'syria us',
			'Siria',
			'Siria guerra civil',
			'Siria Aleppo',
			'Siria Isis',
			'Siria Rusia',
			'Siria niño',
			'Siria huyendo',
			'Siria Estados Unidos',
			'Siria America'
		],
		[
			'syria',
			'syria civil war',
			'syria aleppo',
			'syria isis',
			'syria russia',
			'syria kid',
			'fleeing syria',
			'syria us'
		]
	];
	var option = {};
	var rand = 3;
	option.q=q[rand][Math.round(Math.random()*(q[rand].length-1))];
	
	option.since='2016-06-06';
	//console.log(option);
	twitter.get('search/tweets',option, function(err, data, response) {
		if(!err){
			var existing = fs.readFileSync('data/syria.json');
			var count = JSON.parse(fs.readFileSync('count.json'));
			existing = existing.slice(0,existing.length-1);
			existing = existing + ']';
			existing = JSON.parse(existing);
			var ids = [];
			existing.forEach(function(status){
				ids.push(status.id);
			});
			
			var tempData = [];
			data.statuses.forEach(function(status){
				if(status.text.substr(0,2)!='RT'){
					if(status.text.substr(0,2)!='RT'){
					if(ids.indexOf(status.id)==-1){
						if(status.lang=='tr' || status.lang =='en' || status.lang == 'ko' || status.lang == 'es'){
							tempData.push(status);
						}
					}
				}
				else{
					if(ids.indexOf(status.id)==-1){
						if(status.lang=='tr' || status.lang =='en' || status.lang == 'ko' || status.lang == 'es'){
							tempData.push(status);
						}
					}
				}
			}
			});
			if(tempData.length!=0){
			  	count = JSON.parse(fs.readFileSync('count.json'));
			  	count.syria = count.syria + tempData.length;
			  	fs.appendFile('./data/syria.json',
			  	JSON.stringify(tempData).slice(1,JSON.stringify(tempData).length-1)+',',
			  	function(err){
			  		if(err)
			  			console.log(err);	
			  	});
			  	console.log('Data added to syria.json');
			  	//fs.writeFileSync('count.json',JSON.stringify(count));
			}
		}
		else{
			option.type="syria";
			console.log(option);
			console.log(err);
		}
	});
};

exports.got = function(){
	var twit = require('twit');
	var fs = require('fs');
	//Connecting & Authenticating Connection to Twitter
	var twitter = new twit(require('./config/twitter.js'));
	//Making Search Query to Twitter
	var language = ['ko','tr','es','en'];
	var q = [
		[
			'#got',
			'왕좌의 게임',
			'#GameOfThrones2016',
			'Game of Thrones 2016',
			'#GoT 시즌 7',
			'#GameOfThrones',
			'#got whitewalker',
			'game of thrones book',
			'Game of Thrones',
			'Game of Thrones Peter Dinklage',
			'Game of Thrones Teaser',
			'#got',
			'GameOfThrones2016',
			'왕좌 2016의 게임',
			'시즌 7 #GoT',
			'#왕좌의 게임',
			'#got whitewalker',
			'왕좌 북의 게임'
		],
		[
			'#got',
			'#GameOfThrones2016',
			'Game of Thrones 2016',
			'#GoT Season 7',
			'#GameOfThrones',
			'#got whitewalker',
			'game of thrones book',
			'The Winds of Winter #got',
			'#got',
			'# GameOfThrones2016',
			'Thrones 2016 Game',
			'Sezon 7 #GoT',
			'#Game of Thrones',
			'#got Whitewalker',
			'Thrones kitap oyunu',
			'Kış rüzgarları #got'
		],
		[
			'#got',
			'#GameOfThrones2016',
			'Game of Thrones 2016',
			'#GoT Season 7',
			'#GameOfThrones',
			'#got whitewalker',
			'game of thrones book',
			'The Winds of Winter #got',
			'# GameOfThrones2016',
			'Juego de Tronos 2016',
			'#GoT Temporada 7',
			'#Game of Thrones',
			'Whitewalker #got',
			'Juego de tronos libro',
			'Vientos de Invierno #got'
		],
		[
			'#got',
			'#GameOfThrones2016',
			'Game of Thrones 2016',
			'#GoT Season 7',
			'#GameOfThrones',
			'#got whitewalker',
			'game of thrones book',
			'The Winds of Winter #got'
		]
	];
	var option = {};
	var rand = 3;
	
	option.q=q[rand][Math.round(Math.random()*(q[rand].length-1))];
	
	option.since='2016-06-06';
	//console.log(option);
	twitter.get('search/tweets',option, function(err, data, response) {
		if(!err){
			var existing = fs.readFileSync('data/got.json');
			var count = JSON.parse(fs.readFileSync('count.json'));
			existing = existing.slice(0,existing.length-1);
			existing = existing + ']';
			existing = JSON.parse(existing);
			var ids = [];
			existing.forEach(function(status){
				ids.push(status.id);
			});
			var lang={};
			var tempData = [];
			data.statuses.forEach(function(status){
				if(status.text.substr(0,2)!='RT'){
					if(ids.indexOf(status.id)==-1){
						if(status.lang=='tr' || status.lang =='en' || status.lang == 'ko' || status.lang == 'es'){
							tempData.push(status);
						}
					}
				}
				else{
					if(ids.indexOf(status.id)==-1){
						if(status.lang=='tr' || status.lang =='en' || status.lang == 'ko' || status.lang == 'es'){
							tempData.push(status);
						}
					}
				}
				
			});
			if(tempData.length!=0){
			  	count = JSON.parse(fs.readFileSync('count.json'));
			  	count.got = count.got + tempData.length;
			  	fs.appendFile('./data/got.json',
			  	JSON.stringify(tempData).slice(1,JSON.stringify(tempData).length-1)+',',
			  	function(err){
			  		if(err)
			  			console.log(err);	
			  	});
			  	console.log('Data added to got.json');
			  	//fs.writeFileSync('count.json',JSON.stringify(count));
			}
		}
		else{
			option.type="got";
			console.log(option);
			console.log(err);
		}
	});
};