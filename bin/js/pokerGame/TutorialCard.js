/**
* name
*/
var pokerGame;
(function (pokerGame) {
    var tutorialCard = /** @class */ (function () {
        function tutorialCard(posIndex, type, num) {
            this.posIndex = posIndex;
            this.pokertype = type;
            this.pokernum = num;
        }
        return tutorialCard;
    }());
    var TutorialCard = /** @class */ (function () {
        function TutorialCard() {
            //club = 1, //梅花
            //diamond =2,//方块
            //heart =3,//红桃
            //spade =4, //黑桃
            this.tutorialList = new Array();
            this.AddToTutorialCardArray(this.GetPosIndexByLine(1, 0), PokerType.club, 7); //梅花7
            this.AddToTutorialCardArray(this.GetPosIndexByLine(2, 0), PokerType.spade, 5); //黑桃5
            this.AddToTutorialCardArray(this.GetPosIndexByLine(3, 0), PokerType.diamond, 2); //方块2
            this.AddToTutorialCardArray(this.GetPosIndexByLine(3, 1), PokerType.diamond, 3); //方块3
            this.AddToTutorialCardArray(this.GetPosIndexByLine(3, 2), PokerType.heart, 12); //红桃Q
            this.AddToTutorialCardArray(this.GetPosIndexByLine(4, 0), PokerType.heart, 8); //红桃8
            this.AddToTutorialCardArray(this.GetPosIndexByLine(5, 0), PokerType.diamond, 1); //方块1
            this.AddToTutorialCardArray(this.GetPosIndexByLine(5, 1), PokerType.spade, 8); //黑桃8
            this.AddToTutorialCardArray(this.GetPosIndexByLine(5, 2), PokerType.club, 3); //梅花3
            this.AddToTutorialCardArray(this.GetPosIndexByLine(6, 0), PokerType.heart, 13); //红桃k
            this.AddToTutorialCardArray(this.GetPosIndexByLine(6, 1), PokerType.club, 4); //梅花4
            this.AddToTutorialCardArray(this.GetPosIndexByLine(7, 0), PokerType.heart, 10); //梅花4
            this.AddToTutorialCardArray(this.GetPosIndexByStartDeck(0), PokerType.club, 2); //梅花2
            this.AddToTutorialCardArray(this.GetPosIndexByStartDeck(1), PokerType.spade, 9); //黑桃9
        }
        TutorialCard.prototype.GetPosIndexByStartDeck = function (StartDeckIndex) {
            var PreCardNum = this.GetPreCardNumByLineNum(8); //前置卡片
            var index = 51 - PreCardNum - StartDeckIndex;
            return index;
        };
        TutorialCard.prototype.AddToTutorialCardArray = function (posIndex, type, num) {
            var card = new tutorialCard(posIndex, type, num);
            this.tutorialList.push(card);
        };
        TutorialCard.prototype.GetPosIndexByLine = function (lineNum, LineIndex) {
            var PreCardNum = this.GetPreCardNumByLineNum(lineNum); //前置卡片
            var index = 51 - PreCardNum - LineIndex;
            return index;
        };
        TutorialCard.prototype.GetPreCardNumByLineNum = function (lineNum) {
            var count = 0;
            for (var i = 0; i < lineNum; i++) {
                count += (i);
            }
            return count;
        };
        TutorialCard.prototype.SetTutorialCard = function (deckData) {
            var indexMap = new laya.utils.Dictionary();
            deckData.AllCardBackToStart();
            deckData.StartCard.data.ShuffleWithTime(3); //洗牌三次
            var pokerList = deckData.StartCard.data.pokerList;
            //建立索引映射表
            for (var i = 0; i < pokerList.length; i++) {
                var tpoker = pokerList[i];
                indexMap.set(tpoker.data.Getkey(), i);
            }
            for (var i = 0; i < this.tutorialList.length; i++) {
                var ttCard = this.tutorialList[i];
                var keytt = poker.pokerdata.Getkey(ttCard.pokertype, ttCard.pokernum);
                var indexNow = indexMap.get(keytt);
                var indexToSet = ttCard.posIndex;
                var cardFromTT = pokerList[indexNow];
                var cardToChange = pokerList[indexToSet];
                pokerList[indexNow] = cardToChange; //交换一下位置
                pokerList[indexToSet] = cardFromTT;
                var keyToChange = cardToChange.data.Getkey(); //映射表交换更新
                indexMap.set(keytt, indexToSet);
                indexMap.set(keyToChange, indexNow);
            }
            //deckData.
        };
        return TutorialCard;
    }());
    pokerGame.TutorialCard = TutorialCard;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=TutorialCard.js.map