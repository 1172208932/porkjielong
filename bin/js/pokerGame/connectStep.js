/**
* 连接的步骤数据
*/
var pokerGame;
(function (pokerGame) {
    var connectStep = /** @class */ (function () {
        function connectStep(toType, toNum, toLength, fromType, fromNum, isFromBackToFront) {
            this.addToDeckType = toType;
            this.addToDeckNum = toNum;
            this.addToDeckIndex = toLength;
            this.fromDeckType = fromType;
            this.fromDeckNum = fromNum;
            this.isFromDeckChangeToFront = isFromBackToFront;
        }
        return connectStep;
    }());
    pokerGame.connectStep = connectStep;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=connectStep.js.map