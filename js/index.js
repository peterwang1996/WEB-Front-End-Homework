/*页面加载*/
var date=new Date();
var expiresDays=365;
date.setTime(date.getTime()+expiresDays*24*3600*1000);	

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
		return cookie;
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
	document.cookie=name+'='+';path='+path+';domain='+domain+';max-age=0';
}

/*头部标题栏*/
var _conAtten=document.getElementsByClassName("u-conAtten")[0];
var _conAttened=document.getElementsByClassName("u-conAttened")[0];
var _cancel=document.getElementsByClassName("cancel")[0];
var _conFans=document.getElementsByClassName("u-conFans")[0];

_conAtten.addEventListener("click",function(){
	_conAtten.style.display='none';
	_conAttened.style.display='block';
	_conFans.style.left="420px";
});
_cancel.addEventListener("click",function(){
	_conAtten.style.display='block';
	_conAttened.style.display='none';
	_conFans.style.left="360px";
})