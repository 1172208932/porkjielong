/**
* 游戏的事件处理
*/
var pokerGame;
(function (pokerGame) {
    var PokerEventHandle = (function () {
        function PokerEventHandle() {
        }
        PokerEventHandle.prototype.SetGameManager = function (gameManager) {
            this.gameManager = gameManager;
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnGameStart, this, this.OnGameStart);
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnClickShop, this, this.OnClickShop);
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickChallenge, this, this.onClickChallenge);
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickBackToMain, this, this.onClickBackToMain);
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickBackToMainFromShop, this, this.onClickBackToMainFromShop);
        };
        //游戏开始事件
        PokerEventHandle.prototype.OnGameStart = function () {
            this.gameManager.UIManager.startGameUI.startGameUI.visible = false;
            this.gameManager.UIManager.shopUI.shopUI.visible = false;
            this.gameManager.UIManager.pokerTable.DearCard(); //发牌
            this.gameManager.UIManager.pokerTable.pokerTableUI.visible = true;
            this.gameManager.UIManager.pokerTop.gameTopUI.visible = true;
        };
        //点击商店
        PokerEventHandle.prototype.OnClickShop = function () {
            this.gameManager.UIManager.startGameUI.startGameUI.visible = false;
            this.gameManager.UIManager.shopUI.shopUI.visible = true;
        };
        //点击挑战
        PokerEventHandle.prototype.onClickChallenge = function () {
        };
        PokerEventHandle.prototype.onClickBackToMainFromShop = function () {
            this.gameManager.UIManager.shopUI.shopUI.visible = false;
            this.gameManager.UIManager.startGameUI.startGameUI.visible = true;
        };
        //点击返回主界面
        PokerEventHandle.prototype.onClickBackToMain = function () {
            this.gameManager.UIManager.pokerTable.pokerTableUI.visible = false;
            this.gameManager.UIManager.pokerTop.gameTopUI.visible = false;
        };
        return PokerEventHandle;
    }());
    pokerGame.PokerEventHandle = PokerEventHandle;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=PokerEventHandle.js.map