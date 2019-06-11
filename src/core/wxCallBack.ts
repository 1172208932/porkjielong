/*
* 微信登陆流程相关接口，一些默认接口，必须要有
*/
class wxCallBack {
    public static mIF: Object = {
        "wxinfo": { "url": "1.0.1/jl/wxinfo?", "key": "1.0.1", "tips": "报告微信信息接口" },
        "login": { "url": "1.0.1/jl/login?", "key": "1.0.1", "tips": "登录服务" },
        "userinfo": { "url": "1.0.1/jl/userinfo?", "key": "1.0.1", "tips": "更新用户信息" },
    };

    constructor() {

    }

    /**
     * 必须有这个接口，提交当前版本号
     */
    public version(): string {
        return "1.0.1";
    }

    /**
     * 授权按钮偏移量，根据游戏设置，默认160
     */
    public loginBtnPos(): number {
        return 300;
    }

    /**
     * 可以自定义显示界面，或者返回true,显示默认登陆界面，默认登陆界面资源在 login目录下
     * 返回 true = 正常显示默认登陆模板
     *      false= 不显示默认登陆背景，自定义设计显示界面
     * 
     * 这里可以做一些下载资源得事情。异步操作都可以，不要做同步阻塞操作
     *             
     */
    public onBefore(): boolean {
        return true;
    }

    /**
     * 底层显示后，如果有其他层需要显示，在这里处理
     * 注意底层zorder=0,在这里显示的其他内容，不应该再设置底图
     */
    public onShow(): void {

    }

    /**
     * 针对广告跳转需求，不跳转返回时重新设置界面
     */
    public onReShow(): void {

    }

    /**
     * 登陆成功后
     * @param user 用户数据=uid,openid,name,avatar
     * @param ret  服务端登陆返回
     * 返回 true = 继续登陆微信
     *      false= 中断登陆过程，后续需要自己调用wxCore.uo.getUserInfo来继续被中断微信登陆过程
     *             为广告设计，需要自己调用init()
     */
    public onLogin(user: Object, ret: Object): boolean {
        console.log("wxCallBack onLogin");
        console.log("user = ", user);
        console.log("ret = ", ret);
        //处理游戏逻辑
        if (GameMain.app.mWX == null) {
            GameMain.app.mWX = new wxMinPro();
        }
        if (ret["uid"]) GameMain.app.mWX.mUID = Number(ret["uid"]);
        if (ret["openid"]) GameMain.app.mWX.mOpenid = String(ret["openid"]);
        // GameMain.app.mWX.newbie = Number(ret["newbie"]);
        return true;
    }

    /**
     * @param frist true=第一次进入游戏
     * @param last 上一次进入小程序带过来的参数 = null表示小程序第一次启动
     * @param cur  本次进入小程序呆过来的参数
     * 
     * 传递last过来是用来比较本次进入和上次进去的参数差别，个别游戏需要这个参数来判断
     */
    public onEnterGame(frist: boolean, last: Object, mLaunch: Object): void {
        console.log("wxCallBack onEnterGame");
        if (GameMain.shareIndex > 0) {
            this.onShareCallback();
        } else {
            // 登录服务器
            this.loginServer();
        }
    }

    /**
     * @param 游戏进入后台被调用
     */
    public onHideGame(): void {
        console.log("wxCallBack onHideGame");
    }

    /**
     * 初始化wxMinPro 登录服务器
     */
    public loginServer(): void {
        if (GameMain.app.mWX == null) {
            GameMain.app.mWX = new wxMinPro();
        }
        GameMain.app.mWX.onLaunch();
    }

    /* 检查分享 */
    public onShareCallback(): void {
        if (GameMain.app.mShareCurrentTime > 0) {
            // 判断是否有分享时间的限制
            if (GameMain.app.mShareTimeArray.length > 0) {
                var callbackTime = GameMain.app.getCurrTime();
                var limitTime: number = 0;
                var count = GameMain.app.mShareTimeArray.length;
                console.log("分享次数 = ", GameMain.app.mShares);
                if (count >= GameMain.app.mShares) {
                    console.log("---> = ", Number(GameMain.app.mShareTimeArray[GameMain.app.mShares - 1]));
                    limitTime = Number(GameMain.app.mShareTimeArray[GameMain.app.mShares - 1]);
                } else {
                    console.log("===> = ", Number(GameMain.app.mShareTimeArray[count - 1]));
                    limitTime = Number(GameMain.app.mShareTimeArray[count - 1]);
                }
                console.log("点击分享的时间戳 = ", GameMain.app.mShareCurrentTime);
                console.log("分享回来的时间戳 = ", callbackTime);
                console.log("分享时间限制 = ", limitTime);
                if (callbackTime - GameMain.app.mShareCurrentTime >= limitTime) {
                    this.shareBack(1);
                } else {
                    this.shareBack(2);
                }
            } else {
                this.shareBack(1);
            }
            GameMain.app.mShareCurrentTime = 0;
        } else {
            this.shareBack(1);
        }
    }

    /**
     * 微信分享
     * shareIndex 1是分享续命 2是分享到群
     */
    public shareBack(type: number): void {
        switch (GameMain.shareIndex) {
            case 1:
                if (type == 1) {
                    GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickBackStep);
                    pokerGame.SoundPlayer.PlaySound(1);
                } else {
                    Laya.timer.callLater(this, function () {
                        GameMain.app.showMessage("分享到群后生效", "none");

                    })
                }
                break
            case 2:
                if (type == 1) {
                    GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickTips);
                    pokerGame.SoundPlayer.PlaySound(1);
                } else {
                    Laya.timer.callLater(this, function () {
                        GameMain.app.showMessage("分享到群后生效", "none");

                    })
                }
                break
            case 3:
                if (type == 1) {
                    GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.onShareWeChatSuccesse);
                } else {
                    Laya.timer.callLater(this, function () {
                        GameMain.app.showMessage("分享到群后生效", "none");

                    })
                }
                break
        }
        // if (GameMain.shareIndex == 1) {
        //     if (type == 1) {
        //         if (GameMain.app.scoreView) {
        //             GameMain.app.scoreView.resume();
        //             GameMain.app.scoreView.resum3Fun()
        //         }
        //     } else {
        //         Laya.timer.callLater(this, function () {
        //             GameMain.app.showMessage("分享到群后生效", "none");

        //         })
        //     }
        // } else if (GameMain.shareIndex == 2) {
        //     if (type == 2) {
        //         Laya.timer.callLater(this, function () {
        //             GameMain.app.showMessage("分享到群后查看");
        //         })
        //     }
        // } else {

        // }
        GameMain.shareIndex = 0;
    }
}
