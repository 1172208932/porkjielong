/**
* 提示事件处理
*/
var pokerGame;
(function (pokerGame) {
    var CardTips = /** @class */ (function () {
        function CardTips() {
            this.rule = new pokerGame.ChainGameRule();
            this.tipsDataList = new Array(); //显示的提示数据
            this.tipsRender = new poker.pokerGroupRender(poker.PokerGroupRenderMode.line);
        }
        CardTips.prototype.onClickTips = function () {
            this.ClearData(); //清理数据
            this.CheckAllCard(); //找到所有Tips数据
            this.ShowFristTip(); //显示所有TIps数据,生成动画
        };
        CardTips.prototype.ClearData = function () {
            Laya.timer.clear(this, this.ShowFristTip);
            if (this.deckData.table != null) {
                Laya.Tween.clearAll(this.deckData.table.LineTips);
            }
            for (var i = 0; i < this.tipsDataList.length; i++) {
                this.tipsDataList[i].tipsGroup.Dispose();
            }
            this.tipsDataList.splice(0);
            this.tipsRender.removeChildren(0);
        };
        CardTips.prototype.ClearTutorialTips = function () {
            Laya.timer.clear(this, this.CheckTutorialTips);
        };
        CardTips.prototype.CheckTutorialTipsWithLoop = function (deckType, deckNum, index) {
            this.ClearTutorialTips();
            Laya.timer.loop(1900, this, this.CheckTutorialTips, [deckType, deckNum, index]);
        };
        CardTips.prototype.CheckTutorialTips = function (deckType, deckNum, index) {
            if (this.deckData.table == null) {
                return;
            }
            this.ClearData(); //清理数据
            var deck = this.deckData.GetDeck(deckType, deckNum);
            if (!deck.data.pokerList[index].data.IsCardBack) {
                var slicePoker = deck.data.SlicePokerGroup(index);
                if (this.CheckCanConnectGroup(slicePoker, deckType, deckNum, index)) {
                }
            }
            this.ShowFristTip();
        };
        CardTips.prototype.CheckAllCard = function () {
            //与7条线做检测
            for (var i = 0; i < this.deckData.pokerLineList.length; i++) {
                var checkGroup = this.deckData.pokerLineList[i];
                for (var j = 0; j < checkGroup.data.pokerList.length; j++) {
                    if (!checkGroup.data.pokerList[j].data.IsCardBack) {
                        var slicePoker = checkGroup.data.SlicePokerGroup(j);
                        if (this.CheckCanConnectGroup(slicePoker, pokerGame.pokerDeckType.Line, i + 1, j)) {
                        }
                        break; //第一个不是卡背的才有移动的价值
                    }
                }
            }
            if (this.deckData.ThreeCard.data.pokerList.length > 0) {
                var lastIndex = this.deckData.ThreeCard.data.pokerList.length - 1;
                var slicePoker = this.deckData.ThreeCard.data.SlicePokerGroup(lastIndex);
                if (this.CheckCanConnectGroup(slicePoker, pokerGame.pokerDeckType.threeCardDeck, 0, lastIndex)) {
                }
            }
            for (var i = 0; i < this.deckData.pokerDeckList.length; i++) {
                var checkGroup = this.deckData.pokerDeckList[i];
                if (checkGroup.data.pokerList.length <= 0) {
                    continue;
                }
                var lastIndex = checkGroup.data.pokerList.length - 1;
                var slicePoker = checkGroup.data.SlicePokerGroup(lastIndex);
                if (this.CheckCanConnectGroup(slicePoker, pokerGame.pokerDeckType.Deck, i + 1, lastIndex)) {
                    continue;
                }
            }
        };
        //检测4张A的卡堆中的卡，有没有移动的价值
        CardTips.prototype.CheckDeckCardIsNeedMove = function (deckGroupNeedMove, needAddLineNum) {
            var needConnectCard = deckGroupNeedMove.GetLastCard();
            //与7条线做检测
            for (var i = 0; i < this.deckData.pokerLineList.length; i++) {
                var checkGroup = this.deckData.pokerLineList[i];
                for (var j = 0; j < checkGroup.data.pokerList.length; j++) {
                    if (!checkGroup.data.pokerList[j].data.IsCardBack) {
                        var card = checkGroup.data.pokerList[j];
                        if (this.rule.IsCanConnect(needConnectCard, card)) {
                            return true;
                        }
                        break; //第一个不是卡背的才有移动的价值
                    }
                }
            }
            if (this.deckData.ThreeCard.data.pokerList.length > 0) {
                var lastIndex = this.deckData.ThreeCard.data.pokerList.length - 1;
                var card = this.deckData.ThreeCard.data.pokerList[lastIndex];
                if (this.rule.IsCanConnect(needConnectCard, card)) {
                    return true;
                }
            }
            return false;
        };
        CardTips.prototype.CheckCanConnectGroup = function (checkGroupData, typefrom, numfrom, indexFrom) {
            //与4个堆线做检测
            if (typefrom != pokerGame.pokerDeckType.Deck) {
                for (var i = 0; i < this.deckData.pokerDeckList.length; i++) {
                    var checkGroup = this.deckData.pokerDeckList[i];
                    if (checkGroupData.pokerList.length != 1) //每次只能返回一张到deck中
                     {
                        break;
                    }
                    if (this.rule.IsCanTackBack(checkGroup.data.GetLastCard(), checkGroupData.GetFirstCard())) //用规则检测能否返回
                     {
                        var movingData = new pokerGame.pokerTipsData();
                        movingData.tipsGroup = checkGroupData.ClonePokerGroup(0);
                        movingData.startPos = this.GetStartPos(typefrom, numfrom, indexFrom);
                        movingData.endPos = this.GetEndPos(pokerGame.pokerDeckType.Deck, i + 1);
                        this.tipsDataList.push(movingData);
                        return true;
                    }
                }
            }
            //与7条线做检测
            for (var i = 0; i < this.deckData.pokerLineList.length; i++) {
                var checkGroup = this.deckData.pokerLineList[i];
                if (typefrom == pokerGame.pokerDeckType.Line) {
                    if ((numfrom - 1) == i) {
                        continue;
                    }
                }
                if (this.rule.IsCanConnect(checkGroup.data.GetLastCard(), checkGroupData.GetFirstCard())) {
                    if (typefrom == pokerGame.pokerDeckType.Deck) { //需要检测移动之后有没有能移动进来的
                        if (!this.CheckDeckCardIsNeedMove(checkGroupData, i + 1)) //检测是否有移动的价值
                         {
                            continue;
                        }
                    }
                    var movingData = new pokerGame.pokerTipsData();
                    movingData.tipsGroup = checkGroupData.ClonePokerGroup(0);
                    movingData.startPos = this.GetStartPos(typefrom, numfrom, indexFrom);
                    movingData.endPos = this.GetEndPos(pokerGame.pokerDeckType.Line, i + 1);
                    this.tipsDataList.push(movingData);
                    return true;
                }
            }
            //tipsData
            return false;
        };
        CardTips.prototype.GetStartPos = function (typefrom, numfrom, indexFrom) {
            var root = this.deckData.GetDeckSpriteRoot(typefrom, numfrom);
            var deck = this.deckData.GetDeck(typefrom, numfrom);
            var posCard = deck.data.pokerList[indexFrom];
            var cardPos = new Laya.Point(0, 0);
            if (posCard != null) {
                cardPos = new Laya.Point(posCard.render.img.x, posCard.render.img.y);
            }
            var tRetPos = new Laya.Point(root.x + cardPos.x * root.scaleX, root.y + cardPos.y * root.scaleY);
            return tRetPos;
        };
        CardTips.prototype.GetEndPos = function (typeTo, numTo) {
            var root = this.deckData.GetDeckSpriteRoot(typeTo, numTo);
            var deck = this.deckData.GetDeck(typeTo, numTo);
            var posCard = deck.data.GetLastCard();
            var cardPos = new Laya.Point(0, 0);
            if (posCard != null) {
                cardPos = new Laya.Point(posCard.render.img.x, posCard.render.img.y);
            }
            var tRetPos = new Laya.Point(root.x + cardPos.x * root.scaleX, root.y + cardPos.y * root.scaleY);
            if (typeTo == pokerGame.pokerDeckType.Line) {
                if (deck.data.pokerList.length != 0) {
                    tRetPos.y += poker.pokerGroupRender.lineHeightSpacing;
                }
            }
            return tRetPos;
        };
        CardTips.prototype.ShowFristTip = function () {
            if (this.tipsDataList.length <= 0) {
                if (this.deckData.StartCard.data.pokerList.length == 0) {
                    GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.ShowMessage, [10008]); //请使用明牌道具
                    return;
                }
                var child = this.deckData.StartCard.render.getChildAt(0);
                if (child != null) {
                    var spr = child;
                    var oldX = spr.x;
                    //Laya.Tween.clearAll(this.deckData.table.LineTips);
                    var maxI = 10;
                    for (var i = 0; i < maxI; i++) {
                        var pluse = i % 2 == 0 ? 1 : -1;
                        var num = pluse * 3;
                        var time = 30;
                        Laya.Tween.to(spr, { x: oldX + num }, time, null, null, i * time);
                    }
                    Laya.Tween.to(spr, { x: oldX }, time, null, null, maxI * time);
                }
                return;
            }
            var firstTip = this.tipsDataList[0]; //显示第一个
            this.tipsDataList.splice(0, 1);
            this.ShowTip(firstTip);
        };
        CardTips.prototype.ShowNextTip = function () {
            if (this.tipsDataList.length <= 0) {
                this.ClearData();
                return;
            }
            var firstTip = this.tipsDataList[0]; //显示第一个
            this.tipsDataList.splice(0, 1);
            this.ShowTip(firstTip);
        };
        CardTips.prototype.ShowTip = function (tip) {
            //var tip=this.tipsDataList[i];
            var data = tip.tipsGroup;
            this.tipsRender.FlushPokerList(data);
            if (this.tipsRender.parent == null) {
                this.deckData.table.LineTips.addChild(this.tipsRender);
            }
            //console.debug("tip.startPos.x,tip.startPos.y="+tip.startPos.x.toString()+","+tip.startPos.y.toString());
            this.deckData.table.LineTips.pos(tip.startPos.x, tip.startPos.y);
            Laya.Tween.clearAll(this.deckData.table.LineTips);
            Laya.Tween.to(this.deckData.table.LineTips, { x: tip.endPos.x, y: tip.endPos.y }, 900, Laya.Ease.sineOut, Laya.Handler.create(this, this.ShowNextTip), 0);
        };
        return CardTips;
    }());
    pokerGame.CardTips = CardTips;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=CardTips.js.map