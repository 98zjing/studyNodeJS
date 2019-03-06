// 连接 MySQL：先安装 npm i mysql -D
var mysql = require('mysql');
var crypto   = require('crypto');
// MySQL 的连接信息
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node'
});
// 开始连接
connection.connect();


// 引入 url 模块：url 是对用户提交的路径进行解析
const url = require("url");

function  User(){
  if(this instanceof User){
    return this;
  }else{
    this.sql = '';
    return new User();
  }
}
User.prototype =  {
    //获取留言
    getMessage:function(data){
      console.log("\n【API - 获取留言信息】");
      return new Promise((resolve,reject)=>{
        let sql = 'SELECT * FROM `message`';
        connection.query(sql,(error,res)=>{
          if(error){
            console.log(error)
            reject(error);
          }else{
            resolve(res);
          }
        })
      })
        
    },
    //登录
    postLogin:function(date){
      console.log("\n【API - 登录 信息】");
      return new Promise((resolve,reject)=>{
          let sql  =  'SELECT * FROM `user` where user_name=? and user_password=?';
          let valus = [date.username,this.md5(date.password)];
          connection.query(sql,valus,(error,res)=>{
          if(error){
            console.log(error);
            reject(error);
          }else{
            resolve(res);
          }
        });
      })
    },
    //注册
    postRegister:function(date){
      console.log("\n【API - 提交注册 信息】");
      return new Promise((resolve,reject)=>{
        let sql  =  'INSERT  INTO  `user`(`user_name`,`user_password`, `time`) VALUES(?,?,?)';
        let valus = [date.username,this.md5(date.password),getNowFormatDate()];
        console.log(valus);
        connection.query(sql,valus,(error,res)=>{
          if(error){
            console.log(error);
            reject(error);
          }else{
            
            resolve(res);
          }
        });
      })
    },
    //留言
    postSendMessage:function(data){
        return new Promise((resolve,reject)=>{
          let sql = 'INSERT INTO  `message`(`user_message`,`user_id`,`user_name`,`time`) VALUES(?,?,?,?)';
          let values = [data.message,data.userid,data.username,getNowFormatDate()];
          connection.query(sql,values,(error,res)=>{
            if(error){
                console.log();
                reject(error)
            }else{
              console.log('\n【API - 提交留言 成功】');
              resolve(res);
            }
          })
        })
    },
    md5:function(data){
      const hash = crypto.createHash('md5');
      console.log(data);
      return  hash.update(data.toString()).digest('hex');
    }
}


// 获取当前时间
function getNowFormatDate() {
  var date = new Date();
  var year = date.getFullYear(); // 年
  var month = date.getMonth() + 1; // 月
  var strDate = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minute = date.getMinutes(); // 分
  var second = date.getMinutes(); // 秒
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  // 返回 yyyy-mm-dd hh:mm:ss 形式
  var currentdate = year + "-" + month + "-" + strDate + " " + hour + ":" + minute + ":" + second;
  return currentdate;
}

module.exports = User;