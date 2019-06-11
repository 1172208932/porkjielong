/* 接口类 */
import HttpRequest = Laya.HttpRequest;

class wxMinPro {
    // 服务接口配置
    public mCmd = {
        "Launch": "1.0.1/jl/Lauch?",            // 登录服务器
        "querycards": "1.0.1/jl/querycards?",       // 获取复活卡数量接口
        "rank": "1.0.1/jl/rank?",             // 世界排行接口
        "mymark": "1.0.1/jl/mymark?",           // 获取最高纪录接口
        "AddMyCard": "1.0.1/jl/AddMyCard?",        // 给自己加复活卡接口
        "AddCard": "1.0.1/jl/addcard?",          // 给好友加复活卡接口
        "report": "1.0.1/jl/report?",           // 汇报成绩接口
        "ADHit": "1.0.1/jl/data?",             // 统计更多游戏的点击量
        "BtnTotle": "1.0.1/jl/BtnTotle?",        // 统计首页下方和侧边栏游戏的点击量
        "challenge": "1.0.1/jl/challenge?",        // 接力接口
        "ad": "1.0.1/jl/ad?"                // 广告曝光接口
    };
    public changeIconTime: any;             //icon切换时间    
    public gameListNum: any;             //猜你喜欢数量
    public ofStartList: any;             //首页猜你喜欢开关
    public ofResultList: any;            //结算页猜你喜欢开关
    public ofRewardList: any;            //宝箱猜你喜欢开关
    public iconBtn: any;            //宝箱猜你喜欢开关
    public jumpBtn: any;            //宝箱猜你喜欢开关

    public ofScoreList: any;             //分数猜你喜欢开关
    public statUrl: string = '';                 //统计url
    public showBigBanner: any;
    public moveTime: any
    // public mLaunch: Object = null;
    public PointFirst: any;                   // 是否是新用户 


    public isFirstLogin: boolean = true;          // 是否是第一次登录服务器 wx.onshow时也会登录服务器，只是更新下数据。
    public mUID: number = 0;                      // 玩家的id
    public mOpenid: string = "";
    public mVersion: number = 1002;               // 每次审核之前这个值+1
    public mCards: number = 0;                    // 复活卡数量
    public mMyRank: number = 0;
    public fhOnoff: number = 0;                   // 复活开关 0-关 1-开
    public mHttpCall: HttpRequest = null;
    public mrelayID: number = 0;                  // 当前接力的id
    public mShareID: number = 0;                  // 当前分享的id
    public mChallenge: Object = null;             // 保存好友接力的数据
    public mMarks: Array<number> = [0, 0, 0, 0];     // mMarks[0]最佳记录
    public videoAd: any = null;                   // 视频广告
    public adBanner: any = null;                  // banner广告
    public gameClub: any = null;                  // 微信游戏圈按钮
    public shareUrl: Array<Object> = [];          // 分享点位信息
    public wxADUrl: Array<Object> = [];           // 保存广告信息
    public OnOff: Array<Object> = [];             // 各种开关信息数组
    public games_box: Array<Object> = [];
    public gameObj: Object = null;                // 首页、结果页展示的更多小游戏
    // 外部流量导入 增加参数
    public mReturnAppid: string = "";
    public mReturnUrl: string = "";
    // 默认广告相关
    public mCustomBannerAdList: Array<Object> = [];
    private mIsInvokeRemoveCustomBannerAd: boolean = false; // 是否调用隐藏banner
    private mCustomBanner: Laya.Image = null; // 默认banner
    // 暂时无用的变量
    public mADKeep: number = 0;
    public mUser: Object = {};
    public mQR: number = 0;
    public mQRs: Object = {};

    /* 构造函数 */
    constructor() {

    }

    /* 获取adid */
    public getADID(): number {
        var adid = 0;
        if (typeof (wxCore.uo.launch["query"]) != "undefined" && typeof (wxCore.uo.launch["query"]["adid"]) != "undefined") {
            adid = Number(wxCore.uo.launch["query"]["adid"]);
        }
        if (typeof (wxCore.uo.launch["query"]) != "undefined" && typeof (wxCore.uo.launch["query"]["channel"]) != "undefined") {
            adid = Number(wxCore.uo.launch["query"]["channel"]);
        }
        return adid;
    }

    /* 登录服务器 */
    public onLaunch(agentid = 0, secen = 0): void {
        console.log("登录服务器...");
        if (this.isFirstLogin) {
            this.showLoading();
        }
        let params: Object = [];
        params["uid"] = wxCore.uo.getUserID();
        params["ver"] = this.mVersion;
        params["agentid"] = agentid;
        params["secen"] = secen;
        params["platform"] = Laya.Browser.onIOS ? 2 : 1;
        params["adid"] = this.getADID();
        // surl-记录分享链接的点击量
        if (typeof (wxCore.uo.mLaunch["query"]["surl"]) != "undefined") {
            params["surl"] = Number(wxCore.uo.mLaunch["query"]["surl"]);
        }
        if (typeof (wxCore.uo.mLaunch['query']['uid']) != "undefined") {
            params['seuid'] = wxCore.uo.mLaunch['query']['uid'];
        }
        this.server(params, "Launch", new Laya.Handler(this, this.onLaunchSuccess));
    }
    /* 统计首页下方和侧边栏游戏的点击量 */
    public reportGameHit(pos: number, gameid: number): void {
        let params: Object = [];
        params["uid"] = GameMain.app.mWX.mUID;
        params["pos"] = pos;
        params["gameid"] = gameid;
        GameMain.app.mWX.server(params, "BtnTotle", null);
    }
    /* 登录服务器成功 */
    public onLaunchSuccess(ret: any): void {
        console.log("登录服务器成功：", ret);
        // 组装数据
        if (Number(ret["code"]) == 0) {
            Laya.Browser.window.sharedCanvas.width = Laya.stage.width;
            Laya.Browser.window.sharedCanvas.height = Laya.stage.height;
            this.fhOnoff =Number(ret["fh_onoff"]); // 复活开关
            // 1
            
            //  
            GameMain.app.mWX.OnOff = ret["on_off"]; // 各种开关信息
            if (ret['nowday'] == ret['regday']) {
                GameMain.app.mWX.PointFirst = '新用户'
            } else {
                GameMain.app.mWX.PointFirst = '老用户'
            }
            // GameMain.app.mWX.moveTime = Number(JSON.parse(GameMain.app.mWX.getParam('of_move_time'))["time"])
            // GameMain.app.mWX.changeIconTime = JSON.parse(GameMain.app.mWX.getParam('of_icon_time'))["time"]      //猜你喜欢数量
            // GameMain.app.mWX.gameListNum = JSON.parse(GameMain.app.mWX.getParam('of_guess_like'))["number"]      //猜你喜欢数量
            // GameMain.app.mWX.showBigBanner = JSON.parse(GameMain.app.mWX.getParam('of_banner_show'))["is_big"]      //猜你喜欢数量            
            // GameMain.app.mWX.ofStartList = GameMain.app.mWX.getValue('of_guess_like1')             //首页猜你喜欢开关
            // // GameMain.app.mWX.ofRewardList = GameMain.app.mWX.getValue('of_guess_like2')             //宝箱猜你喜欢开关
            // GameMain.app.mWX.ofScoreList = GameMain.app.mWX.getValue('of_guess_like2')               //分数猜你喜欢开关
            // GameMain.app.mWX.ofResultList = GameMain.app.mWX.getValue('of_guess_like3')             //结算页猜你喜欢开关   

            // GameMain.app.mWX.iconBtn = GameMain.app.mWX.getValue('of_icon_open')             //首页导流开关    
            // GameMain.app.mWX.jumpBtn = GameMain.app.mWX.getValue('of_jump_btn')             //首页平台按钮开关    


            // GameMain.app.mWX.statUrl = ret["dt_values"][0]['param'];
            // GameMain.app.mWX.games_box = ret["games_box"];
            this.shareUrl = ret["shareurl"]; // 分享点位
            this.wxADUrl = ret["wxadurl"]; // 广告信息
            GameMain.app.mWX.checkShareTime();
            // 成绩数组
            this.mMarks[0] = Number(ret['marks']['mark']);
            this.mMarks[1] = Number(ret['marks']['mark1']);
            this.mMarks[2] = Number(ret['marks']['mark2']);
            this.mMarks[3] = Number(ret['marks']['mark3']);
            // 保存默认广告
            this.mCustomBannerAdList = ret["games_ad"];
            // 是否是第一次登录服务器
            if (this.isFirstLogin) {
                console.log("第一次登录服务器");
                this.isFirstLogin = false;
                // 显示游戏首页
                GameMain.app.begin();
                // 显示首页的更多游戏
                // this.initMoreGame(GameMain.app.startView.moreGame, true);
                // 初始化视频广告
                // wxCore.uo.initVideoAD("adunit-70a9427baa48c548");
            }
            // 获取小程序返回的appid
            this.initReturn();
            // 检查是否是通过点击链接进入游戏的
            this.checkLink();
        } else {
            Laya.timer.once(1000, this, this.onLaunch);
        }
        wx.hideLoading({});
    }
    /* 获取param */
    public getParam(key: string): any {
        for (var i = 0; i < GameMain.app.mWX.OnOff.length; i++) {
            var obj: Object = GameMain.app.mWX.OnOff[i];
            if (obj["key"] == key) {
                return obj["param"]
            }
        }
    }
    /* 获取value */
    public getValue(key: string): number {
        for (var i = 0; i < GameMain.app.mWX.OnOff.length; i++) {
            var obj: Object = GameMain.app.mWX.OnOff[i];
            if (obj["key"] == key) {
                return Number(obj["value"])
            }
        }
    }
    /* 相应开关赋值 */
    public checkOnOff(key: string): number {
        // 总开关如果是关着的，直接 return false
        if (GameMain.app.mWX.fhOnoff == 0) {
            return 0;
        }
        // 总开关打开的情况下再判断相应的开关
        var onoff: number = 0;
        for (var i = 0; i < GameMain.app.mWX.OnOff.length; i++) {
            var obj: Object = GameMain.app.mWX.OnOff[i];
            if (key == obj["key"]) {
                onoff = Number(obj["value"])
            }
        }
        return onoff;
    }
    /* 处理分享时间 */
    public checkShareTime(): void {
        console.log("===", GameMain.app.mWX.OnOff.length);
        for (var i = 0; i < GameMain.app.mWX.OnOff.length; i++) {
            var obj: Object = GameMain.app.mWX.OnOff[i];
            if (obj["key"] == "of_share_time") {
                if (Number(obj["value"]) == 1) {
                    var param = String(obj["param"]);
                    console.log("*********** = ", param);
                    console.log("*********** = ", param.split(","));
                    GameMain.app.mShareTimeArray = param.split(",");
                    break;
                }
            }
        }
    }

    /* 检查是否是通过点击链接进入的游戏 */
    public checkLink(): void {
        // 点击道具礼包链接进入游戏 wxCore.uo.mLaunch["query"]["id"] > 0 :自己领卡 = 0:给别人加卡
        if (typeof (wxCore.uo.mLaunch["query"]["gift"]) != "undefined") {
            if (wxCore.uo.mLaunch["query"]["id"] > 0) {
                // this.addCardForMe(wxCore.uo.mLaunch["query"]["id"]);
            } else {
                GameMain.app.mWX.dealCards(wxCore.uo.mLaunch["shareTicket"]);
            }
        }
        // 点击群排名链接进入游戏
        if (wxCore.uo.mLaunch["query"]["id"] != null && Number(wxCore.uo.mLaunch["query"]["type"]) == 8) {
            // if (typeof (wxCore.uo.mLaunch["shareTicket"]) != "undefined" && wxCore.uo.mLaunch["shareTicket"] != "undefined" && wxCore.uo.mLaunch["shareTicket"] != "") {
            //     this.afterClickLink();
            //     GameMain.app.startView.queryGroupRank();
            // }
        }
        // // 点击接力链接进入游戏
        // if (wxCore.uo.mLaunch["query"]["id"] > 0 && Number(wxCore.uo.mLaunch["query"]["type"]) == 2) {
        //     this.afterClickLink();
        //     // 记录要接力那局游戏id
        //     this.mrelayID = wxCore.uo.mLaunch["query"]["id"];
        //     this.showRelay(false);
        // }
        // 判断进入游戏的场景（是否是从我的小程序进入的）
        if (wxCore.uo.mLaunch["scene"] == 1104) {
            // if (GameMain.app.getLocalInfo("isShowToMy") != "1") {
            //     GameMain.app.setLocalInfo("isShowToMy", "1");
            // }
        }
    }

    // /* 点击道具礼包，群排行，接力等链接进入游戏的操作 */
    // public afterClickLink(): void {
    //     GameMain.app.mPlayed = 0;
    //     GameMain.app.rebirth_video = 0;
    //     // 如果在游戏中，清除游戏。
    //     if (GameMain.app.gameView && GameMain.app.gameView.visible == true) {
    //         GameMain.app.gameClear();
    //     }
    //     // 隐藏接力界面
    //     if (GameMain.app.relayView && GameMain.app.relayView.visible == true) {
    //         GameMain.app.relayView.visible = false;
    //     }
    //     // 隐藏排行榜界面
    //     if (GameMain.app.rankView && GameMain.app.rankView.visible == true) {
    //         GameMain.app.rankView.visible = false;
    //         GameMain.app.rankView.removeOffScreen();
    //     }
    //     // 隐藏分数界面
    //     if (GameMain.app.scoreView && GameMain.app.scoreView.visible == true) {
    //         GameMain.app.scoreView.close("", false);
    //     }
    //     // 隐藏结果界面
    //     if (GameMain.app.resultView) {
    //         GameMain.app.resultView.visible = false;
    //         GameMain.app.resultView.removeOffScreen();
    //     }
    //     // 隐藏道具界面
    //     if (GameMain.app.propView && GameMain.app.propView.visible == true) {
    //         GameMain.app.propView.close();
    //     }
    //     // 隐藏互助礼界面
    //     if (GameMain.app.giftView && GameMain.app.giftView.visible == true) {
    //         GameMain.app.giftView.closeGift();
    //     }
    //     // 隐藏引导页
    //     if (GameMain.app.guideView && GameMain.app.guideView.visible == true) {
    //         GameMain.app.guideView.closeGuideView();
    //     }
    //     // 如果正在显示游戏盒子，要隐藏游戏盒子。
    //     MoreGame.CloseList();
    //     // 如果正在显示广告，隐藏广告。
    //     this.hideADBanner();
    // }

    /* 获取最新复活卡数量 */
    public getCardNumber(callback: Laya.Handler): void {
        let params: Object = [];
        params["uid"] = wxCore.uo.getUserID();
        this.server(params, "querycards", new Laya.Handler(this, onResult));
        // 请求成功的回调
        function onResult(ret: any): void {
            console.log("获取复活卡数量成功：", ret);
            if (ret["code"] == 0) {
                GameMain.app.mWX.mCards = Number(ret["cards"]);
                if (callback) callback.run();
            }
        }
    }

    /* 汇报成绩 continue = 1：表示使用复活卡 */
    public reportMark(mark: number): void {
        let params: Object = [];
        params["mark"] = mark;
        params["uid"] = wxCore.uo.getUserID();
        params["id"] = this.mrelayID;
        params["continue"] = GameMain.app.mUseCards ? 1 : 0;
        params["shares"] = GameMain.app.mShares; // 分享次数
        params["level"] = GameMain.app.mMapLevel; // 闯关地图
        this.server(params, "report", new Laya.Handler(this, onResult));
        // 向离屏页汇报成绩
        wx.postMessage({
            type: "send", mark: mark, level: GameMain.app.mMapLevel, best: GameMain.app.mWX.mMarks[GameMain.app.mMapLevel], user: wxCore.uo.mWeUser
        });
        // 汇报成绩成功
        function onResult(ret: any): void {
            console.log(ret);
            if (ret["code"] == 0) {
                GameMain.app.mWX.mShareID = Number(ret["id"]);
                GameMain.app.mWX.mCards = Number(ret["cards"]);
                if (GameMain.app.scoreView && GameMain.app.scoreView.visible == true) {
                    GameMain.app.scoreView.showCards();
                }
                if (GameMain.app.mUseCards == true) {
                    GameMain.app.scoreView.resume();
                }
            }
        }
    }

    /* 获取我的最佳成绩 */
    public getMyMark(): void {
        let params: Object = [];
        params["uid"] = wxCore.uo.getUserID();
        this.server(params, "mymark", new Laya.Handler(this, onResult));
        // 获取我的成绩的回调
        function onResult(ret: any): void {
            console.log("获取我的最好成绩：", ret);
            if (ret["code"] == 0) {
                GameMain.app.mWX.mMarks[0] = Number(ret["mark"]["mark"]);
                wx.postMessage({
                    type: "send", mark: GameMain.app.mWX.mMarks[0], level: GameMain.app.mMapLevel, best: GameMain.app.mWX.mMarks[GameMain.app.mMapLevel], user: wxCore.uo.mWeUser
                });
            }
        }
    }

    /* 获取世界排行榜数据 */
    public showWorldRank(page: number = 0): void {
        let params: Object = [];
        params["uid"] = wxCore.uo.getUserID();
        params["page"] = page;
        this.server(params, "rank", new Laya.Handler(this, onResult));
        this.showLoading();
        // 获取世界排行榜数据成功的回调
        let _this = this;
        function onResult(ret: any): void {
            console.log("获取世界排行榜数据成功：", ret);
            if (ret["code"] == 0) {
                var mrank: number = Number(ret["rank"]);
                if (mrank > 0 && _this.mMarks[0] > 0) {
                    _this.mMyRank = mrank;
                }
                let mData: Array<Object> = GameMain.app.wRankData;
                let rData = ret["data"];
                for (var i = 0; i < rData.length; i++) {
                    var obj: Object = {};
                    obj["name"] = GameMain.app.subname(Base64.decode(rData[i]["name"]), 12);
                    var face: string = Base64.decode(rData[i]["avatar"]);
                    if (face.charAt(face.length - 1) == "0" && face.charAt(face.length - 2) == "/") {
                        face = face.substr(0, face.length - 2);
                        face = face + "/132";
                    }
                    obj["avatar"] = face;
                    obj["mark"] = Math.floor(rData[i]["hismark"]);
                    obj["city"] = rData[i]["city"];
                    obj["uid"] = rData[i]["uid"];
                    obj["map1"] = Math.floor(rData[i]["mark1"]);
                    obj["map2"] = Math.floor(rData[i]["mark2"]);
                    obj["map3"] = Math.floor(rData[i]["mark3"]);
                    let mLevel = GameMain.app.mLevel;
                    let mLevelName = GameMain.app.mLevelName;
                    let level: number = mLevel.length;
                    for (let m: number = 0; m < mLevel.length; m++) {
                        if (obj["mark"] < mLevel[m]) {
                            level = m + 1;
                            break;
                        }
                    }
                    obj["level"] = mLevelName[level - 1];
                    mData.push(obj);
                }
                for (var i = 0; i < mData.length; i++) {
                    mData[i]["rank"] = i + 1;
                    // 保存我的排行
                    if (wxCore.uo.getUserID() == Number(mData[i]["uid"])) {
                        _this.mMyRank = i + 1;
                    }
                }
                if (_this.mMyRank == 0) {
                    let mRank: number = Number(ret["rank"]);
                    if (mRank > 0 && _this.mMarks[0] > 0) {
                        _this.mMyRank = mRank;
                    }
                }
                if (rData.length > 0) {
                    GameMain.app.rankView.showWorldRank(mData);
                }
            }
            wx.hideLoading({});
        }
    }

    /* 获取好友接力列表信息 */
    public showRelay(show: boolean): void {
        if (show) this.showLoading();
        let params: Object = [];
        params["uid"] = wxCore.uo.getUserID();
        params["id"] = this.mrelayID;
        this.server(params, "challenge", new Laya.Handler(this, onResult));
        // 好友接力数据请求成功
        let _this = this;
        function onResult(ret: any): void {
            console.log("好好友接力数据：", ret);
            if (show) wx.hideLoading({});
            if (ret["code"] == 0) {
                GameMain.app.mWX.mChallenge = ret;
                let master = {
                    name: GameMain.app.subname(Base64.decode(ret["master"]["name"]), 12),
                    friend_base: ret["master"]["friend_base"],
                    mark: ret["master"]["mark"],
                    uid: ret["master"]["uid"],
                    id: ret["master"]["id"],
                };
                var face1: string = Base64.decode(ret["master"]["avatar"]);
                if (face1.charAt(face1.length - 1) == "0" && face1.charAt(face1.length - 2) == "/") {
                    face1 = face1.substr(0, face1.length - 2);
                    face1 = face1 + "/132";
                }
                master["avatar"] = face1;

                let mData: Array<Object> = [];
                let rData = ret["data"];
                for (var i = 0; i < rData.length; i++) {
                    if (rData[i]["uid"] != ret["master"]["uid"]) {
                        var obj: Object = {};
                        obj["uid"] = rData[i]["uid"];
                        obj["name"] = GameMain.app.subname(Base64.decode(rData[i]["name"]), 12);
                        var face: string = Base64.decode(rData[i]["avatar"]);
                        if (face.charAt(face.length - 1) == "0" && face.charAt(face.length - 2) == "/") {
                            face = face.substr(0, face.length - 2);
                            face = face + "/132";
                        }
                        obj["avatar"] = face;
                        obj["mark"] = rData[i]["mark"];
                        let mLevel = GameMain.app.mLevel;
                        let mLevelName = GameMain.app.mLevelName;
                        let level: number = mLevel.length;
                        for (let m: number = 0; m < mLevel.length; m++) {
                            if (obj["mark"] < mLevel[m]) {
                                level = m + 1;
                                break;
                            }
                        }
                        obj["level"] = mLevelName[level - 1];
                        mData.push(obj);
                    }
                }
                for (var i = 0; i < mData.length; i++) {
                    mData[i]["rank"] = i + 1;
                }
                GameMain.app.relayView.showrelayData(master, mData);
            }
        }
    }

    /* 初始化更多游戏 isIndex：true首页更多游戏，false结果页更多游戏。 */
    public initMoreGame(btn: Laya.Image, index: boolean): void {
        GameMain.app.mWX.gameObj = MoreGame.GetIndexRandom(GameMain.app.mWX.games_box);
        if (GameMain.app.mWX.gameObj) {
            if (index) {
                btn.skin = String(GameMain.app.mWX.gameObj["url_btn"]);
            } else {
                btn.skin = String(GameMain.app.mWX.gameObj["url_result"]);
            }
        }
    }

    /* 显示更多游戏 */
    public showMoreGamePage(btn: Laya.Image): void {
        if (GameMain.app.mWX.gameObj != null) {
            // 汇报更多游戏的点击量
            GameMain.app.mWX.reportADHit(String(GameMain.app.mWX.gameObj["gameid"]));
            // 显示游戏盒子
            var appid = GameMain.app.mWX.gameObj["appid"];
            if (!appid) {
                appid = "";
            }
            gameBox.showBoxPage(appid, GameMain.app.mWX.games_box, "城市漂移");
        }
    }

    /* 统计更多游戏的点击量 */
    public reportADHit(id: string): void {
        let params: Object = [];
        params["uid"] = wxCore.uo.getUserID();
        params["id"] = id;
        this.server(params, "ADHit", null);
    }

    /* 给自己加复活卡 */
    public addCardForMe(shareId: number): void {
        let params: Object = [];
        params["uid"] = wxCore.uo.getUserID();
        params["id"] = shareId;
        this.server(params, "AddMyCard", new Laya.Handler(this, onResult));
        // 调用接口成功
        function onResult(ret: any): void {
            if (ret["code"] == 0) {
                GameMain.app.mWX.mCards = GameMain.app.mWX.mCards >= 2 ? 2 : (GameMain.app.mWX.mCards + 1);
                GameMain.app.showMessage("获得复活卡1张", "success");
                // 如果存在结果页，更新结果页复活卡的数量。
                if (GameMain.app.resultView) {
                    GameMain.app.resultView.upDataCars();
                }
            }
        }
    }

    /* 给好友添加复活卡 */
    public dealCards(shareTicket: string): void {
        if (wxCore.uo.mLaunch["query"]["gift"] == 0) {
            return;
        }
        let params: Object = [];
        params["uid"] = wxCore.uo.getUserID();
        if (wxCore.uo.mLaunch["query"]["gift"] != null && typeof (wxCore.uo.mLaunch["query"]["gift"]) != "undefined") {
            params["gift"] = Number(wxCore.uo.mLaunch["query"]["gift"]);
        } else {
            params["gift"] = 0;
        }
        if (shareTicket != null && typeof (wxCore.uo.mLaunch["shareTicket"]) != "undefined") {
            params["ticket"] = shareTicket;
        }
        wxCore.uo.mLaunch["query"]["gift"] = 0;
        this.server(params, "AddCard", null);
    }

    /* 获取返回小程序appid */
    public initReturn(): void {
        var pid: string = wxCore.uo.mLaunch["query"]["pid"];
        if (pid == null || typeof (pid) == "undefined" || pid == "") {
            pid = GameMain.app.getLocalInfo("pid");
        }
        if (pid == null || typeof (pid) == "undefined" || pid == "") {
            this.mReturnAppid = "";
            this.mReturnUrl = "";
        } else {
            if (Number(pid) == 8) {
                this.mReturnAppid = "";
                this.mReturnUrl = "";
            } else {
                this.mReturnAppid = pid;
                this.mReturnUrl = "pages/index/index?";
            }
            GameMain.app.setLocalInfo("pid", this.mReturnAppid);
        }
    }

    /* 初始化微信游戏圈按钮 */
    public initGameClub(): void {
        if (GameMain.app.mSDKVersion > "2.0.3") {
            let _top = 160 * GameMain.app.mScreenHeight / 667;
            if (GameMain.app.mScreenHeight == 812) {
                _top = 190 * GameMain.app.mScreenHeight / 667;
            }
            GameMain.app.mWX.gameClub = wx.createGameClubButton({
                icon: "dark",
                style: {
                    left: 330 * GameMain.app.mScreenWidth / 375,
                    top: _top,
                    width: 30 * GameMain.app.mScreenWidth / 375,
                    height: 30 * GameMain.app.mScreenWidth / 375
                }
            });
        }
    }

    /* 初始化banner广告 */
    public initBannerAD(scale: number = 1, adid: string = "adunit-8bd8f9fff7ed1de4"): void {
        var showBigBanner = Number(GameMain.app.mWX.showBigBanner) ? 1 : scale

        GameMain.app.mWX.adBanner = wx.createBannerAd({
            adUnitId: adid,
            style: {
                left: 0,
                top: GameMain.app.mScreenHeight - 107,
                width: GameMain.app.mScreenWidth * showBigBanner
            }
        });
        var top = GameMain.app.mScreenHeight == 812 ? 20 : 0;
        GameMain.app.mWX.adBanner.onResize(res => {
            let bannerHeight = Math.ceil(GameMain.app.mWX.adBanner.style.realHeight);
            GameMain.app.mWX.adBanner.style.top = GameMain.app.mScreenHeight - bannerHeight - top;
            GameMain.app.mWX.adBanner.style.left = (GameMain.app.mScreenWidth - GameMain.app.mWX.adBanner.style.realWidth) / 2;
        });
        GameMain.app.mWX.adBanner.onLoad(() => {
            console.log("banner广告加载成功");
        });
        GameMain.app.mWX.adBanner.onError(() => {
            console.log("adBanner 广告加载失败");
            if (!!GameMain.app.rankView || !!GameMain.app.relayView) {
                // 点击群排行或者接力链接进入游戏不需要加载默认广告
            } else {
                GameMain.app.mWX.addCustomBannerAd();
            }
        });
    }

    /* 展示banner广告 */
    public showADBanner(): void {
        if (GameMain.app.mSDKVersion < "2.0.4") {
            console.log("微信sdk版本低于2.0.4");
            return;
        }
        if (GameMain.app.mWX.adBanner == null) {
            GameMain.app.mWX.initBannerAD(0.7);
        }
        GameMain.app.mWX.adBanner.show();
        if (GameMain.app.mWX.mCustomBanner) GameMain.app.mWX.mCustomBanner.visible = true;
        GameMain.app.mWX.reportData(0);
    }

    /* 关闭banner广告 */
    public hideADBanner(): void {
        // 移除微信的广告
        if (GameMain.app.mWX.adBanner != null) {
            GameMain.app.mWX.adBanner.hide();
        }
        // 移除自定义的广告
        this.mIsInvokeRemoveCustomBannerAd = true;
        if (this.mCustomBanner != null) {
            this.mCustomBanner.visible = false;
        }
    }

    /* 当微信banner广告为空时，显示自己的广告 */
    public addCustomBannerAd(): void {
        if (this.mCustomBannerAdList.length == 0) return;
        let __this = this;
        this.mIsInvokeRemoveCustomBannerAd = false;
        var index: number = Math.floor(Math.random() * this.mCustomBannerAdList.length);
        var url: string = this.mCustomBannerAdList[index]["url"];
        var appid: string = this.mCustomBannerAdList[index]["appid"];
        var path: string = this.mCustomBannerAdList[index]["path"];
        // 1->跳转小程序 0->不可跳转
        var third: number = Number(this.mCustomBannerAdList[index]["third"]);
        var id: string = this.mCustomBannerAdList[index]["id"];
        if (__this.mCustomBanner == null) {
            __this.mCustomBanner = new Laya.Image();
            __this.mCustomBanner.zOrder = 1000;
        }

        __this.mCustomBanner.loadImage(url, 0, 0, 0, 0, Laya.Handler.create(this, () => {
            // 如果此时调用过隐藏banner函数，则不将banner添加到stage
            if (__this.mIsInvokeRemoveCustomBannerAd) return;

            __this.mCustomBanner.anchorX = 0.5;
            __this.mCustomBanner.x = Laya.stage.width / 2;
            __this.mCustomBanner.bottom = GameMain.app.mScreenHeight > 800 ? 34 : 0;

            Laya.stage.addChild(__this.mCustomBanner);

            __this.mCustomBanner.on(Events.CLICK, __this, __this.onCustomBannerClick, [third, id, appid, path]);
        }));
    }

    private onCustomBannerClick(third: number, id: string, appid: string, path: string, e: Laya.Event): void {
        e.stopPropagation();
        if (third == 0) return;
        if (GameMain.app.mSDKVersion >= "2.2.0") {
            GameMain.app.mWX.reportADHit(id);
            wx.navigateToMiniProgram({
                appId: appid,
                path: path,
                envVersion: "trial",
                success(res) {
                    console.log("tiaozhuan-success");
                }
            });
        }
    }

    /* 广告曝光(type:1 视频广告; type:0 Banner广告) */
    public reportData(type: number = 0): void {
        let params: Object = [];
        params["uid"] = this.mUID;
        params["type"] = type;
        this.server(params, "ad", null);
    }

    /* 网络请求 */
    public server(params: any, url: string, callback: Laya.Handler, ver: string = "1.0.1"): void {
        GameMain.app.mWX.mHttpCall = new Laya.HttpRequest();
        GameMain.app.mWX.mHttpCall.once(Laya.Event.COMPLETE, GameMain.app.mWX, onResult);
        GameMain.app.mWX.mHttpCall.once(Laya.Event.ERROR, GameMain.app.mWX, GameMain.app.mWX.onHttpRequestError);
        let str = util.getServer() + GameMain.app.mWX.mCmd[url] + util.getUrlParams(params, ver);
        GameMain.app.mWX.mHttpCall.send(str, null, "get", "text");
        console.log("网络请求地址：", str);
        // 请求结果
        function onResult(e: any): void {
            let ret: Object = null;
            if (typeof (e) == "string") {
                ret = util.getJSON(e);
            } else {
                ret = util.getJSON(GameMain.app.mWX.mHttpCall.data);
            }
            if (callback != null) {
                callback.runWith(ret);
            }
            GameMain.app.mWX.mHttpCall = null;
        }
    }

    /* 请求错误的回调 */
    private onHttpRequestError(e: any): void {
        wx.hideLoading({});
        this.mHttpCall = null;
        console.log("onHttpRequestError:" + e);
    }

    /* ShowRequestLoading */
    public showLoading(title: string = "", mask: boolean = true): void {
        wx.showLoading({
            title: title,
            mask: mask
        });
    }
}