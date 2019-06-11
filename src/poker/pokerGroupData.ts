/**
* 一组扑克的数据
*/
module poker {
	export class pokerGroupData {

		public pokerList: pokerChain[];
		

		public constructor(vpokerList: pokerChain[] = null) {

			if (vpokerList != null) {
				this.pokerList = vpokerList;
			}
			else {
				this.pokerList = new Array<pokerChain>();
			}

		}
		
		//从初始化的卡组中快速寻找卡
		public FindCardFromFormatCardIndex(type:PokerType,num:number):number
		{
			var index=Math.floor((num-1)*4+<number>(type-1));
			return index;
		}
		public Dispose()
		{
			for(var i=0;i<this.pokerList.length;i++)
			{
				this.pokerList[i].Dispose();
			}
			this.pokerList.splice(0);
		}
		//连接
		public Concat(vGroupData: pokerGroupData) {
			this.pokerList = this.pokerList.concat(vGroupData.pokerList);
			vGroupData.pokerList.splice(0);

		}
		//最后一张卡不是正面,就显示为正面
		public SetLastCardFrontIfNot() {
			var lastcard = this.GetLastCard();
			if (lastcard == null) {
				return;
			}
			if (lastcard.data.IsCardBack) {
				lastcard.data.IsCardBack = false;
			}


		}
		//设置最后三张卡显示正面
		public SetLastThreeCardToFrontIfNot() {
			var lastindex = this.pokerList.length - 1;

			for (var i = lastindex - 2; i < this.pokerList.length; i++) {
				if (i >= 0) {
					if (this.pokerList[i].data.IsCardBack) {
						this.pokerList[i].data.IsCardBack = false;
					}

				}
			}
		}
		public RemoveAllCardRender()
		{
			
			this.pokerList.forEach(element => {
				element.render.img.removeSelf();
			});
		}
		//刷新所有卡片的render
		public FlushAllCardRender() {

			this.pokerList.forEach(element => {
				element.render.ChangeRenderByData(element.data);
			});
		}
		public SetAllCardToBack() {

			this.pokerList.forEach(element => {
				if(!element.data.IsCardBack )
				{
					element.data.IsCardBack = true;
				}
				
			});

		}
	public SetAllCardToFront() {

			this.pokerList.forEach(element => {
				if(element.data.IsCardBack )
				{
					element.data.IsCardBack = false;
				}
				
			});

		}

		//最后一张卡不是背面,就显示为背面
		public SetLastCardBackIfNot() {
			var lastcard = this.GetLastCard();
			if (lastcard == null) {
				return;
			}
			if (!lastcard.data.IsCardBack) {
				lastcard.data.IsCardBack = true;
			}

		}

		//只让最后一张卡显示正面,其他都是背面
		public SetOnlyLastCardFront() {
			for (var i = 0; i < this.pokerList.length; i++) {
				var poker = this.pokerList[i];
				poker.data.IsCardBack = ((i + 1) != this.pokerList.length);
			}
		}

		public GetFirstCard(): pokerChain {
			if (this.pokerList.length > 0) {
				return this.pokerList[0];
			}

			return null;

		}

		public GetLastCard(): pokerChain {
			if (this.pokerList.length > 0) {
				var lastindex = this.pokerList.length - 1;
				return this.pokerList[lastindex];
			}

			return null;

		}

		public GetLastCardIndex(): number {
			if (this.pokerList.length > 0) {
				var lastindex = this.pokerList.length - 1;
				return lastindex
			}

			return -1;

		}


		//获得牌组中最上面的n张卡
		public SplitePokerGroupByNum(num: number): pokerGroupData {
			var pGrouop: pokerGroupData = null;
			if (this.pokerList.length <= num) {
				pGrouop = this.SplitePokerGroup(0);
			}
			else {
				var startSpliteIndex = this.pokerList.length - num;
				pGrouop = this.SplitePokerGroup(startSpliteIndex);
			}
			//pGrouop.pokerList.reverse();

			return pGrouop;

		}
		//分割牌组 获得前面的几张牌
		public SplitePokerGroupFromFront(endIndex:number): pokerGroupData {
		
			var tPokerArray:Array<pokerChain>=null;
			if(endIndex>=this.pokerList.length)
			{
				tPokerArray=this.pokerList;
				this.pokerList=new Array<pokerChain>();
				

			}
			else
			{
				var tPokerArrayTRet = this.pokerList.slice(0,endIndex+1);
				var tPokerArrayKeep = this.pokerList.slice(endIndex+1);
				tPokerArray=tPokerArrayTRet;
				this.pokerList.splice(0);
				this.pokerList=tPokerArrayKeep;

			}
	
			
			
	
			var tRet = new pokerGroupData(tPokerArray);

			return tRet;
		}
		//分割牌组
		public SplitePokerGroup(startIndex: number): pokerGroupData {
			var tPokerArray = this.pokerList.slice(startIndex);
			this.pokerList.splice(startIndex);
	
			var tRet = new pokerGroupData(tPokerArray);

			return tRet;
		}
		//获得分割的牌组的引用
		public SlicePokerGroup(startIndex: number): pokerGroupData {
			var tPokerArray = this.pokerList.slice(startIndex);
			var tRet = new pokerGroupData(tPokerArray);

			return tRet;
		}

		//复制牌组中的数据
		public ClonePokerGroup(startIndex: number): pokerGroupData {
			var tPokerArray = new Array<pokerChain>();

			for(var i=startIndex;i<this.pokerList.length;i++)
			{
				var data=  this.pokerList[i].data;//.Clone();
				var newpokerChain=new pokerChain(data.mType,data.mNum);
				tPokerArray.push(newpokerChain);

			}

			var tRet = new pokerGroupData(tPokerArray);

			return tRet;
		}


		//创建一整套的扑克
		public CreateFull(WithKing: boolean = false) {
			this.pokerList = new Array<pokerChain>();



			for (var i = 0; i < 13; i++) {
				var poker1 = new pokerChain(PokerType.club, i + 1);
				var poker2 = new pokerChain(PokerType.diamond, i + 1);
				var poker3 = new pokerChain(PokerType.heart, i + 1);
				var poker4 = new pokerChain(PokerType.spade, i + 1);

				poker1.CreateRender();
				poker2.CreateRender();
				poker3.CreateRender();
				poker4.CreateRender();


				this.pokerList.push(poker1);
				this.pokerList.push(poker2);
				this.pokerList.push(poker3);
				this.pokerList.push(poker4);


			}

	


			if (WithKing) {
				var poker1 = new pokerChain(PokerType.king, 1);
				var poker2 = new pokerChain(PokerType.king, 2);
				this.pokerList.push(poker1);
				this.pokerList.push(poker2);

			}
		}
		//把扑克加入组中
		public AddPoker(poker: pokerChain) {
			this.pokerList.push(poker);
		}

		//经典洗牌算法
		public Shuffle() {
			var length = this.pokerList.length;
			for (var i = 0; i < length; i++) {
				var indexf = Math.random() * (length);
				var rIndex = Math.floor(indexf);
				if (rIndex == i)  {
					continue;
				}

				var a = this.pokerList[i];
				var b = this.pokerList[rIndex];
				this.pokerList[i] = b;
				this.pokerList[rIndex] = a;


			}
		}
		//洗牌 参数：次数
		public ShuffleWithTime(time: number = 1) {

			for (var i = 0; i < time; i++) {
				this.Shuffle();
			}
		}


	}
}