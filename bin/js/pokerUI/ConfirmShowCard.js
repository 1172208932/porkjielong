/**
* name
*/
var pokerUI;
(function (pokerUI) {
    var ConfirmShowCard = /** @class */ (function () {
        function ConfirmShowCard() {
            Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
        }
        ConfirmShowCard.prototype.onUILoad = function () {
            this.confirmShowCardUI = new ui.poker.ConfirmShowCardUI();
            Laya.stage.addChild(this.confirmShowCardUI);
            this.confirmShowCardUI.visible = false;
            this.confirmShowCardUI.GoldUse.clickHandler = new Laya.Handler(this, this.onClickGoldUse);
            this.confirmShowCardUI.videoUse.clickHandler = new Laya.Handler(this, this.onClickVideoUse);
            this.confirmShowCardUI.CloseBTN.on(Laya.Event.CLICK, this, this.onClickCLoseBTN);
        };
        //点击金币使用
        ConfirmShowCard.prototype.onClickGoldUse = function () {
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.onClickGoldUseShowCard);
        };
        //点击看视频使用
        ConfirmShowCard.prototype.onClickVideoUse = function () {
            //------------广告方法
            //--------------广告观看完毕
            //成功后调用这个方法就可以，全局可用
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.ShowHiddenCard);
        };
        //关闭UI
        ConfirmShowCard.prototype.onClickCLoseBTN = function () {
            this.confirmShowCardUI.visible = false;
        };
        return ConfirmShowCard;
    }());
    pokerUI.ConfirmShowCard = ConfirmShowCard;
})(pokerUI || (pokerUI = {}));
//# sourceMappingURL=ConfirmShowCard.js.map