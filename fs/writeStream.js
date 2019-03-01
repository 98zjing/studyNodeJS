const fs = require('fs');
const fileWritStream = fs.createWriteStream('index.js');

let data  = 'console.log("Hello NodeJS4")';

//开始 写入 
fileWritStream.write(data,'utf-8');

//写入 完成
fileWritStream.end();
fileWritStream.on('finish',()=>{
	console.log('写入完成');
})