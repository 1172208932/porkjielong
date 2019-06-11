/**
* name
*/
var pokerUI;
(function (pokerUI) {
    var gameBottom = /** @class */ (function () {
        function gameBottom() {
            Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
        }
        gameBottom.prototype.onUILoad = function () {
            this.gameBottom = new ui.poker.gameBottomUI();
            // if (GameMain.app.mWX.fhOnoff == 0) {
            this.gameBottom.getChildByName("rules")["visible"] = false;
            this.gameBottom.getChildByName("showHiddenCard")["visible"] = false;
            // }
            Laya.stage.addChild(this.gameBottom);
            this.gameBottom.visible = false;
            this.gameBottom.showPopup.on(Laya.Event.CLICK, this, this.onClickShowPopup); //.clickHandler = new Laya.Handler(this,this.onClickShowPopup);
            this.gameBottom.back.on(Laya.Event.CLICK, this, this.onClickBackStep);
            this.gameBottom.showTips.on(Laya.Event.CLICK, this, this.onClickTips);
            this.gameBottom.showHiddenCard.on(Laya.Event.CLICK, this, this.OnClickShowAllHiddenCard);
            this.gameBottom.autoPlay.on(Laya.Event.CLICK, this, this.OnClickAutoBackToAceCardDeck);
            this.gameBottom.set.on(Laya.Event.CLICK, this, this.onClickSetting);
            this.gameBottom.rules.on(Laya.Event.CLICK, this, this.OnClickGameStartTutorial);
            this.SetAutoEnable(false);
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.onTableUILoadedDone);
        };
        gameBottom.prototype.onClickSetting = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickSetting);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        gameBottom.prototype.IsAutoEnable = function () {
            return !this.gameBottom.autoPlay.disabled;
        };
        gameBottom.prototype.SetAutoEnable = function (isEnable) {
            this.gameBottom.autoPlay.disabled = !isEnable;
            this.gameBottom.autoPlayText.disabled = !isEnable;
        };
        gameBottom.prototype.onClickShowPopup = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickShowPopup);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        gameBottom.prototype.onClickTips = function () {
            this.shareToInvite2();
        };
        gameBottom.prototype.onClickBackToMain = function () {
            pokerGame.SoundPlayer.PlaySound(1);
            //GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickBackToMain);
        };
        gameBottom.prototype.onClickBackStep = function () {
            this.shareToInvite();
        };
        gameBottom.prototype.OnClickShowAllHiddenCard = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnClickShowAllHiddenCard);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        gameBottom.prototype.OnClickAutoBackToAceCardDeck = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnClickAutoBackToAceCardDeck);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        gameBottom.prototype.OnClickGameStartTutorial = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnClickGameStartTutorial);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        /* 分享到群 */
        gameBottom.prototype.shareToInvite = function () {
            GameMain.app.mShares++;
            GameMain.shareIndex = 1;
            GameMain.app.mShareCurrentTime = GameMain.app.getCurrTime();
            var shareTitle = "经典的接龙游戏点击就可以玩啦";
            var shareImg = "login/share.jpg";
            var surl = "2";
            // if (GameMain.app.mWX.shareUrl.length > 1) {
            // 	shareTitle = GameMain.app.mWX.shareUrl[1]["title"];
            // 	shareImg = GameMain.app.mWX.shareUrl[1]["url"];
            // 	surl = GameMain.app.mWX.shareUrl[1]["id"];
            // }
            wx.shareAppMessage({
                title: shareTitle,
                imageUrl: shareImg,
                query: "uid=" + wxCore.uo.getUserID() + "&id=0&type=0&map=0&surl=" + surl
            });
        };
        /* 分享到群 */
        gameBottom.prototype.shareToInvite2 = function () {
            GameMain.app.mShares++;
            GameMain.shareIndex = 2;
            GameMain.app.mShareCurrentTime = GameMain.app.getCurrTime();
            var shareTitle = "经典的接龙游戏点击就可以玩啦";
            var shareImg = "login/share.jpg";
            var surl = "3";
            // if (GameMain.app.mWX.shareUrl.length > 2) {
            // 	shareTitle = GameMain.app.mWX.shareUrl[2]["title"];
            // 	shareImg = GameMain.app.mWX.shareUrl[2]["url"];
            // 	surl = GameMain.app.mWX.shareUrl[2]["id"];
            // }
            wx.shareAppMessage({
                title: shareTitle,
                imageUrl: shareImg,
                query: "uid=" + wxCore.uo.getUserID() + "&id=0&type=0&map=0&surl=" + surl
            });
        };
        return gameBottom;
    }());
    pokerUI.gameBottom = gameBottom;
})(pokerUI || (pokerUI = {}));
//# sourceMappingURL=gameBottom.js.map