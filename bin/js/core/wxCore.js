/*
* 微信通用接口1.0.1
* @fatality
*/
var wxCore = /** @class */ (function () {
    function wxCore() {
        this.version = "1.0.1";
        /**
         * 带入参数
         */
        this.mLaunch = null;
        /**
         * 用户信息
         */
        this.mWeUser = {};
        /**
         * 手机参数
         */
        this.mPhone = {};
        /**
         * 微信版本号
         */
        this.mSDKVersion = "";
        /**
         * 是否是xp
         */
        this.iphoneX = false;
        /**
         * 回调函数代码
         */
        this.mCallBack = null;
        this.mHttpCall = null;
        //默认登陆界面
        this.loginView = null;
        //1=全屏显示
        //2=背景黑遮罩
        this.mLoginType = 1;
        this.mShowLogo = true;
        this.btnLogin = null;
        this.zOrder = 0;
        this.mFrist = true;
        this.mInit = false;
        this.mVideoAD = null;
        this.mNoVideo = false;
        wxCore.uo = this;
        this.mCallBack = new wxCallBack();
    }
    /**
     * 是否是XP机器
     */
    wxCore.prototype.IsXP = function () {
        return this.iphoneX;
    };
    /**
     * 获取微信SDK版本号
     */
    wxCore.prototype.wxVersion = function () {
        return this.mSDKVersion;
    };
    /**
     * 获取用户基本信息,openid,uid,name,avatar等非游戏数据
     */
    wxCore.prototype.getUser = function () {
        return this.mWeUser;
    };
    /**
     * 获取用户ID
     */
    wxCore.prototype.getUserID = function () {
        return Number(this.mWeUser['uid']);
    };
    /**
     * 获取详细手机信息
     */
    wxCore.prototype.phone = function () {
        return this.mPhone;
    };
    /**
     * 获取启动参数
     */
    wxCore.prototype.launch = function () {
        return this.mLaunch;
    };
    /**
     * @param type = 登录模式
     * @param showlogo = 是否显示logo(type == 1的时候生效)
     */
    wxCore.prototype.initWX = function (type, showlogo, zorder) {
        if (type === void 0) { type = 1; }
        if (showlogo === void 0) { showlogo = true; }
        if (zorder === void 0) { zorder = 0; }
        this.mPhone = wx.getSystemInfoSync();
        var str = this.mPhone['model'];
        if (str.indexOf("iPhone X") >= 0) {
            this.iphoneX = true;
        }
        this.mSDKVersion = this.mPhone['SDKVersion'];
        var option = wx.getLaunchOptionsSync();
        var res = {};
        res['query'] = option['query'];
        res['scene'] = option['scene'];
        res['shareTicket'] = option['shareTicket'];
        res['isSticky'] = option['isSticky'];
        if (res['query']['scene'] != null) {
            var scene = decodeURIComponent(res['query']['scene']);
            var params = scene.split("&");
            for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var keys = param.split("=");
                if (keys.length == 2)
                    res['query'][keys[0]] = keys[1];
            }
        }
        this.zOrder = zorder;
        this.mLaunch = res;
        this.mLoginType = type;
        this.mShowLogo = showlogo;
        if (this.mCallBack.onBefore() == true) {
            this.showLoading();
        }
        Laya.timer.callLater(this, this.check);
    };
    wxCore.prototype.initWeb = function (zorder) {
        if (zorder === void 0) { zorder = 0; }
        this.zOrder = zorder;
        if (this.mCallBack.onBefore() == true) {
            this.showLoading();
        }
    };
    wxCore.prototype.showLoading = function () {
        if (this.loginView == null) {
            this.loginView = new ui.wx.loginUI();
            this.loginView.height = Laya.stage.height;
            // this.loginView.bk.y = (Laya.stage.height - 1624)/2;
            this.loginView.bk.height = Laya.stage.height;
            this.loginView.name = "loginCore";
            this.loginView.zOrder = this.zOrder;
            this.loginView.pos(0, 0);
            Laya.stage.addChild(this.loginView);
        }
        Laya.timer.callLater(this.mCallBack, this.mCallBack.onShow);
    };
    wxCore.prototype.clear = function () {
        if (this.loginView != null) {
            this.loginView.visible = false;
            this.loginView.removeSelf();
        }
        this.loginView = null;
        Laya.loader.clearRes("login/fr_bk.jpg", false);
        if (this.btnLogin != null) {
            wxCore.uo.btnLogin.destroy();
        }
    };
    /**
     * 获取登录界面的登录按钮
     */
    wxCore.prototype.loginBtn = function () {
        return null;
    };
    /**
     * 获取登录界面的logo图片
     */
    wxCore.prototype.loginLogo = function () {
        return null;
    };
    /**
     * 获取登录界面的背景图片
     */
    wxCore.prototype.logoinBk = function () {
        return this.loginView.bk;
    };
    wxCore.prototype.showLoginBtn = function () {
        console.log("showLoginBtn");
        if (this.btnLogin != null)
            return;
        var w = 0;
        var h = 0;
        var left = 0;
        var top = 0;
        var btn = "";
        if (this.mLoginType == 1) {
        }
        else {
        }
        this.btnLogin = wx.createUserInfoButton({
            type: 'image',
            withCredentials: false,
            image: btn,
            style: {
                left: left,
                top: top,
                width: w,
                height: h
            }
        });
        this.btnLogin.show();
        this.btnLogin.onTap(function (res) {
            if (typeof (res['userInfo']) == "undefined") {
                wx.showToast({ title: "游戏需要您授权头像和用户名信息!",
                    icon: "success",
                    image: "",
                    duration: 2000
                });
                return;
            }
            wxCore.uo.btnLogin.destroy();
            wxCore.uo.initUser(res);
            wxCore.uo.btnLogin = null;
        });
    };
    wxCore.prototype.check = function () {
        wx.checkSession({
            success: function (res) {
                console.log("checkSession ok");
                wxCore.uo.login();
            },
            fail: function (res) {
                console.log("checkSession fail");
                wx.removeStorageSync("user");
                wxCore.uo.login();
            }
        });
    };
    /**
     * 重新执行登录流程
     */
    wxCore.prototype.reLogin = function () {
        wx.removeStorageSync("user");
        this.login();
    };
    wxCore.prototype.login = function () {
        var checked = true;
        var user = wx.getStorageSync("user");
        if (typeof (user) == "object") {
            var openid = user['openid'];
            if (openid == "" || openid == null)
                checked = false;
            if (user['uid'] == "" || user['uid'] == null || Number(user['uid']) < 10000)
                checked = false;
        }
        else
            checked = false;
        if (checked) {
            wxCore.uo.mWeUser = user;
            wxCore.uo.checkCode("");
        }
        else {
            wx.login({
                success: function (res) {
                    wxCore.uo.checkCode(res.code);
                },
                fail: function (res) {
                    console.log("login fail,try again");
                    Laya.timer.once(1000, wxCore.uo, wxCore.uo.login);
                }
            });
        }
    };
    /**
     * 用户登陆接口，如果用户不存在，创建用户
     * master = 推荐用户
     * agentid= 初始渠道编号
     * adid   = 广告渠道编号
     * @param code
     */
    wxCore.prototype.checkCode = function (code) {
        function onResult(ret) {
            console.log(ret);
            if (ret['code'] == 0) {
                if (wxCore.uo.mWeUser != null && wxCore.uo.mWeUser['uid'] == ret['uid']) {
                    if (wxCore.uo.mWeUser['openid'] != ret['openid']) {
                        Laya.timer.once(100, wxCore.uo, wxCore.uo.reLogin);
                        return;
                    }
                }
                else {
                    wxCore.uo.mWeUser = {};
                    wxCore.uo.mWeUser['openid'] = ret['openid'];
                    wxCore.uo.mWeUser['uid'] = Number(ret['uid']);
                }
                if (wxCore.uo.mCallBack.onLogin(wxCore.uo.mWeUser, ret) == true)
                    wxCore.uo.getUserInfo();
                else {
                    wxCore.uo.init();
                }
            }
            else {
                Laya.timer.once(1000, wxCore.uo, wxCore.uo.reLogin);
            }
        }
        var params = [];
        params['code'] = code;
        if (code == "")
            params['uid'] = wxCore.uo.mWeUser['uid'];
        if (typeof (this.mLaunch['query']['uid']) != "undefined")
            params['master'] = this.mLaunch['query']['uid'];
        if (typeof (this.mLaunch['query']['agentid']) != "undefined")
            params['agentid'] = this.mLaunch['query']['agentid'];
        if (typeof (this.mLaunch['query']['adid']) != "undefined")
            params['adid'] = this.mLaunch['query']['adid'];
        params['ver'] = this.mCallBack.version();
        this.server(wxCallBack.mIF['login'], params, onResult);
    };
    wxCore.prototype.getUserInfo = function () {
        if (this.mLoginType == 2) {
            wxCore.uo.onEnter(null, this.mLaunch);
            wxCore.uo.init();
            return;
        }
        wx.getUserInfo({
            withCredentials: false,
            lang: "zh_CN",
            success: function (res) {
                console.log(res);
                wxCore.uo.initUser(res);
            },
            fail: function (res) {
                console.log(res);
                if (wxCore.uo.mSDKVersion >= "2.0.1")
                    wxCore.uo.showLoginBtn();
                else {
                    wxCore.uo.wxAuthorize();
                    // wxCore.uo.openSeting();
                }
            }
        });
    };
    /* 低于2.0.1版本的用户执行微信授权操作 */
    wxCore.prototype.wxAuthorize = function () {
        wx.authorize({
            scope: 'scope.userInfo',
            success: function (res) {
                wxCore.uo.getUserInfo();
            },
            fail: function (res) {
                wxCore.uo.openSeting();
            }
        });
    };
    wxCore.prototype.openSeting = function () {
        var _this = this;
        wx.showModal({
            title: '提示',
            content: '游戏需要您授权头像和用户名信息',
            showCancel: false,
            cancelText: '取消',
            confirmText: "确认",
            success: function (res) {
                wx.openSetting({
                    success: function (res) {
                        if (res.authSetting['scope.userInfo'] == false) {
                            wxCore.uo.openSeting();
                        }
                        else {
                            wxCore.uo.getUserInfo();
                        }
                    },
                    fail: function (res) {
                        _this.openSeting();
                    }
                });
            }
        });
    };
    wxCore.prototype.initUser = function (res) {
        var change = 0;
        var userInfo = res.userInfo;
        console.log(userInfo.avatarUrl, wxCore.uo.mWeUser['avatarUrl'], wxCore.uo.mWeUser['nickName'], userInfo.nickName);
        if (wxCore.uo.mWeUser['nickName'] != userInfo.nickName) {
            wxCore.uo.mWeUser['nickName'] = userInfo.nickName;
            change = 1;
        }
        var face = userInfo.avatarUrl;
        if (face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/') {
            face = face.substr(0, face.length - 2);
            face = face + "/132";
        }
        if (wxCore.uo.mWeUser['avatarUrl'] != face) {
            wxCore.uo.mWeUser['avatarUrl'] = face;
            change = 1;
        }
        wxCore.uo.mWeUser['gender'] = userInfo.gender; //性别 0：未知、1：男、2：女
        wxCore.uo.mWeUser['province'] = userInfo.province;
        wxCore.uo.mWeUser['city'] = userInfo.city;
        wxCore.uo.mWeUser['country'] = userInfo.country;
        if (change == 1)
            wxCore.uo.updateUserInfo();
        wx.setStorageSync("user", wxCore.uo.mWeUser);
        wxCore.uo.onEnter(null, this.mLaunch);
        wxCore.uo.init();
    };
    wxCore.prototype.onEnter = function (last, cur) {
        this.mCallBack.onEnterGame(this.mFrist, last, cur);
        this.mFrist = false;
    };
    wxCore.prototype.init = function () {
        if (this.mInit == false) {
            console.log("注册init");
            wx.onShow(this.wxShow);
            wx.onHide(this.wxHide);
            this.mInit = true;
        }
    };
    wxCore.prototype.wxShow = function (option) {
        //默认隐藏登陆按钮
        console.log("进入:" + (new Date().getTime()));
        console.log(option);
        var res = {};
        res['query'] = option['query'];
        res['scene'] = option['scene'];
        res['shareTicket'] = option['shareTicket'];
        res['isSticky'] = option['isSticky'];
        if (res['query']['scene'] != null) {
            var scene = decodeURIComponent(res['query']['scene']);
            var params = scene.split("&");
            for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var keys = param.split("=");
                if (keys.length == 2)
                    res['query'][keys[0]] = keys[1];
            }
        }
        if (wxCore.uo.mFrist == true) {
            wxCore.uo.mLaunch = res;
            wxCore.uo.getUserInfo();
            return;
        }
        else
            var lastLaunch = wxCore.uo.mLaunch;
        wxCore.uo.mLaunch = res;
        wxCore.uo.onEnter(lastLaunch, res);
        wx.hideLoading({});
    };
    wxCore.prototype.wxHide = function (option) {
        wxCore.uo.mCallBack.onHideGame();
        console.log("退出:" + (new Date().getTime()));
        console.log(option);
    };
    wxCore.prototype.updateUserInfo = function () {
        function onResult(ret) {
            console.log("updateUserInfo..ok");
        }
        var params = {};
        params['uid'] = wxCore.uo.mWeUser['uid'];
        params['name'] = Base64.encodeURI(this.mWeUser['nickName']);
        params['avatar'] = Base64.encodeURI(this.mWeUser['avatarUrl']);
        params['gender'] = wxCore.uo.mWeUser['gender'];
        if (wxCore.uo.mWeUser['province'] != null && wxCore.uo.mWeUser['province'] != "")
            params['province'] = wxCore.uo.mWeUser['province'];
        if (wxCore.uo.mWeUser['city'] != null && wxCore.uo.mWeUser['city'] != "")
            params['city'] = wxCore.uo.mWeUser['city'];
        this.server(wxCallBack.mIF['userinfo'], params, onResult);
    };
    wxCore.prototype.server = function (rpc, params, callback, ecbck) {
        if (ecbck === void 0) { ecbck = null; }
        function onResult(e) {
            var ret = null;
            if (typeof (e) == "string")
                ret = util.getJSON(e);
            else
                ret = util.getJSON(wxCore.uo.mHttpCall.data);
            if (callback != null)
                callback(ret);
            wxCore.uo.mHttpCall = null;
        }
        function onHttpRequestError(e) {
            if (ecbck != null)
                ecbck();
            else
                wxCore.uo.onHttpRequestError(e);
        }
        this.mHttpCall = new Laya.HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this, onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, onHttpRequestError);
        var str = util.getServer() + rpc['url'] + util.getUrlParams(params, rpc['key']);
        console.log(str);
        this.mHttpCall.send(str, null, 'get', 'text');
    };
    wxCore.prototype.onHttpRequestError = function (e) {
        wx.hideLoading({});
    };
    /**
     * 广告
     */
    wxCore.prototype.initVideoAD = function (key) {
        if (key == "") {
            this.mNoVideo = true;
            return;
        }
        if (this.mVideoAD == null) {
            this.mVideoAD = wx.createRewardedVideoAd({ adUnitId: key });
            this.mVideoAD.onError(function (err) {
                console.log(err);
                if (err.errCode == 1004) {
                    wxCore.uo.mNoVideo = true;
                }
            });
        }
    };
    wxCore.prototype.haevVideo = function () {
        if (this.mVideoAD == null || this.mNoVideo == true)
            return false;
        return true;
    };
    wxCore.prototype.loadingVideo = function (callback) {
        if (this.mVideoAD == null || wxCore.uo.mNoVideo == true) {
            if (callback != null)
                callback(false);
            return false;
        }
        this.mVideoAD.load().then(function () {
            if (callback != null)
                callback(true);
        }).catch(function (err) {
            console.log("没有拉到广告");
            console.log(err.errMsg);
            if (callback != null)
                callback(false);
        });
        return true;
    };
    wxCore.prototype.showVideoAD = function (callback) {
        if (this.mVideoAD == null || wxCore.uo.mNoVideo == true) {
            if (callback != null)
                callback(false);
            return false;
        }
        else {
            wxCore.uo.mVideoAD.show();
            this.mVideoAD.offClose(null);
            this.mVideoAD.onClose(function (res) {
                if (res && res.isEnded || res === undefined) {
                    if (callback != null)
                        callback(true);
                }
                else {
                    if (callback != null)
                        callback(false);
                }
            });
            return true;
        }
    };
    /**
     * wxCore入口，替代that,_this
     */
    wxCore.uo = null;
    return wxCore;
}());
//# sourceMappingURL=wxCore.js.map