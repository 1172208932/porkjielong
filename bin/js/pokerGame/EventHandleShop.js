/**
* 商店的购买事件处理
*/
var pokerGame;
(function (pokerGame) {
    var EventHandleShop = /** @class */ (function () {
        function EventHandleShop() {
        }
        EventHandleShop.prototype.SetGameManager = function (gameManager) {
            this.gameManager = gameManager;
            //OnClickBuy
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnClickBuy, this, this.OnClickBuy); //购买
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnClickTry, this, this.OnClickTry); //试用
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnBuySuccess, this, this.OnBuySuccess); //购买
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnTrySuccess, this, this.OnTrySuccess); //试用
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnClickUse, this, this.OnClickUse); //试用
        };
        EventHandleShop.prototype.OnClickUse = function (itemData) {
            this.gameManager.userData.UseItem(itemData);
            this.gameManager.UIManager.shopUI.FlushData(this.gameManager.userData);
            pokerGame.SoundPlayer.PlaySound(1);
            pokerRender.ReadSkin();
            this.gameManager.UIManager.pokerTable.FlushBGImg();
            this.gameManager.UIManager.pokerTable.FlushAllCardRender();
        };
        //点击购买,开始购买流程
        EventHandleShop.prototype.OnClickBuy = function (itemData) {
            console.debug("OnClickBuy=" + itemData.ItemID);
            ///-----------
            ///-------经过各种购买流程之后，最终调用下面的接口购买成功
            ////--------------
            if (!this.gameManager.userData.IsHaveGold(itemData.ItemPrice)) {
                GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.ShowMessage, [10011]);
                return;
            }
            this.gameManager.userData.AddGold(-itemData.ItemPrice);
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnBuySuccess, [itemData.ItemID]);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        //购买成功
        EventHandleShop.prototype.OnBuySuccess = function (itemID) {
            console.debug("OnBuySuccess=" + itemID);
            this.gameManager.userData.AddPurchasedItemID(itemID);
            var itemdata = this.gameManager.UIManager.shopUI.GetItemConfigData(itemID);
            //this.gameManager.userData.UseItem(itemdata);
            this.gameManager.UIManager.shopUI.FlushData(this.gameManager.userData);
            pokerRender.ReadSkin();
            this.gameManager.UIManager.pokerTable.FlushBGImg();
            this.gameManager.UIManager.pokerTable.FlushAllCardRender();
        };
        //点击试用,开始试用流程
        EventHandleShop.prototype.OnClickTry = function (itemData) {
            console.debug("OnClickTry=" + itemData.ItemID);
            ///-----------
            ///-------经过各种试用流程之后，最终调用下面的接口试用成功
            ////--------------
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnTrySuccess, [itemData.ItemID]);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        //试用成功
        EventHandleShop.prototype.OnTrySuccess = function (itemID) {
            console.debug("OnTrySuccess=" + itemID);
            var itemdata = this.gameManager.UIManager.shopUI.GetItemConfigData(itemID);
            this.gameManager.userData.TryItem(itemdata);
            this.gameManager.UIManager.shopUI.FlushData(this.gameManager.userData);
            pokerRender.ReadSkin();
            this.gameManager.UIManager.pokerTable.FlushBGImg();
            this.gameManager.UIManager.pokerTable.FlushAllCardRender();
        };
        return EventHandleShop;
    }());
    pokerGame.EventHandleShop = EventHandleShop;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=EventHandleShop.js.map