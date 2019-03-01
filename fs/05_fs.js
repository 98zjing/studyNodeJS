let fs =  require('fs');

/*
fs.stat('index.js',(error,stats)=>{
	if(error){
		console.log(error);
		return false;
	}else{
		console.log(stats);
		console.log(`文件：${stats.isFile()}`); 
		console.log(`目录：${stats.isDirectory()}`);
	}
});
*/

/*
//创建目录
fs.mkdir('css',(error)=>{
	if(error){
		console.log(error);
		return false;
	}else{
		console.log('创建目录成功');
	}
});
*/

/*
//删除目录
fs.rmdir('css',(error)=>{
	if(error){
		console.log(error);
		return false;
	}else{
		console.log('删除目录成功!');
	}
});
*/

/*
//文件覆盖写入
fs.writeFile('index.js','Hello NodeJS',(error)=>{
	if(error){
		console.log(error)
	}else{
		console.log('写入 文件成功')
	}
});
*/


/*
//文件追加 写入
fs.appendFile('index.js','这个段文本是追加写入 的',(error)=>{
	if(error){
		console.log(error)
	}else{
		console.log('追加写入成功');
	}
})
*/

/*
//读取 文件
fs.readFile('index.js',(erroe,data)=>{
	if(erroe){
		console.log(erroe)
	}else{
		console.log('读取文件成功');
		console.log(data);
	}
})
*/

/*
//读取目录 
fs.readdir('node_modules',(error,data)=>{
	if(error){
		console.log(error)
	}else{
		console.log('读取目录成功');
		console.log(data)
	}
})
*/

//从命名文件或移动文件
/*fs.rename('index.js','index1.js',(error)=>{
	if(error){
		console.log(error);
	}else{
		console.log('重命名文件成功');
	}
});*/

/*fs.rename('index2.js','./node_modules/index2.js',(error)=>{
	if(error){
		console.log(error);
	}else{
		console.log('重名文件成功');
	}
});*/

/*
//删除文件
fs.unlink('./node_modules/index2.js',(error)=>{
	if(error){
		console.log(error)
	}else{
		console.log('删除文件成功');
	}
})*/