/*页面加载*/
var date=new Date();
var expiresDays=365;
date.setTime(date.getTime()+expiresDays*24*3600*1000);	

/**
* 取得样式，包括非行间样式
* @param  {Object} 节点
* @param  {String} css名
* @return {String} 返回样式结果
*/
function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}

/*头部提示条*/
var rightNotice=document.getElementsByClassName('right-unnotice')[0];
var notice=document.getElementById("u-notice");


rightNotice.onclick=function(){	

	setCookie("isInfo","buzaitishi",date);
	notice.style.display="none";
}
//检查cookie,顶部“不再提示”事件。

/*if(getCookie("isInfo")){//检测是否出现通知栏

		notice.style.display='none';
	}*/
//思考上下两个有什么区别？

function ifShow(){
	var cookie=getCookie("isInfo");
	if(cookie=="buzaitishi"){
		document.getElementsByClassName('u-notice')[0].style.display='none';
	}else{
		document.getElementsByClassName('u-notice')[0].style.display='block';
	}
}
ifShow();
/*读取cookie*/
function getCookie (Name) {
	var cookie={};
	var  all=document.cookie;
	if(all==='')
		return null;
	var list=all.split(';');
	for(var i=0;i<list.length;i++){
		var item=list[i];
		var p=item.indexOf('=');
		var name=item.substring(0,p);
		name=decodeURIComponent(name);
		var value=item.substring(p+1);
		value=decodeURIComponent(value);
		cookie[name]=value;
	}
	return cookie[Name];
}
/*设置cookie*/
function setCookie(name,value,expires,path,domain,secure){
	var cookie=encodeURIComponent(name)+"="+encodeURIComponent(value);
	if(expires)
		cookie+=';expires='+expires.toGMTString();
	if(path)
		cookie+=';path='+path;
	if(domain)
		cookie+=';domain='+domain;
	if(secure)
		cookie+=';secure='+secure;
	document.cookie=cookie;
}
//删除cookie
function removeCookie(name,path,domain){
	setCookie(name, '', new Date(0), path, domain);
}

/*头部标题栏*/
var _conAtten=document.getElementsByClassName("u-conAtten")[0];
var _conAttened=document.getElementsByClassName("u-conAttened")[0];
var _cancel=document.getElementsByClassName("cancel")[0];
var _conFans=document.getElementsByClassName("u-conFans")[0];
var _fanNum=document.getElementsByClassName("fanNum")[0];
var _loginBtn=document.getElementsByClassName("_loginForm")[0];
var _nameForm=document.getElementsByClassName("_nameForm")[0];
var _pswForm=document.getElementsByClassName("_pswForm")[0];


_conAtten.addEventListener("click",function(){
	checkLogin();
});
_loginBtn.addEventListener("click",function(){
	_conFans.style.left="420px";
	document.getElementsByClassName('u-loginForm')[0].style.display='none';
	document.getElementsByClassName('zoom')[0].style.display='none';
	_fanNum.innerHTML=parseInt(_fanNum.innerHTML)+1;
	_conAtten.style.display='none';
	_conAttened.style.display='block';
});

_cancel.addEventListener("click",function(){
	_conAtten.style.display='block';
	_conAttened.style.display='none';
	_conFans.style.left="360px";
	_fanNum.innerHTML=parseInt(_fanNum.innerHTML)-1;
	removeCookie("loginSuc");
});

//检测是否登录
function checkLogin(){
	var cookie=getCookie("loginSuc");
	if(!!cookie){
	_conAtten.style.display='none';
	_conAttened.style.display='block';
	_conFans.style.left="420px";
	_fanNum.innerHTML=parseInt(_fanNum.innerHTML)+1;
	}else{
		document.getElementsByClassName('u-loginForm')[0].style.display='block';
		document.getElementsByClassName('zoom')[0].style.display='block';
		attention();
	}
}

//关闭登录框
var _cancelBtn=document.getElementsByClassName("cancelBtn")[0];
	_cancelBtn.addEventListener("click",function(){
	document.getElementsByClassName('u-loginForm')[0].style.display='none';
	document.getElementsByClassName('zoom')[0].style.display='none';
})
//导航关注
function attention(){
	setCookie('loginSuc','yes');
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if (xhr.readyState==4&&xhr.status==200) {
			if(xhr.responseText==1){
				setCookie("followSuc","yes");
			}
		}
	}

	var url="http://study.163.com/webDev/login.htm";
	xhr.open("get",url,true);
	xhr.send(null);
}
//向先有URL的末尾添加查询字符串参数，
function addURL (url,name,value) {
	url+=(url.indexOf("?")==-1?"?":"&");
	url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
    return url;
}
//轮播图片

window.onload=function(){
var contBtn=document.getElementsByClassName("contBtn")[0];
var aSpan=contBtn.getElementsByTagName('span');
var aImg=document.getElementsByClassName("imgwrap")[0];
var aLi=aImg.getElementsByTagName('li');
var aI=document.getElementsByClassName("contBtn")[0].getElementsByTagName('i');
var now=0;
var opa


	for(var i=0;i<aSpan.length;i++){
	aSpan[i].index=i;

	aSpan[i].onclick=function(){
		now=this.index;
		tabBtn();

	}
	
}
function tabBtn () {
	
	for(var i=0;i<aLi.length;i++){
		var opa=aLi[now].style.opacity;
		aLi[i].className='hide';
		aI[i].className='';			
	}	
	aLi[now].className='active';
	aI[now].className='contBtnCol';	
	}
}
/*渐变代码*/
function fadeChange(obj, iTarget)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var speed=(iTarget-obj.alpha)/6;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		
		if(obj.alpha==iTarget)
		{
			clearInterval(obj.timer);
		}
		else
		{
			obj.alpha+=speed;			
			obj.style.filter='alpha(opacity:'+obj.alpha+')';
			obj.style.opacity=obj.alpha/100;
		}
	}, 30);
}
//Ajax请求代码
function ajax(url, fnSucc, fnFaild)
{
	//1.创建Ajax对象
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//2.连接服务器（打开和服务器的连接）
	oAjax.open('GET', url, true);
	
	
	//3.发送
	oAjax.send();
	
	//4.接收
	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)
		{
			if(oAjax.status==200)
			{
				//alert('成功了：'+oAjax.responseText);
				fnSucc(oAjax.responseText);
			}
			else
			{
				//alert('失败了');
				if(fnFaild)
				{
					fnFaild();
				}
			}
		}
	};
}