const User =  require('./User.js');
const buffer = require('buffer');
const Upload  = require('./Upload.js');

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

router.add('post','upload',(request,response)=>{
	Upload().load(request).then((res)=>{
		response.end();
	}).catch(()=>{
		response.end();
	})
});

router.add('get','getMessage',(request,response)=>{
	User().getMessage(request.parames).then((data)=>{
		/*response.writeHead(200,{
			"Content-Type":'text/html:chearset-UTF-8'
		});*/
		response.write(suress({
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
			response.write(suress({
				data:{
					id:data[0].id,
					userName:data[0].user_name,
				},
				msg:'登录成功'
			}),'utf-8');
		}else{
			response.write(suress({
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

		response.write(suress({
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
		response.write(suress({
			msg:'添加留言成功'
		}),'utf-8');
		response.end();
	}).catch((error)=>{
		new Error(error);
	});
})

suress = (data)=>{

	return JSON.stringify(
		Object.assign({
				code:200,
				status:1,
				data:{},
				msg:''
	},data));
};
module.exports  = router;