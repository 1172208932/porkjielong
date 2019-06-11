/**
* name 
*/
module pokerUI{
	export class ConfirmAutoPlay{
	public confirmAutoPlayUI:ui.poker.ConfirmAutoPlayUI;
		constructor(){
		
			Laya.loader.load([{url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS}], Laya.Handler.create(this, this.onUILoad));
		}
	

		public onUILoad()
		{
			this.confirmAutoPlayUI=new ui.poker.ConfirmAutoPlayUI();
			Laya.stage.addChild(this.confirmAutoPlayUI);
			this.confirmAutoPlayUI.visible=false;
			
			this.confirmAutoPlayUI.shareWechat.clickHandler = new Laya.Handler(this,this.onClickShareWechat);
			this.confirmAutoPlayUI.CloseBTN.on(Laya.Event.CLICK, this,this.onClickCLoseBTN);
		
		}
		//点击分享到微信
		private onClickShareWechat()
		{

			//------------分享方法


			//--------------分享完毕

			//分享成功后调用这个方法就可以，全局可用
			GameMain.app.mShares++;
			GameMain.shareIndex = 3;
			GameMain.app.mShareCurrentTime = GameMain.app.getCurrTime();
			var shareTitle = "这局太难了，听说只有1%完成了。";
			var shareImg = "login/share.jpg";
			var surl = "2";
			if (GameMain.app.mWX.shareUrl.length > 0) {
				shareTitle = GameMain.app.mWX.shareUrl[0]["title"];
				shareImg = GameMain.app.mWX.shareUrl[0]["url"];
				// surl = GameMain.app.mWX.shareUrl[0]["id"];
			}
			wx.shareAppMessage({
				title: shareTitle,
				imageUrl: shareImg,
				// query: "uid=" + wxCore.uo.getUserID() + "&id=0&type=0&map=0&surl=" + surl
			});
		}
		

		//关闭UI的时候，需要外面激活点击自动完成的按钮
		private onClickCLoseBTN()
		{
			this.confirmAutoPlayUI.visible=false;
			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.onClickCLoseConfirmAutoPlayUI);
			

		}


	}
}