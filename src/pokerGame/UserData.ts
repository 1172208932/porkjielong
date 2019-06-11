/**
* 用户数据 第一次登陆的时候需要与服务器数据 同步
*/
module pokerGame {
	export class UserData {

//---------------留的接口
		public defaultGold:number=100;//初始金币值
		public showCardNeedGold:number=10;//明牌需要的金币
		public compliteOneGameGoldGain:number=5;//完成一局获得的金币




		public Gold:number=0;//金币值
		
		public purchasedItemIDList: laya.utils.Dictionary = new laya.utils.Dictionary();//已购买的物品ID字典
		public challengeDataMap: laya.utils.Dictionary = new laya.utils.Dictionary();//挑战模式的年月日储存

		public isFirstPlay: boolean = true;//是否为第一次玩 (开启新手指引)

		public isSoundOn: boolean = true;//声音打开
		public isTimerOn: boolean = true;//计时器打开
		public isLeftHand: boolean = false;//左手习惯是否打开
		public isThreeCardOnce: boolean = false;//一次发三张
		public isVigasMode: boolean = false;//维加斯模式

		public UsingItemPage1: string;//第一页正在使用的物品
		public UsingItemPage2: string;//第二页正在使用的物品
		public UsingItemPage3: string;//第三页正在使用的物品

		public TryingItemPage1: string;//第一页正在试用的物品
		public TryingItemPage2: string;//第二页正在试用的物品
		public TryingItemPage3: string;//第三页正在试用的物品

		constructor() {
			//this.challengeDataMap.set("20181102","20181102");
			this.ReadLocalData();


		}
		public SetGold(setNum:number)
		{
			this.Gold=setNum;	
			Laya.LocalStorage.setItem("UserGold", this.Gold.toString());
			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.UpdateGoldUI);

			
		}
		public IsHaveGold(NumCheck:number):boolean//是否有足够的金币
		{
			return this.Gold>=NumCheck;
		}
		public AddGold(addNum:number)
		{
			this.Gold+=addNum;
			if(this.Gold<0)
			{
				this.Gold=0;
			}
			Laya.LocalStorage.setItem("UserGold", this.Gold.toString());
			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.UpdateGoldUI);
			
		}
		//初始化用户数据
		public LoadFirstPlayData() {

			this.SetGold(this.defaultGold);
			Laya.LocalStorage.setItem("isFirstPlay","1");

			this.LoadGameSetting();

		}
		public ReadLocalData() {


			var firstPlayString = Laya.LocalStorage.getItem("isFirstPlay");
			if (firstPlayString == null ||firstPlayString=="1") {

				this.isFirstPlay = true;
				this.LoadFirstPlayData();
				return;

			}
			else {
				var firstPlayvalue=parseInt(firstPlayString);
				if(isNaN(firstPlayvalue))
				{
					this.isFirstPlay = true;
					Laya.LocalStorage.setItem("isFirstPlay","1");
				}
				else
				{
					this.isFirstPlay = false;
					Laya.LocalStorage.setItem("isFirstPlay","0");
				}


			}

			this.UsingItemPage1 = Laya.LocalStorage.getItem("UsingItemPage1");
			this.UsingItemPage2 = Laya.LocalStorage.getItem("UsingItemPage2");
			this.UsingItemPage3 = Laya.LocalStorage.getItem("UsingItemPage3");
			var goldLocal=Laya.LocalStorage.getItem("UserGold");
			if(goldLocal!=null)
			{
				var gold=parseInt(goldLocal);
				if(isNaN(gold)||gold==null)
				{
					this.SetGold(this.defaultGold);//初始值
				}
				else
				{
					this.Gold=gold;
				}
			}
			else
			{
				this.SetGold(this.defaultGold);//初始值
			}

			this.LoadChallengeDataMap();
			this.LoadPurchasedItemIDList();
			this.LoadGameSetting();


		}
		public SetUsingItem(page: number, IDStr: string) {
			switch (page) {
				case 1:
					this.UsingItemPage1=IDStr;
					Laya.LocalStorage.setItem("UsingItemPage1",this.UsingItemPage1);
					this.TryingItemPage1 = null;
					break;
				case 2:
					this.UsingItemPage2=IDStr;
					Laya.LocalStorage.setItem("UsingItemPage2",this.UsingItemPage2);
					this.TryingItemPage2 = null;
					break;
				case 3:
					this.UsingItemPage3=IDStr;
					Laya.LocalStorage.setItem("UsingItemPage3",this.UsingItemPage3);
					this.TryingItemPage3 = null;
					break;
			}
		}
		public SetFirstPlay(IsFirst: boolean) {
			this.isFirstPlay = IsFirst;
			var strValue= IsFirst ?   "1":"0";
			Laya.LocalStorage.setItem("isFirstPlay",strValue);
			
			
		}
		//清理试用
		public ClearTry() {
			this.TryingItemPage1 = null;
			this.TryingItemPage2 = null;
			this.TryingItemPage3 = null;

		//	console.debug("ClearTry");

		}

		//是否已购买
		public IsPurchasedItemID(itemID: string): boolean {

			if (this.purchasedItemIDList.get(itemID) != null) {
				return true;

			}
			else if (itemID == "10001" || itemID == "20001" || itemID == "30001") {
				return true;
			}


			return false;
		}
		private IsNullData(dataStr:string)
		{
			return dataStr==null||dataStr.length==0;
		}

		//正在起作用的道具
		public GetAplayItemID(page: number): string {
			switch (page) {
				case 1:
					if (!this.IsNullData(this.TryingItemPage1)) {
						return this.TryingItemPage1;
					}
					else if (!this.IsNullData(this.UsingItemPage1) ) {
						return this.UsingItemPage1;
					}
					else {
						return "10001";
					}
				case 2:
					if (!this.IsNullData(this.TryingItemPage2)) {
						return this.TryingItemPage2;
					}
					else if (!this.IsNullData(this.UsingItemPage2)) {
						return this.UsingItemPage2;
					}
					else {
						return "20001";
					}


				case 3:
					if (!this.IsNullData(this.TryingItemPage3 )) {
						return this.TryingItemPage3;
					}
					else if (!this.IsNullData(this.UsingItemPage3 )) {
						return this.UsingItemPage3;
					}
					else {
						return "30001";
					}


			}
			return "";

		}

		//使用物品
		public UseItem(itemdata: gameconfig.shopItem) {
			this.SetUsingItem(itemdata.page,itemdata.ItemID.toString());
	
		}
		//试用物品
		public TryItem(itemdata: gameconfig.shopItem) {

			switch (itemdata.page) {
				case 1:
					this.TryingItemPage1 = itemdata.ItemID;
					break;
				case 2:
					this.TryingItemPage2 = itemdata.ItemID;
					break;
				case 3:
					this.TryingItemPage3 = itemdata.ItemID;
					break;

			}

		}

		public AddPurchasedItemID(itemID: string) {
			if (this.purchasedItemIDList.get(itemID) == null) {
				this.purchasedItemIDList.set(itemID, itemID);
			}
			this.SavePurchasedItemIDList();
			
		}
		private SavePurchasedItemIDList()
		{
			Laya.LocalStorage.setJSON("purchasedItemIDList",this.purchasedItemIDList);
			
		}
		private LoadPurchasedItemIDList()
		{

			var mapJson:JSON= <JSON>Laya.LocalStorage.getJSON("purchasedItemIDList");
			if(mapJson!=null)
			{
			
				var keysArray:Array<string> =  <Array<string>>mapJson["_keys"];
				for(let i in keysArray )
				{
					var str =	keysArray[i];
					this.purchasedItemIDList.set(str,str);
				}

			
		
			}
		

		}

		public IsChallengePassed(datestr: string) {
			//var str=pokerUI.challenge.GetDateString(date);//.toDateString();

			return this.challengeDataMap.get(datestr) != null;
		}
		public addTochallengeMap(datestr: string) {

			//var str=pokerUI.challenge.GetDateString(date);//date.toDateString();

			if (this.challengeDataMap.get(datestr) == null) {
				this.challengeDataMap.set(datestr, datestr);
			}
			this.SaveChallengeDataMap();
			


		}
		private LoadChallengeDataMap()
		{
			//this.challengeDataMap.clear();
			var mapJson:JSON= <JSON>Laya.LocalStorage.getJSON("ChallengeDataMap");
			if(mapJson!=null)
			{
				var keysArray:Array<string> =  <Array<string>>mapJson["_keys"];
				for(let i in keysArray )
				{
					var str =	keysArray[i];
					this.challengeDataMap.set(str,str);
				}
			
			}
		

		}
		private SaveChallengeDataMap()
		{
		
			Laya.LocalStorage.setJSON("ChallengeDataMap",this.challengeDataMap);

			//	var mapJson:JSON= <JSON>Laya.LocalStorage.getJSON("ChallengeDataMap");

		}



		private GetSettingIntData(key:string,defaultData:number):number
		{
			var tRet=0;
			var dataLocal=Laya.LocalStorage.getItem(key);
			if(dataLocal!=null)
			{
				var tpNum=parseInt(dataLocal);
				if(isNaN(tpNum)||tpNum==null)
				{
					tRet=defaultData;
				}
				else
				{
					tRet=tpNum;
				}
			}
			else
			{
				tRet=defaultData;
			}

			return tRet;

		}
		// public isSoundOn: boolean = true;//声音打开
		// public isTimerOn: boolean = true;//计时器打开
		// public isLeftHand: boolean = false;//左手习惯是否打开
		// public isThreeCardOnce: boolean = false;//一次发三张
		// public isVigasMode: boolean = false;//维加斯模式
		public LoadGameSetting()
		{
			this.isSoundOn=this.GetSettingIntData("isSoundOn",1)==1;
			this.isTimerOn=this.GetSettingIntData("isTimerOn",1)==1;
			this.isLeftHand=this.GetSettingIntData("isLeftHand",0)==1;
			this.isThreeCardOnce=this.GetSettingIntData("isThreeCardOnce",0)==1;
			this.isVigasMode=this.GetSettingIntData("isVigasMode",0)==1;



		}
		public SetSoundOn(isOn:boolean)
		{
			this.isSoundOn=isOn;
			Laya.LocalStorage.setItem("isSoundOn",this.isSoundOn?"1":"0");

		}


		public SetTimerOn(isOn:boolean)
		{
			this.isTimerOn=isOn;
			Laya.LocalStorage.setItem("isTimerOn",this.isTimerOn?"1":"0");

		}

		public SetLeftHand(isOn:boolean)
		{
			this.isLeftHand=isOn;
			Laya.LocalStorage.setItem("isLeftHand",this.isLeftHand?"1":"0");

		}
		public SetThreeCardOnce(isOn:boolean)
		{
			this.isThreeCardOnce=isOn;
			Laya.LocalStorage.setItem("isThreeCardOnce",this.isThreeCardOnce?"1":"0");
		}
		public SetVigasMode(isOn:boolean)
		{
			this.isVigasMode=isOn;
			Laya.LocalStorage.setItem("isVigasMode",this.isVigasMode?"1":"0");

		}

	}
}