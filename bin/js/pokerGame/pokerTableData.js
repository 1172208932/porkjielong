/**
*  牌桌数据

*/
var pokerGame;
(function (pokerGame) {
    var pokerTableData = /** @class */ (function () {
        function pokerTableData() {
            this.timerCountKeep = 0; //keep数据的时候，记录时间
            this.cardDecksData = new pokerGame.CardDeckData();
            this.cardControls = new pokerGame.CardControls();
            this.cardTips = new pokerGame.CardTips();
            this.cardControls.deckData = this.cardDecksData;
            this.cardTips.deckData = this.cardDecksData;
        }
        pokerTableData.prototype.AddToTable = function (table, tableTop, tableBottom) {
            this.cardDecksData.AddToTable(table);
            this.cardControls.SetTableClick(table, tableTop, tableBottom);
        };
        pokerTableData.prototype.RemoveFromTable = function () {
            this.cardDecksData.table.offAll();
            this.cardDecksData.RemoveFromTable();
        };
        return pokerTableData;
    }());
    pokerGame.pokerTableData = pokerTableData;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=pokerTableData.js.map