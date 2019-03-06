const fs = require('fs');

FileDown  = function(fileName){
	if(!(this instanceof FileDown))return new FileDown(fileName);
	this.baseDownPath  = './public/upload/';
	this.fileName  = fileName || null;
}
FileDown.prototype = {
	setFile:function(fileName){
		this.fileName = fileName instanceof String ? fileName : null; 
		return this;
	},
	down:function(){
		return   new Promise((res,rej)=>{
			if(!this.fileName) rej(new Error('下载文件为空'));

			let fileStream  =  fs.createReadStream(this.baseDownPath+this.fileName,'utf-8');
			let data = '';
			fileStream.on('data',(chunk)=>{
				console.log(chunk);
				data += chunk;
			});
			fileStream.on('end',()=>{
				res(data);
			});
			fileStream.on('error',(err)=>{
				rej(err);
			});
		});
	}
}
module.exports =  FileDown;