/**
* name
*/
var pokerUI;
(function (pokerUI) {
    var gameTop = /** @class */ (function () {
        function gameTop() {
            this.timerCount = 0;
            this.timerCountInt = 0;
            //	Laya.loader.load("res/atlas/UI.atlas",Laya.Handler.create(this,this.onUILoad));
            //Laya.loader.load([{url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onUILoad));
            Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
        }
        gameTop.prototype.SetTimerVisible = function (visible) {
            this.gameTopUI.TimeCount.visible = visible;
        };
        //设置金币
        //在任意地方用 	GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.UpdateGoldUI,[123]); 来刷新显示
        gameTop.prototype.SetGoldText = function (textGold) {
            if (this.gameTopUI != null && this.gameTopUI.GoldText != null) {
                this.gameTopUI.GoldText.text = textGold;
            }
        };
        gameTop.prototype.onUILoad = function () {
            this.gameTopUI = new ui.poker.gameTopUI();
            // if (GameMain.app.mWX.fhOnoff == 0) {
            this.gameTopUI.shop.visible = false;
            // }
            Laya.stage.addChild(this.gameTopUI);
            this.gameTopUI.visible = false;
            this.gameTopUI.challenge.visible = false;
            this.gameTopUI.money.visible = false;
            this.gameTopUI.challenge.on(Laya.Event.CLICK, this, this.onClickChallenge);
            this.gameTopUI.setting.on(Laya.Event.CLICK, this, this.onClickSetting);
            this.gameTopUI.shop.on(Laya.Event.CLICK, this, this.onClickShop);
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.onTableUILoadedDone);
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.UpdateGoldUI);
        };
        gameTop.prototype.SetTimeCount = function (second) {
            var valueToSet = Math.floor(second);
            if (this.timerCountInt == valueToSet) {
            }
            this.timerCountInt = valueToSet;
            var min = Math.floor(this.timerCountInt / 60);
            var sec = this.timerCountInt % 60;
            this.gameTopUI.TimeCount.text = this.GetTimeStr(min) + ":" + this.GetTimeStr(sec);
        };
        gameTop.prototype.GetTimeTextStr = function () {
            return this.gameTopUI.TimeCount.text;
        };
        gameTop.prototype.GetTimeStr = function (timeNum) {
            if (timeNum < 10) {
                return "0" + timeNum.toString();
            }
            else {
                return timeNum.toString();
            }
        };
        gameTop.prototype.onClickChallenge = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickChallenge);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        gameTop.prototype.onClickSetting = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickSetting);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        gameTop.prototype.onClickShop = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickShopInGame);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        gameTop.prototype.StopTimer = function () {
            Laya.timer.clear(this, this.UpdateTimerRender);
        };
        gameTop.prototype.RestartTimer = function (timecount) {
            if (timecount === void 0) { timecount = 0; }
            this.timerCount = timecount;
            Laya.timer.frameLoop(1, this, this.UpdateTimerRender);
        };
        gameTop.prototype.UpdateTimerRender = function () {
            this.timerCount += Laya.timer.delta / 1000;
            this.SetTimeCount(this.timerCount);
        };
        return gameTop;
    }());
    pokerUI.gameTop = gameTop;
})(pokerUI || (pokerUI = {}));
//# sourceMappingURL=gameTop.js.map