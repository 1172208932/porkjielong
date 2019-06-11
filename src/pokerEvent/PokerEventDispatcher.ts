/**
* 游戏事件的分发器
*/
module pokerEvent{

		export class PokerEventDispatcher{
		constructor(){
		}

		private static _instance:pokerEvent.PokerEventDispatcher;

		public static GetInstance():pokerEvent.PokerEventDispatcher
		{
			if(this._instance==null)
			{
				this._instance=new pokerEvent.PokerEventDispatcher();
			}

			return this._instance;
		}
		
		eventHandleMap:laya.utils.Dictionary=new laya.utils.Dictionary();
	
		//广播一个事件
		public brodcastEvent(event:string, args?: Array<any>)
		{
			//console.debug("brodcastEvent="+event);

			var eventHandleArr=this.eventHandleMap.get(event);
			if(eventHandleArr!=null)
			{
				eventHandleArr.forEach(element => {
					var handle=<Laya.Handler>element;
					if(args!=null)
					{
						handle.runWith(args);
					}
					else
					{
						handle.run();
					}
					
				});
			}

		}
		
		//注册一个事件监听
		public addEventHandle(event:string, caller: any, listener: Function, args?: Array<any>)
		{
			//console.debug("addEventHandle="+event);
			var eventHandleArr=this.eventHandleMap.get(event);
			if(eventHandleArr==null)
			{
				eventHandleArr=new Array<Laya.Handler>();
				this.eventHandleMap.set(event,eventHandleArr);
			}
		
			var handleArray=< Array<Laya.Handler>> eventHandleArr;
			var handle=new Laya.Handler(caller,listener,args);
			handleArray.push(handle);

		}

	}


}
