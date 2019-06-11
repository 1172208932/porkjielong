/**
* 游戏的事件处理
*/
module pokerGame {
	export class EventHandlePoker {
		constructor() {

		}

		public gameManager: GameManager;
		public SetGameManager(gameManager: GameManager) {
			this.gameManager = gameManager;
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnGameStart, this, this.OnClickGameStart);
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnClickShop, this, this.OnClickShop);

			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickChallenge, this, this.onClickChallenge);
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickSetting, this, this.onClickSetting);

			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickBackToMainFromShop, this, this.onClickBackToMainFromShop);
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickShowPopup, this, this.onClickShowPopup);




			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickNewGame, this, this.onClickNewGame);
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickRetry, this, this.onClickRetry);
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickEndGame, this, this.onClickEndGame);



			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickBackStep, this, this.onClickBackStep);//回撤
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickTips, this, this.onClickTips);//点击提示

			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnClickShowAllHiddenCard, this, this.OnClickShowAllHiddenCard);//点击明牌
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnClickAutoBackToAceCardDeck, this, this.OnClickAutoBackToAceCardDeck);//点击自动

			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onGameWin, this, this.onGameWin);//游戏胜利的时候

			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.ClearTips,this,this.ClearTips);
			
			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.onClickShopInGame,this,this.onClickShopInGame);
			
			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.onClickCLoseConfirmAutoPlayUI,this,this.onClickCLoseConfirmAutoPlayUI);
			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.onShareWeChatSuccesse,this,this.onShareWeChatSuccesse);

			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.CheckAutoPlay,this,this.CheckAutoPlay);
			
			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.ShowHiddenCard,this,this.ShowHiddenCard);
		
			
			
			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.UpdateGoldUI,this,this.UpdateGoldUI);
			
			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.onTableUILoadedDone,this,this.onTableUILoadedDone);

			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.onClickGoldUseShowCard,this,this.onClickGoldUseShowCard);
			
		

		}
		private onTableUILoadedDone()
		{
			if(this.gameManager.UIManager.IsAllTableUILoadDone())
			{
				this.gameManager.UIManager.pokerTable.tableTopUI=this.gameManager.UIManager.pokerTop;
				this.gameManager.UIManager.pokerTable.tableBottomUI=this.gameManager.UIManager.pokerBottom;
				

				GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.onALLTableUILoadedDone);
			}
		}
		private onClickShopInGame()
		{
			this.gameManager.UIManager.shopUI.OpenShop(true);

		}
		private OnClickGameStart() {
			this.OnGameStart();
			

		}
		private ClearTips()
		{
			this.gameManager.UIManager.pokerTable.pokerGroup.cardTips.ClearData();
			this.gameManager.UIManager.pokerTable.pokerGroup.cardTips.ClearTutorialTips();

		}

		//游戏开始事件
		private OnGameStart() {
			
			
			this.GamePlayStart(false);

		}
		private GamePlayStart(IsRetry:boolean) {

			if(!this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.IsCanDearCard())
			{
				return;
			}

			this.gameManager.UIManager.challengeUI.FlushChallengeDateStr();//刷新挑战字符串
			this.gameManager.UIManager.pokerTable.FlushBGImg();
			pokerRender.ReadSkin();
			if (this.gameManager.userData.isFirstPlay && GameMain.app.mWX.fhOnoff != 0 ) {//第一次玩的话 开启新手指引
			 
				this.gameManager.userData.SetFirstPlay(false);
				GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnGameStartTutorial);

			}
			else {
				GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.HideTutorial);

				this.gameManager.UIManager.pokerTable.pokerGroup.cardDecksData.SetGameModeByUserData(this.gameManager.userData);
				this.gameManager.UIManager.startGameUI.startGameUI.visible = false;
				this.gameManager.UIManager.pokerTable.DearCard(IsRetry?pokerUI.DearCardType.retry:pokerUI.DearCardType.normal);//发牌
				this.gameManager.UIManager.pokerTop.RestartTimer();//重启计时器

				this.SetGameMainUIVisible(true);;
			}

			this.gameManager.userData.ClearTry();
			this.gameManager.UIManager.shopUI.FlushData(this.gameManager.userData);
		}
		//点击商店
		private OnClickShop() {

			this.gameManager.UIManager.startGameUI.startGameUI.visible = false;
			
			this.gameManager.UIManager.shopUI.OpenShop(false);
			
			
		}

		//点击挑战
		private onClickChallenge() {

			this.gameManager.UIManager.challengeUI.SetVisible(true);
	
			
		}

		//点击设置
		private onClickSetting() {

			this.gameManager.UIManager.settingUI.settingPopup.visible = true;
			
			
		}
		//从商店返回
		private onClickBackToMainFromShop() {
			this.gameManager.UIManager.shopUI.shopUI.visible = false;
			this.gameManager.UIManager.startGameUI.startGameUI.visible = true;
			
			

		}
		private SetGameMainUIVisible(isVisible: boolean) {
			this.gameManager.UIManager.pokerTable.pokerTableUI.visible = isVisible;
			this.gameManager.UIManager.pokerTop.gameTopUI.visible = isVisible;
			this.gameManager.UIManager.pokerBottom.gameBottom.visible = isVisible;

			if (!isVisible) {
				this.gameManager.UIManager.pokerPopup.gamePopup.visible = isVisible;

			}
		}


		//点击返回主界面
		private onClickBackToMain() {
			this.SetGameMainUIVisible(false);

			this.gameManager.UIManager.startGameUI.startGameUI.visible = true;
			 
			

		}

		//主界面点击showpopup
		private onClickShowPopup() {
			this.gameManager.UIManager.pokerPopup.gamePopup.visible = true;
			
			
		}

		private onClickNewGame() {
			this.OnGameStart();
			 
			
		}
		private onClickRetry() {
				this.GamePlayStart(true);
			 
			
		}
		private onClickEndGame() {
			this.onClickBackToMain();
			 
			
		}

		//回撤 
		private onClickBackStep() {

			this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.BackStep();
			 

		}

		//点击提示
		private onClickTips() {
			//onClickTips
			this.gameManager.UIManager.pokerTable.pokerGroup.cardTips.onClickTips();
			 
			
		}

		//点击明牌
		private OnClickShowAllHiddenCard() {
			
			if(this.gameManager.UIManager.pokerTable.IsTutorialStart)
			{
				return;
			}

			if(!this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.IsCanUseShowHiddenCardItem())
			{
				GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.ShowMessage,[10010]);
				return;
			}
			//
			this.gameManager.UIManager.confirmShowCard.confirmShowCardUI.visible=true;
			 
			
		}
		//开始明牌
		private ShowHiddenCard()
		{
			this.gameManager.UIManager.confirmShowCard.confirmShowCardUI.visible=false;
			this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.ShowAllHiddenCard();
		}

		//自动
		private OnClickAutoBackToAceCardDeck() {
			if(!this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.GetIsAutoBacking())
			{
				this.gameManager.UIManager.confirmAutoPlayUI.confirmAutoPlayUI.visible=true;
				this.gameManager.UIManager.pokerBottom.SetAutoEnable(false);
			}
			

			
		}
		//显示胜利
		private onGameWin() {
			this.gameManager.UIManager.pokerTop.StopTimer();
			var text = this.gameManager.UIManager.pokerTop.GetTimeTextStr();
			this.gameManager.UIManager.winUI.ShowWin(text);


			if(pokerUI.challenge.nowChallengeDateStr!=null&&pokerUI.challenge.nowChallengeDateStr.length==8)//挑战成功
			{
				this.gameManager.userData.addTochallengeMap(pokerUI.challenge.nowChallengeDateStr);
				pokerUI.challenge.nowChallengeDateStr=null;
			}

			this.gameManager.userData.AddGold(this.gameManager.userData.compliteOneGameGoldGain);

		}
		//检测是否要弹出自动
		private CheckAutoPlay()
		{
			if(this.gameManager.UIManager.confirmAutoPlayUI.confirmAutoPlayUI.visible)
			{
				return;
			}



			if(this.gameManager.UIManager.pokerBottom.IsAutoEnable())
			{
				return;
			}

			if(this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.GetIsAutoBacking())
			{
				return;
			}

			if(!this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.IsHaveHiddenCard())
			{
				this.gameManager.UIManager.confirmAutoPlayUI.confirmAutoPlayUI.visible=true;
				return;
			}


			
		}

		//微信分享成功
		private onShareWeChatSuccesse()
		{	
			this.gameManager.UIManager.confirmAutoPlayUI.confirmAutoPlayUI.visible=false;
			this.gameManager.UIManager.pokerBottom.SetAutoEnable(false);
			if(!this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.GetIsAutoBacking())
			{

			//	if(!this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.IsHaveHiddenCard())
				{
					this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.AutoBack();
				}

			}


		}

		//关闭自动完成确认按钮
		private onClickCLoseConfirmAutoPlayUI()
		{	
			if(!this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.GetIsAutoBacking())
			{
				this.gameManager.UIManager.pokerBottom.SetAutoEnable(true);
			}

		}

		//更新金币显示
		private UpdateGoldUI()
		{	
			var goldNum=this.gameManager.userData.Gold;
			if(this.gameManager.UIManager.pokerTop!=null)
			{
				this.gameManager.UIManager.pokerTop.SetGoldText(goldNum.toString());
			}
			if(this.gameManager.UIManager.shopUI!=null)
			{
				this.gameManager.UIManager.shopUI.SetGoldText(goldNum.toString());
			}
			

		}
		//点击金币使用明牌
		private onClickGoldUseShowCard()
		{
			if(!this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.IsCanUseShowHiddenCardItem())
			{
				GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.ShowMessage,[10010]);
				return;
			}

			if(this.gameManager.userData.IsHaveGold(this.gameManager.userData.showCardNeedGold))//检测金币是否足够
			{
				this.gameManager.userData.AddGold(-this.gameManager.userData.showCardNeedGold);
				GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.ShowHiddenCard);
			}
			else
			{
				GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.ShowMessage,[10009]);
			}

		}





	}
}