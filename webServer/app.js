const http = require('http');
const url  =  require('url');
const fs  = require('fs');
const path = require('path');

const BAS_PATH = './public/';

http.createServer((request,response)=>{
	let pathName = url.parse(request.url).pathname;
	// 获取文件的后缀名
	let extName =  path.extname(pathName);
	

	if(pathName ==  '/'){
		pathName  = 'index.html';
	} 

	// 过滤 /favicon.ico 的请求
	if(pathName != '/favicon.ico'){
		fs.readFile( BAS_PATH + pathName,(error,data)=>{
			if(error){
				console.log('404  Not Found!');
				fs.readFile(BAS_PATH + '404.html',(_error,_data)=>{
					if(_error){
						console.log(_error);
					}else{
						response.writeHead(200,{
							"Content-Type":'text/html;chearset-UTF-8'
						});
						response.write(_data);
						response.end();	
					}
					
				});
			}else{
				console.log(`读取:${pathName}完成`);
				let ext = getExt(extName);

				response.writeHead(200,{
					"Content-Type":`${ext};chearset-UTF-8`
				});
				response.write(data);
				response.end();
			}
		});
	}
}).listen(8080);

// 获取后缀名
getExt = (extName) => {
  let data = fs.readFileSync('./public/ext.json');
  let  ext = JSON.parse(data.toString());
  return ext[extName];
}