/**
* 一组扑克的数据
*/
var poker;
(function (poker_1) {
    var pokerGroupData = /** @class */ (function () {
        function pokerGroupData(vpokerList) {
            if (vpokerList === void 0) { vpokerList = null; }
            if (vpokerList != null) {
                this.pokerList = vpokerList;
            }
            else {
                this.pokerList = new Array();
            }
        }
        //从初始化的卡组中快速寻找卡
        pokerGroupData.prototype.FindCardFromFormatCardIndex = function (type, num) {
            var index = Math.floor((num - 1) * 4 + (type - 1));
            return index;
        };
        pokerGroupData.prototype.Dispose = function () {
            for (var i = 0; i < this.pokerList.length; i++) {
                this.pokerList[i].Dispose();
            }
            this.pokerList.splice(0);
        };
        //连接
        pokerGroupData.prototype.Concat = function (vGroupData) {
            this.pokerList = this.pokerList.concat(vGroupData.pokerList);
            vGroupData.pokerList.splice(0);
        };
        //最后一张卡不是正面,就显示为正面
        pokerGroupData.prototype.SetLastCardFrontIfNot = function () {
            var lastcard = this.GetLastCard();
            if (lastcard == null) {
                return;
            }
            if (lastcard.data.IsCardBack) {
                lastcard.data.IsCardBack = false;
            }
        };
        //设置最后三张卡显示正面
        pokerGroupData.prototype.SetLastThreeCardToFrontIfNot = function () {
            var lastindex = this.pokerList.length - 1;
            for (var i = lastindex - 2; i < this.pokerList.length; i++) {
                if (i >= 0) {
                    if (this.pokerList[i].data.IsCardBack) {
                        this.pokerList[i].data.IsCardBack = false;
                    }
                }
            }
        };
        pokerGroupData.prototype.RemoveAllCardRender = function () {
            this.pokerList.forEach(function (element) {
                element.render.img.removeSelf();
            });
        };
        //刷新所有卡片的render
        pokerGroupData.prototype.FlushAllCardRender = function () {
            this.pokerList.forEach(function (element) {
                element.render.ChangeRenderByData(element.data);
            });
        };
        pokerGroupData.prototype.SetAllCardToBack = function () {
            this.pokerList.forEach(function (element) {
                if (!element.data.IsCardBack) {
                    element.data.IsCardBack = true;
                }
            });
        };
        pokerGroupData.prototype.SetAllCardToFront = function () {
            this.pokerList.forEach(function (element) {
                if (element.data.IsCardBack) {
                    element.data.IsCardBack = false;
                }
            });
        };
        //最后一张卡不是背面,就显示为背面
        pokerGroupData.prototype.SetLastCardBackIfNot = function () {
            var lastcard = this.GetLastCard();
            if (lastcard == null) {
                return;
            }
            if (!lastcard.data.IsCardBack) {
                lastcard.data.IsCardBack = true;
            }
        };
        //只让最后一张卡显示正面,其他都是背面
        pokerGroupData.prototype.SetOnlyLastCardFront = function () {
            for (var i = 0; i < this.pokerList.length; i++) {
                var poker = this.pokerList[i];
                poker.data.IsCardBack = ((i + 1) != this.pokerList.length);
            }
        };
        pokerGroupData.prototype.GetFirstCard = function () {
            if (this.pokerList.length > 0) {
                return this.pokerList[0];
            }
            return null;
        };
        pokerGroupData.prototype.GetLastCard = function () {
            if (this.pokerList.length > 0) {
                var lastindex = this.pokerList.length - 1;
                return this.pokerList[lastindex];
            }
            return null;
        };
        pokerGroupData.prototype.GetLastCardIndex = function () {
            if (this.pokerList.length > 0) {
                var lastindex = this.pokerList.length - 1;
                return lastindex;
            }
            return -1;
        };
        //获得牌组中最上面的n张卡
        pokerGroupData.prototype.SplitePokerGroupByNum = function (num) {
            var pGrouop = null;
            if (this.pokerList.length <= num) {
                pGrouop = this.SplitePokerGroup(0);
            }
            else {
                var startSpliteIndex = this.pokerList.length - num;
                pGrouop = this.SplitePokerGroup(startSpliteIndex);
            }
            //pGrouop.pokerList.reverse();
            return pGrouop;
        };
        //分割牌组 获得前面的几张牌
        pokerGroupData.prototype.SplitePokerGroupFromFront = function (endIndex) {
            var tPokerArray = null;
            if (endIndex >= this.pokerList.length) {
                tPokerArray = this.pokerList;
                this.pokerList = new Array();
            }
            else {
                var tPokerArrayTRet = this.pokerList.slice(0, endIndex + 1);
                var tPokerArrayKeep = this.pokerList.slice(endIndex + 1);
                tPokerArray = tPokerArrayTRet;
                this.pokerList.splice(0);
                this.pokerList = tPokerArrayKeep;
            }
            var tRet = new pokerGroupData(tPokerArray);
            return tRet;
        };
        //分割牌组
        pokerGroupData.prototype.SplitePokerGroup = function (startIndex) {
            var tPokerArray = this.pokerList.slice(startIndex);
            this.pokerList.splice(startIndex);
            var tRet = new pokerGroupData(tPokerArray);
            return tRet;
        };
        //获得分割的牌组的引用
        pokerGroupData.prototype.SlicePokerGroup = function (startIndex) {
            var tPokerArray = this.pokerList.slice(startIndex);
            var tRet = new pokerGroupData(tPokerArray);
            return tRet;
        };
        //复制牌组中的数据
        pokerGroupData.prototype.ClonePokerGroup = function (startIndex) {
            var tPokerArray = new Array();
            for (var i = startIndex; i < this.pokerList.length; i++) {
                var data = this.pokerList[i].data; //.Clone();
                var newpokerChain = new poker_1.pokerChain(data.mType, data.mNum);
                tPokerArray.push(newpokerChain);
            }
            var tRet = new pokerGroupData(tPokerArray);
            return tRet;
        };
        //创建一整套的扑克
        pokerGroupData.prototype.CreateFull = function (WithKing) {
            if (WithKing === void 0) { WithKing = false; }
            this.pokerList = new Array();
            for (var i = 0; i < 13; i++) {
                var poker1 = new poker_1.pokerChain(PokerType.club, i + 1);
                var poker2 = new poker_1.pokerChain(PokerType.diamond, i + 1);
                var poker3 = new poker_1.pokerChain(PokerType.heart, i + 1);
                var poker4 = new poker_1.pokerChain(PokerType.spade, i + 1);
                poker1.CreateRender();
                poker2.CreateRender();
                poker3.CreateRender();
                poker4.CreateRender();
                this.pokerList.push(poker1);
                this.pokerList.push(poker2);
                this.pokerList.push(poker3);
                this.pokerList.push(poker4);
            }
            if (WithKing) {
                var poker1 = new poker_1.pokerChain(PokerType.king, 1);
                var poker2 = new poker_1.pokerChain(PokerType.king, 2);
                this.pokerList.push(poker1);
                this.pokerList.push(poker2);
            }
        };
        //把扑克加入组中
        pokerGroupData.prototype.AddPoker = function (poker) {
            this.pokerList.push(poker);
        };
        //经典洗牌算法
        pokerGroupData.prototype.Shuffle = function () {
            var length = this.pokerList.length;
            for (var i = 0; i < length; i++) {
                var indexf = Math.random() * (length);
                var rIndex = Math.floor(indexf);
                if (rIndex == i) {
                    continue;
                }
                var a = this.pokerList[i];
                var b = this.pokerList[rIndex];
                this.pokerList[i] = b;
                this.pokerList[rIndex] = a;
            }
        };
        //洗牌 参数：次数
        pokerGroupData.prototype.ShuffleWithTime = function (time) {
            if (time === void 0) { time = 1; }
            for (var i = 0; i < time; i++) {
                this.Shuffle();
            }
        };
        return pokerGroupData;
    }());
    poker_1.pokerGroupData = pokerGroupData;
})(poker || (poker = {}));
//# sourceMappingURL=pokerGroupData.js.map