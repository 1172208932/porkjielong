//扑克类型
var PokerType;
(function (PokerType) {
    PokerType[PokerType["club"] = 1] = "club";
    PokerType[PokerType["diamond"] = 2] = "diamond";
    PokerType[PokerType["heart"] = 3] = "heart";
    PokerType[PokerType["spade"] = 4] = "spade";
    PokerType[PokerType["king"] = 5] = "king"; //大小王
})(PokerType || (PokerType = {}));
var poker;
(function (poker) {
    //扑克数学数据
    var pokerdata = /** @class */ (function () {
        function pokerdata(vType, vNum) {
            this.mType = vType;
            this.mNum = vNum;
        }
        pokerdata.prototype.SetData = function (data) {
            this.mType = data.mType;
            this.mNum = data.mNum;
        };
        pokerdata.Getkey = function (type, num) {
            return type * 1000 + num;
        };
        pokerdata.prototype.Getkey = function () {
            return this.mType * 1000 + this.mNum;
        };
        pokerdata.prototype.Clone = function () {
            return new pokerdata(this.mType, this.mNum);
        };
        //是否为大王卡
        pokerdata.prototype.IsKing = function () {
            return this.mType == PokerType.king;
        };
        //是否为黑色的卡
        pokerdata.prototype.IsBlack = function () {
            return this.mType == PokerType.club || this.mType == PokerType.spade;
        };
        //是否为红色的卡
        pokerdata.prototype.IsRed = function () {
            return this.mType == PokerType.diamond || this.mType == PokerType.heart;
        };
        return pokerdata;
    }());
    poker.pokerdata = pokerdata;
})(poker || (poker = {}));
//# sourceMappingURL=pokerdata.js.map