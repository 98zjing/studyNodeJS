const formidable = require('formidable');
const fs =  require('fs');

function  Upload(){
	if(this instanceof Upload == false){
		return new Upload();
	}
	this.newFileName = '';
	this.fileName = '';
	this.form = null;
	this.dir = 'upload/';
}
Upload.prototype =  {
	isFormData:function(req){
		let type = req.headers['content-type'] || [];
		console.log(type);
		return type.includes('multipart/form-data');
	},
	load:function(req){
		return new Promise((res,rej)=>{
			/*if(!this.isFormData(req)){
				console.log(2222);
				return  false;
			}*/
			this.form = new formidable.IncomingForm();
			this.form.keepExtensions  = true;
			this.form.uploadDir  =  this.dir;
			console.log(this.form);
			this.form.on('file',(name,file)=>{
				console.log('file')
				this.newFileName = this.newName();
				fs.renameSync(file.path,this.dir,this.newFileName);
			});

			this.form.on('field',(field,value)=>{
				console.log('field')
				console.log(field);
				console.log(value)
			});

			this.form.on('end',()=>{
				res({
					dir:this.dir,
					newFileName:this.newFileName,
					form:this.form
				})
				console.log('上传成功')
			});

			this.form.on('error',(error)=>{
				console.log('error');
				rej(error);
			})	
		});
	},
	newName:function(){
		let types =  this.form.name.split('.');
		let extName = types[types.length = 1];
		let  name = (new Date()).getTime();
		for(var i = 0;i<10;i++){
			name += Math.random().toString().split('.')[1];
		}
		return name+extName;
	}
};
module.exports = Upload;