const nodemailer = require('nodemailer');

function Email(){
	if(!(this instanceof Email))return new Email();
	this.conf = {
		host:"smtp.163.com",
		port:465,
		secure: true, // true for 465, false for other ports
		user:'17612742615@163.com',
		pass:'17612742615zns'
	};
	this.message = {
		from:null,
		to:null,
		subject:null,
		text:null,
		html:null
	};
}

Email.prototype = {
	send:function(){
		return new Promise(async(res,rej)=>{
			let account = await nodemailer.createTestAccount();
			let transporter = nodemailer.createTransport({
			    host: this.conf.host,
			    port: this.conf.port,
			    auth: {
			      user: this.conf.user, // generated ethereal user
			      pass: this.conf.pass// generated ethereal password
			    }
			 });
			 let info = await transporter.sendMail(this.message,(data)=>{
			 	res(data);
			 });
		});
	},
	init:function(conf){
		Object.assign(this.conf,conf);
		return this;
	},
	setMsg:function(msg){
		Object.assign(this.message,msg);
		return this;
	}
}	

module.exports  = Email;