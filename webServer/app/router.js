const buffer = require('buffer');
const fs =  require('fs');

const User =  require('./User.js');
const Upload  = require('./Upload.js');
const Email  = require('./Email.js');
const FileDown =  require('./FileDown.js');


const router = {
	get : {},
	post: {},
	add : function(method,route,fnc){
		if(typeof fnc == 'function'){
			this[method][route] =  fnc;
			return  true;
		}else{
			console.error('typeof fnc is not fucntion!');
		}
	}
};

router.add('post','email',(request,response)=>{
	console.log(request.parames)
	let data = {...request.parames};
	if(!data.from || !data.to ||  !data.subject || !data.html){
		response(success({
			msg:'请填写完整',
			status:0
		}));
		return;
	}
	Email().setMsg(data).send()
	.then((res)=>{
		response.write(success({
			msg:'邮箱已发送'
		}));
		response.end();
	});
});

router.add('post','upload',(request,response)=>{
	Upload().load(request).then((res)=>{
		response.end();
	}).catch(()=>{
		response.end();
	})
});

router.add('get','down',(request,response)=>{
	let arr = request.parames.filename.split('.');
	let extName =  arr[arr.length -1];
	FileDown(request.parames.filename).down()
	.then((data)=>{
		response.writeHead(200,{
			// 'Content-Type':`${getExt(extName)};chearset-UTF-8`,
			'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件  
	        'Content-Disposition': 'attachment; filename=' + request.parames.filename, //告诉浏览器这是一个需要下载的文件
		});
		response.write(data,'utf-8');
		response.end();
	});
});

router.add('get','getfile',(requset,response)=>{
	let path = './public/upload';
	fs.readdir(path,(err,files)=>{
		console.log(files);
		response.write(success({
			data:{
				list:files
			}
		}));
		response.end();
	});
});

router.add('get','getMessage',(request,response)=>{
	User().getMessage(request.parames).then((data)=>{
		/*response.writeHead(200,{
			"Content-Type":'text/html:chearset-UTF-8'
		});*/
		response.write(success({
			data:{
				list:data
			},
			msg:'获取留言成功'
		}),'utf-8');
		response.end();
	}).catch((error)=>{
		new Error(error);
	});
});

router.add('post','login',(request,response)=>{
	User().postLogin(request.parames).then((data)=>{
		/*response.writeHead(200,{
			"Content-Type":'text/html;chearset-UTF-8'
		});*/
		console.log(data);
		if(data.length){
			response.write(success({
				data:{
					id:data[0].id,
					userName:data[0].user_name,
				},
				msg:'登录成功'
			}),'utf-8');
		}else{
			response.write(success({
				code:400,
				data:{},
				msg:'用户名或密码错误',
				status:0
			}),'utf-8');
		}
		
		response.end();
	}).catch((error)=>{
		new Error(error);
	});
});

router.add('post','register',(request,response)=>{
	User().postRegister(request.parames).then((data)=>{
		/*response.writeHead(200,{
			"Content-Type":'text/html;chearset-UTF-8'
		});*/

		response.write(success({
			data:{
				id: data.insertId,
			},
			msg:'注册成功'
		}),'utf-8');
		response.end();
	}).catch((error)=>{
		new Error(error);
	});
})

router.add('post','sendMessage',(request,response)=>{
	User().postSendMessage(request.parames).then((data)=>{
		/*response.writeHead(200,{
			"Content-Type":'text/html;chearset-UTF-8'
		});*/
		response.write(success({
			msg:'添加留言成功'
		}),'utf-8');
		response.end();
	}).catch((error)=>{
		new Error(error);
	});
})

success = (data)=>{

	return JSON.stringify(
		Object.assign({
				code:200,
				status:1,
				data:{},
				msg:''
	},data));
};
module.exports  = router;