$(function () {
    const actives = {
      'index':true,
      'consultingBusiness':true,
      'valueAddedService':true,
      'trainingBusiness':true,
      'mobileApplications':true,
      'messageBoard':true
    }
    let actName =  location.pathname.replace(/\//,'');
    $('#'+actName).addClass('active');

  //获取文件
  (function($){
    if(location.pathname != '/load')return false;
    $.ajax({
      url:'http://localhost:8888/getfile',
      type:'get',
      dataType:'json',
      success:function(data){
        let html = '';
        for(var f of data.data.list){
          html += `<a href=/down?filename=${f} style='margin-right:20px;'>点击下载${f}</a>`;
        }
        console.log(html);
        $('#downfile').html(html);
      },
      error:function(err){
        console.log(err);
      }
    });
  })($);    

  //登录
  (function($){
    $("#login-submit").click(function () {
      let userName = $("#userName").val(); // 用户名
      let userPassword = $("#userPassword").val(); // 密码
      if (!userName) {
        alert("请输入用户名");
        $("#userName").focus();
      } else if (!userPassword) {
        alert("请输入密码");
        $("#userPassword").focus();
      } else if (userName.length > 10) {
        alert("请输入少于 10 位的用户名");
        $("#userName").focus();
      } else if (userPassword.length > 20) {
        alert("请输入少于 20 位的密码");
        $("#userPassword").focus();
      } else {

        $.ajax({
          url: "http://localhost:8888/login",
          type: 'post',
          dataType: 'json',
          data: {
            username: userName,
            password: userPassword
          },
          success: function (res) {
            console.log(res);
            if (res.code == 200) {
              sessionStorage.setItem("id", res.data.id);
              sessionStorage.setItem("userName", res.data.userName);
              alert("登录成功！");
              window.location.href = "./messageBoard.html";
            } else {
              alert("登录失败，密码错误！");
            }
          },
          error: function (err) {
            console.log(err.responseText);
            if (err.responseText == "不存在该用户！") {
              alert("不存在该用户！");
            } else if (err.responseText == "登录失败，用户名为空！") {
              alert("登录失败，用户名为空！");
            } else if (err.responseText == "登录失败，密码为空！") {
              alert("登录失败，密码为空！");
            } else if (err.responseText == "登录失败，姓名过长！") {
              alert("登录失败，姓名过长！");
            } else if (err.responseText == "登录失败，密码过长！") {
              alert("登录失败，密码过长！");
            } else {
              alert("未知错误！");
            }
          }
        })
      }
    })
  })($);

  //留言板
  (function($){
    if(location.pathname != '/messageBoard')return false;
    let userName = sessionStorage.getItem("userName");
    let userId = sessionStorage.getItem("id");
    // 查询留言板
    if(userName && userId) { // 如果有存储
      $.ajax({
        url: "http://localhost:8888/getMessage",
        type: 'get',
        dataType: 'json',
        success: function (res) {
          console.log(res);
          let li = ``;
          for(let item in res.data.list) {
            li = li + `
              <li>
                <span class="text-warning font-bold">☆ </span>
                <span class="user-message">${res.data.list[item].user_message}</span>
                <span>—— </span>
                <span class="user-name">${res.data.list[item].user_name} [${res.data.list[item].user_id}]</span>
                <span class="message-time">${res.data.list[item].time}</span>
              </li>
            `;
          }
          $("#message-board-ul").append(li);
        },
        error: function (err) {
          console.log(err);
        }
      })
    } else { // 如果没有存储
      window.location.href = "/login";
    }
  
    // 提交留言
    $("#message-submit").click(function() {
      let messageText = $("#message").val()
      if(!messageText) {
        alert("留言内容不能为空");
      } else if(messageText.length > 140) {
        alert("留言长度不能超过 140 位！");
      } else {
        $.ajax({
          url: "http://localhost:8888/sendMessage",
          type: 'post',
          dataType: 'json',
          data: {
            userid: userId,
            username: userName,
            message: messageText
          },
          success: function (res) {
            console.log(res);
            if(res.code == 200) {
              alert("新增成功！");
              window.location.reload();
            }
          },
          error: function (err) {
            console.log(err);
            console.log(err.responseText);
            if (err.responseText == "登录失败，留言内容为空！") {
              alert("登录失败，留言内容为空！");
            } else if (err.responseText == "登录失败，字数超过限制！") {
              alert("登录失败，字数超过限制！");
            } else {
              alert("未知错误！");
            }
          }
        })
      }
    })
  })($);

  //注册
  (function($){
    $("#register-submit").click(function () {
        let userName = $("#userName").val();
        let userPassword = $("#userPassword").val();
  
        if (!userName) {
          alert("请输入用户名");
          $("#userName").focus();
        } else if (!userPassword) {
          alert("请输入密码");
          $("#userPassword").focus();
        } else if (userName.length > 10) {
          alert("请输入少于 10 位的用户名");
          $("#userName").focus();
        } else if (userPassword.length > 20) {
          alert("请输入少于 20 位的密码");
          $("#userPassword").focus();
        } else {
  
          // 如果用户输入的没毛病，那就加载接口
          $.ajax({
            url: "http://localhost:8888/register",
            type: 'post',
            dataType: 'json',
            data: {
              username: userName,
              password: userPassword
            },
            success: function (res) {
              console.log(res);
              if (res.code == 200) {
                alert("注册成功，前往登录！");
                window.location.href = "./login.html";
              }
            },
            error: function (err) {
              console.log(err.responseText);
              if (err.responseText == "注册失败，姓名重复！") {
                alert("用户名已被注册！");
              } else if (err.responseText == "注册失败，名额已满！") {
                alert("注册失败，名额已满！");
              } else if (err.responseText == "注册失败，密码为空！") {
                alert("注册失败，密码为空！");
              } else if (err.responseText == "注册失败，姓名过长！") {
                alert("注册失败，姓名过长！");
              } else if (err.responseText == "注册失败，密码过长！") {
                alert("注册失败，密码过长！");
              } else {
                alert("未知错误！");
              }
            }
          })
        }
      })
  })($);
})