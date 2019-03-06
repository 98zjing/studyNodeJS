/**
 * 节点弹出
 * pop
 * @param el 弹出要选取的节点  必须
 * @param conf 弹出的配置选择 conf.out 确定是否 点击背景退出  conf.style 样式 必须对对象    可选
 * out 
 * @param popOut 退出 调用的函数   el 节点
 *  Pop.pop('#test',{
 *      out:false,
        style:{
            left:'20%'
        }
    });
   Pop.out(function(el){
        console.log(el)
    });
 */

let Pop = (function(){
    var __zIndex__ = 99999;
    var __znsPopDomStyle__ = {//弹出节点外包样式
        'position':'fixed',
        'top':'50%',
        'left':'50%',
        'z-index':__zIndex__,
        'transform':'translate(-50%,-50%)'
    };
    var __znsPopDownDomStyle__ = {//黑色背景样式
        'position':'fixed',
        'top':'0',
        'left':'0',
        'right':'0',
        'bottom':'0',
        'z-index':__zIndex__ - 1 ,
        'opacity':0.5,
        'background-color':'#111'
    };
    var __popDownEl__ = '#zns-pop-down-dom';
    var __elParnt__ = '#zns-pop-el-parent';
    var __el__ = null;

    var pop = function(el,conf){
        __el__ = el;
        var crateDomStyle = 'display:block;';
        if( conf && conf.style && ({}).toString.call(conf.style) == '[object Object]'){
            for(var key in conf.style){
                __znsPopDomStyle__[key] = conf.style[key];
            }
        }
        for(var key in __znsPopDomStyle__){
            crateDomStyle += key + ':' + __znsPopDomStyle__ [key]+';';
        }

        var elDom = document.querySelector(el);
        elDom.style.display =  'block';
        var elParentDom = elDom.parentNode;
        var crateDom = document.createElement('div');

        crateDom.id = __elParnt__.slice(1);
        crateDom.style = crateDomStyle;
        crateDom.appendChild(elDom);
        elParentDom.appendChild(crateDom);//对传入节点进行 外包节点插入

        if(!document.querySelector(__popDownEl__)){//第一次弹出创建 背景层
            var znsPopDownDom = document.createElement('div');
            znsPopDownDom.id = __popDownEl__.slice(1);

            var popDownDomStyle = '';
            for(var key in __znsPopDownDomStyle__){
                popDownDomStyle += key + ':' + __znsPopDownDomStyle__[key] +';';
            }
            znsPopDownDom.style = popDownDomStyle;//写入背景层样式
            document.querySelector('body').appendChild(znsPopDownDom);
        }else{
            document.querySelector(__popDownEl__).style.display = 'block';
        }
        
        var isOut =  conf ? (conf.out || true) : true;
        if(isOut){//是否点击背景层  退出
            var popDownEl = document.querySelector(__popDownEl__);
            popDownEl.onclick = __popOutFn__;
        }
        return __znsPopDomStyle__;//放回外包的样式
    }

    function __popOutFn__(){//退出
        var elDom = document.querySelector(__el__);
        var elCreateParnt = document.querySelector(__elParnt__);//在节点上 外包 的节点
        var elCreateParntParnt = elCreateParnt.parentNode;//在节点上 外包 的节点 的父节点
        var popDownEl = document.querySelector(__popDownEl__);

        popDownEl.style.display = 'none';//背景层 隐藏
        elDom.style.display = 'none';//传入的节点 隐藏
        elCreateParntParnt.appendChild(elDom);//传入的节点 位置还原
        elCreateParntParnt.removeChild(elCreateParnt);//删除外包节点
        return  elDom;
    }

    return {
        pop:pop,
        out:function(fn){
            if(__popOutFn__()){
                if( fn || ({}).toString.call(fn) == '[object Function]'){
                    fn(document.querySelector(__el__));
                }
            }
        }
    };
})();

/**
 * 日期
 * getDateAll   放回时间的所有信息
 * getMDate     返回一个月的日期  年 月 日 星期
 * 
 */
var D = (function(){
    function getDateAll(data){//放回时间的所有信息 
        var D = new Date();
        var y  = D.getFullYear();//年
        var m  = D.getMonth();//月
        var d  = D.getDate();//日
        var h  = D.getHours();//时
        var mi = D.getMinutes();//分
        var s = D.getSeconds();//秒 
        var w = D.getDay();//星期
        var wTest =  null;
        var time =  D.getTime();//时间戳
            
        switch(w){
            case 0 : wTest = '星期天'; break;
            case 1 : wTest = '星期一'; break;
            case 2 : wTest = '星期二'; break;
            case 3 : wTest = '星期三'; break;
            case 4 : wTest = '星期四'; break;
            case 5 : wTest = '星期五'; break;
            case 6 : wTest = '星期六'; break;
        }

        return {
            textInfo:{//时间文字格式信息
                date1:y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s,//年-月-日 时：分：秒
                date2:y + '-' + m + '-' + d,//年-月-日
                date3:y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s + ' ' + wTest,//年-月-日 时：分：秒 星期
            },
            all:{//所有的信息
                y:y,
                m:m,
                d:d,
                mi:mi,
                s:s,
                w:w,
                time:time
            },
            time:{//时间戳信息  js时间戳 与PHP时间戳
                jsTime:time,
                phpTime:Number((time / 1000).toFixed(0))
            },
            wInfo:{//星期信息
                w:w == 0 ? 7 : w,
                text:wTest
            }
        }
    }

    function getDate(date){//返回一天的日期    年 月 日 星期
        var D = date ? new Date(date) : new Date();
        var obj = {
            y:D.getFullYear(),
            m:D.getMonth() + 1,
            d:D.getDate(),
            w:D.getDay()
        }
        if(obj.w == 0) obj.w = 7;
        return obj;
    }

    function getMDate(date){//返回一个月的日期  年 月 日 星期
        var D = date ? new Date(date) : new Date();
        var y = D.getFullYear();
        var m = D.getMonth() + 1;
        var maxD = null;//这个月的最大天数
        if(m.toString().match(/[1,3,5,7,8,10,12]/g)){
            maxD =  31;
        }else {
            maxD =  30;
        }
        if(m == 2){
            if (((y % 4)==0) && ((y % 100)!=0) || ((y % 400)==0)) {
                maxD =  29;
            } else { 
                maxD =  28;
            }
        }
        var arr = [];

        for(var i=1;i <= maxD;i++){
            var obj = getDate(y + '-' + m + '-' + i);
            arr.push(obj);
        }
        return arr;
    }
    return {
        getDateAll:getDateAll,
        getDate:getDate,
        getMDate:getMDate
    }
})();

/**
 * 
 */
var Code = (function(){
    var  __time__ = 60;
    function getCode(_el){//获取验证码
        var el =  ({}).toString.call(str) == '[object String]' ? document.querySelector(_el) : _el;
        var tims = __time__;
        var time = setInterval(function(){
            if (tims == 0) {
                el.getAttributeNode(el.getAttributeNode("disabled"));
                el.value="重新发送(" + tims + ")";
                tims = 60;
                clearInterval(time);
                return;
            } else {
                el.value="获取验证码";
                el.setAttribute("disabled");
                tims--;
            }
            el.is_code = true;
        },1000)
    };

    return {
        get:getCode
    }
})();

/**
 * 
 * @param {*} el 
 * @param {*} phone_el 
 * @param {*} is_pwd 
 */
function getPhoneCode(el,phone_el,is_pwd) {//手机号验证
    var _phone = $(phone_el).val();
    var re =  /^1\d{10}$/;
    var _email = /@/g;
    if((_email.test(_phone))){
        //邮箱
        var __email = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/g;
        if(__email.test(_phone)){
            Get_Email_Code(el,phone_el,is_pwd);
        }else {
            Layer_Msg('请输入正确的邮箱',2);
            return false;
        }
    }else {
        //手机号
        if(re.test(_phone)){
            Send_Code(el,phone_el);
        }else {
            Layer_Msg('请输入正确的手机号',2);
        }
    }
}

/**
 * 放回地址栏的传递 参数对象
 */
var getParam = (function(){
    var arr = (location.search).slice(1).split('&');//获取所有的传递参数
    var obj ={};

    arr.forEach(function (val,key) {
        var keyAndValArr = val.split('=');
        obj[keyAndValArr[0]] = keyAndValArr[1];
    });
    return obj;
})();

/**
 * 放回克隆的新数据
 * @param {*} target  要克隆的目标    
 */
function clone(target){
    var obj = JSON.stringify(target);
    return JSON.parse(obj);
}