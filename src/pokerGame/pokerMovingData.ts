/**
* 移动中的poker的数据结构体
*/
module pokerGame{
	export enum MovingType
	{
		clickMove,//点击移动
		backStep,//后撤
		showHiddenCard,//明牌
		autoBackToDeck//自动回4个A的牌堆中
	}
	
	export class pokerMovingData{
		constructor(){

		}
		public DragingGroup: poker.pokerChainGroup;//正在拖动的牌组

		
		public DragFromGroupType: pokerDeckType;//正在拖动的堆的类型
		public DragFromNum: number = 0;//正在拖动的组数字下标
		public DragFromGroupIndex:number;//切出来的时候的头的Index

		public DragFromDeckBackToFront:boolean=false;//拖进来的时候的那张卡是不是从背面 翻过来的

		public DragToGroupType: pokerDeckType;//正在拖动的堆的类型
		public DragToNum: number = 0;//正在拖动的组数字下标

		public IsNeedAddToStepRecord:boolean=false;//是否需要加入到记录中，用于回撤
		

		public moveType:MovingType=MovingType.clickMove;//移动类型

		public SetAutoMoveUPThreeCardLastCard(deckData:CardDeckData)
		{
			
				this.DragingGroup.render.x=0;
				this.DragingGroup.render.y=0;
				deckData.table.LineMove.x = deckData.table.ThreeCard.x;
				deckData.table.LineMove.y = deckData.table.ThreeCard.y;
	

				

				var pGroup=deckData.ThreeCard.data.SplitePokerGroupByNum(1);
				this.DragingGroup.data.Concat(pGroup);
				deckData.ThreeCard.FlushRender();

	
				//this.dragData.DragingGroup.render.renderMode;
				this.DragingGroup.render.renderMode=poker.PokerGroupRenderMode.lastOneCard;
				this.DragingGroup.FlushRender();
			
				this.DragingGroup.render.removeSelf();
				deckData.table.LineMove.addChild(this.DragingGroup.render);
				
				


				this.DragFromGroupType=pokerDeckType.threeCardDeck;
				this.DragFromNum=0;
				this.DragFromGroupIndex=deckData.ThreeCard.data.pokerList.length;
				
			
				this.moveType=MovingType.autoBackToDeck;//移动类型
		}
		public SetThreeCard(deckData:CardDeckData)//翻牌到三张卡组中,加入到动画draging记录器里面
		{
				var showCardNum = deckData.isThreeCardOnce ? 3 : 1;
				this.DragingGroup.render.x=0;
				this.DragingGroup.render.y=0;
				deckData.table.LineMove.x = deckData.table.StartCard.x;
				deckData.table.LineMove.y = deckData.table.StartCard.y;
				
				//this.DragMovingStartPos.x=deckData.table.LineMove.x;
				//this.DragMovingStartPos.y=deckData.table.LineMove.y;

				

				var pGroup=deckData.StartCard.data.SplitePokerGroupByNum(showCardNum);
				pGroup.pokerList.reverse();
				this.DragingGroup.data.Concat(pGroup);
				deckData.StartCard.FlushRender();

	
				//this.dragData.DragingGroup.render.renderMode;
				this.DragingGroup.render.renderMode=poker.PokerGroupRenderMode.lastThreeCard;
				this.DragingGroup.data.SetAllCardToFront();
				this.DragingGroup.data.FlushAllCardRender();
				this.DragingGroup.FlushRender(false);
				
				//this.dragData.DragingGroup.render.SortAndMoveToPos();

				this.DragingGroup.render.removeSelf();
				deckData.table.LineMove.addChild(this.DragingGroup.render);
				
				


				this.DragFromGroupType=pokerDeckType.startDeck;
				this.DragFromNum=0;
				this.DragFromGroupIndex=deckData.StartCard.data.pokerList.length;
				
				this.DragToGroupType=pokerDeckType.threeCardDeck;
				this.DragToNum=0;
				this.IsNeedAddToStepRecord=true;
				//this.IsBackStep=false;
				this.moveType=MovingType.clickMove;//移动类型
				
		}
		public SetDragDataBackToFromDeck(deckData:CardDeckData)//把拖动的数据放回原处
		{

			var deck= deckData.GetDeck(this.DragFromGroupType,this.DragFromNum);
			deck.data.Concat(this.DragingGroup.data);
			

		}
		public SetAutoBackCard(deckData:CardDeckData,LineNum:number,backDeckNum:number)
		{
				
				this.DragingGroup.render.x=0;
				this.DragingGroup.render.y=0;
				var lineDeck=deckData.GetDeck(pokerDeckType.Line,LineNum);
				var lineDeckRoot=deckData.GetDeckSpriteRoot(pokerDeckType.Line,LineNum);

				deckData.table.LineMove.x =lineDeckRoot.x;
				deckData.table.LineMove.y = lineDeckRoot.y;
				
				
				var lastIndex=lineDeck.data.GetLastCardIndex();
				
				this.DragingGroup.data.Concat(lineDeck.data.SplitePokerGroup(lastIndex));

				lineDeck.FlushRender(false);

	
				this.DragingGroup.render.renderMode=poker.PokerGroupRenderMode.line;
				this.DragingGroup.FlushRender();
				
			
				this.DragingGroup.render.removeSelf();
				deckData.table.LineMove.addChild(this.DragingGroup.render);
				
				


				this.DragFromGroupType=pokerDeckType.Line;
				this.DragFromNum=LineNum;
				this.DragFromGroupIndex=lastIndex;
				
				this.DragToGroupType=pokerDeckType.Deck;
				this.DragToNum=backDeckNum;
				this.IsNeedAddToStepRecord=false;
	
				this.moveType=MovingType.autoBackToDeck;//移动类型
		}
		public SetHidenCard(LineNum:number,deckData:CardDeckData,LastBackIndex:number)
		{
				this.DragingGroup.render.x=0;
				this.DragingGroup.render.y=0;
					var lineDeck=deckData.GetDeck(pokerDeckType.Line,LineNum);
						var lineDeckRoot=deckData.GetDeckSpriteRoot(pokerDeckType.Line,LineNum);

				deckData.table.LineMove.x =lineDeckRoot.x;
				deckData.table.LineMove.y = lineDeckRoot.y;
				
				
			
				
				this.DragingGroup.data.Concat(lineDeck.data.SplitePokerGroupFromFront(LastBackIndex));

				lineDeck.FlushRender(false);

	
				this.DragingGroup.render.renderMode=poker.PokerGroupRenderMode.line;
				this.DragingGroup.FlushRender();
				
			
				this.DragingGroup.render.removeSelf();
				deckData.table.LineMove.addChild(this.DragingGroup.render);
				
				


				this.DragFromGroupType=pokerDeckType.Line;
				this.DragFromNum=LineNum;
				this.DragFromGroupIndex=0;
				
				this.DragToGroupType=pokerDeckType.startDeck;
				this.DragToNum=0;
				this.IsNeedAddToStepRecord=false;
				//this.IsBackStep=false;
				this.moveType=MovingType.showHiddenCard;//移动类型

		}
		public SetBackStep(step:connectStep,deckData:CardDeckData)//后撤的操作加入到draging动画记录器里面
		{
				
				//var showCardNum = deckData.IsShowOneCardOnce ? 1 : 3;
				this.DragingGroup.render.x=0;
				this.DragingGroup.render.y=0;
				
				var toDeckRoot=deckData.GetDeckSpriteRoot(step.addToDeckType,step.addToDeckNum);
				
				
			
			
				var fromDeck=deckData.GetDeck(step.fromDeckType,step.fromDeckNum);
				var toDeck=deckData.GetDeck(step.addToDeckType,step.addToDeckNum);
				
				var spacingY=0;//线的后腿需要往下移动
				if(step.addToDeckType==pokerGame.pokerDeckType.Line)
				{
					spacingY=poker.pokerGroupRender.lineHeightSpacing*step.addToDeckIndex;

				}

				
				this.DragingGroup.data.Concat(toDeck.data.SplitePokerGroup(step.addToDeckIndex));
				this.DragingGroup.render.renderMode=poker.PokerGroupRenderMode.line;
				this.DragingGroup.FlushRender();
				toDeck.FlushRender();

				
				//this.dragData.DragingGroup.render.SortAndMoveToPos();

				this.DragingGroup.render.removeSelf();
				deckData.table.LineMove.addChild(this.DragingGroup.render);
				
				deckData.table.LineMove.x =toDeckRoot.x;
				deckData.table.LineMove.y = toDeckRoot.y+spacingY;

	

				

				this.DragFromGroupType=step.addToDeckType;
				this.DragFromNum=step.addToDeckNum;
				this.DragFromGroupIndex=step.addToDeckIndex;
				
				this.DragToGroupType=step.fromDeckType;
				this.DragToNum=step.fromDeckNum
				this.IsNeedAddToStepRecord=false;
				this.moveType=MovingType.backStep;//移动类型
		}

	}
}