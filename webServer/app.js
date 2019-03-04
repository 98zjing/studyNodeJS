const http = require('http');
const url  =  require('url');
const fs  = require('fs');
const path = require('path');
// 引入 qs 模块：qs 是对路径进行 json 化或者将 json 转换为 string 路径
const qs = require("querystring");
const router  =  require('./app/router.js');


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
		let api = pathName.replace(/\//,'');
		if(api in router.post){//POST接口
			var reqData = '';
			request.on('data',(chunk)=>{
				reqData  += chunk;
			})
			request.on('end',()=>{
				router.post[api](Object.assign({
					parames:qs.parse(reqData)
				},request),response);
			});
			return;
		}

		if(api in router.get){//GET接口
			var reqData = '';
			request.on('data',(chunk)=>{
				reqData  += chunk;
			})
			request.on('end',()=>{
				router.get[api](Object.assign({
					parames:qs.parse(reqData)
				},request),response);
			});
			return;
		}
		
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
				/*fs.stat( BAS_PATH + pathName,(err,stat)=>{
					if(err){
						console.error(err);
					}else{
						console.log(stat)
					}
				});*/
				let ext = getExt(extName);

				response.writeHead(200,{
					"Content-Type":`${ext};chearset-UTF-8`
				});
				response.write(data);
				response.end();
			}
		});
	}
	
}).listen(8888);
console.log('http://localhost:8888/')


// 获取后缀名
getExt = (extName) => {
  let data = fs.readFileSync('./public/ext.json');
  let  ext = JSON.parse(data.toString());
  return ext[extName];
}
