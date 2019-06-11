/**
* 牌桌逻辑
*/
module pokerGame {
	export class CardDeckData {

		/**
		设置相关

		*/
		
		public isThreeCardOnce: boolean = true;//是否只翻一张
		public IsLasvigasMode: boolean = true;//是否是拉斯维加斯模式
		private LasvigasModeCount:number = 0;

		private cardListKeep:Array<poker.pokerdata>=new Array<poker.pokerdata>();//发牌之后保存的卡牌数据,用来重来一次

		

		public IsCanTabBackToStart()//检查拉斯维加斯模式
		{
			if(this.IsLasvigasMode)
			{
				return this.LasvigasModeCount>0;
			}

			return true;
		}
		public TabBackToStartOnce()//检查拉斯维加斯模式的时候 count--
		{
			if(this.IsLasvigasMode)
			{
				return this.LasvigasModeCount--;
			}
		}
		public SetGameModeByUserData(userData:UserData)
		{
			this.SetGameMode(userData.isThreeCardOnce,userData.isVigasMode);
		}
		public SetGameMode(isThreeCardOnce:boolean,IsLasvigasMode:boolean)
		{
			this.isThreeCardOnce=isThreeCardOnce;
			this.IsLasvigasMode=IsLasvigasMode;
			if(this,IsLasvigasMode)
			{
				this.LasvigasModeCount = 3;
			}
		}


		public table: ui.poker.pokerTableUI;//牌桌UI

		public ThreeCard: poker.pokerChainGroup = new poker.pokerChainGroup(poker.PokerGroupRenderMode.lastThreeCard);//三张牌的显示
		public StartCard: poker.pokerChainGroup = new poker.pokerChainGroup(poker.PokerGroupRenderMode.lastOneCard);//开始的牌堆
		public pokerLineList: Array<poker.pokerChainGroup> = new Array<poker.pokerChainGroup>();//牌线 1-7
		public pokerDeckList: Array<poker.pokerChainGroup> = new Array<poker.pokerChainGroup>();//四个堆

		public connectStepList: Array<pokerGame.connectStep> = new Array<pokerGame.connectStep>();//连接的历史记录,用来做回退

		constructor() {
			
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
		public FlushAllPokerRender()
		{
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

		}

		public FlushAllCardRender()
		{
			
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

			

		}

		//新增一步历史记录
		public AddStep(toType: pokerDeckType, toNum: number, toLength: number, fromType: pokerDeckType, fromNum: number,fromBackToFront:boolean) {
			var step = new connectStep(toType, toNum, toLength, fromType, fromNum,fromBackToFront);
			this.connectStepList.push(step);

		}
		public ClearStep()
		{
			this.connectStepList.splice(0);
		}
		
		//获得最后一步回撤历史记录
		public GetLastBackStep():connectStep {
			if (this.connectStepList.length <= 0) {
				return null;
			}
			var lastIndex = this.connectStepList.length - 1;

			var lastStep = this.connectStepList[lastIndex];
			return lastStep;

		}

	

		//数据回退一步历史记录
		public BackStep():connectStep {
			if (this.connectStepList.length <= 0) {
				return null;
			}
			var lastIndex = this.connectStepList.length - 1;

			var lastStep = this.connectStepList[lastIndex];

			var toGroup=this.GetDeck(lastStep.addToDeckType,lastStep.addToDeckNum);
			var fromGroup=this.GetDeck(lastStep.fromDeckType,lastStep.fromDeckNum);


			if(lastStep.isFromDeckChangeToFront)//是否需要变回卡背
			{
				var lastcard = fromGroup.data.GetLastCard();
				if(lastcard!=null)
				{
					lastcard.data.IsCardBack = true;
				}

			}

			var datatoConnect=toGroup.data.SplitePokerGroup(lastStep.addToDeckIndex);
			if(lastStep.fromDeckType==pokerDeckType.startDeck)
			{
				//this.StartCard.data.pokerList.reverse();
				datatoConnect.pokerList.reverse();
			}

			
		
			fromGroup.data.Concat(datatoConnect);
			
			if(lastStep.fromDeckType==pokerDeckType.startDeck)
			{
				fromGroup.data.SetAllCardToBack();
			}
		


			toGroup.FlushRender();
			fromGroup.FlushRender();

			this.connectStepList.splice(lastIndex);
			
			return lastStep;

		}

		private GetAceDeckSpriteRoot(deckNum:number): Laya.Sprite
		{
			switch(deckNum)
			{
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
		}
		private GetLineSpriteRoot(lineNum:number): Laya.Sprite
		{
			switch(lineNum)
			{
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
		}
		public GetDeckSpriteRoot(type: pokerDeckType, GroupNum: number): Laya.Sprite {
			var tRet: Laya.Sprite = null;
			switch (type) {
				case pokerDeckType.startDeck:
					return this.table.StartCard;

				case pokerDeckType.threeCardDeck:
					return this.table.ThreeCard;
					
				case pokerDeckType.Line:
					{
						if (GroupNum > 0 && GroupNum <= 7) {
							return this.GetLineSpriteRoot(GroupNum);
						}
					}
					break;
				case pokerDeckType.Deck:
					{
						if (GroupNum > 0 && GroupNum <= 4) {
							return this.GetAceDeckSpriteRoot(GroupNum);
						}
					}
					break;
			}

			return null;
			
		}
	
		public GetDeck(type: pokerDeckType, GroupNum: number): poker.pokerChainGroup {
			var tRet: poker.pokerChainGroup = null;
			switch (type) {
				case pokerDeckType.startDeck:

					return this.StartCard;
				case pokerDeckType.threeCardDeck:

					return this.ThreeCard;
				case pokerDeckType.Line:
					{
						if (GroupNum > 0 && GroupNum <= 7) {
							return this.pokerLineList[GroupNum - 1];
						}
					}
					break;
				case pokerDeckType.Deck:
					{
						if (GroupNum > 0 && GroupNum <= 4) {
							return this.pokerDeckList[GroupNum - 1];
						}
					}
					break;
			}

			return null;

		}


		//收回牌到牌堆里面
		public AllCardBackToStart() {
			for (var i = 0; i < 4; i++) {
				this.BackToStart(this.pokerDeckList[i]);
			}


			this.BackToStart(this.ThreeCard);

			for (var i = 0; i < 7; i++) {
				this.BackToStart(this.pokerLineList[i]);

			}

			this.StartCard.data.SetLastCardBackIfNot();

			for(var i=0;i<this.StartCard.data.pokerList.length;i++)
			{
				var poker= this.StartCard.data.pokerList[i];
				poker.render.img.removeSelf();
			}
			
			this.StartCard.FlushRender();


		}
		public BackToStart(pokerGroup: poker.pokerChainGroup) {
			var pokerData: poker.pokerGroupData = pokerGroup.data;


			this.StartCard.data.Concat(pokerData);
			pokerGroup.FlushRender();

		}

		private SaveStartCardData()//存开始的牌，用来重来一次
		{
			this.cardListKeep.splice(0);
			for(var i=0;i<this.StartCard.data.pokerList.length;i++)
			{
				var pokerdata=this.StartCard.data.pokerList[i];
				this.cardListKeep.push(pokerdata.data.Clone());
			}
			

		}
		private LoadStartCardData()//加载存的开始的牌
		{
			for(var i=0;i<this.StartCard.data.pokerList.length&&i<this.cardListKeep.length;i++)
			{
				var pokerdata=this.StartCard.data.pokerList[i];
				var keepData= this.cardListKeep[i];
				pokerdata.data.SetData(keepData);
				pokerdata.FlushRender();
			}
		
		}

		private DearCardArray:Array<poker.pokerGroupData>;//发牌的数组
		//重新开始发牌
		public RestartDearCard():Array<poker.pokerGroupData> {
			if(this.cardListKeep.length!=52)
			{
				return this.DearCard();
			}
			this.AllCardBackToStart();
			this.LoadStartCardData();

			return this.DearStartDeck();
		}
		//普通发牌
		public DearCard():Array<poker.pokerGroupData> {

			this.AllCardBackToStart();
			this.StartCard.data.ShuffleWithTime(3);//洗牌三次
			this.SaveStartCardData();


			return this.DearStartDeck();

		}
		//发新手指引牌
		public DearTutorialCard():Array<poker.pokerGroupData> {

			var tt=new TutorialCard();
			tt.SetTutorialCard(this);
			if(this.cardListKeep.length==0)
			{
				this.SaveStartCardData();
			}
			

			return this.DearStartDeck();
		}

		private DearStartDeck():Array<poker.pokerGroupData>
		{
				this.DearCardArray=new Array<poker.pokerGroupData>();
			for (var i = 0; i < 7; i++) {

				var pGroup=this.StartCard.data.SplitePokerGroupByNum(i + 1);
				//pGroup.pokerList.reverse();
				this.DearCardArray.push(pGroup);


			}
			this.SetAllStartCardToBack();
			this.StartCard.FlushRender();
			return this.DearCardArray;
			
		}

		//动画播放完毕之后
		public connectDearCardArrayToRender(index:number,sortEndHandle?:Laya.Handler)
		{
			var i=index;
			this.pokerLineList[i].data.Concat(this.DearCardArray[i]);
			this.pokerLineList[i].data.SetOnlyLastCardFront();
			this.pokerLineList[i].render.FlushPokerList(this.pokerLineList[i].data,false);
			this.pokerLineList[i].render.SortAndMoveToPos(sortEndHandle);
			
		}

		//开始卡组里面的所有卡片变成背面
		public SetAllStartCardToBack()
		{
			this.StartCard.data.SetAllCardToBack();
			this.StartCard.data.FlushAllCardRender();
		}

		//清理桌面
		public ClearTable(table: ui.poker.pokerTableUI) {
	
			for(var i=0;i<4;i++)
			{
				var spr= this.GetAceDeckSpriteRoot(i+1);
				spr.removeChildren(0);
			}

			for(var i=0;i<7;i++)
			{
				var spr= this.GetLineSpriteRoot(i+1);
				spr.removeChildren(0);
			}
			table.ThreeCard.removeChildren(0);
			table.StartCard.removeChildren(0);

		}
		public RemoveFromTable() {
			this.ClearTable(this.table);
			this.table=null;
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

		}

		public AddToTable(table: ui.poker.pokerTableUI) {

			this.table = table;


			this.ClearTable(table);
			for(var i=0;i<4;i++)
			{
				var spr= this.GetAceDeckSpriteRoot(i+1);
				spr.addChild(this.pokerDeckList[i].render);
			}

			table.ThreeCard.addChild(this.ThreeCard.render);
			table.StartCard.addChild(this.StartCard.render);

			for(var i=0;i<7;i++)
			{
				var spr= this.GetLineSpriteRoot(i+1);
				spr.addChild(this.pokerLineList[i].render);
			}


		}

	}
}