/**
* name 
*/
module gameconfig{
	export class messageConfig{
		constructor(){

		}
		public onLoadDoneHandle:Laya.Handler;
		public messageMap:laya.utils.Dictionary = new laya.utils.Dictionary();
		public StartLoad(onLoadDoneHandle:Laya.Handler)
		{
			this.onLoadDoneHandle=onLoadDoneHandle;
			//Laya.loader.load("gameconfig/shop_config.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
			Laya.loader.load([{url:"gameconfig/message_config.json", type: Laya.Loader.JSON}], Laya.Handler.create(this, this.onLoaded));

		}
		public GetMessage(messageID:number)
		{
			return this.messageMap.get(messageID.toString());

		}

		private onLoaded() {
			var json: JSON = Laya.loader.getRes("gameconfig/message_config.json");
			
			for (let i in json) {
				var configID = i;
				var cellJson=json[configID];
				if ( cellJson== null) {
					break;
				}
					
				var message= cellJson["message"];
				
				this.messageMap.set(configID,message);
			}
			if(this.onLoadDoneHandle!=null)
			{
				this.onLoadDoneHandle.run();
				this.onLoadDoneHandle.clear();
				this.onLoadDoneHandle=null;

			}

		}



	}
}