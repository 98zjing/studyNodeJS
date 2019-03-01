var mysql  = require('mysql');
var  link  = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'node'
});

link.connect();

var  delSql = "DELETE  FROM user where  id  =1";

link.query(delSql,function(error,res){
	if(error){
		console.log(error);
		return  false;
	}
	console.log('删除成功');
	console.log(res);
});

link.end();