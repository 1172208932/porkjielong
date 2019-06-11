
 /**
* 牌桌界面
*/
module pokerUI{

	export enum DearCardType
	{
		normal,
		tutorial,
		retry
	}

	export class pokerTable{
		
		private pokerGroupKeep:pokerGame.pokerTableData;//新手指引的时候保留原有的TableGroup


		public pokerGroup:pokerGame.pokerTableData;
		public pokerTableUI:ui.poker.pokerTableUI;
		public tableTopUI:gameTop;
		public tableBottomUI:gameBottom;

		public messageConfig:gameconfig.messageConfig;

		
		constructor(){

			this.InitTable();
		
		}

		private InitTable()
		{
			//加载图集资源，加载成功后添加到舞台
			Laya.loader.load([{url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onPokerTableUILoaded));  
			this.messageConfig=new gameconfig.messageConfig();
			this.messageConfig.StartLoad(null);

			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.onALLTableUILoadedDone,this,this.onALLTableUILoadedDone);

		}
		private LineDeckList:Array<Laya.Point>=new Array<Laya.Point>();
		private ADeckList:Array<Laya.Point>=new Array<Laya.Point>();
		private threeCardDeckPos:Laya.Point;
		private startCardDeckPos:Laya.Point;
		private IsLeftMode:boolean=false;
		private LineMaxX:number=0;//桌面中的牌堆中的最大的那个X, 左右置换的时候计算用
		private LineMinX:number=0;//桌面中的牌堆中的最小的那个X, 左右置换的时候计算用
		
		private StartDeckMaxX:number=0;//桌面中的牌堆中的最大的那个X, 左右置换的时候计算用
		private StartDeckMinX:number=0;//桌面中的牌堆中的最小的那个X, 左右置换的时候计算用

		private ThreecardPosPluse:number=0;

		public IsTutorialStart:boolean=false;//是否为新手指引
		public SetLeftMode(isLeftMode:boolean)
		{
			if(this.IsLeftMode!=isLeftMode)
			{
				this.IsLeftMode=isLeftMode;
				this.FlushTablePos();


			}

		}
		private FlushTablePos()
		{

			this.SetPos(this.pokerTableUI.Deck1,this.ADeckList[0],false);
			this.SetPos(this.pokerTableUI.Deck2,this.ADeckList[1],false);
			this.SetPos(this.pokerTableUI.Deck3,this.ADeckList[2],false);
			this.SetPos(this.pokerTableUI.Deck4,this.ADeckList[3],false);
			
			this.SetPos(this.pokerTableUI.ThreeCard,this.threeCardDeckPos,false);
			this.SetPos(this.pokerTableUI.StartCard,this.startCardDeckPos,false);

			this.SetPos(this.pokerTableUI.Line1,this.LineDeckList[0],true);
			this.SetPos(this.pokerTableUI.Line2,this.LineDeckList[1],true);
			this.SetPos(this.pokerTableUI.Line3,this.LineDeckList[2],true);
			this.SetPos(this.pokerTableUI.Line4,this.LineDeckList[3],true);
			this.SetPos(this.pokerTableUI.Line5,this.LineDeckList[4],true);
			this.SetPos(this.pokerTableUI.Line6,this.LineDeckList[5],true);
			this.SetPos(this.pokerTableUI.Line7,this.LineDeckList[6],true);

			if(this.IsLeftMode)
			{
				this.pokerTableUI.ThreeCard.x=this.pokerTableUI.StartCard.x+this.ThreecardPosPluse;
			}
		

		}
		private SetPos(node:Laya.Sprite, pos:Laya.Point,IsLine:boolean):Laya.Point
		{	
			var tRet:Laya.Point=new Laya.Point(pos.x,pos.y);


			if(this.IsLeftMode)
			{
				if(IsLine)
				{
					 tRet.x= this.LineMaxX-tRet.x+this.LineMinX;
				}
				else
				{
					 tRet.x= this.StartDeckMaxX-tRet.x+this.StartDeckMinX;
				}
				

			}
			node.pos(tRet.x,tRet.y);

			return tRet;


		}
		//注册位置
		private initDeckPos()
		{
			
			this.ADeckList.push(new Laya.Point( this.pokerTableUI.Deck1.x,this.pokerTableUI.Deck1.y));
			this.ADeckList.push(new Laya.Point( this.pokerTableUI.Deck2.x,this.pokerTableUI.Deck2.y));
			this.ADeckList.push(new Laya.Point( this.pokerTableUI.Deck3.x,this.pokerTableUI.Deck3.y));
			this.ADeckList.push(new Laya.Point( this.pokerTableUI.Deck4.x,this.pokerTableUI.Deck4.y));


			this.LineDeckList.push(new Laya.Point( this.pokerTableUI.Line1.x,this.pokerTableUI.Line1.y));
			this.LineDeckList.push(new Laya.Point( this.pokerTableUI.Line2.x,this.pokerTableUI.Line2.y));
			this.LineDeckList.push(new Laya.Point( this.pokerTableUI.Line3.x,this.pokerTableUI.Line3.y));
			this.LineDeckList.push(new Laya.Point( this.pokerTableUI.Line4.x,this.pokerTableUI.Line4.y));
			this.LineDeckList.push(new Laya.Point( this.pokerTableUI.Line5.x,this.pokerTableUI.Line5.y));
			this.LineDeckList.push(new Laya.Point( this.pokerTableUI.Line6.x,this.pokerTableUI.Line6.y));
			this.LineDeckList.push(new Laya.Point( this.pokerTableUI.Line7.x,this.pokerTableUI.Line7.y));
			this.LineMaxX =this.pokerTableUI.Line7.x;
			this.LineMinX =this.pokerTableUI.Line1.x;
			
			this.threeCardDeckPos=new Laya.Point( this.pokerTableUI.ThreeCard.x,this.pokerTableUI.ThreeCard.y);
			this.startCardDeckPos=new  Laya.Point( this.pokerTableUI.StartCard.x,this.pokerTableUI.StartCard.y);
			this.StartDeckMaxX= this.pokerTableUI.StartCard.x;
			this.StartDeckMinX=this.pokerTableUI.Deck1.x;
			this.ThreecardPosPluse=this.pokerTableUI.ThreeCard.x- this.pokerTableUI.Deck4.x;

			//this.pokerTableUI.tutorialCardSpr
			this.pokerTableUI.tutorialMask.visible=false;



		}
		public SetTutorialMaskClickToCloseTutorial(isON:boolean)
		{
			if(isON)
			{
				this.pokerTableUI.tutorialMask.on(Laya.Event.CLICK,this,this.CloseTutorial);

			}
			else
			{
				this.pokerTableUI.tutorialMask.offAll();
			}
			
		}
		private CloseTutorial()
		{
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.EndTutorial);
			this.pokerTableUI.tutorialMask.offAll();
		}

		public SetTutorialMaskVisible(visible:boolean)
		{
			this.pokerTableUI.tutorialMask.visible=visible;
		}
		public SetCardRenderToTutorialSpriteRoot(cardRender:Laya.Sprite,RootNum:number)
		{
			var parentRoot=<Laya.Sprite> cardRender.parent.parent;

			var parentPos=new Laya.Point(parentRoot.x ,parentRoot.y);

			var pos=new Laya.Point(cardRender.x ,cardRender.y);
			cardRender.removeSelf();
			if(RootNum==1)
			{
				this.pokerTableUI.tutorialCardSpr1.addChild(cardRender);
				var parspr1=<Laya.Sprite>this.pokerTableUI.tutorialCardSpr1.parent;
				parspr1.pos(parentPos.x,parentPos.y);

			}
			else if(RootNum==2)
			{
				this.pokerTableUI.tutorialCardSpr2.addChild(cardRender);
				var parspr2=<Laya.Sprite>this.pokerTableUI.tutorialCardSpr2.parent;
				parspr2.pos(parentPos.x,parentPos.y);
			}
		
			cardRender.pos(pos.x,pos.y);
			//this.pokerTableUI.tutorialCardSpr.pos(parentPos,parentPos);

		}

		//桌面所有UI加载完毕时回调（包括桌面上半部分跟下半部分的操作UI）
		private onALLTableUILoadedDone()
		{
			this.pokerGroup.AddToTable(this.pokerTableUI,this.tableTopUI.gameTopUI,this.tableBottomUI.gameBottom);
		}
		private onPokerTableUILoaded()
		{
			if(this.pokerTableUI==null)
			{
				this.pokerTableUI = new ui.poker.pokerTableUI();
				Laya.stage.addChild(this.pokerTableUI);
				this.pokerTableUI.visible=false;
				this.initDeckPos();

				
			}
			if(this.pokerGroup==null)
			{
				this.pokerGroup=new pokerGame.pokerTableData();
				
				
			}
			
			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.onTableUILoadedDone);

		}
		//点击规则，临时切换到新手指引的时候  保留原有卡牌  切换到新的牌组
		public ChangeToNewPokerGroupAndKeepOld()
		{
			if(this.pokerGroupKeep==null)
			{
				this.pokerGroupKeep=new pokerGame.pokerTableData();
			}
	
			this.onChangeToKeep();
		

		


		}
		//切换回keep的牌 
		public onChangeToKeep()
		{
			if(this.pokerGroupKeep==null)
			{
				return;
			}
			 this.pokerGroup.timerCountKeep=this.tableTopUI.timerCount;
			 this.pokerGroup.RemoveFromTable();

			 //交换
			 var tempGroup=this.pokerGroup;
			 this.pokerGroup=this.pokerGroupKeep;
			 this.pokerGroupKeep=tempGroup;

			
			 //加入桌面中	
			this.pokerGroup.AddToTable(this.pokerTableUI,this.tableTopUI.gameTopUI,this.tableBottomUI.gameBottom);

			this.pokerGroup.cardDecksData.FlushAllPokerRender();
			this.RestartTimer(this.pokerGroup.timerCountKeep);

		}

		public FlushAllPoker()
		{
			this.pokerGroup.cardDecksData.FlushAllPokerRender();

		}

		public FlushAllCardRender()
		{
			this.pokerGroup.cardDecksData.FlushAllCardRender();
		
		}
		public FlushBGImg()
		{
			//console.debug("FlushBGImg");
			if(pokerUI.shop.ItemSelectedInPage1!=null)
			{
				//this.pokerTableUI.BGImg.skin=pokerUI.shop.ItemSelectedInPage1.ItemIcon;

				//console.debug("ItemSelectedInPage1="+pokerUI.shop.ItemSelectedInPage1.ItemIcon);
				//Laya.loader.load(pokerUI.shop.ItemSelectedInPage1.ItemAtlas,Laya.Handler.create(this,this.onLoadedBGImg));
				//Laya.loader.load([{url:pokerUI.shop.ItemSelectedInPage1.ItemAtlas, type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onLoadedBGImg));
				this.onLoadedBGImg();
			}
			
		}
		private onLoadedBGImg()
		{
			// if(this.pokerTableUI.BGImg.skin!=pokerUI.shop.ItemSelectedInPage1.ItemIcon)
			// {
				
			// 	//console.debug("FlushBGImg iconskin="+pokerUI.shop.ItemSelectedInPage1.ItemIcon);
			// 	this.pokerTableUI.BGImg.skin=pokerUI.shop.ItemSelectedInPage1.ItemIcon;
			// }
			
		}
		//发牌
		public DearCard(type:DearCardType)
		{
			
			this.IsTutorialStart=type==DearCardType.tutorial;
			
			switch(type)
			{
				case DearCardType.tutorial:
				this.pokerGroup.cardControls.DearTutorialCard();//新手指引发牌
				break;
				case DearCardType.normal:
					this.pokerGroup.cardControls.DearCard(false);
				break;
				case DearCardType.retry:
					this.pokerGroup.cardControls.DearCard(true);
				break;
			}
		
			
			this.RestartTimer();

			pokerGame.SoundPlayer.PlaySound(2);
				
		}
		public EndTutorial()
		{
			this.IsTutorialStart=false;
			
		}
		private RestartTimer(timeCount:number=0)
		{
			this.tableTopUI.RestartTimer(timeCount);
		}
		public GetMessage(messageID:number):string
		{
			var message:string= this.messageConfig.GetMessage(messageID);
			return message;
		}
		public ShowMessage(message:string)
		{
			if(!this.pokerTableUI.visible)
			{
				return;
			}
			//var message:string= this.messageConfig.GetMessage(messageID);
			if(message!=null && GameMain.app.mWX.fhOnoff != 0)
			{
				this.pokerTableUI.message.text=message;
				this.pokerTableUI.message.alpha=1;
				Laya.Tween.clearAll(this.pokerTableUI.message);
				Laya.Tween.to(this.pokerTableUI.message,{alpha:0},2000,Laya.Ease.sineInOut,null,0);
			}


		}



	}
}