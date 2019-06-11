/**
* name 
*/
module gameconfig{
	export class tutorialConfigData{

		tutorialItemList:Array<tutorialItem>=new Array<tutorialItem>();
		public onLoadDoneHandle:Laya.Handler;
		constructor() {

		}
		public StartLoad(onLoadDoneHandle:Laya.Handler)
		{
			this.onLoadDoneHandle=onLoadDoneHandle;
			//Laya.loader.load("gameconfig/tutorial_config.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
			Laya.loader.load([{url:"gameconfig/tutorial_config.json", type: Laya.Loader.JSON}], Laya.Handler.create(this, this.onLoaded));

		}
	
		private onLoaded() {

			
			var json: JSON =Laya.loader.getRes("gameconfig/tutorial_config.json");
		
			for (let i in json) {
				var configID = i;
				var cellJson=json[configID];
				if ( cellJson== null) {
					break;
				}
				var item = new tutorialItem(cellJson);
				this.tutorialItemList.push(item);
			}

			this.onLoadDoneHandle.run();
			this.onLoadDoneHandle.clear();
			this.onLoadDoneHandle=null;

		}
	}
}