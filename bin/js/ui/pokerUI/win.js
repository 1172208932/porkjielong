/**
* name
*/
var pokerUI;
(function (pokerUI) {
    var win = /** @class */ (function () {
        function win() {
            Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
        }
        win.prototype.onUILoad = function () {
            this.winUI = new ui.poker.WinUI();
            Laya.stage.addChild(this.winUI);
            this.winUI.visible = false;
            this.winUI.startNewgame.clickHandler = new Laya.Handler(this, this.onClickStartNewGame);
        };
        win.prototype.ShowWin = function (UsedTimeStr) {
            this.winUI.visible = true;
            this.winUI.timeCount.text = UsedTimeStr;
        };
        win.prototype.onClickStartNewGame = function () {
            this.winUI.visible = false;
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickNewGame);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        return win;
    }());
    pokerUI.win = win;
})(pokerUI || (pokerUI = {}));
//# sourceMappingURL=win.js.map