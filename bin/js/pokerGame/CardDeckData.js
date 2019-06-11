/**
* 牌桌逻辑
*/
var pokerGame;
(function (pokerGame) {
    var CardDeckData = /** @class */ (function () {
        function CardDeckData() {
            /**
            设置相关
    
            */
            this.isThreeCardOnce = true; //是否只翻一张
            this.IsLasvigasMode = true; //是否是拉斯维加斯模式
            this.LasvigasModeCount = 0;
            this.cardListKeep = new Array(); //发牌之后保存的卡牌数据,用来重来一次
            this.ThreeCard = new poker.pokerChainGroup(poker.PokerGroupRenderMode.lastThreeCard); //三张牌的显示
            this.StartCard = new poker.pokerChainGroup(poker.PokerGroupRenderMode.lastOneCard); //开始的牌堆
            this.pokerLineList = new Array(); //牌线 1-7
            this.pokerDeckList = new Array(); //四个堆
            this.connectStepList = new Array(); //连接的历史记录,用来做回退
            this.StartCard.render.zeroCardName = "img_trans.png";
            this.StartCard.data.CreateFull();
            this.StartCard.data.SetLastCardBackIfNot();
            this.StartCard.FlushRender();
            //四个堆数据
            for (var i = 0; i < 4; i++) {
                var deck = new poker.pokerChainGroup(poker.PokerGroupRenderMode.lastOneCard);
                deck.render.zeroCardName = "img_A.png";
                this.pokerDeckList.push(deck);
            }
            //七行数据
            for (var i = 0; i < 7; i++) {
                var line = new poker.pokerChainGroup(poker.PokerGroupRenderMode.line);
                line.render.zeroCardName = "img_zero.png";
                this.pokerLineList.push(line);
            }
        }
        CardDeckData.prototype.IsCanTabBackToStart = function () {
            if (this.IsLasvigasMode) {
                return this.LasvigasModeCount > 0;
            }
            return true;
        };
        CardDeckData.prototype.TabBackToStartOnce = function () {
            if (this.IsLasvigasMode) {
                return this.LasvigasModeCount--;
            }
        };
        CardDeckData.prototype.SetGameModeByUserData = function (userData) {
            this.SetGameMode(userData.isThreeCardOnce, userData.isVigasMode);
        };
        CardDeckData.prototype.SetGameMode = function (isThreeCardOnce, IsLasvigasMode) {
            this.isThreeCardOnce = isThreeCardOnce;
            this.IsLasvigasMode = IsLasvigasMode;
            if (this, IsLasvigasMode) {
                this.LasvigasModeCount = 3;
            }
        };
        CardDeckData.prototype.FlushAllPokerRender = function () {
            this.StartCard.FlushRender();
            this.ThreeCard.FlushRender();
            //四个堆数据
            for (var i = 0; i < 4; i++) {
                this.pokerDeckList[i].FlushRender();
            }
            //七行数据
            for (var i = 0; i < 7; i++) {
                this.pokerLineList[i].FlushRender();
            }
        };
        CardDeckData.prototype.FlushAllCardRender = function () {
            this.StartCard.data.FlushAllCardRender();
            this.ThreeCard.data.FlushAllCardRender();
            //四个堆数据
            for (var i = 0; i < 4; i++) {
                this.pokerDeckList[i].data.FlushAllCardRender();
            }
            //七行数据
            for (var i = 0; i < 7; i++) {
                this.pokerLineList[i].data.FlushAllCardRender();
            }
        };
        //新增一步历史记录
        CardDeckData.prototype.AddStep = function (toType, toNum, toLength, fromType, fromNum, fromBackToFront) {
            var step = new pokerGame.connectStep(toType, toNum, toLength, fromType, fromNum, fromBackToFront);
            this.connectStepList.push(step);
        };
        CardDeckData.prototype.ClearStep = function () {
            this.connectStepList.splice(0);
        };
        //获得最后一步回撤历史记录
        CardDeckData.prototype.GetLastBackStep = function () {
            if (this.connectStepList.length <= 0) {
                return null;
            }
            var lastIndex = this.connectStepList.length - 1;
            var lastStep = this.connectStepList[lastIndex];
            return lastStep;
        };
        //数据回退一步历史记录
        CardDeckData.prototype.BackStep = function () {
            if (this.connectStepList.length <= 0) {
                return null;
            }
            var lastIndex = this.connectStepList.length - 1;
            var lastStep = this.connectStepList[lastIndex];
            var toGroup = this.GetDeck(lastStep.addToDeckType, lastStep.addToDeckNum);
            var fromGroup = this.GetDeck(lastStep.fromDeckType, lastStep.fromDeckNum);
            if (lastStep.isFromDeckChangeToFront) //是否需要变回卡背
             {
                var lastcard = fromGroup.data.GetLastCard();
                if (lastcard != null) {
                    lastcard.data.IsCardBack = true;
                }
            }
            var datatoConnect = toGroup.data.SplitePokerGroup(lastStep.addToDeckIndex);
            if (lastStep.fromDeckType == pokerGame.pokerDeckType.startDeck) {
                //this.StartCard.data.pokerList.reverse();
                datatoConnect.pokerList.reverse();
            }
            fromGroup.data.Concat(datatoConnect);
            if (lastStep.fromDeckType == pokerGame.pokerDeckType.startDeck) {
                fromGroup.data.SetAllCardToBack();
            }
            toGroup.FlushRender();
            fromGroup.FlushRender();
            this.connectStepList.splice(lastIndex);
            return lastStep;
        };
        CardDeckData.prototype.GetAceDeckSpriteRoot = function (deckNum) {
            switch (deckNum) {
                case 1:
                    return this.table.Deck1;
                case 2:
                    return this.table.Deck2;
                case 3:
                    return this.table.Deck3;
                case 4:
                    return this.table.Deck4;
            }
            return null;
        };
        CardDeckData.prototype.GetLineSpriteRoot = function (lineNum) {
            switch (lineNum) {
                case 1:
                    return this.table.Line1;
                case 2:
                    return this.table.Line2;
                case 3:
                    return this.table.Line3;
                case 4:
                    return this.table.Line4;
                case 5:
                    return this.table.Line5;
                case 6:
                    return this.table.Line6;
                case 7:
                    return this.table.Line7;
            }
            return null;
        };
        CardDeckData.prototype.GetDeckSpriteRoot = function (type, GroupNum) {
            var tRet = null;
            switch (type) {
                case pokerGame.pokerDeckType.startDeck:
                    return this.table.StartCard;
                case pokerGame.pokerDeckType.threeCardDeck:
                    return this.table.ThreeCard;
                case pokerGame.pokerDeckType.Line:
                    {
                        if (GroupNum > 0 && GroupNum <= 7) {
                            return this.GetLineSpriteRoot(GroupNum);
                        }
                    }
                    break;
                case pokerGame.pokerDeckType.Deck:
                    {
                        if (GroupNum > 0 && GroupNum <= 4) {
                            return this.GetAceDeckSpriteRoot(GroupNum);
                        }
                    }
                    break;
            }
            return null;
        };
        CardDeckData.prototype.GetDeck = function (type, GroupNum) {
            var tRet = null;
            switch (type) {
                case pokerGame.pokerDeckType.startDeck:
                    return this.StartCard;
                case pokerGame.pokerDeckType.threeCardDeck:
                    return this.ThreeCard;
                case pokerGame.pokerDeckType.Line:
                    {
                        if (GroupNum > 0 && GroupNum <= 7) {
                            return this.pokerLineList[GroupNum - 1];
                        }
                    }
                    break;
                case pokerGame.pokerDeckType.Deck:
                    {
                        if (GroupNum > 0 && GroupNum <= 4) {
                            return this.pokerDeckList[GroupNum - 1];
                        }
                    }
                    break;
            }
            return null;
        };
        //收回牌到牌堆里面
        CardDeckData.prototype.AllCardBackToStart = function () {
            for (var i = 0; i < 4; i++) {
                this.BackToStart(this.pokerDeckList[i]);
            }
            this.BackToStart(this.ThreeCard);
            for (var i = 0; i < 7; i++) {
                this.BackToStart(this.pokerLineList[i]);
            }
            this.StartCard.data.SetLastCardBackIfNot();
            for (var i = 0; i < this.StartCard.data.pokerList.length; i++) {
                var poker = this.StartCard.data.pokerList[i];
                poker.render.img.removeSelf();
            }
            this.StartCard.FlushRender();
        };
        CardDeckData.prototype.BackToStart = function (pokerGroup) {
            var pokerData = pokerGroup.data;
            this.StartCard.data.Concat(pokerData);
            pokerGroup.FlushRender();
        };
        CardDeckData.prototype.SaveStartCardData = function () {
            this.cardListKeep.splice(0);
            for (var i = 0; i < this.StartCard.data.pokerList.length; i++) {
                var pokerdata = this.StartCard.data.pokerList[i];
                this.cardListKeep.push(pokerdata.data.Clone());
            }
        };
        CardDeckData.prototype.LoadStartCardData = function () {
            for (var i = 0; i < this.StartCard.data.pokerList.length && i < this.cardListKeep.length; i++) {
                var pokerdata = this.StartCard.data.pokerList[i];
                var keepData = this.cardListKeep[i];
                pokerdata.data.SetData(keepData);
                pokerdata.FlushRender();
            }
        };
        //重新开始发牌
        CardDeckData.prototype.RestartDearCard = function () {
            if (this.cardListKeep.length != 52) {
                return this.DearCard();
            }
            this.AllCardBackToStart();
            this.LoadStartCardData();
            return this.DearStartDeck();
        };
        //普通发牌
        CardDeckData.prototype.DearCard = function () {
            this.AllCardBackToStart();
            this.StartCard.data.ShuffleWithTime(3); //洗牌三次
            this.SaveStartCardData();
            return this.DearStartDeck();
        };
        //发新手指引牌
        CardDeckData.prototype.DearTutorialCard = function () {
            var tt = new pokerGame.TutorialCard();
            tt.SetTutorialCard(this);
            if (this.cardListKeep.length == 0) {
                this.SaveStartCardData();
            }
            return this.DearStartDeck();
        };
        CardDeckData.prototype.DearStartDeck = function () {
            this.DearCardArray = new Array();
            for (var i = 0; i < 7; i++) {
                var pGroup = this.StartCard.data.SplitePokerGroupByNum(i + 1);
                //pGroup.pokerList.reverse();
                this.DearCardArray.push(pGroup);
            }
            this.SetAllStartCardToBack();
            this.StartCard.FlushRender();
            return this.DearCardArray;
        };
        //动画播放完毕之后
        CardDeckData.prototype.connectDearCardArrayToRender = function (index, sortEndHandle) {
            var i = index;
            this.pokerLineList[i].data.Concat(this.DearCardArray[i]);
            this.pokerLineList[i].data.SetOnlyLastCardFront();
            this.pokerLineList[i].render.FlushPokerList(this.pokerLineList[i].data, false);
            this.pokerLineList[i].render.SortAndMoveToPos(sortEndHandle);
        };
        //开始卡组里面的所有卡片变成背面
        CardDeckData.prototype.SetAllStartCardToBack = function () {
            this.StartCard.data.SetAllCardToBack();
            this.StartCard.data.FlushAllCardRender();
        };
        //清理桌面
        CardDeckData.prototype.ClearTable = function (table) {
            for (var i = 0; i < 4; i++) {
                var spr = this.GetAceDeckSpriteRoot(i + 1);
                spr.removeChildren(0);
            }
            for (var i = 0; i < 7; i++) {
                var spr = this.GetLineSpriteRoot(i + 1);
                spr.removeChildren(0);
            }
            table.ThreeCard.removeChildren(0);
            table.StartCard.removeChildren(0);
        };
        CardDeckData.prototype.RemoveFromTable = function () {
            this.ClearTable(this.table);
            this.table = null;
            this.StartCard.data.RemoveAllCardRender();
            this.ThreeCard.data.RemoveAllCardRender();
            //四个堆数据
            for (var i = 0; i < 4; i++) {
                this.pokerDeckList[i].data.RemoveAllCardRender();
            }
            //七行数据
            for (var i = 0; i < 7; i++) {
                this.pokerLineList[i].data.RemoveAllCardRender();
            }
        };
        CardDeckData.prototype.AddToTable = function (table) {
            this.table = table;
            this.ClearTable(table);
            for (var i = 0; i < 4; i++) {
                var spr = this.GetAceDeckSpriteRoot(i + 1);
                spr.addChild(this.pokerDeckList[i].render);
            }
            table.ThreeCard.addChild(this.ThreeCard.render);
            table.StartCard.addChild(this.StartCard.render);
            for (var i = 0; i < 7; i++) {
                var spr = this.GetLineSpriteRoot(i + 1);
                spr.addChild(this.pokerLineList[i].render);
            }
        };
        return CardDeckData;
    }());
    pokerGame.CardDeckData = CardDeckData;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=CardDeckData.js.map