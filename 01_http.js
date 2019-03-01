var http =   require('http')
http.createServer(function(req,res){
	/**
	req 获取 浏览url信息（request）
	res 浏览器返回 相应信息（response）
	*/

	//设置HTTP头部，状态是200，文件类型是html,字符集是utf-8
	res.writeHead(200,{
		"Content-Type":"text/html;chearset=UTF-8"
	});

	res.write('<h1 style="text-algin:center;">Hello NOdeJS</h1>');

	//相应 结束
	res.end();
}).listen(3000);//监听 的 端口