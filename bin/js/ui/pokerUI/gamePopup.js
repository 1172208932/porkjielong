/**
* name
*/
var pokerUI;
(function (pokerUI) {
    var gamePopup = /** @class */ (function () {
        function gamePopup() {
            //	Laya.loader.load("res/atlas/UI.atlas",Laya.Handler.create(this,this.onUILoad));
            //Laya.loader.load([{url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onUILoad));
            //加载版本信息文件
            Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
        }
        gamePopup.prototype.onUILoad = function () {
            this.gamePopup = new ui.poker.gamePopupUI();
            Laya.stage.addChild(this.gamePopup);
            this.gamePopup.visible = false;
            this.gamePopup.endGame.visible = false;
            this.gamePopup.CloseBTN.on(Laya.Event.CLICK, this, this.ClickClosePopup);
            this.gamePopup.NEWGame.on(Laya.Event.CLICK, this, this.onClickNewGame);
            this.gamePopup.EndGame.on(Laya.Event.CLICK, this, this.onClickEndGame);
            this.gamePopup.RETRY.on(Laya.Event.CLICK, this, this.onClickRetry);
        };
        gamePopup.prototype.ClickClosePopup = function () {
            this.gamePopup.visible = false;
            pokerGame.SoundPlayer.PlaySound(1);
        };
        gamePopup.prototype.onClickNewGame = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickNewGame);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        gamePopup.prototype.onClickRetry = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickRetry);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        gamePopup.prototype.onClickEndGame = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickEndGame);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        return gamePopup;
    }());
    pokerUI.gamePopup = gamePopup;
})(pokerUI || (pokerUI = {}));
//# sourceMappingURL=gamePopup.js.map