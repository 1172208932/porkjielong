/*
* 微信通用接口1.0.1
* @fatality
*/

// 在 index.html中 <script type="text/javascript" src="ultima/base64.min.js"></script>
declare class Base64 {
    static encode(str:string):string ;
    static decode(str:string):string ;
    static encodeURI(str:string):string;
}


class wxCore{
    /**
     * wxCore入口，替代that,_this
     */
    public static uo: wxCore = null;
    public version:string = "1.0.1";
    /**
     * 带入参数
     */
    public mLaunch:Object = null;
    /**
     * 用户信息
     */
    public mWeUser:Object = {};
    /**
     * 手机参数
     */
    public mPhone:Object = {};
    /**
     * 微信版本号
     */
    private mSDKVersion:string = "";
    /**
     * 是否是xp
     */
    private iphoneX:boolean = false;

    /**
     * 回调函数代码
     */
    public mCallBack:wxCallBack = null;

    private mHttpCall:Laya.HttpRequest = null;

    //默认登陆界面
    private loginView:ui.wx.loginUI = null;
    //1=全屏显示
    //2=背景黑遮罩
    private mLoginType:number = 1;
    private mShowLogo:boolean = true;

    private btnLogin:any = null;
    private zOrder:number = 0;

    private mFrist:boolean = true;
    private mInit:boolean = false;

    public mVideoAD:any = null;
    public mNoVideo:boolean = false;

    /**
     * 是否是XP机器
     */
    public IsXP():boolean
    {
        return this.iphoneX;
    }
    /**
     * 获取微信SDK版本号
     */
    public wxVersion():string
    {
        return this.mSDKVersion;
    }
    /**
     * 获取用户基本信息,openid,uid,name,avatar等非游戏数据
     */
    public getUser():Object
    {
        return this.mWeUser;
    }
    /**
     * 获取用户ID
     */
    public getUserID():number
    {
        return Number(this.mWeUser['uid']);
    }
    /**
     * 获取详细手机信息
     */
    public phone():Object
    {
        return this.mPhone;
    }
    /**
     * 获取启动参数
     */
    public launch():Object
    {
        return this.mLaunch;
    }

    constructor(){
        wxCore.uo = this;
        this.mCallBack = new wxCallBack();
    }
    /**
     * @param type = 登录模式
     * @param showlogo = 是否显示logo(type == 1的时候生效)
     */
    public initWX(type:number = 1,showlogo:boolean = true,zorder:number=0):void
    {
        this.mPhone = wx.getSystemInfoSync();
        var str:string = this.mPhone['model'];
        if(str.indexOf("iPhone X") >= 0)
        {
            this.iphoneX = true;
        }
        this.mSDKVersion = this.mPhone['SDKVersion'];
		var option = wx.getLaunchOptionsSync();

        var res = {};
        res['query'] = option['query'];
        res['scene'] = option['scene'];
        res['shareTicket'] = option['shareTicket'];
        res['isSticky'] = option['isSticky'];
        if(res['query']['scene'] != null)
        {
            var scene = decodeURIComponent(res['query']['scene']);
            var params:Array<string> = scene.split("&");
            for(var i=0;i<params.length;i++)
            {
                var param:string = params[i];
                var keys:Array<string> = param.split("=");
                if(keys.length == 2)
                    res['query'][keys[0]] = keys[1];
            }
        }
        this.zOrder = zorder;
        this.mLaunch = res;
        this.mLoginType = type;
        this.mShowLogo = showlogo;
        if(this.mCallBack.onBefore() == true)
        {
            this.showLoading();
        }
        Laya.timer.callLater(this,this.check);
    }
    public initWeb(zorder:number = 0):void
    {
        this.zOrder = zorder;
        if(this.mCallBack.onBefore() == true)
        {
            this.showLoading();
        }
    }
    private showLoading():void
    {
        if(this.loginView == null)
        {
            this.loginView = new ui.wx.loginUI();
            this.loginView.height= Laya.stage.height;
            // this.loginView.bk.y = (Laya.stage.height - 1624)/2;
            this.loginView.bk.height = Laya.stage.height;

            this.loginView.name = "loginCore";
            this.loginView.zOrder = this.zOrder;
            this.loginView.pos(0,0);
            Laya.stage.addChild(this.loginView);
        }
        Laya.timer.callLater(this.mCallBack,this.mCallBack.onShow);
    }

    public clear():void
    {
        if(this.loginView != null)
        {
            this.loginView.visible = false;
            this.loginView.removeSelf();
        }
        this.loginView = null;
        Laya.loader.clearRes("login/fr_bk.jpg",false);

        if(this.btnLogin != null)
        {
            wxCore.uo.btnLogin.destroy();
        }        
    }
    /**
     * 获取登录界面的登录按钮
     */
    public loginBtn():Laya.Image
    {
        return null;
    }
    /**
     * 获取登录界面的logo图片
     */
    public loginLogo():Laya.Image
    {
        return null;
    }
    /**
     * 获取登录界面的背景图片
     */
    public logoinBk():Laya.Image
    {
        return this.loginView.bk;
    }

    private showLoginBtn():void
    {
        console.log("showLoginBtn");
        if(this.btnLogin != null)
            return;

        var w:number = 0;
        var h:number = 0;
        var left:number = 0;
        var top:number  = 0;
        var btn:string = "";

        if(this.mLoginType == 1)
        {
        }
        else
        {
        }

        this.btnLogin = wx.createUserInfoButton({
            type: 'image',
            withCredentials:false,
            image:btn,
            style: {
                left: left,
                top: top,
                width: w,
                height: h
            }            
        });
        this.btnLogin.show();
        this.btnLogin.onTap(function(res){
            if(typeof(res['userInfo']) == "undefined")
            {
                wx.showToast({title:"游戏需要您授权头像和用户名信息!",
                    icon:"success",
                    image:"",
                    duration:2000
                });  
                return;
            }
            wxCore.uo.btnLogin.destroy();
            wxCore.uo.initUser(res);
            wxCore.uo.btnLogin = null;

        });            
    }

    private check():void
    {
        wx.checkSession({
            success:function(res)
            {
                console.log("checkSession ok");
                wxCore.uo.login();
            },
            fail:function(res)
            {
                console.log("checkSession fail");
                wx.removeStorageSync("user");
                wxCore.uo.login();
            }              
        });
    }    
    /**
     * 重新执行登录流程
     */
    public reLogin():void
    {
        wx.removeStorageSync("user");
        this.login();
    }
    public login():void
    {
        var checked:boolean = true;
        var user = wx.getStorageSync("user");
        if(typeof(user) == "object")
        {
            var openid:string = user['openid'];
            if(openid == "" || openid == null)
                checked = false;
            if(user['uid'] == "" || user['uid'] == null || Number(user['uid']) < 10000)
                checked = false;
        }
        else
            checked = false;

        if(checked)
        {
            wxCore.uo.mWeUser = user;
            wxCore.uo.checkCode("");
        }
        else
        {
            wx.login({
                success:function(res)
                {
                    wxCore.uo.checkCode(res.code);
                },
                fail:function(res)
                {
                    console.log("login fail,try again");
                    Laya.timer.once(1000,wxCore.uo,wxCore.uo.login);
                }            
            });             
        }        
    }
    /**
     * 用户登陆接口，如果用户不存在，创建用户
     * master = 推荐用户
     * agentid= 初始渠道编号
     * adid   = 广告渠道编号
     * @param code 
     */
    private checkCode(code:string):void
    {
        function onResult(ret:Object): void 
        {
            console.log(ret);
            if(ret['code'] == 0)
            {
                if(wxCore.uo.mWeUser != null && wxCore.uo.mWeUser['uid'] == ret['uid'])
                {
                    if (wxCore.uo.mWeUser['openid'] != ret['openid']){
                        Laya.timer.once(100,wxCore.uo,wxCore.uo.reLogin);
                        return ;
                    }
                }
                else
                {
                    wxCore.uo.mWeUser = {};
                    wxCore.uo.mWeUser['openid'] = ret['openid'];
                    wxCore.uo.mWeUser['uid'] = Number(ret['uid']);
                }
                if(wxCore.uo.mCallBack.onLogin(wxCore.uo.mWeUser,ret) == true)
                    wxCore.uo.getUserInfo();
                else{
                    wxCore.uo.init();
                }             
            }
            else
            {
                Laya.timer.once(1000,wxCore.uo,wxCore.uo.reLogin);
            }
        }        
        var params:Object = [];
        params['code'] = code;
        if(code == "")
            params['uid'] = wxCore.uo.mWeUser['uid'];
        if(typeof(this.mLaunch['query']['uid']) != "undefined")
            params['master'] = this.mLaunch['query']['uid'];
        if(typeof(this.mLaunch['query']['agentid']) != "undefined")
            params['agentid'] = this.mLaunch['query']['agentid'];
        if(typeof(this.mLaunch['query']['adid']) != "undefined")
            params['adid'] = this.mLaunch['query']['adid'];
        params['ver'] = this.mCallBack.version();
        this.server(wxCallBack.mIF['login'],params,onResult);        
    }

    public getUserInfo():void
    {
        if(this.mLoginType == 2)
        {
            wxCore.uo.onEnter(null,this.mLaunch);
            wxCore.uo.init();
            return;
        }
        wx.getUserInfo({
            withCredentials:false,
            lang:"zh_CN",
            success:function(res){
                console.log(res);
                wxCore.uo.initUser(res);
            },
            fail:function(res)
            {
                console.log(res);
                if(wxCore.uo.mSDKVersion >= "2.0.1")
                    wxCore.uo.showLoginBtn();
                else
                {
                    wxCore.uo.wxAuthorize();
                    // wxCore.uo.openSeting();
                }
            }
        });                
    }

    /* 低于2.0.1版本的用户执行微信授权操作 */
    public wxAuthorize():void {
        wx.authorize({
            scope:'scope.userInfo',
            success:function(res) {
                wxCore.uo.getUserInfo();
            },
            fail:function(res) {
                wxCore.uo.openSeting();
            }            
        });
    }
    
    public openSeting():void
    {
        let _this = this;
        wx.showModal({
            title: '提示',
            content: '游戏需要您授权头像和用户名信息',
            showCancel: false,
            cancelText:'取消',
            confirmText:"确认",
            success:function(res){
                wx.openSetting({
                    success:function(res){
                        if(res.authSetting['scope.userInfo'] == false)
                        {
                            wxCore.uo.openSeting();
                        }
                        else
                        {
                            wxCore.uo.getUserInfo();
                        }
                    },
                    fail:function(res){
                        _this.openSeting();
                    }            
                });        
            }
        });
    }    

    public initUser(res):void
    {
        var change:number = 0;
        var userInfo = res.userInfo;
        console.log(userInfo.avatarUrl,wxCore.uo.mWeUser['avatarUrl'],wxCore.uo.mWeUser['nickName'],userInfo.nickName);

        if(wxCore.uo.mWeUser['nickName'] != userInfo.nickName)
        {
            wxCore.uo.mWeUser['nickName'] = userInfo.nickName;
            change = 1;
        }
        var face:string = userInfo.avatarUrl;
        if(face.charAt(face.length - 1) == '0' && face.charAt(face.length - 2) == '/')
        {
            face = face.substr(0,face.length - 2);
            face = face + "/132";
        }
        if(wxCore.uo.mWeUser['avatarUrl'] != face)
        {
            wxCore.uo.mWeUser['avatarUrl'] = face;
            change = 1;
        }

        wxCore.uo.mWeUser['gender'] = userInfo.gender; //性别 0：未知、1：男、2：女
        wxCore.uo.mWeUser['province'] = userInfo.province;
        wxCore.uo.mWeUser['city'] = userInfo.city;
        wxCore.uo.mWeUser['country'] = userInfo.country;
        if(change == 1)
            wxCore.uo.updateUserInfo();
        wx.setStorageSync("user",wxCore.uo.mWeUser);

        wxCore.uo.onEnter(null,this.mLaunch);
        wxCore.uo.init();
    }
    private onEnter(last:Object,cur:Object):void
    {
        this.mCallBack.onEnterGame(this.mFrist,last,cur);
        this.mFrist = false;
    }
    private init():void
    {
        if(this.mInit == false)
        {
            console.log("注册init");
            wx.onShow(this.wxShow);
            wx.onHide(this.wxHide);
            this.mInit = true;
        }
    }
    public wxShow(option):void
    {
        //默认隐藏登陆按钮
        console.log("进入:" + (new Date().getTime()));
        console.log(option);
        var res = {};
        res['query'] = option['query'];
        res['scene'] = option['scene'];
        res['shareTicket'] = option['shareTicket'];
        res['isSticky'] = option['isSticky'];
        if(res['query']['scene'] != null)
        {
            var scene = decodeURIComponent(res['query']['scene']);
            var params:Array<string> = scene.split("&");
            for(var i=0;i<params.length;i++)
            {
                var param:string = params[i];
                var keys:Array<string> = param.split("=");
                if(keys.length == 2)
                    res['query'][keys[0]] = keys[1];
            }
        }
        if(wxCore.uo.mFrist == true)
        {
            wxCore.uo.mLaunch = res;
            wxCore.uo.getUserInfo();
            return;
        }
        else
        	var lastLaunch = wxCore.uo.mLaunch;
            wxCore.uo.mLaunch = res;
            wxCore.uo.onEnter(lastLaunch, res);
        wx.hideLoading({});
    }
    public wxHide(option):void
    {
        wxCore.uo.mCallBack.onHideGame(); 
        console.log("退出:" + (new Date().getTime()));
        console.log(option);
    }

    public updateUserInfo():void
    {
        function onResult(ret:Object): void 
        {
            console.log("updateUserInfo..ok");
        }        

        let params:Object = {};
        params['uid'] = wxCore.uo.mWeUser['uid'];
        params['name'] = Base64.encodeURI(this.mWeUser['nickName']);
        params['avatar'] = Base64.encodeURI(this.mWeUser['avatarUrl']);
        params['gender'] = wxCore.uo.mWeUser['gender'];
        if(wxCore.uo.mWeUser['province'] != null && wxCore.uo.mWeUser['province'] != "")
            params['province'] = wxCore.uo.mWeUser['province'];
        if(wxCore.uo.mWeUser['city'] != null && wxCore.uo.mWeUser['city'] != "")
            params['city'] = wxCore.uo.mWeUser['city'];
        this.server(wxCallBack.mIF['userinfo'],params,onResult);        
    }
 


    private server(rpc:Object,params:any,callback:Function,ecbck:Function = null):void
    {
        function onResult(e: any): void 
        {
            let ret:Object = null;
            if(typeof(e) == "string")
                ret = util.getJSON(e);
            else    
                ret = util.getJSON(wxCore.uo.mHttpCall.data);
            if(callback != null)
                callback(ret);
            wxCore.uo.mHttpCall = null;
        }
        function onHttpRequestError(e: any): void 
        {
            if(ecbck != null)
                ecbck();
            else
                wxCore.uo.onHttpRequestError(e);    
        }

        this.mHttpCall = new Laya.HttpRequest();
        this.mHttpCall.once(Laya.Event.COMPLETE, this,onResult);
        this.mHttpCall.once(Laya.Event.ERROR, this, onHttpRequestError);

        let str = util.getServer() + rpc['url'] + util.getUrlParams(params,rpc['key']);
        console.log(str);
        this.mHttpCall.send(str, null, 'get', 'text');
    }    
    private onHttpRequestError(e: any): void 
    {
        wx.hideLoading({});     
    }   

    /**
     * 广告
     */  
    public initVideoAD(key:string):void  
    {
        if(key == "")
        {
            this.mNoVideo = true;
            return;
        }
        if(this.mVideoAD == null)
        {
            this.mVideoAD = wx.createRewardedVideoAd({adUnitId:key});
            this.mVideoAD.onError(err=>{
                console.log(err);
                if(err.errCode == 1004)
                {
                    wxCore.uo.mNoVideo = true;
                }
            });
        }
    }
    public haevVideo():boolean
    {
        if(this.mVideoAD == null || this.mNoVideo == true)
            return false;
        return true;
    }
    public loadingVideo(callback:Function):boolean
    {
        if(this.mVideoAD == null || wxCore.uo.mNoVideo == true)
        {
            if(callback != null)
                callback(false);
            return false;
        }
        this.mVideoAD.load().then(()=>{
            if(callback != null)
                callback(true);
        }).catch(err =>{
            console.log("没有拉到广告");
            console.log(err.errMsg);
            if(callback != null)
                callback(false);
        });
        return true;
    }
    public showVideoAD(callback:Function):boolean
    {
        if(this.mVideoAD == null || wxCore.uo.mNoVideo == true)
        {
            if(callback != null)
                callback(false);
            return false;
        }
        else
        {
            wxCore.uo.mVideoAD.show();
            this.mVideoAD.offClose(null);
            this.mVideoAD.onClose(res =>{
                if (res && res.isEnded || res === undefined) 
                {
                    if(callback != null)
                        callback(true);
                }
                else
                {
                    if(callback != null)
                        callback(false);
                }
            });
            return true;
        }
    }
}