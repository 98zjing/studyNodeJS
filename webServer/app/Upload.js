const formidable = require('formidable');
const fs =  require('fs');

function  Upload(){
	if(this instanceof Upload == false){
		return new Upload();
	}
	this.newFileName = '';
	this.form = null;
	this.dir = './public/upload/';
}
Upload.prototype =  {
	isFormData:function(req){
		let type = req.headers['content-type'] || [];
		return type.includes('multipart/form-data');
	},
	load:function(req){
		return new Promise((res,rej)=>{
			this.form = new formidable.IncomingForm();
			// this.form.encoding = 'utf-8';
			this.form.uploadDir  =  this.dir;

			this.form.parse(req,(err,fields,files)=>{
      			if(err) throw err;
			});

			this.form.on('progress', function(bytesReceived, bytesExpected) {

			});
			
			this.form.on('field',(field,value)=>{

			});

			/*this.form.on('file',(name,file)=>{
				this.newFileName = this.newName(file);
				fs.renameSync(file.path,this.dir + this.newFileName);
			});*/

			this.form.on('error',(error)=>{
				rej(error);
			})	

			this.form.on('end',()=>{
				res({
					dir:this.dir,
					newFileName:this.newFileName,
					form:this.form
				})
			});
		});
	},
	newName:function(file){
		let types =  file.name.toString().split('.');
		let extName = types[types.length - 1];
		let  newName = (new Date()).getTime();
		for(var i = 0;i<2;i++){
			newName += Math.random().toString().split('.')[1];
		}
		return newName + '.' + extName;
	}
};
module.exports = Upload;