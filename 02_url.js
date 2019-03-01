var url = require('url');
var http =  require('http');

http.createServer(function(request,response){
	if(request.url != '/favicon.ico'){
		var result  =  url.parse(request.url,true);
		console.log(result);	
	}
	if(request.url == '/parse'){
		console.log(url.parse("http://www.baidu.com/new?name=zhangsan"));
	}
	
	response.writeHead(200,{
		"Content-Type":'text/html;chearset-UTF-8'
	});
	
	response.write('<h1 style="text-algin:center;">Hello   NodeJS</h1>')
	response.end();
}).listen(3000);
