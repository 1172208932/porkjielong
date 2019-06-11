/**
* UI 管理类
*/
var pokerGame;
(function (pokerGame) {
    var GameUIManager = /** @class */ (function () {
        function GameUIManager() {
            this.shopUI = new pokerUI.shop();
            this.pokerTable = new pokerUI.pokerTable();
            this.startGameUI = new pokerUI.startGame();
            this.pokerTop = new pokerUI.gameTop();
            this.pokerBottom = new pokerUI.gameBottom();
            this.pokerPopup = new pokerUI.gamePopup();
            this.settingUI = new pokerUI.setting();
            this.winUI = new pokerUI.win();
            this.tutorialUI = new pokerUI.tutorial();
            this.challengeUI = new pokerUI.challenge();
            this.confirmAutoPlayUI = new pokerUI.ConfirmAutoPlay();
            this.confirmShowCard = new pokerUI.ConfirmShowCard();
        }
        GameUIManager.prototype.IsAllTableUILoadDone = function () {
            if (this.pokerTable == null || this.pokerTable.pokerTableUI == null) {
                return false;
            }
            if (this.pokerTop == null || this.pokerTop.gameTopUI == null) {
                return false;
            }
            if (this.pokerBottom == null || this.pokerBottom.gameBottom == null) {
                return false;
            }
            return true;
        };
        return GameUIManager;
    }());
    pokerGame.GameUIManager = GameUIManager;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=GameUIManager.js.map