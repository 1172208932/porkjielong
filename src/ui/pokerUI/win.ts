/**
* name 
*/
module pokerUI {
	export class win {
		public winUI: ui.poker.WinUI;
		constructor() {

			Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
		}


		public onUILoad() {
			this.winUI = new ui.poker.WinUI();
			Laya.stage.addChild(this.winUI);
			this.winUI.visible = false;

			this.winUI.startNewgame.clickHandler = new Laya.Handler(this, this.onClickStartNewGame);
			this.winUI.shareBtn.clickHandler = new Laya.Handler(this, this.onClickShare);

		}
		public onClickShare() {
			GameMain.app.mShares++;
			GameMain.app.mShareCurrentTime = GameMain.app.getCurrTime();
			var shareTitle = "这局太难了，听说只有1%完成了。";
			var shareImg = "login/share.jpg";
			var surl = "3";
			// if (GameMain.app.mWX.shareUrl.length > 2) {
			// 	shareTitle = GameMain.app.mWX.shareUrl[2]["title"];
			// 	shareImg = GameMain.app.mWX.shareUrl[2]["url"];
			// 	surl = GameMain.app.mWX.shareUrl[2]["id"];
			// }
			wx.shareAppMessage({
				title: shareTitle,
				imageUrl: shareImg,
				// query: "uid=" + wxCore.uo.getUserID() + "&id=0&type=0&map=0&surl=" + surl
			});
		}
		public ShowWin(UsedTimeStr: string) {
			this.winUI.visible = true;
			this.winUI.timeCount.text = UsedTimeStr;

		}
		public onClickStartNewGame() {
			this.winUI.visible = false;
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickNewGame);
			pokerGame.SoundPlayer.PlaySound(1);

		}

	}
}