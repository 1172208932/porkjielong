/**
* 商店配置表信息
*/
module gameconfig {
	export class shopConfigData {

		DataArrayPage1: Array<shopItem> = new Array<shopItem>();
		DataArrayPage2: Array<shopItem> = new Array<shopItem>();
		DataArrayPage3: Array<shopItem> = new Array<shopItem>();

		public onLoadDoneHandle:Laya.Handler;
		constructor() {

			

		}
		public StartLoad(onLoadDoneHandle:Laya.Handler)
		{
			this.onLoadDoneHandle=onLoadDoneHandle;
			//Laya.loader.load("gameconfig/shop_config.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
			Laya.loader.load([{url:"gameconfig/shop_config.json", type: Laya.Loader.JSON}], Laya.Handler.create(this, this.onLoaded));

		}
		public GetItem(IDStr:string,page:number)
		{
			var arr=this.getDataArray(page);

			for(var i=0;i<arr.length;i++)
			{
				if(arr[i].ItemID.toString()==IDStr)
				{
					return arr[i];

				}

			}
			return null;

		}

		public getDataArray(pageNum: number) {
			var tRet: Array<shopItem> = null;
			switch (pageNum) {
				case 1:
					tRet = this.DataArrayPage1;
					break;
				case 2:
					tRet = this.DataArrayPage2;
					break;
				case 3:
					tRet = this.DataArrayPage3;
					break;
			}

			return tRet;
		}
		public GetItemConfigData(ItemID:string):gameconfig.shopItem
		{
			var tRet:gameconfig.shopItem=this.FindData(1,ItemID);
			if(tRet==null)
			{
				tRet=this.FindData(2,ItemID);
			}
			
			if(tRet==null)
			{
				tRet=this.FindData(3,ItemID);
			}

			return tRet;
		}
		private FindData(pageNum:number,ItemID:string):gameconfig.shopItem
		{
			var arr=this.getDataArray(pageNum);

			for(var i=0;i<arr.length;i++)
			{
				if(ItemID==arr[i].ItemID)
				{
					return arr[i];
				}
			}

			return null;
		}

		private onLoaded() {
			var json: JSON = Laya.loader.getRes("gameconfig/shop_config.json");
			var startConfig = 10001;
			
			for (let i in json) {
				var configID = i;
				var cellJson=json[configID];
				if ( cellJson== null) {
					break;
				}
				var item = new shopItem();
				item.ItemID=configID;
				item.ItemIcon = cellJson["ICON"];
				item.ItemPrice = cellJson["ItemPrice"];
				item.ItemName = cellJson["ItemName"];
				item.ItemAtlas = cellJson["Atlas"];
				item.shopIcon = cellJson["shopIcon"];
				
				var page = <number>cellJson["page"];
				item.page=page;
				
				var arr=this.getDataArray(page);
				arr.push(item);

			}

			this.onLoadDoneHandle.run();
			this.onLoadDoneHandle.clear();
			this.onLoadDoneHandle=null;

		}

	}
}