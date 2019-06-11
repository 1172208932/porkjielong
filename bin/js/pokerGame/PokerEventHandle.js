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
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickSetting, this, this.onClickSetting);
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickBackToMainFromShop, this, this.onClickBackToMainFromShop);
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickShowPopup, this, this.onClickShowPopup);
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickNewGame, this, this.onClickNewGame);
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickRetry, this, this.onClickRetry);
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickEndGame, this, this.onClickEndGame);
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickBackStep, this, this.onClickBackStep); //回撤
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickLeftHandMode, this, this.onClickLeftHandMode); //点击左手模式
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickTips, this, this.onClickTips); //点击提示
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnClickShowAllHiddenCard, this, this.OnClickShowAllHiddenCard); //点击明牌
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnClickAutoBackToAceCardDeck, this, this.OnClickAutoBackToAceCardDeck); //点击自动
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onGameWin, this, this.onGameWin); //游戏胜利的时候
            //OnClickBuy
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnClickBuy, this, this.OnClickBuy); //购买
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnClickTry, this, this.OnClickTry); //试用
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.StartTutorial, this, this.StartTutorial); //开始新手指引
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.CheckNextTutorial, this, this.CheckNextTutorial); //新手指引下一步
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.EndTutorial, this, this.EndTutorial); //新手指引结束
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.FlushTutorialRender, this, this.FlushTutorialRender); //新手指引刷新
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.ShowLastTutorial, this, this.onShowLastTutorial); //新手指引最后一步
            //开始游戏 并开启新手指引
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnGameStartTutorial, this, this.OnGameStartTutorial); //开始游戏
        };
        //游戏开始新手指引
        PokerEventHandle.prototype.OnGameStartTutorial = function () {
            this.gameManager.UIManager.startGameUI.startGameUI.visible = false;
            this.gameManager.UIManager.pokerTable.DearCard(true); //发牌
            this.gameManager.UIManager.pokerTop.RestartTimer(); //重启计时器
            this.SetGameMainUIVisible(true);
            ;
            this.StartTutorial();
        };
        //游戏开始事件
        PokerEventHandle.prototype.OnGameStart = function () {
            this.gameManager.UIManager.startGameUI.startGameUI.visible = false;
            this.gameManager.UIManager.pokerTable.DearCard(); //发牌
            this.gameManager.UIManager.pokerTop.RestartTimer(); //重启计时器
            this.SetGameMainUIVisible(true);
            ;
        };
        //点击商店
        PokerEventHandle.prototype.OnClickShop = function () {
            this.gameManager.UIManager.startGameUI.startGameUI.visible = false;
            this.gameManager.UIManager.shopUI.shopUI.visible = true;
        };
        //点击挑战
        PokerEventHandle.prototype.onClickChallenge = function () {
        };
        //点击设置
        PokerEventHandle.prototype.onClickSetting = function () {
            this.gameManager.UIManager.settingUI.settingPopup.visible = true;
        };
        PokerEventHandle.prototype.onClickBackToMainFromShop = function () {
            this.gameManager.UIManager.shopUI.shopUI.visible = false;
            this.gameManager.UIManager.startGameUI.startGameUI.visible = true;
        };
        PokerEventHandle.prototype.SetGameMainUIVisible = function (isVisible) {
            this.gameManager.UIManager.pokerTable.pokerTableUI.visible = isVisible;
            this.gameManager.UIManager.pokerTop.gameTopUI.visible = isVisible;
            this.gameManager.UIManager.pokerBottom.gameBottom.visible = isVisible;
            if (!isVisible) {
                this.gameManager.UIManager.pokerPopup.gamePopup.visible = isVisible;
            }
        };
        //点击返回主界面
        PokerEventHandle.prototype.onClickBackToMain = function () {
            this.SetGameMainUIVisible(false);
            this.gameManager.UIManager.startGameUI.startGameUI.visible = true;
        };
        //主界面点击showpopup
        PokerEventHandle.prototype.onClickShowPopup = function () {
            this.gameManager.UIManager.pokerPopup.gamePopup.visible = true;
        };
        PokerEventHandle.prototype.onClickNewGame = function () {
            this.OnGameStart();
        };
        PokerEventHandle.prototype.onClickRetry = function () {
            this.OnGameStart();
        };
        PokerEventHandle.prototype.onClickEndGame = function () {
            this.onClickBackToMain();
        };
        //回撤 
        PokerEventHandle.prototype.onClickBackStep = function () {
            this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.BackStep();
        };
        //点击左手模式
        PokerEventHandle.prototype.onClickLeftHandMode = function (isSelected) {
            this.gameManager.UIManager.pokerTable.SetLeftMode(isSelected);
        };
        //点击提示
        PokerEventHandle.prototype.onClickTips = function () {
            //onClickTips
            this.gameManager.UIManager.pokerTable.pokerGroup.cardTips.onClickTips();
        };
        //点击明牌
        PokerEventHandle.prototype.OnClickShowAllHiddenCard = function () {
            this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.ShowAllHiddenCard();
        };
        //自动
        PokerEventHandle.prototype.OnClickAutoBackToAceCardDeck = function () {
            this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.AutoBackToAceCardDeck();
        };
        //显示胜利
        PokerEventHandle.prototype.onGameWin = function () {
            this.gameManager.UIManager.pokerTop.StopTimer();
            var text = this.gameManager.UIManager.pokerTop.GetTimeTextStr();
            this.gameManager.UIManager.winUI.ShowWin(text);
        };
        //购买
        PokerEventHandle.prototype.OnClickBuy = function (itemData) {
            console.debug("OnClickBuy=" + itemData.ItemName);
        };
        //试用
        PokerEventHandle.prototype.OnClickTry = function (itemData) {
            console.debug("OnClickTry=" + itemData.ItemName);
        };
        PokerEventHandle.prototype.StartTutorial = function () {
            this.gameManager.UIManager.tutorialUI.StartTutorial();
            this.gameManager.UIManager.pokerTable.SetTutorialMaskVisible(true);
            this.gameManager.UIManager.pokerTable.SetTutorialMaskClickToCloseTutorial(false);
        };
        PokerEventHandle.prototype.SetTutorialItem = function (item) {
            if (item.Type != null && item.Type != pokerGame.pokerDeckType.unKnowen) {
                this.SetTutorialItemRenderRoot(item.Type, item.NUM, item.INDEX);
            }
            if (item.Type2 != null && item.Type2 != pokerGame.pokerDeckType.unKnowen) {
                this.SetTutorialItemRenderRoot(item.Type2, item.NUM2, item.INDEX2);
            }
        };
        PokerEventHandle.prototype.SetTutorialItemRenderRoot = function (Type, NUM, INDEX) {
            var deck = this.gameManager.UIManager.pokerTable.pokerGroup.cardDecksData.GetDeck(Type, NUM);
            if (deck.data.pokerList.length == 0) {
                // var sprRoot= this.gameManager.UIManager.pokerTable.pokerGroup.cardDecksData.GetDeckSpriteRoot(Type,NUM);
                // if(sprRoot==null)
                // {
                // 	return;
                // }
                // var sprchild=sprRoot.getChildAt(0);
                // if(sprchild==null)
                // {
                // 	return;
                // }
                // var spr=<Laya.Sprite>sprchild.getChildAt(0);
                // if(spr!=null)
                // {
                // 	this.gameManager.UIManager.pokerTable.SetCardRenderToTutorialSpriteRoot(spr);
                // }
                return;
            }
            var pokerList = deck.data.pokerList;
            var lastIndex = pokerList.length - 1;
            if (lastIndex < 0) {
                return;
            }
            for (var i = (lastIndex - INDEX); i <= lastIndex; i++) {
                var pokerIMg = pokerList[i].render.img;
                this.gameManager.UIManager.pokerTable.SetCardRenderToTutorialSpriteRoot(pokerIMg);
            }
        };
        PokerEventHandle.prototype.FlushTutorialRender = function () {
            //this.gameManager.UIManager.tutorialUI.ShowNextStepTutorial();
            var item = this.gameManager.UIManager.tutorialUI.GetTutorialItem();
            this.SetTutorialItem(item);
        };
        PokerEventHandle.prototype.CheckNextTutorial = function () {
            var olditem = this.gameManager.UIManager.tutorialUI.GetTutorialItem();
            if (olditem == null) {
                this.gameManager.UIManager.tutorialUI.ShowNextStepTutorial();
            }
            else {
                var deck = this.gameManager.UIManager.pokerTable.pokerGroup.cardDecksData.GetDeck(olditem.Type, olditem.NUM);
                if (deck == null) {
                    this.gameManager.UIManager.tutorialUI.ShowNextStepTutorial();
                }
                else {
                    if (this.gameManager.UIManager.tutorialUI.stepDeckCardNum != deck.data.pokerList.length) {
                        this.gameManager.UIManager.tutorialUI.ShowNextStepTutorial();
                    }
                }
            }
            var item = this.gameManager.UIManager.tutorialUI.GetTutorialItem();
            var deck2 = this.gameManager.UIManager.pokerTable.pokerGroup.cardDecksData.GetDeck(item.Type, item.NUM);
            if (deck2 == null) {
            }
            else {
                this.gameManager.UIManager.tutorialUI.stepDeckCardNum = deck2.data.pokerList.length;
                this.SetTutorialItem(item);
            }
        };
        PokerEventHandle.prototype.EndTutorial = function () {
            this.gameManager.UIManager.tutorialUI.HideTutorial();
            this.gameManager.UIManager.pokerTable.SetTutorialMaskVisible(false);
        };
        PokerEventHandle.prototype.onShowLastTutorial = function () {
            this.gameManager.UIManager.pokerTable.SetTutorialMaskClickToCloseTutorial(true);
        };
        return PokerEventHandle;
    }());
    pokerGame.PokerEventHandle = PokerEventHandle;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=PokerEventHandle.js.map