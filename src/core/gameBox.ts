/**
 * 小游戏中显示游戏盒子页面所有接口说明：
 * 
 * 1. 在bin/ultima/放入 MoreGame.js
 * 2. 在index.html 中 加入 
 * <!--用户自定义顺序文件添加到这里-->
 * <!--jsfile--Custom-->
        <script type="text/javascript" src="ultima/MoreGame.min.js"></script>
 * <!--jsfile--Custom-->
 * 
**/

class gameBox {
    constructor() {

    }

    /**
     * 所有广告入口都需要换（摇摆广告和抽屉广告需要根据审核版本开关关闭和打开）
     * @param appid 对应游戏的appid，没有可以传空字符串
     * @param groupList 已经获取到的游戏列表 lauch 中返回的 games_box 列表
     * @param gname 游戏名称 如： 神鲲
     */
    static showBoxPage(appid: string, groupList: any[], gname: string, zorder: number = 1001): void {
        if (!gameBox.showBefore()) return;
        // 显示盒子页面
        MoreGame.ShowList(groupList, gname, WriteBoxList.mWriteBox, appid, new Laya.Handler(this, gameBox.CloseBox), zorder, new Laya.Handler(this, gameBox.JumpInfo));
        return;
    }


    /* 游戏盒子显示之前需要做的操作 */
    private static showBefore(): boolean {
        Laya.timer.clearAll(GameMain.app.startView)
        // 如果后台没有传游戏，不做操作。
        if (GameMain.app.mWX.games_box.length <= 0) {
            return false;
        }
        // 隐藏微信广告及游戏圈按钮
        GameMain.app.gameClubState(false);
        // 关闭广告
        GameMain.app.mWX.hideADBanner();
        return true;
    }

    /* 游戏盒子关闭之后需要做的操作 */
    /* mShowGameBoxIndex 1:点击自己的广告打开 2:从首页打开 3:从结果页打开 */
    private static CloseBox(): void {
        GameMain.app.startView.changeIcon()
        GameMain.app.startView.refreshBanner()
        // 显示游戏微信广告及游戏圈
        if (GameMain.app.startView && GameMain.app.startView.visible == true) {
            // GameMain.app.gameClubState(true);
            GameMain.app.mWX.showADBanner();
        }
        // 如果从结果页打开的游戏盒子，关闭之后需要重新显示广告。
        if (GameMain.app.resultView && GameMain.app.resultView.visible == true) {
            GameMain.app.mWX.showADBanner();
        }
        // 如果排行榜界面或者接力界面存在（点击链接进入），要隐藏游戏圈按钮。
        if (GameMain.app.rankView && GameMain.app.rankView.visible == true) {
            GameMain.app.gameClubState(false);
        }
        if (GameMain.app.relayView && GameMain.app.relayView.visible == true) {
            GameMain.app.gameClubState(false);
        }
        if (GameMain.app.scoreView && GameMain.app.scoreView.visible == true) {
            GameMain.app.mWX.showADBanner();
        }
    }
    // 调用跳转情况
    // type = 0 跳转失败（执行失败）， 1 跳转成功  2 用户放弃  3 打开二维码图片
    // id -- groupList 中id
    // firstbox -- 是否首先跳转神手盒子的appid，然后通过神手盒子中转跳转游戏的appid
    // openboxjump -- 是否是打开游戏中的盒子页面后的跳转，true - 打开 ， false 不打开gameBox，直接跳转
    private static JumpInfo(type: number, id: number, firstbox: boolean, openboxjump: boolean): void {
        console.log("跳转结果：", type, id, firstbox, openboxjump);
        switch (type) {
            // case 0:
            //     switch (GameMain.app.gameType) {
            //         case 103:
            //             GameMain.app.mWX.reportGameHit(153, GameMain.app.otherGameId)
            //             break
            //         case 105:
            //             GameMain.app.mWX.reportGameHit(150, GameMain.app.otherGameId)
            //             break
            //         case 158:
            //             GameMain.app.mWX.reportGameHit(159, GameMain.app.otherGameId)
            //             break
            //     }
            //     break
            case 1:
                switch (GameMain.app.gameType) {
                    case 103:
                        GameMain.app.mWX.reportGameHit(154, GameMain.app.otherGameId)
                        break
                    case 105:
                        GameMain.app.mWX.reportGameHit(151, GameMain.app.otherGameId)
                        break
                    case 158:
                        GameMain.app.mWX.reportGameHit(160, GameMain.app.otherGameId)
                        break
                    case 167:
                        GameMain.app.mWX.reportGameHit(169, GameMain.app.otherGameId)
                        break
                    case 146:
                        GameMain.app.mWX.reportGameHit(148, GameMain.app.otherGameId)
                        break
                    case 149:
                        GameMain.app.mWX.reportGameHit(151, GameMain.app.otherGameId)
                        break
                }
                break
            case 2:
                switch (GameMain.app.gameType) {
                    case 103:
                        GameMain.app.mWX.reportGameHit(153, GameMain.app.otherGameId)
                        break
                    case 105:
                        GameMain.app.mWX.reportGameHit(150, GameMain.app.otherGameId)
                        break
                    case 158:
                        GameMain.app.mWX.reportGameHit(159, GameMain.app.otherGameId)
                        break
                    case 167:
                        GameMain.app.mWX.reportGameHit(168, GameMain.app.otherGameId)
                        break
                    case 146:
                        GameMain.app.mWX.reportGameHit(147, GameMain.app.otherGameId)
                        break
                    case 149:
                        GameMain.app.mWX.reportGameHit(150, GameMain.app.otherGameId)
                }
                break
            case 3:
                break
        }
    }
}