const fs = require('fs');
fnc1 = ()=>{
	const fileWritStream = fs.createWriteStream('index.js');

	let data  = 'console.log("Hello NodeJS4")';

	//开始 写入 
	fileWritStream.write(data,'utf-8');

	//写入 完成
	fileWritStream.end();
	fileWritStream.on('finish',()=>{
		console.log('写入完成');
	})	
};

fnc2 = ()=>{
	const ws = fs.createWriteStream('index2.js');
	const rs = fs.createReadStream('index.js');
	rs.pipe(ws,{end:false});
}
fnc2();