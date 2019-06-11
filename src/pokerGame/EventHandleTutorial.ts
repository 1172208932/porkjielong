/**
* 新手指引的事件处理 
*/
module pokerGame{
	export class EventHandleTutorial{
		constructor(){

		}

		public gameManager: GameManager;
		public SetGameManager(gameManager: GameManager) {
			this.gameManager = gameManager;
		
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnClickGameStartTutorial, this, this.OnClickGameStartTutorial);//开始新手指引
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.CheckNextTutorial, this, this.CheckNextTutorial);//新手指引下一步
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.EndTutorial, this, this.EndTutorial);//新手指引结束
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.FlushTutorialRender, this, this.FlushTutorialRender);//新手指引刷新
			
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.ShowLastTutorial, this, this.onShowLastTutorial);//新手指引最后一步
			
			
			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.OnGameStartTutorial, this, this.OnGameStartTutorial);//开始游戏 并开启新手指引

			GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.HideTutorial, this, this.EndTutorial);//新手指引隐藏

			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.OnClickQuitTutorial,this,this.OnClickQuitTutorial);//退出新手指引

		}
		private OnClickGameStartTutorial() {

			if(this.gameManager.UIManager.pokerTable.IsTutorialStart)
			{
				return;
			}

			
			if(!this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.IsCanDearCard())
			{
				return;
			}

			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.ClearTips);
			
			this.gameManager.UIManager.pokerTable.ChangeToNewPokerGroupAndKeepOld();
			this.OnGameStartTutorial();
		
		
		}
		
		//游戏开始新手指引
		private OnGameStartTutorial() {

			if(!this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.IsCanDearCard())
			{
				return;
			}

			this.gameManager.UIManager.pokerTable.pokerGroup.cardDecksData.SetGameMode(false,false);

			
			this.gameManager.UIManager.startGameUI.startGameUI.visible = false;

			this.gameManager.UIManager.pokerTable.DearCard(pokerUI.DearCardType.tutorial);//发牌
			this.gameManager.UIManager.pokerTop.RestartTimer();//重启计时器
			
			this.SetGameMainUIVisible(true);;
			this.StartTutorial();

			this.gameManager.userData.ClearTry();
			this.gameManager.UIManager.shopUI.FlushData(this.gameManager.userData);
			

		}
		private SetGameMainUIVisible( isVisible:boolean )
		{
			this.gameManager.UIManager.pokerTable.pokerTableUI.visible = isVisible;
			this.gameManager.UIManager.pokerTop.gameTopUI.visible =isVisible;
			this.gameManager.UIManager.pokerBottom.gameBottom.visible  =isVisible;

			if(!isVisible)
			{
				this.gameManager.UIManager.pokerPopup.gamePopup.visible  =isVisible;

			}
		}
		
		private StartTutorial()//开始新手指引
		{
			this.gameManager.UIManager.tutorialUI.StartTutorial();			
			this.gameManager.UIManager.pokerTable.SetTutorialMaskVisible(true);
			this.gameManager.UIManager.pokerTable.SetTutorialMaskClickToCloseTutorial(false);


		}
		private SetTutorialItem(item:gameconfig.tutorialItem)
		{
			//this.gameManager.UIManager.tutorialUI.tutorialHandAni.tutorialHandAni.removeSelf();

			if(item.Type!=null&&item.Type!=pokerDeckType.unKnowen)
			{
				this.SetTutorialItemRenderRoot(item.Type,item.NUM,item.INDEX,1);
			}
		
			if(item.Type2!=null&&item.Type2!=pokerDeckType.unKnowen)
			{
				
				this.SetTutorialItemRenderRoot(item.Type2,item.NUM2,item.INDEX2,2);
			}
			
		}
		private SetTutorialItemRenderRoot(Type:pokerGame.pokerDeckType,NUM:number,INDEX:number,RootNum:number)
		{		
			var deck=this.GetDeck(Type,NUM);
			if(deck.data.pokerList.length==0)
			{
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

			var pokerList=deck.data.pokerList;
			var lastIndex=pokerList.length-1;
			if(lastIndex<0)
			{
				return;
			}

			for(var i=(lastIndex-INDEX);i<=lastIndex;i++)
			{
				var pokerIMg=pokerList[i].render.img;
				this.gameManager.UIManager.pokerTable.SetCardRenderToTutorialSpriteRoot(pokerIMg,RootNum);

				if(RootNum==1&&i==(lastIndex-INDEX))
				{
			

					this.CheckTutorialTips(Type,NUM,i);

					//pokerIMg.parent.addChild(this.gameManager.UIManager.tutorialUI.tutorialHandAni.tutorialHandAni);
					//this.gameManager.UIManager.tutorialUI.tutorialHandAni.tutorialHandAni.pos(pokerIMg.x+50,pokerIMg.y+50);
				}
				if(RootNum==2)
				{
					pokerIMg.offAll();
				}
			}

			
		}
		private FlushTutorialRender()//新手指引刷新
		{
			//this.gameManager.UIManager.tutorialUI.ShowNextStepTutorial();
			if(this.gameManager.UIManager.pokerTable.IsTutorialStart)
			{
				var item= this.gameManager.UIManager.tutorialUI.GetTutorialItem();
				this.SetTutorialItem(item);
			}



		}
		private CheckTutorialTips(deckType:pokerDeckType,deckNum:number,index:number)
		{
			this.gameManager.UIManager.pokerTable.pokerGroup.cardTips.CheckTutorialTipsWithLoop(deckType,deckNum,index);
		}
		private GetDeck(type: pokerDeckType, GroupNum: number): poker.pokerChainGroup
		{
			if(type==pokerDeckType.Deck)
			{
				return this.FindAceDeckHaveCard();
			}
			else
			{
				return this.gameManager.UIManager.pokerTable.pokerGroup.cardDecksData.GetDeck(type,GroupNum);
			}
		
			
		}
		private FindAceDeckHaveCard():poker.pokerChainGroup
		{
			var tRet:poker.pokerChainGroup=null;
			for(var i=0;i<4;i++)
			{
				tRet= this.gameManager.UIManager.pokerTable.pokerGroup.cardDecksData.GetDeck(pokerDeckType.Deck,i+1);
				if(tRet.data.pokerList.length>0)
				{
					break;
				}
			}
			return tRet;
		}
		private CheckNextTutorial()//检测新手指引是否跳到下一步
		{
			var olditem= this.gameManager.UIManager.tutorialUI.GetTutorialItem();
			if(olditem==null)
			{
				this.gameManager.UIManager.tutorialUI.ShowNextStepTutorial();
				
			
			}
			else
			{

				var deck=this.GetDeck(olditem.Type,olditem.NUM);
				if(deck==null)
				{
					this.gameManager.UIManager.tutorialUI.ShowNextStepTutorial();
				}
				else
				{
					if(this.gameManager.UIManager.tutorialUI.stepDeckCardNum!=deck.data.pokerList.length)
					{
						this.gameManager.UIManager.tutorialUI.ShowNextStepTutorial();
						
					}

				}
				
			}

			
			var item= this.gameManager.UIManager.tutorialUI.GetTutorialItem();
			var deck2=this.GetDeck(item.Type,item.NUM);
			if(deck2==null)
			{
			
			}
			else
			{
				this.gameManager.UIManager.tutorialUI.stepDeckCardNum=deck2.data.pokerList.length;
				this.SetTutorialItem(item);
			}
	

		}
		private OnClickQuitTutorial()//点击退出新手指引
		{
			//if(this.gameManager.UIManager.pokerTable.can)
			if(!this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.IsCanChangeCard())
			{
				return;
			}


			this.gameManager.UIManager.pokerTable.pokerGroup.cardTips.ClearData();
			this.gameManager.UIManager.pokerTable.pokerGroup.cardTips.ClearTutorialTips();

			this.gameManager.UIManager.tutorialUI.HideTutorial();
			this.gameManager.UIManager.pokerTable.SetTutorialMaskVisible(false);

			this.gameManager.UIManager.pokerTable.EndTutorial();
			
			this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.EndTutorial();

			this.gameManager.UIManager.pokerTable.onChangeToKeep();
			//this.gameManager.UIManager.pokerTable.FlushBGImg();
			this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.FlushAllClickEvent();
			
	

		}
		private EndTutorial()//新手指引结束
		{
			if(	this.gameManager.UIManager.pokerTable.IsTutorialStart)
			{
				this.gameManager.UIManager.pokerTable.pokerGroup.cardTips.ClearData();
				this.gameManager.UIManager.pokerTable.pokerGroup.cardTips.ClearTutorialTips();

				this.gameManager.UIManager.tutorialUI.HideTutorial();
				this.gameManager.UIManager.pokerTable.SetTutorialMaskVisible(false);

				this.gameManager.UIManager.pokerTable.EndTutorial();
				
				this.gameManager.UIManager.pokerTable.pokerGroup.cardControls.EndTutorial();

				this.gameManager.UIManager.pokerTable.onChangeToKeep();
			}

	

			
		}
		private onShowLastTutorial()//显示新手指引最后一步
		{
			this.gameManager.UIManager.pokerTable.SetTutorialMaskClickToCloseTutorial(true);

		}
	}
}