/**
* name 
*/
module pokerUI{
	export class gameTop{

		public gameTopUI:ui.poker.gameTopUI;
		public timerCount:number=0;
		private timerCountInt:number=0;
		
		constructor(){
			//	Laya.loader.load("res/atlas/UI.atlas",Laya.Handler.create(this,this.onUILoad));
				//Laya.loader.load([{url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onUILoad));
			Laya.loader.load([{url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onUILoad));  
		}

	

		public SetTimerVisible(visible:boolean)
		{
				this.gameTopUI.TimeCount.visible=visible;
		}
		//设置金币
		//在任意地方用 	GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.UpdateGoldUI,[123]); 来刷新显示
		public SetGoldText(textGold:string)
		{
			if(this.gameTopUI!=null&&this.gameTopUI.GoldText!=null)
			{
				this.gameTopUI.GoldText.text=textGold;
			}
			
		}

		public onUILoad()
		{
			this.gameTopUI=new ui.poker.gameTopUI();
			// if (GameMain.app.mWX.fhOnoff == 0) {
				this.gameTopUI.shop.visible = false
			// }
			Laya.stage.addChild(this.gameTopUI);
			this.gameTopUI.visible=false;
			this.gameTopUI.challenge.visible = false
			this.gameTopUI.money.visible = false
			this.gameTopUI.challenge.on(Laya.Event.CLICK,this,this.onClickChallenge);
			this.gameTopUI.setting.on(Laya.Event.CLICK,this,this.onClickSetting);
			this.gameTopUI.shop.on(Laya.Event.CLICK,this,this.onClickShop)

			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.onTableUILoadedDone);
			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.UpdateGoldUI);


		}
		public SetTimeCount(second:number)
		{
			var valueToSet=Math.floor(second);
			if(this.timerCountInt==valueToSet)
			{

			}
			this.timerCountInt=valueToSet;
			var min=Math.floor(this.timerCountInt/60);
			var sec=this.timerCountInt%60;

			this.gameTopUI.TimeCount.text=this.GetTimeStr(min)+":"+this.GetTimeStr(sec);
			


		}
		public GetTimeTextStr():string
		{
			
			return this.gameTopUI.TimeCount.text;
		}

		private GetTimeStr(timeNum:number):string
		{
			if(timeNum<10)
			{
				return "0"+timeNum.toString();
			}
			else
			{
				return timeNum.toString();
			}

		}
		private onClickChallenge()
		{
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickChallenge);
			pokerGame.SoundPlayer.PlaySound(1);

		}
		private onClickSetting()
		{
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickSetting);
			pokerGame.SoundPlayer.PlaySound(1);
		}

		private onClickShop()
		{
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickShopInGame);
			pokerGame.SoundPlayer.PlaySound(1);
		}
				
		public StopTimer()
		{
			Laya.timer.clear(this,this.UpdateTimerRender);
		}
		public RestartTimer(timecount:number=0)
		{
			this.timerCount=timecount;
			Laya.timer.frameLoop(1,this,this.UpdateTimerRender);
		}
		private UpdateTimerRender()
		{
			this.timerCount+=Laya.timer.delta/1000;
			this.SetTimeCount(this.timerCount);
			
		}

	}
}