/*
 * ZJ.News
 * Version : 3.0

 1.设置首页
	<a href="#" onclick="zj.setHome();">设为首页</a>
2.收藏站点
	<a href="#" onclick="zj.addFavorite();">添加收藏</a>
3.获取cookie	
	zj.getCookie("sessionid");
4.添加cookie
	zj.setCookie("memberid","xxx");
5.删除cookie
	zj.deleteCookie("memberid");
6.设置默认提交按钮
	jQuery(".main").keypress(function(){zj.enter(event, '.cont .loginbtn'); } );
7.将指定名称的标签组设置为选项卡样式:鼠标事件
	tabOver("ul_one","div_one","current");	
	标签组必须是ul -->li, 内容组必须是div -->div
8.将指定名称的标签组设置为选项卡样式:点击事件
	tabClick("cont_one","div_one","current");	
	标签组必须是ul -->li, 内容组必须是div -->div
9.获取查询字符串值
	zj.getQuery('id',0) 0为未取到数据时的默认值
10.获取指定URL的查询字符串值
	zj.getQuery2(top.document.location.search,'id') 
11.在当前地址后添加查询字符串，如果已存在该查询字符串则替换
    zj.addQuery('id',10)
12.在指定地址后添加查询字符串，如果已存在该查询字符串则替换
	 zj.addQuery2("/demo/detail.aspx?node=test&id=5",'id',10)
13. 页面中图片超过宽度自动等比缩小
   zj.fixImageSize(".text", 600);

14.增加栏目点击数
    zj.addNodeHits
15.栏目浏览权限检查
    checkNodePerm
16.增加内容点击数
    addContentHits
17.增加内容点击数评分
    addContentScore
   method:(0:按IP,1:按用户)
18.获取当前会员信息(未登录显示登录版块)
    loadLogin(elem)
19.登录
    login(txtname, txtpwd, chkremeber, hanlder)
    txtname,用户名输入框id
    txtpwd,密码输入框ID
    chkremeber,记住我复选框
    hanlder,登录成功处理函数
20.

21.请求退出
    zj.logout
22.检查会员名是否已存在0:用户名或EMAIL不可用，1可用，其他：错误消息 
    validMemberName(userName)
23.检查会员邮箱是否存在 0:用户名或EMAIL不可用，1可用，其他：错误消息 
 validEmail(email)
24.检查验证码
    checkVerifyCode(input)
25.更换验证码
    changeCode(elem)
26.兑换礼品
    doGiftTran(giftID)
27.会员k中心搜索内容
    doSearch(itemName) 
28.删除确认提示
confirmDelete()
29.获取选中项
getSelectKeys()
30.前台搜索，跳到search.aspx
  goSearch(input);
 *
 */
var contentx_url = appPath + "app_service/contentx.ashx";
var member_url = appPath + "app_service/member.ashx"; //会员登录ajax页
var member_panel_url = "user_ajax.aspx"; //会员登录面板加载页
var gift_tran_url = appPath + "app_service/gift.ashx"; //礼品兑换提交页
var login_url = appPath + "login.aspx"; //会员默认页地址
var node_url = appPath + "app_service/node.ashx"; //栏目点击计数ajax页
var verfiycode_url = appPath + "app_service/validatecode.aspx";
var search_url = "search.aspx";

String.prototype.trim = function () { return (this.replace(/^\s+|\s+$/g, "")); }
String.prototype.ltrim = function () { return (this.replace(/^\s*/, "")); }
String.prototype.rtrim = function () { return (this.replace(/\s*$/, "")); }

var zj = new Object();
////////////////////util/////////////////////////
zj.setHome = function (obj) {
    var url = document.location.protocol + "//" + document.location.hostname;
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(url);
    }
    catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        } else {
            alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置首页。3.输入：" + url + "点击确定。");
        }
    }
};
zj.addFavorite = function (url, title) {
    if (url == null) url = document.location.href;
    if (title == null) title = document.title;
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
};
zj.getCookie = function (name) {
    var cookie_start = document.cookie.indexOf(name);
    var cookie_end = document.cookie.indexOf(";", cookie_start);
    if (cookie_start == -1) {
        return "";
    } else {
        var length = cookie_end > cookie_start ? cookie_end : document.cookie.length;
        var val = document.cookie.substring(cookie_start + name.length + 1, length);
        return unescape(val);
    }
};
zj.setCookie = function (cookieName, cookieValue, seconds, path, domain, secure) {
    var expires = new Date();
    expires.setTime(expires.getTime() + seconds);
    document.cookie = escape(cookieName) + '=' + escape(cookieValue)
    + (expires ? '; expires=' + expires.toGMTString() : '')
    + (path ? '; path=' + path : '/')
    + (domain ? '; domain=' + domain : '')
    + (secure ? '; secure' : '');
};
zj.deleteCookie = function (name) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=a; expires=" + date.toGMTString();
};
zj.enter = function (event, linkOpenType) {
    if (event.keyCode == 13 && !(event.srcElement && (event.srcElement.tagName.toLowerCase() == "textarea"))) {
        var defaultButton = jQuery(linkOpenType);
        if (defaultButton && typeof (defaultButton.click) != "undefined") {
            defaultButton.click();
            event.cancelBubble = true;
            if (event.stopPropagation)
                event.stopPropagation();
            return false;
        }
    }
    return true;
};
zj.tabOver = function (tabName, divName, hoverCss) {
    jQuery("[name='" + tabName + "'] li").hover(function () {
        jQuery("[name='" + divName + "'] > div").hide();
        jQuery("[name='" + tabName + "'] li").removeClass(hoverCss);
        alert(jQuery("[name='" + divName + "'] > div").eq(jQuery(this).index()).html());
        jQuery("[name='" + divName + "'] > div").eq(jQuery(this).index()).show();
    }, function () {
    });
};
zj.tabClick = function (tabName, divName, hoverCss) {
    jQuery("[name='" + tabName + "'] li").click(function () {
        jQuery("[name='" + divName + "'] > div").hide();
        jQuery("[name='" + tabName + "']  li").removeClass(hoverCss);

        jQuery(this).addClass(hoverCss);
        jQuery("[name='" + divName + "'] > div").eq(jQuery(this).index()).show();
    });
};
zj.getQuery = function (name, defaultValue) {
    var vStr = defaultValue;
    var search = document.location.search.toLowerCase();
    search = search.substring(1, search.length);

    var arr = search.split("&");
    for (i = 0; i < arr.length; i++) {
        var temp = arr[i].split("=");
        if (temp[0] == name) {
            vStr = temp[1];
            break;
        }
    }
    return vStr;
};
zj.getQuery2 = function (search, name) {
    var vStr = "";
    search = search.toLowerCase();
    search = search.substring(1, search.length);

    var arr = search.split("&");
    for (i = 0; i < arr.length; i++) {
        var temp = arr[i].split("=");
        if (temp[0] == name) {
            vStr = temp[1];
            break;
        }
    }
    return vStr;
};
zj.addQuery = function (name, value) {
    var path = document.location.pathname;
    var search = document.location.search.toLowerCase();
    search = search.substring(1, search.length);
    var newSearch = "?";
    var arr = search.split("&");
    for (i = 0; i < arr.length; i++) {
        if (arr[i] == "") continue;
        var temp = arr[i].split("=");
        if (temp[0] == name) continue;
        newSearch += arr[i] + "&";
    }
    newSearch += name + "=" + value;
    return path + newSearch;
};
zj.addQuery2 = function (url, name, value) {
    var arr = url.split('?');
    if (arr.length == 1) return url + "?" + name + "=" + value;

    var path = arr[0];
    var search = arr[1];

    var newSearch = "?";
    var arr1 = search.split("&");
    for (i = 0; i < arr1.length; i++) {
        var temp = arr1[i].split("=");
        if (temp[0] == name) continue;
        newSearch += arr1[i] + "&";
    }
    newSearch += name + "=" + value;
    return path + newSearch;
};
zj.removeQuery = function (name) {
    var vStr = "";
    var search = document.location.search.toLowerCase();
    search = search.substring(1, search.length);
    var arr = search.split("&");
    for (i = 0; i < arr.length; i++) {
        var temp = arr[i].split("=");
        if (temp[0] != "" && temp[0] != name) {
            vStr += "&" + temp;
        }
    }
    if (vStr.length > 1) {
        vStr = "?" + vStr.substring(1);
    }
    return document.location.pathname + vStr;
};
zj.getDomain = function () {
    var url = document.location.protocol + "//" + document.location.host;
    return url;
};
zj.validTip = function (tipCss) {
    jQuery(tipCss).each(function () {
        //var inputID = jQuery(this).attr("controltovalidate");
        var inputID = jQuery(this).attr("id");
        inputID = eval(inputID).controltovalidate;
        var offset = jQuery("#" + inputID).offset();
        var l = offset.left;
        var t = offset.top;
        var w = jQuery("#" + inputID).width();
        jQuery(this).css({ left: l + w, top: t });
    });
};
zj.validTipV = function (tipCss) {
    jQuery(tipCss).each(function () {
        //var inputID = jQuery(this).attr("controltovalidate");
        var inputID = jQuery(this).attr("id");
        inputID = eval(inputID).controltovalidate;
        var offset = jQuery("#" + inputID).offset();
        var l = offset.left;
        var t = offset.top;
        var h = jQuery("#" + inputID).height();
        jQuery(this).css({ left: l, top: t + h });
    });
};
zj.fixImageSize = function (filter, w, h) {
    if (filter == null) return;
    if (w == null) w = 700;
    if (h == null) h = 2000;

    jQuery(filter).find("img").bind("load", function () {
        var img = jQuery(this).get(0);
        var heightWidth = img.offsetHeight / img.offsetWidth;
        var widthHeight = img.offsetWidth / img.offsetHeight;

        if (img.offsetHeight > 1)
            if (img.readyState != "complete") {
                return false; //确保图片完全加载
            }
        if (img.offsetWidth > w) {
            img.width = w;
            img.height = w * heightWidth;
        }
        if (img.offsetHeight > h) {
            img.height = h;
            img.width = h * widthHeight;
        }
    });
};
/////////////////////cms////////////////////////
zj.checkPerm = function () {
    if (currentNode != "" && currentID != "") {
        var res = jQuery.ajax({
            type: "POST",
            dataType: "JSON",
            async: false,
            url: node_url,
            data: { action: "canview", node: currentNode, id: currentID }
        }).responseText;
        eval("res=" + res);
        if (res.code == 1) {
            return true;
        } else {
            alert("你所在的会员组无权查看该栏目");
            document.location.href = member_default_url;
            return false;
        }
    } else {
        alert("缺少参数:currentNode,currentID");
        return false;
    }
};
zj.addHits = function () {
    if (currentNode != "" && currentID != "") {
        jQuery.post(contentx_url, { action: "hits", node: currentNode, id: currentID });
    }
};
zj.addScore = function (id, score, method) {
    if (id == null || score == "") {
        alert("缺少参数id,score");
        return;
    }
    jQuery.ajax({
        type: "POST",
        dataType: "JSON",
        url: contentx_url,
        data: { action: "score", score: score, id: id, method: method },
        success: function (res) {
            if (res.code == 1) {
                alert("投票成功");
                document.location.reload();
            } else if (res.code == 2) {
                alert("已经评价过");
            } else {
                alert(res.msg);
            }
        }
    });
};
zj.loadLogin = function (elem) {
    var path = member_panel_url + "?" + Math.random();
    if (language == 'zh-cn') {
        path = appPath + path;
    } else {
        path = appPath + language + "/" + path;
    }
    jQuery(elem).load(path);
};
zj.login = function (txtname, txtpwd,txtverify, chkremeber, jump) {
    var name = jQuery(txtname).val();
    var pwd = jQuery(txtpwd).val();
    var min = 0;
    if (name == "" || pwd == "") {
        alert("请输入用户名和密码");
        return;
    }
    if (txtverify != "") {
        var code = jQuery(txtverify).val();
        if (code == "") {
            alert("请输入验证码");
            return;
        }
        if (!zj.verifyCode(code)) {
            alert("验证码错，请重新输入");
            return;
        }
    }
    if (chkremeber != "") {
        if (jQuery(chkremeber).attr("checked") == "true")
        {
            min = 24 * 60 * 10;
        }
    }
    jQuery.ajax({
        type: "POST",
        dataType: "JSON",
        url: member_url,
        data: { action: "login", username: name, password: pwd, expire: min },
        error: function (req, status, error) { alert(error.message); },
        success: function (res) {
            if (res.code == 1) {
                if (jump == "") {
                    document.location.reload();
                }
                else{
                    document.location.href = jump;
                }
            } else {
                alert(res.msg);
            }
        }
    });
};
zj.logout = function () {
    jQuery.ajax({
        type: "POST",
        dataType: "JSON",
        url: member_url,
        data: { action: "logout" },
        error: function (req, status, error) {
            alert(error.message);
        },
        success: function (res) {
            if (res.code == 1) {
                document.location.reload();
            } else {
                alert(res.msg);
            }
        }
    });
};
zj.validName = function (userName) {
    if (userName == "") return false;
    var res = jQuery.ajax({
        type: "POST",
        async: false,
        dataType: "JSON",
        url: member_url,
        data: { action: "validname", name: userName }
    }).responseText;
    eval("res=" + res);
    if (res.code == 1) {
        return true;
    } else if (res.code == 0) {
        return false;
    } else {
        alert(res.msg);
        return false;
    }
};
zj.validEmail = function (email) {
    if (email == "") return false;
    var res = jQuery.ajax({
        type: "POST",
        dataType: "JSON",
        async: false,
        url: member_url,
        data: { action: "validemail", email: email }
    }).responseText;
    eval("res=" + res);
    if (res.code == 1) {
        return true;
    } else if (res.code == 0) {
        return false;
    } else {
        alert(res.msg);
        return false;
    }
};
zj.validCard = function (code) {
    if (code == "") return false;
    var res = jQuery.ajax({
        type: "POST",
        async: false,
        dataType: "JSON",
        url: member_url,
        data: { action: "validcard", card: code }
    }).responseText;
    eval("res=" + res);
    if (res.code == 1) {
        return true;
    } else {
        alert(res.msg);
        return false;
    }
};
zj.verifyCode = function (code) {
    var u = verfiycode_url + "?action=verify&code=" + code;
    var res = jQuery.ajax({ url: u, async: false, cache: false }).responseText;
    if (res == "1") return true;
    return false;
};
zj.changeCode = function (elem) {
    jQuery(elem).attr("src", verfiycode_url + "?action=create&r=" + Math.random());
};
zj.setVerifyCode = function () {
    $(".verifyCode").attr("src", verfiycode_url + "?action=create&r=" + Math.random());
    $(".verifyCode").click(function () { zj.changeCode(this); });
    $(".verifyLink").click(function () { zj.changeCode($(this).prev()); });
}
zj.doGiftTran = function (giftID) {
    if (giftID == null) { giftID = getQuery("id"); }
    if (giftID == "") { alert("缺少参数giftid"); return; }

    jQuery.ajax({
        type: "POST",
        url: gift_tran_url,
        dataType: "JSON",
        data: { action: "buygift", "GiftID": giftID },
        success: function (res) {
            if (res.code == 1) {
                alert("兑换成功,请等待管理员处理!");
            } else {
                alert(res.msg);
            }
        },
        error: function (req, status, error) {
            alert("报歉,出现错误:" + error + ",请稍候再试!");
        }
    });
};
zj.doSearch = function (itemName) {
    var title = $("search_title").val();
    if (title == "") {
        alert("请输入" + itemName);
        return;
    }
    var url = zj.removeQuery("k");
    url += url.indexOf('?') > 0 ? "&" : "?";
    document.location.href = url + "k=" + title;
};
zj.goSearch = function (inputID) {
    var title = $(inputID).val();
    if (title == "") return;
    var url = search_url;
    if (language == "zh-cn") {
        url = appPath + search_url;
    } else {
        url = appPath + language + "/" + search_url;
    }
    document.location.href = url + "k=" + title;
};
zj.confirmDelete = function () {
    var ids = getSelectKeys();
    if (ids == "") {
        alert('请钩选要删除的信息');
        return false;
    }
    if (!confirm("确认要删除所有选中的信息及其相关信息吗？")) {
        return false;
    }
    return true;
};
zj.getSelectKeys = function () {
    var keys = '';
    jQuery("input[name=SelectKeys]").filter(":checked").each(
        function (item) {
            keys += this.value + ",";
        }
    );
    return keys;
};
zj.setCurrent = function (curStyle) {
    try {
        if (channelNode == "") channelNode = "zh-cn";
        $("#" + channelNode).addClass(curStyle);
    } catch (e) { }
};
