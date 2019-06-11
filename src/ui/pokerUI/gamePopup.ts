/**
* name 
*/
module pokerUI{
	export class gamePopup{
	public gamePopup:ui.poker.gamePopupUI;
		constructor(){
			//	Laya.loader.load("res/atlas/UI.atlas",Laya.Handler.create(this,this.onUILoad));
				//Laya.loader.load([{url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onUILoad));
			//加载版本信息文件
        	Laya.loader.load([{url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onUILoad));   

		}
	

		public onUILoad()
		{
			this.gamePopup=new ui.poker.gamePopupUI();
			Laya.stage.addChild(this.gamePopup);
			this.gamePopup.visible=false;
			this.gamePopup.endGame.visible = false;
			this.gamePopup.CloseBTN.on(Laya.Event.CLICK,this,this.ClickClosePopup);
			
			this.gamePopup.NEWGame.on(Laya.Event.CLICK,this,this.onClickNewGame);
			this.gamePopup.EndGame.on(Laya.Event.CLICK,this,this.onClickEndGame);
			this.gamePopup.RETRY.on(Laya.Event.CLICK,this,this.onClickRetry);


		}
		public ClickClosePopup()
		{
			this.gamePopup.visible=false;
			pokerGame.SoundPlayer.PlaySound(1);

		}
		public onClickNewGame()
		{
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickNewGame);
			pokerGame.SoundPlayer.PlaySound(1);
		}
		public onClickRetry()
		{
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickRetry);
			pokerGame.SoundPlayer.PlaySound(1);
		}
		public onClickEndGame()
		{
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickEndGame);
			pokerGame.SoundPlayer.PlaySound(1);
		}
	
	}
}