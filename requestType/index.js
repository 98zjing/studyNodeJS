const http = require('http');
var items =  [];

http.createServer((requres,response)=>{
	// 设置跨域的域名，* 代表允许任意域名跨域
	response.setHeader('Access-Control-Allow-Origin','*');
	// 设置 header 类型
	response.setHeader('Access-Control-Allow-Headers','Content-Type');
	// 跨域允许的请求方式
	response.setHeader('Content-Type','application/json');

	switch(requres.method){
		case 'OPTIONS':
			response.statusCode = 200;
			response.end();
			break;
		case 'GET' :
			let data = JSON.stringify(items);
			response.write(data);
			response.end();
			break;
		case 'POST' :
			let item = '';
			requres.on('data',function(chunk){
				item += chunk;
			});
			requres.on('end',function(){
				item = JSON.parse(item);
				items.push(item.item);
				let data = JSON.stringify(items);
				response.write(data);
				response.end();
			});
			break;
	}
}).listen(3000);
console.log('http server is start...');