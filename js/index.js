/*页面加载*/
var date = new Date();
var expiresDays = 365;
date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);

/**
 * 取得样式，包括非行间样式
 * @param  {Object} 节点
 * @param  {String} css名
 * @return {String} 返回样式结果
 */
function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }
}

/*头部提示条*/
var rightNotice = document.getElementsByClassName('right-unnotice')[0];
var notice = document.getElementById("u-notice");


rightNotice.onclick = function() {

        setCookie("isInfo", "buzaitishi", date);
        notice.style.display = "none";
    }
    //检查cookie,顶部“不再提示”事件。

/*if(getCookie("isInfo")){//检测是否出现通知栏

		notice.style.display='none';
	}*/
//思考上下两个有什么区别？

function ifShow() {
    var cookie = getCookie("isInfo");
    if (cookie == "buzaitishi") {
        document.getElementsByClassName('u-notice')[0].style.display = 'none';
    } else {
        document.getElementsByClassName('u-notice')[0].style.display = 'block';
    }
}
ifShow();
/*读取cookie*/
function getCookie(Name) {
    var cookie = {};
    var all = document.cookie;
    if (all === '')
        return null;
    var list = all.split(';');
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var p = item.indexOf('=');
        var name = item.substring(0, p);
        name = decodeURIComponent(name);
        var value = item.substring(p + 1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie[Name];
}
/*设置cookie*/
function setCookie(name, value, expires, path, domain, secure) {
    var cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (expires)
        cookie += ';expires=' + expires.toGMTString();
    if (path)
        cookie += ';path=' + path;
    if (domain)
        cookie += ';domain=' + domain;
    if (secure)
        cookie += ';secure=' + secure;
    document.cookie = cookie;
}
//删除cookie
function removeCookie(name, path, domain) {
    setCookie(name, '', new Date(0), path, domain);
}

/*头部标题栏*/
var _conAtten = document.getElementsByClassName("u-conAtten")[0];
var _conAttened = document.getElementsByClassName("u-conAttened")[0];
var _cancel = document.getElementsByClassName("cancel")[0];
var _conFans = document.getElementsByClassName("u-conFans")[0];
var _fanNum = document.getElementsByClassName("fanNum")[0];
var _loginBtn = document.getElementsByClassName("_loginForm")[0];
var _nameForm = document.getElementsByClassName("_nameForm")[0];
var _pswForm = document.getElementsByClassName("_pswForm")[0];


_conAtten.addEventListener("click", function() {
    checkLogin();
});
_loginBtn.addEventListener("click", function() {
    _conFans.style.left = "420px";
    document.getElementsByClassName('u-loginForm')[0].style.display = 'none';
    document.getElementsByClassName('zoom')[0].style.display = 'none';
    _fanNum.innerHTML = parseInt(_fanNum.innerHTML) + 1;
    _conAtten.style.display = 'none';
    _conAttened.style.display = 'block';
});

_cancel.addEventListener("click", function() {
    _conAtten.style.display = 'block';
    _conAttened.style.display = 'none';
    _conFans.style.left = "360px";
    _fanNum.innerHTML = parseInt(_fanNum.innerHTML) - 1;
    removeCookie("loginSuc");
});

//检测是否登录
function checkLogin() {
    var cookie = getCookie("loginSuc");
    if (!!cookie) {
        _conAtten.style.display = 'none';
        _conAttened.style.display = 'block';
        _conFans.style.left = "420px";
        _fanNum.innerHTML = parseInt(_fanNum.innerHTML) + 1;
    } else {
        document.getElementsByClassName('u-loginForm')[0].style.display = 'block';
        document.getElementsByClassName('zoom')[0].style.display = 'block';
        attention();
    }
}

//关闭登录框
var _cancelBtn = document.getElementsByClassName("cancelBtn")[0];
_cancelBtn.addEventListener("click", function() {
        document.getElementsByClassName('u-loginForm')[0].style.display = 'none';
        document.getElementsByClassName('zoom')[0].style.display = 'none';
    })
    //导航关注
function attention() {
    setCookie('loginSuc', 'yes');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText == 1) {
                setCookie("followSuc", "yes");
            }
        }
    }

    var url = "http://study.163.com/webDev/login.htm";
    xhr.open("get", url, true);
    xhr.send(null);
}
//向先有URL的末尾添加查询字符串参数，
function addURL(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}
//轮播图片



function imgTab() {
    loadCourse('1');
    var contBtn = document.getElementsByClassName("contBtn")[0];
    var aSpan = contBtn.getElementsByTagName('span');
    var aImg = document.getElementsByClassName("imgwrap")[0];
    var aLi = aImg.getElementsByTagName('li');
    var aI = document.getElementsByClassName("contBtn")[0].getElementsByTagName('i');
    var now = 0;


    for (var i = 0; i < aSpan.length; i++) {
        aSpan[i].index = i;

        aSpan[i].onclick = function() {
            now = this.index;
            tabBtn();
        }
    }

    function tabBtn() {

        for (var i = 0; i < aLi.length; i++) {

            aLi[i].className = 'hide';
            aI[i].className = '';
        }
        aLi[now].className = 'active';
        aI[now].className = 'contBtnCol';
    }
}
/*渐变代码*/
function fadeChange(obj, iTarget) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var speed = (iTarget - obj.alpha) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (obj.alpha == iTarget) {
            clearInterval(obj.timer);
        } else {
            obj.alpha += speed;
            obj.style.filter = 'alpha(opacity:' + obj.alpha + ')';
            obj.style.opacity = obj.alpha / 100;
        }
    }, 30);
}

/*视频开关代码*/
var proIntroVideo = document.getElementsByClassName("proIntroVideo-f1")[0];
var player = document.getElementsByClassName("m-player")[0];
var playerBtn = document.getElementsByClassName("playerBtn")[0];
proIntroVideo.addEventListener("click", function() {
    player.style.display = 'block';
});
playerBtn.addEventListener("click", function() {
    player.style.display = 'none';
})

/*加载课程列表*/

// 向现有URL的末尾添加查询字符串参数
function addURLParam(url, name, value) {
    url += (url.indexOf("?") == -1 ? "?" : "&");
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
    return url;
}


function loadCourse(pageNo) {

    var xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
    var url = "http://study.163.com/webDev/couresByCategory.htm";
    url = addURLParam(url, "pageNo", pageNo);
    xhr.open("get", url, true);
    /*xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');*/
    xhr.send(null);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status) {
                alert(xhr.responseText);
            }
        }
    }
}


/*列表课程*/
//封装ajax
function ajax(obj) {
    var xhr = (function() {
        if (typeof XMLHttpRequest != 'undefined') {
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != 'undefined') {
            var version = [
                'MSXML2.XMLHttp.6.0',
                'MSXML2.XMLHttp.3.0',
                'MSXML2.XMLHttp'
            ];
            for (var i = 0; version.length; i++) {
                try {
                    return new ActiveXObject(version[i]);
                } catch (e) {
                    //跳过
                }
            }
        } else {
            throw new Error('您的系统或浏览器不支持XHR对象！');
        }
    })();
    obj.url = obj.url + '?rand=' + Math.random();
    obj.data = (function(data) {
        var arr = [];
        for (var i in data) {
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    })(obj.data);
    if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
    if (obj.async === true) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback();
            }
        };
    }
    xhr.open(obj.method, obj.url, obj.async);
    if (obj.method === 'post') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(obj.data);
    } else {
        xhr.send(null);
    }
    if (obj.async === false) {
        callback();
    }

    function callback() {
        if (xhr.status == 200) {
            obj.success(xhr.responseText); //回调传递参数
        } else {
            alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
        }
    }
}
window.onload = function() {
        imgTab();
        ajax({
            method: 'get',
            url: 'http://study.163.com/webDev/couresByCategory.htm',
            data: {
                'pageNo': '1',
                'psize': '20',
                'type': '10'
            },
            success: function(data) {
                console.log(data);
                var _data = JSON.parse(data);

                var oDiv = document.getElementById("okdklkd");

                for (i = 0; i < _data.list.length; i++) {
                    var oLi = document.createElement("li");
                    oDiv.appendChild(oLi);

                    var _img = document.createElement("img");
                    var _name = document.createElement("p");
                    var _price = document.createElement("p");
                    var _description = document.createElement("p");
                    var _people = document.createElement("p");
                    var _provider = document.createElement("p");

                    _img.setAttribute("class", "okmy");
                    _img.setAttribute("src", _data.list[i].bigPhotoUrl);

                    _name.setAttribute("class", "okmyy");
                    _name.innerHTML = _data.list[i].name;
                    _price.innerHTML = "￥" + _data.list[i].price;
                    _people.innerHTML = _data.list[i].learnerCount;
                    _provider.innerHTML = _data.list[i].provider;

                    oLi.appendChild(_img);
                    oLi.appendChild(_name);
                    oLi.appendChild(_provider);
                    oLi.appendChild(_people);
                    oLi.appendChild(_price);
                }
            },
            async: true
        });
        getHotlist();
    }
    /*热门课程*/

function getHotlist() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                var hotlist = JSON.parse(xhr.responseText),
                    listnum = 0;
                for (var i = 0; i < 10; i++) {
                    var topi = document.getElementsByClassName('topi')[i],
                        detailtt = topi.getElementsByTagName('a')[0],
                        tophot = topi.getElementsByTagName('span')[0],
                        topimg = topi.getElementsByTagName('img')[0];
                    detailtt.innerHTML = hotlist[i].name;
                    detailtt.title = hotlist[i].name;
                    tophot.innerHTML = hotlist[i].learnerCount;
                    topimg.src = hotlist[i].smallPhotoUrl;
                }
                listnum = 1;
                var changehot = setInterval(function() {
                    if (listnum == 1) {
                        for (var i = 0; i < 10; i++) {
                            var topi = document.getElementsByClassName('topi')[i],
                                detailtt = topi.getElementsByTagName('a')[0],
                                tophot = topi.getElementsByTagName('span')[0],
                                topimg = topi.getElementsByTagName('img')[0]
                            xhri = i + 10;
                            detailtt.innerHTML = hotlist[xhri].name;
                            detailtt.title = hotlist[xhri].name;
                            tophot.innerHTML = hotlist[xhri].learnerCount;
                            topimg.src = hotlist[xhri].smallPhotoUrl;
                        }
                        listnum--;
                    } else if (listnum == 0) {
                        for (var i = 0; i < 10; i++) {
                            var topi = document.getElementsByClassName('topi')[i],
                                detailtt = topi.getElementsByTagName('a')[0],
                                tophot = topi.getElementsByTagName('span')[0],
                                topimg = topi.getElementsByTagName('img')[0]
                            xhri = i;
                            detailtt.innerHTML = hotlist[xhri].name;
                            detailtt.title = hotlist[xhri].name;
                            tophot.innerHTML = hotlist[xhri].learnerCount;
                            topimg.src = hotlist[xhri].smallPhotoUrl;
                        }
                        listnum++;
                    }
                }, 5000);
            }
        }
    }
    xhr.open("get", 'http://study.163.com/webDev/hotcouresByCategory.htm', true);
    xhr.send(null);
}
