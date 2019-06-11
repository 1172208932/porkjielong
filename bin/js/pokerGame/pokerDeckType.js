/**
* name
*/
var pokerGame;
(function (pokerGame) {
    var pokerDeckType;
    (function (pokerDeckType) {
        pokerDeckType[pokerDeckType["unKnowen"] = 0] = "unKnowen";
        pokerDeckType[pokerDeckType["startDeck"] = 1] = "startDeck";
        pokerDeckType[pokerDeckType["threeCardDeck"] = 2] = "threeCardDeck";
        pokerDeckType[pokerDeckType["Line"] = 3] = "Line";
        pokerDeckType[pokerDeckType["Deck"] = 4] = "Deck";
    })(pokerDeckType = pokerGame.pokerDeckType || (pokerGame.pokerDeckType = {}));
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=pokerDeckType.js.map