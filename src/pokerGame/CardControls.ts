/**
* 点击，拖动事件的处理
*/
module pokerGame {
	export class CardControls {


		public rule: ChainGameRule = new ChainGameRule();

		public deckData: CardDeckData;

		/**
			拖动相关
		*/
		//private DragMoveingGroup: poker.pokerChainGroup = new poker.pokerChainGroup(poker.PokerGroupRenderMode.line);//正在拖动的牌堆

		private DragMovingStartPos: laya.maths.Point = new laya.maths.Point();
		private IsStartDraging: boolean = false; //开始拖拽
		private IsStartDragMoved: boolean = false;//是否开始拖动了(点击判断使用)
		private MouseStartPos: laya.maths.Point = new laya.maths.Point();


		private dragData: pokerMovingData = new pokerMovingData();

		private IsAutoMoving: boolean = false;//正在自动移动
		private IsGameEnd: boolean = false;//游戏结束
		private IsAutoBacking: boolean = false;//自动快速移动,自动解决的时候使用

		private IsTutorialStarted: boolean = false;//新手指引开始
		constructor() {
			this.dragData.DragingGroup = new poker.pokerChainGroup(poker.PokerGroupRenderMode.line);//正在拖动的牌堆
			this.dragData.DragingGroup.render.collisionMode = poker.PokerGroupCollisionMode.FirstCardCollision;

		}
		//是否可以切换牌
		public IsCanChangeCard() {
			return this.IsCanStartCardClick();

		}

		//是否可以发牌
		public IsCanDearCard() {
			return this.IsCanStartCardClick();

		}
		//是否正在自动完成
		public GetIsAutoBacking() {
			return this.IsAutoBacking;
		}
		public ResetPlayData() {
			this.IsAutoMoving = false;
			this.IsGameEnd = false;
			this.IsAutoBacking = false;
			Laya.Tween.clearAll(this.deckData.table.LineMove);
			if (this.dragData.DragingGroup.data.pokerList.length > 0) {
				this.dragDataBack();
			}



		}

		public SetTableClick(table: ui.poker.pokerTableUI, tableTop: ui.poker.gameTopUI, tableBottom: ui.poker.gameBottomUI) {

			table.offAll();
			table.on(Laya.Event.MOUSE_MOVE, this, this.onMounseMove);
			table.on(Laya.Event.MOUSE_UP, this, this.onMounseUp);

			tableTop.offAll();
			tableTop.on(Laya.Event.MOUSE_MOVE, this, this.onMounseUp);
			tableTop.on(Laya.Event.MOUSE_UP, this, this.onMounseUp);

			tableBottom.offAll();
			tableBottom.on(Laya.Event.MOUSE_MOVE, this, this.onMounseUp);
			tableBottom.on(Laya.Event.MOUSE_UP, this, this.onMounseUp);

		}

		public Flush(type: pokerDeckType, GroupNum: number) {

			this.FlushRender(type, GroupNum);
			this.FlushClickEvent(type, GroupNum);

		}

		public FlushRender(type: pokerDeckType, GroupNum: number) {
			switch (type) {
				case pokerDeckType.startDeck:
					this.FlushStartRender();
					break;
				case pokerDeckType.Line:
					this.FlushLineRender(GroupNum - 1);
					break;
				case pokerDeckType.Deck:
					this.FlushDeckRender(GroupNum - 1);
					break;
				case pokerDeckType.threeCardDeck:
					this.FlushThreeCardRender();
					break;
			}
		}
		public FlushClickEvent(type: pokerDeckType, GroupNum: number) {
			switch (type) {
				case pokerDeckType.startDeck:
					this.FlushStartClick();
					break;
				case pokerDeckType.Line:
					this.FlushLineClick(GroupNum - 1);
					break;
				case pokerDeckType.Deck:
					this.FlushDeckClick(GroupNum - 1);
					break;
				case pokerDeckType.threeCardDeck:
					this.FlushThreeCardClick();
					break;
			}

		}
		public AutoBack() {
			this.IsAutoBacking = true;
			this.AutoBackToAceCardDeck();


		}
		//三张或StartCard里面有卡
		private IsHaveCardInThreeDeckOrStartCard() {
			if (this.deckData.StartCard.data.pokerList.length > 0) {

				return true;
			}

			if (this.deckData.ThreeCard.data.pokerList.length > 0) {

				return true;
			}
		}
		//先自动把开始组的卡片都分发出去
		private AutoBackStartCardToLine() {


			if (this.CheckIsThreeCanAutoMove()) {
				//this.dragData.SetThreeCard(this.deckData);
				//this.PlayDragAutoMoveAni();

				return;
			}




			if (this.deckData.StartCard.data.pokerList.length > 0) {

				this.dragData.SetThreeCard(this.deckData);
				this.dragData.moveType = MovingType.autoBackToDeck;//移动类型
				this.PlayDragAutoMoveAni();
			}
			else {
				this.ThreeCardBackToStart();
				this.AutoBack();
			}




		}
		//自动回4个A卡组
		private AutoBackToAceCardDeck() {


			var lineNum: number = 0;
			var deckNum: number = 0;
			for (var i = 0; i < this.deckData.pokerLineList.length; i++) {
				var lineDeck = this.deckData.pokerLineList[i];
				var deckIndex = this.GetCanBackToDeckIndex(lineDeck.data.GetLastCard());//获得能返回的deckIndex 没有的话返回-1
				if (deckIndex >= 0) {
					deckNum = deckIndex + 1;
					lineNum = i + 1;
					break;
				}
			}
			//lineNum
			if (lineNum > 0 && deckNum > 0) {
				this.dragData.SetAutoBackCard(this.deckData, lineNum, deckNum);

				this.PlayDragAutoMoveAni();
			}



		}

		//检测三张卡能否可以自动移动
		private CheckIsThreeCanAutoMove(): boolean {
			var pokerCard = this.deckData.ThreeCard.data.GetLastCard();
			if (pokerCard == null) {
				return false;
			}
			//与4个堆线做检测
			for (var i = 0; i < this.deckData.pokerDeckList.length; i++) {

				var lastCard = this.deckData.pokerDeckList[i].data.GetLastCard();


				if (this.rule.IsCanTackBack(lastCard, pokerCard))//用规则检测能否返回
				{
					this.dragData.SetAutoMoveUPThreeCardLastCard(this.deckData);
					this.dragData.DragToGroupType = pokerDeckType.Deck;
					this.dragData.DragToNum = i + 1;
					this.dragData.IsNeedAddToStepRecord = false;
					this.PlayDragAutoMoveAni();

					return true;

				}
			}

			//与7个线做检测
			for (var i = 0; i < this.deckData.pokerLineList.length; i++) {

				var lastCard = this.deckData.pokerLineList[i].data.GetLastCard();


				if (this.rule.IsCanConnect(lastCard, pokerCard))//用规则检测是否能连接上
				{

					this.dragData.SetAutoMoveUPThreeCardLastCard(this.deckData);
					this.dragData.DragToGroupType = pokerDeckType.Line;
					this.dragData.DragToNum = i + 1;
					this.dragData.IsNeedAddToStepRecord = false;
					this.PlayDragAutoMoveAni();


					return true;

				}
			}

			return false;

		}
		private GetCanBackToDeckIndex(pokerCard: poker.pokerChain): number {
			if (pokerCard == null) {
				return -1;
			}
			//与4个堆线做检测
			for (var i = 0; i < this.deckData.pokerDeckList.length; i++) {

				var lastCard = this.deckData.pokerDeckList[i].data.GetLastCard();


				if (this.rule.IsCanTackBack(lastCard, pokerCard))//用规则检测能否返回
				{


					return i;

				}
			}
			return -1;
		}
		public IsCanUseShowHiddenCardItem(): boolean {


			for (var i = 0; i < this.deckData.pokerLineList.length; i++) {

				var pokerList = this.deckData.pokerLineList[i].data.pokerList;
				for (var j = 0; j < pokerList.length; j++) {
					if (pokerList[j].data.IsCardBack) {
						return true;
					}

				}
			}

			return false;

		}
		public IsHaveHiddenCard(): boolean {


			if (this.deckData.StartCard.data.pokerList.length > 0) {

				return true;
			}

			if (this.deckData.ThreeCard.data.pokerList.length > 0) {

				return true;
			}





			for (var i = 0; i < this.deckData.pokerLineList.length; i++) {

				var pokerList = this.deckData.pokerLineList[i].data.pokerList;
				for (var j = 0; j < pokerList.length; j++) {
					if (pokerList[j].data.IsCardBack) {
						return true;
					}

				}
			}

			return false;
		}

		//明牌
		public ShowAllHiddenCard() {
			if (!this.IsCanStartCardClick()) {
				return;
			}

			this.deckData.isThreeCardOnce = false; //一张一张翻开
			this.deckData.IsLasvigasMode = false; //明牌的时候拉斯维加斯模式关闭
			this.ShowOneLineHiddenCard();
			this.deckData.ClearStep();

		}




		private ShowOneLineHiddenCard() {

			for (var i = 0; i < this.deckData.pokerLineList.length; i++) {

				var LastBackIndex = -1;
				var pokerList = this.deckData.pokerLineList[i].data.pokerList;
				for (var j = 0; j < pokerList.length; j++) {
					if (pokerList[j].data.IsCardBack) {
						LastBackIndex = j;
					}
					else {
						break;
					}
				}

				if (LastBackIndex >= 0) {
					this.dragData.SetHidenCard(i + 1, this.deckData, LastBackIndex);
					this.PlayDragAutoMoveAni();
					return;
				}

			}

			return;
		}


		//回撤
		public BackStep() {

			if (!this.IsCanStartCardClick()) {
				return;
			}


			var lastStep = this.deckData.GetLastBackStep();
			if (lastStep == null) {
				return;
			}
			this.IsAutoMoving = true;

			this.dragData.SetBackStep(lastStep, this.deckData);

			this.dragData.DragingGroup.render.renderMode = poker.PokerGroupRenderMode.lastThreeCard;
			this.dragData.DragingGroup.FlushRender(true);

			if (lastStep.fromDeckType == pokerGame.pokerDeckType.threeCardDeck) {
				this.dragData.DragingGroup.data.SetAllCardToFront();
			}


			this.PlayDragAutoMoveAni();



		}

		//点击起始堆
		public ClickStartDeck() {
			if (this.IsAutoMoving) {
				return;
			}

			for (var i = 0; i < this.deckData.StartCard.render.numChildren; i++) {
				var poker = this.deckData.StartCard.render.getChildAt(i);
				poker.offAll();

			}

			this.ShowStartCard();



		}

		//翻牌
		public ShowStartCard() {

			if (this.IsAutoMoving) {
				return;
			}

			if (this.deckData.StartCard.data.pokerList.length > 0) {

				this.dragData.SetThreeCard(this.deckData);
				this.PlayDragAutoMoveAni();

			}
			else {
				if (!this.deckData.IsCanTabBackToStart()) {
					GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.ShowMessage, [10006]);//
					//错误提示 拉斯维加斯模式下,总共只能翻牌三次
					return;
				}

				this.deckData.TabBackToStartOnce();//翻牌计数

				this.ThreeCardBackToStart();


			}




		}

		//三张牌返回start
		private ThreeCardBackToStart() {
			var checkGroup = this.deckData.StartCard;
			this.deckData.AddStep(pokerDeckType.startDeck, 0, checkGroup.data.pokerList.length, pokerDeckType.threeCardDeck, 0, false);

			this.deckData.BackToStart(this.deckData.ThreeCard);
			this.deckData.StartCard.data.pokerList.reverse();
			this.deckData.StartCard.data.SetAllCardToBack();
			this.deckData.StartCard.data.FlushAllCardRender();
			this.deckData.StartCard.FlushRender();
			this.Flush(pokerGame.pokerDeckType.startDeck, 0);
			this.Flush(pokerGame.pokerDeckType.threeCardDeck, 0);
		}

		private IsCanStartCardClick(): boolean {
			if (this.IsAutoMoving) {
				return false;
			}

			if (this.dragData.DragingGroup.data.pokerList.length > 0)//有正在拖动的
			{
				return false;
			}
			return true;

		}
		//鼠标按下
		public onMounseDown(pokerGroup: poker.pokerChainGroup, type: pokerDeckType, typeNum: number, index: number) {
			if (this.IsAutoMoving) {
				return;
			}
			if (this.dragData.DragingGroup.data.pokerList.length > 0)//有正在拖动的
			{
				return;
			}

			console.debug("卡牌移动开启：" + "LineIndex=" + type + "typeNum=" + typeNum + "index=" + index);

			this.IsStartDraging = true;
			this.IsStartDragMoved = false;
			var clickedIMG: Laya.Image = null;
			clickedIMG = pokerGroup.data.pokerList[index].render.img;



			this.dragData.DragFromGroupType = type
			this.dragData.DragFromNum = typeNum;
			this.dragData.DragFromDeckBackToFront = false;
			this.dragData.IsNeedAddToStepRecord = false;
			this.dragData.moveType = MovingType.clickMove;//移动类型



			var imgRoot = <Laya.Sprite>clickedIMG.parent.parent;

			this.deckData.table.LineMove.x = imgRoot.x + clickedIMG.x * imgRoot.scaleX;
			this.deckData.table.LineMove.y = imgRoot.y + clickedIMG.y * imgRoot.scaleY;

			this.DragMovingStartPos.x = this.deckData.table.LineMove.x;
			this.DragMovingStartPos.y = this.deckData.table.LineMove.y;


			this.dragData.DragingGroup.data.Concat(pokerGroup.data.SplitePokerGroup(index));
			this.dragData.DragingGroup.render.renderMode = poker.PokerGroupRenderMode.line;

			if (type == pokerDeckType.Line) {
				var lastcard = pokerGroup.data.GetLastCard();
				if (lastcard != null) {
					this.dragData.DragFromDeckBackToFront = lastcard.data.IsCardBack;
				}


				pokerGroup.FlushRender();
			}
			else if (type == pokerDeckType.Deck) {
				pokerGroup.FlushRender();
			}
			this.dragData.DragingGroup.FlushRender();



			this.MouseStartPos.x = Laya.stage.mouseX;
			this.MouseStartPos.y = Laya.stage.mouseY;

			//if(this.dragData.DragingGroup.render.parent==null)
			{
				this.dragData.DragingGroup.render.removeSelf();
				this.deckData.table.LineMove.addChild(this.dragData.DragingGroup.render);

			}


			for (var i = 0; i < this.dragData.DragingGroup.data.pokerList.length; i++) {
				this.dragData.DragingGroup.data.pokerList[i].render.img.offAll();
			}

			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.ClearTips);
			SoundPlayer.PlaySound(3);

		}
		//开始拖动线上的牌
		public onMounseMove() {

			//console.debug("卡牌开始拖动" );

			if (this.IsAutoMoving) {
				return;
			}
			if (!this.IsStartDraging || this.dragData.DragingGroup == null || this.dragData.DragingGroup.data.pokerList.length <= 0) {
				return;
			}

			var offsetX = Laya.stage.mouseX - this.MouseStartPos.x;
			var offsetY = Laya.stage.mouseY - this.MouseStartPos.y;


			this.deckData.table.LineMove.x = this.DragMovingStartPos.x + offsetX;
			this.deckData.table.LineMove.y = this.DragMovingStartPos.y + offsetY;

			//this.dragData.DragingGroup.render.x = this.DragMovingStartPos.x + offsetX / 0.7;
			//this.dragData.DragingGroup.render.y = this.DragMovingStartPos.y + offsetY / 0.7;
			if (!this.IsStartDragMoved) {
				var pt = new Laya.Point(offsetX, offsetY);
				if (pt.distance(0, 0) > 5)//拖动距离小于5的话就算是点击 不然就是移动
				{
					this.IsStartDragMoved = true;
				}
			}


		}

		//鼠标抬起
		public onMounseUp() {
			//console.debug("卡牌拖动结束");
			if (this.IsAutoMoving)//自动移动过程中点击无效
			{
				return;
			}
			if (!this.IsStartDraging || this.dragData.DragingGroup == null || this.dragData.DragingGroup.data.pokerList.length <= 0) {
				return;
			}

			if (this.dragData.DragingGroup == null) {
				return;
			}

			var IsDragedIntoNewGroup = false;

			this.CollisionArrList.forEach(element => {
				element.removeSelf();
			});

			this.CollisionArrList.splice(0);

			var IsNeedCheck4Deck = this.IsStartDragMoved || this.dragData.DragFromGroupType != pokerDeckType.Deck;

			//与4个堆线做检测
			if (IsNeedCheck4Deck) {
				for (var i = 0; i < this.deckData.pokerDeckList.length; i++) {
					var checkGroup = this.deckData.pokerDeckList[i];
					if (this.dragData.DragingGroup.data.pokerList.length != 1)//每次只能返回一张到deck中
					{
						break;
					}
					if (this.dragData.DragFromGroupType == pokerDeckType.Deck && (this.dragData.DragFromNum - 1) == i) {
						continue;
					}
					if (this.IsStartDragMoved) {

						if (!this.CheckCollision(checkGroup, this.dragData.DragingGroup)) {
							continue;
						}


					}

					if (this.rule.IsCanTackBack(checkGroup.data.GetLastCard(), this.dragData.DragingGroup.data.GetFirstCard()))//用规则检测能否返回
					{
						this.dragData.DragToGroupType = pokerDeckType.Deck;
						this.dragData.DragToNum = i + 1;
						this.dragData.IsNeedAddToStepRecord = true;
						SoundPlayer.PlaySound(4);
						this.PlayDragAutoMoveAni();
						return;

					}
					else if (this.IsStartDragMoved) {
						var messageID = this.rule.GetTackBackErroMessage(checkGroup.data.GetLastCard(), this.dragData.DragingGroup.data.GetFirstCard());
						GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.ShowMessage, [messageID]);
					}
				}
			}


			//与7条线做检测
			for (var i = 0; i < this.deckData.pokerLineList.length; i++) {
				var checkGroup = this.deckData.pokerLineList[i];

				if (this.dragData.DragFromGroupType == pokerGame.pokerDeckType.Line && (this.dragData.DragFromNum - 1) == i) {
					continue;
				}
				if (this.IsStartDragMoved) {

					if (!this.CheckCollision(checkGroup, this.dragData.DragingGroup)) {
						//console.debug("CheckCollision pass i=" + i.toString());
						continue;
					}



				}


				if (this.rule.IsCanConnect(checkGroup.data.GetLastCard(), this.dragData.DragingGroup.data.GetFirstCard())) {

					this.dragData.DragToGroupType = pokerDeckType.Line;
					this.dragData.DragToNum = i + 1;
					this.dragData.IsNeedAddToStepRecord = true;

					//this.connectDragGroup();

					this.PlayDragAutoMoveAni();

					return;

				}
				else if (this.IsStartDragMoved)//拖动的时候
				{
					var messageID = this.rule.GetConnectErroMessage(checkGroup.data.GetLastCard(), this.dragData.DragingGroup.data.GetFirstCard());
					GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.ShowMessage, [messageID]);


				}
			}



			//都没有碰撞成功，那么返回来源的那个 牌组线

			this.dragData.DragToGroupType = this.dragData.DragFromGroupType
			this.dragData.DragToNum = this.dragData.DragFromNum;
			if (this.IsStartDragMoved) {
				this.PlayDragAutoMoveAni();
			}
			else {
				this.connectDragGroup();
				this.Flush(this.dragData.DragToGroupType, this.dragData.DragToNum);
				this.CheckTutorialNext();
				//this.Flush(this.dragData.DragFromGroupType, this.dragData.DragFromNum);

			}
			return;


		}
		private dragDataBack() {
			this.dragData.DragFromDeckBackToFront = false;

			this.dragData.DragToGroupType = this.dragData.DragFromGroupType
			this.dragData.DragToNum = this.dragData.DragFromNum;
			this.connectDragGroup();
			this.Flush(this.dragData.DragToGroupType, this.dragData.DragToNum);
			this.dragData.DragingGroup.FlushRender();
		}
		//拖动放手之后，播放移动的动画
		private PlayDragAutoMoveAni() {

			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.ClearTips);
			this.IsAutoMoving = true;
			var checkGroup = this.deckData.GetDeck(this.dragData.DragToGroupType, this.dragData.DragToNum);
			var toSprRoot = <Laya.Sprite>checkGroup.render.parent;
			var targetPos = new Laya.Point(toSprRoot.x, toSprRoot.y);


			var posCard = checkGroup.data.GetLastCard();

			if (posCard != null) {
				var cardPos: Laya.Point = new Laya.Point(0, 0);
				cardPos = new Laya.Point(posCard.render.img.x, posCard.render.img.y);
				targetPos.x += cardPos.x * toSprRoot.scaleX;
				targetPos.y += cardPos.y * toSprRoot.scaleY;

			}


			if (this.dragData.DragToGroupType == pokerGame.pokerDeckType.Line) {
				if (checkGroup.data.pokerList.length != 0) {
					targetPos.y += poker.pokerGroupRender.lineHeightSpacing;
				}

			}

			else if (this.dragData.DragToGroupType == pokerGame.pokerDeckType.threeCardDeck) {
				if (checkGroup.data.pokerList.length != 0) {
					targetPos.x += poker.pokerGroupRender.threeCardSpacing;
				}

			}
			var aniDruation: number = 280;
			if (this.dragData.DragToGroupType == pokerGame.pokerDeckType.threeCardDeck) {
				aniDruation = 130;
			}
			else if (this.IsAutoBacking) {
				aniDruation = 130;
			}


			Laya.Tween.clearAll(this.deckData.table.LineMove);
			Laya.Tween.to(this.deckData.table.LineMove, { x: targetPos.x, y: targetPos.y }, aniDruation, Laya.Ease.sineIn, Laya.Handler.create(this, this.PlayDragAutoMoveAniEnd), 0);


		}
		//拖动动画结束
		private PlayDragAutoMoveAniEnd() {

			if (this.dragData.moveType == MovingType.backStep) {
				this.dragData.SetDragDataBackToFromDeck(this.deckData);
				var backstep = this.deckData.BackStep();
				if (backstep != null) {
					this.FlushClickEvent(backstep.fromDeckType, backstep.fromDeckNum);
					this.FlushClickEvent(backstep.addToDeckType, backstep.addToDeckNum);
				}

				pokerGame.SoundPlayer.PlaySound(0);

				this.dragData.DragingGroup.FlushRender();
				// Laya.timer.callLater(this,this.onMounseUp)
				// this.onMounseUp()
				//zxx


			}
			else if (this.dragData.DragToGroupType == pokerDeckType.threeCardDeck) {

				this.checkRecord();
				this.deckData.ThreeCard.render.AddPokerList(this.dragData.DragingGroup.data);
				this.deckData.ThreeCard.data.Concat(this.dragData.DragingGroup.data);
				this.deckData.ThreeCard.render.SortAndMoveToPos();
				this.FlushThreeCardClick();
				this.Flush(this.dragData.DragFromGroupType, this.dragData.DragFromNum);
				this.CheckTutorialNext();
				pokerGame.SoundPlayer.PlaySound(0);

			}
			else {
				this.checkRecord();
				this.connectDragGroup();
				this.Flush(this.dragData.DragToGroupType, this.dragData.DragToNum);
				this.Flush(this.dragData.DragFromGroupType, this.dragData.DragFromNum);

				if (this.dragData.moveType == MovingType.showHiddenCard) {
					this.ShowOneLineHiddenCard();
				}
				else if (this.dragData.moveType == MovingType.autoBackToDeck) {
					if (this.IsAutoBacking) {
						this.AutoBack();
					}

				}

				this.CheckWin();
				this.CheckTutorialNext();
				this.CheckAutoPlay();//检测是否需要激活自动
				pokerGame.SoundPlayer.PlaySound(0);

			}
			this.IsAutoMoving = false;

			this.dragData.DragFromDeckBackToFront = false;


		}
		private CheckTutorialFlush() {
			if (this.IsTutorialStarted) {
				GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.FlushTutorialRender);

			}
		}
		private CheckTutorialNext() {
			if (this.IsTutorialStarted) {
				GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.CheckNextTutorial);
			}
		}
		//检测是否需要弹出自动窗口
		private CheckAutoPlay() {
			if (!this.IsAutoBacking) {
				if (!this.IsHaveHiddenCard()) {
					GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.CheckAutoPlay);
				}
			}

		}
		private CheckWin() {
			if (this.IsGameEnd) {
				return;
			}
			for (var i = 0; i < this.deckData.pokerDeckList.length; i++) {
				var deck = this.deckData.pokerDeckList[i];
				if (deck.data.pokerList.length != 13) {
					return;
				}
			}

			//----已完成---
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onGameWin);

			this.IsGameEnd = true;//游戏结束
		}
		private checkRecord() {

			if (this.dragData.IsNeedAddToStepRecord) {
				var checkGroup = this.deckData.GetDeck(this.dragData.DragToGroupType, this.dragData.DragToNum);
				this.deckData.AddStep(
					this.dragData.DragToGroupType, this.dragData.DragToNum,
					checkGroup.data.pokerList.length,
					this.dragData.DragFromGroupType, this.dragData.DragFromNum, this.dragData.DragFromDeckBackToFront);

			}
		}
		//动画播放完毕之后 处理拖动的组
		private connectDragGroup() {

			var checkGroup = this.deckData.GetDeck(this.dragData.DragToGroupType, this.dragData.DragToNum);


			this.ConcatDragsToGroup(checkGroup, this.dragData.DragingGroup);


			//this.dragData.DragingGroup = null;
		}

		private ConcatDragsToGroup(toGroup: poker.pokerChainGroup, dragGroup: poker.pokerChainGroup) {
			toGroup.data.Concat(dragGroup.data.SplitePokerGroup(0));
			toGroup.FlushRender();
			dragGroup.FlushRender();
		}
		public EndTutorial() {
			this.IsTutorialStarted = false;
		}
		//发新手指引牌
		public DearTutorialCard() {

			this.ResetPlayData();

			var cardList = this.deckData.DearTutorialCard();
			this.IsTutorialStarted = true;

			for (var i = 0; i < cardList.length; i++) {
				//创建扑克渲染器
				var spr = new Laya.Sprite();
				spr.scaleX = this.deckData.table.LineMove.scaleX;
				spr.scaleY = this.deckData.table.LineMove.scaleY;
				var sprRoot = this.deckData.table.LineMove.parent;
				var startRoot = <Laya.Sprite>this.deckData.table.StartCard;
				sprRoot.addChild(spr);
				var render = new poker.pokerGroupRender(poker.PokerGroupRenderMode.lastOneCard);
				cardList[i].SetAllCardToBack();
				render.FlushPokerList(cardList[i], false);

				spr.addChild(render);
				spr.pos(startRoot.x, startRoot.y);
				spr.visible = false;

				Laya.Tween.clearAll(spr);
				var lineRoot = this.deckData.GetDeckSpriteRoot(pokerDeckType.Line, i + 1);

				var delaytime = i * 70;
				Laya.Tween.from(spr, {}, 0, null, Laya.Handler.create(this, this.SetDearCardRootVisible, [spr]), delaytime);

				Laya.Tween.to(spr, { x: lineRoot.x, y: lineRoot.y }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, this.PlayDearCardAutoMoveAniEnd, [i]), delaytime);
				//tw.update=Laya.Handler.create(this,this.PlayDearCardAutoMoveAniEnd,[i]);
			}

			this.IsAutoMoving = true;
		}
		//发牌
		public DearCard(isReTry: boolean) {
			this.ResetPlayData();


			var cardList = isReTry ? this.deckData.RestartDearCard() : this.deckData.DearCard();

			for (var i = 0; i < cardList.length; i++) {
				//创建扑克渲染器
				var spr = new Laya.Sprite();
				spr.scaleX = this.deckData.table.LineMove.scaleX;
				spr.scaleY = this.deckData.table.LineMove.scaleY;
				var sprRoot = this.deckData.table.LineMove.parent;
				var startRoot = <Laya.Sprite>this.deckData.table.StartCard;
				sprRoot.addChild(spr);
				var render = new poker.pokerGroupRender(poker.PokerGroupRenderMode.lastOneCard);
				cardList[i].SetAllCardToBack();
				render.FlushPokerList(cardList[i], false);

				spr.addChild(render);
				spr.pos(startRoot.x, startRoot.y);
				spr.visible = false;

				Laya.Tween.clearAll(spr);

				var lineRoot = this.deckData.GetDeckSpriteRoot(pokerDeckType.Line, i + 1);

				var delaytime = i * 70;
				Laya.Tween.from(spr, {}, 0, null, Laya.Handler.create(this, this.SetDearCardRootVisible, [spr]), delaytime);

				Laya.Tween.to(spr, { x: lineRoot.x, y: lineRoot.y }, 300, Laya.Ease.sineOut, Laya.Handler.create(this, this.PlayDearCardAutoMoveAniEnd, [i]), delaytime);
				//tw.update=Laya.Handler.create(this,this.PlayDearCardAutoMoveAniEnd,[i]);
			}
			this.IsAutoMoving = true;




		}
		private SetDearCardRootVisible(spr: Laya.Sprite) {
			spr.visible = true;
		}


		//发牌动画结束
		private PlayDearCardAutoMoveAniEnd(index: number) {


			if (index == 6) {
				this.deckData.connectDearCardArrayToRender(index, new Laya.Handler(this, this.CheckTutorialNext));
				this.IsAutoMoving = false;
				this.FlushAllClickEvent();

			}
			else {
				this.deckData.connectDearCardArrayToRender(index, null);
			}
		}


		private GetCardBound(cardImg: Laya.Image): Laya.Rectangle {
			var img1 = cardImg;


			var rect1 = img1.getBounds();
			rect1.x *= img1.globalScaleX;
			rect1.y *= img1.globalScaleX;
			rect1.width *= img1.globalScaleX;
			rect1.height *= img1.globalScaleY;

			//var rect2= img1.getSelfBounds();

			var img1Parent = (<Laya.Sprite>img1.parent);
			rect1.x += img1Parent.x * img1.globalScaleX;
			rect1.y += img1Parent.y * img1.globalScaleX;



			var imgParent2 = (<Laya.Sprite>img1.parent.parent);
			rect1.x += imgParent2.x;
			rect1.y += imgParent2.y;


			var imgParent3 = (<Laya.Sprite>img1.parent.parent.parent);
			rect1.x += imgParent3.x;
			rect1.y += imgParent3.y;

			return rect1;


		}
		CollisionArrList: Array<Laya.Sprite> = new Array<Laya.Sprite>();
		private CheckCollision(group1: poker.pokerChainGroup, group2: poker.pokerChainGroup): boolean {
			if (group1.render.collisionImage == null || group2.render.collisionImage == null) {
				return false;
			}

			var img1 = group1.render.collisionImage;
			var img2 = group2.render.collisionImage;

			var rect1 = this.GetCardBound(img1);
			var rect2 = this.GetCardBound(img2);


			var tRet = rect1.intersects(rect2);
			var IsNeedShowCollision = false;
			if (IsNeedShowCollision && !tRet) {
				//画矩形
				var sp = new Laya.Sprite();

				sp.graphics.drawRect(rect1.x, rect1.y, rect1.width, rect1.height, "#ffff00");
				sp.graphics.drawRect(rect2.x, rect2.y, rect2.width, rect2.height, "#ffff00");

				img2.parent.parent.parent.parent.addChild(sp);
				this.CollisionArrList.push(sp);
			}


			//console.debug( (tRet?"true":"false")+  " rect1="+rect1.toString()+"rect2="+rect2.toString());

			return tRet;
		}

		//刷新三卡堆的render
		public FlushThreeCardRender() {
			this.deckData.ThreeCard.data.SetLastThreeCardToFrontIfNot();
			this.deckData.ThreeCard.FlushRender();
		}

		//刷新三卡堆的event
		public FlushThreeCardClick() {
			for (var i = 0; i < this.deckData.ThreeCard.data.pokerList.length; i++) {
				var poker2 = this.deckData.ThreeCard.data.pokerList[i];
				poker2.render.img.offAll();
			}
			//最后一张卡
			var lastCard = this.deckData.ThreeCard.data.GetLastCard();
			if (lastCard != null) {
				var lastCardIndex = this.deckData.ThreeCard.data.GetLastCardIndex();
				lastCard.render.img.on(Laya.Event.MOUSE_DOWN, this, this.onMounseDown, [this.deckData.ThreeCard, pokerDeckType.threeCardDeck, -1, lastCardIndex]);
			}

		}

		//刷新起始堆的显示
		public FlushStartRender() {

			this.deckData.SetAllStartCardToBack();
			this.deckData.StartCard.FlushRender();

		}

		//刷新起始堆的点击事件
		public FlushStartClick() {

			for (var i = 0; i < this.deckData.StartCard.render.numChildren; i++) {
				var poker = this.deckData.StartCard.render.getChildAt(i);
				poker.offAll();
				poker.on(Laya.Event.MOUSE_DOWN, this, this.ClickStartDeck);
			}

		}


		public FlushAllClickEvent() {

			for (var i = 0; i < 7; i++) {
				this.FlushLineClick(i);
			}

			this.FlushClickEvent(pokerDeckType.startDeck, 0);



		}
		public FlushDeckRender(deckIndex: number) {
			var deckGroup = this.deckData.pokerDeckList[deckIndex];
			if (deckGroup == null) {
				return;
			}
			deckGroup.FlushRender();


		}
		public FlushDeckClick(deckIndex: number) {

			var deckGroup = this.deckData.pokerDeckList[deckIndex];
			if (deckGroup == null) {
				return;
			}
			if (deckGroup.data.pokerList.length == 0) {
				return;
			}
			var lastIndex = deckGroup.data.pokerList.length - 1;
			for (var i = 0; i < deckGroup.data.pokerList.length; i++) {
				var poker = deckGroup.data.pokerList[i];
				//poker.render.img.offAll();
				if (i == lastIndex) {
					poker.render.img.on(Laya.Event.MOUSE_DOWN, this, this.onMounseDown, [deckGroup, pokerDeckType.Deck, deckIndex + 1, i]);

				}
				else {
					poker.render.img.offAll();
				}


			}
		}

		//刷新线的render
		public FlushLineRender(LineIndex: number) {

			this.FlushLineBack(LineIndex);

		}
		//线上的  最后一张牌 如果是卡背就翻过来
		public FlushLineBack(LineIndex: number) {
			if (LineIndex < 0) {
				return;
			}
			var lineGroup = this.deckData.pokerLineList[LineIndex];

			lineGroup.data.SetLastCardFrontIfNot();
			lineGroup.FlushRender();


		}
		//刷新线牌组的点击事件
		public FlushLineClick(LineIndex: number) {
			if (LineIndex < 0) {

				return;
			}
			var lineGroup = this.deckData.pokerLineList[LineIndex];

			for (var i = 0; i < lineGroup.data.pokerList.length; i++) {
				var poker = lineGroup.data.pokerList[i];
				poker.render.img.offAll();
				if (poker.data.IsCardBack) {

					continue;
				}
				poker.render.img.on(Laya.Event.MOUSE_DOWN, this, this.onMounseDown, [lineGroup, pokerDeckType.Line, LineIndex + 1, i]);
				console.debug("AddLineClick=onMounseDown=" + (LineIndex + 1) + "index=" + i + "length=" + lineGroup.data.pokerList.length);
			}


		}

	}
}