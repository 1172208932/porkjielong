/**
* name 
*/
 module GameGlobal{
	export class EVENT extends pokerEvent.GameEvent{
	
	}

	export class Dispatcher extends pokerEvent.PokerEventDispatcher{
	
		public static sendEvent(event:string, args?: Array<any>)
		{
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(event,args);
		}

		public static addEvent(event:string, caller: any, listener: Function, args?: Array<any>)
		{
				GameGlobal.Dispatcher.GetInstance().addEventHandle(event,caller,listener,args);//维加斯模式
		}

	}

}

