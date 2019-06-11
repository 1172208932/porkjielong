/**
* name
*/
var pokerUI;
(function (pokerUI) {
    var ConfirmAutoPlay = /** @class */ (function () {
        function ConfirmAutoPlay() {
            Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
        }
        ConfirmAutoPlay.prototype.onUILoad = function () {
            this.confirmAutoPlayUI = new ui.poker.ConfirmAutoPlayUI();
            Laya.stage.addChild(this.confirmAutoPlayUI);
            this.confirmAutoPlayUI.visible = false;
            this.confirmAutoPlayUI.shareWechat.clickHandler = new Laya.Handler(this, this.onClickShareWechat);
            this.confirmAutoPlayUI.CloseBTN.on(Laya.Event.CLICK, this, this.onClickCLoseBTN);
        };
        //点击分享到微信
        ConfirmAutoPlay.prototype.onClickShareWechat = function () {
            //------------分享方法
            //--------------分享完毕
            //分享成功后调用这个方法就可以，全局可用
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.onShareWeChatSuccesse);
        };
        //关闭UI的时候，需要外面激活点击自动完成的按钮
        ConfirmAutoPlay.prototype.onClickCLoseBTN = function () {
            this.confirmAutoPlayUI.visible = false;
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.onClickCLoseConfirmAutoPlayUI);
        };
        return ConfirmAutoPlay;
    }());
    pokerUI.ConfirmAutoPlay = ConfirmAutoPlay;
})(pokerUI || (pokerUI = {}));
//# sourceMappingURL=ConfirmAutoPlay.js.map