/**
* name 
*/
module pokerUI {
	export class gameBottom {
		public gameBottom: ui.poker.gameBottomUI;
		constructor() {

			Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
		}


		public onUILoad() {
			this.gameBottom = new ui.poker.gameBottomUI();
			// if (GameMain.app.mWX.fhOnoff == 0) {
			this.gameBottom.getChildByName("rules")["visible"] = false
			this.gameBottom.getChildByName("showHiddenCard")["visible"] = false
			// }
			Laya.stage.addChild(this.gameBottom);
			this.gameBottom.visible = false;

			this.gameBottom.showPopup.on(Laya.Event.CLICK, this, this.onClickShowPopup); //.clickHandler = new Laya.Handler(this,this.onClickShowPopup);
			this.gameBottom.back.on(Laya.Event.CLICK, this, this.onClickBackStep);
			this.gameBottom.showTips.on(Laya.Event.CLICK, this, this.onClickTips);
			this.gameBottom.showHiddenCard.on(Laya.Event.CLICK, this, this.OnClickShowAllHiddenCard);
			this.gameBottom.autoPlay.on(Laya.Event.CLICK, this, this.OnClickAutoBackToAceCardDeck);
			this.gameBottom.set.on(Laya.Event.CLICK, this, this.onClickSetting)

			this.gameBottom.rules.on(Laya.Event.CLICK, this, this.OnClickGameStartTutorial);
			this.SetAutoEnable(false);
			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.onTableUILoadedDone);

		}
		private onClickSetting() {
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickSetting);
			pokerGame.SoundPlayer.PlaySound(1);
		}
		public IsAutoEnable() {
			return !this.gameBottom.autoPlay.disabled;
		}
		public SetAutoEnable(isEnable: boolean) {
			this.gameBottom.autoPlay.disabled = !isEnable;
			this.gameBottom.autoPlayText.disabled = !isEnable;

		}
		public onClickShowPopup() {
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickShowPopup);
			pokerGame.SoundPlayer.PlaySound(1);

		}
		private onClickTips() {
			this.shareToInvite2()

		}
		public onClickBackToMain() {
			pokerGame.SoundPlayer.PlaySound(1);
			//GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickBackToMain);
		}
		public onClickBackStep() {
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickBackStep);
			pokerGame.SoundPlayer.PlaySound(1);
			// this.shareToInvite()

		}
		private OnClickShowAllHiddenCard() {
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnClickShowAllHiddenCard);
			pokerGame.SoundPlayer.PlaySound(1);
		}
		private OnClickAutoBackToAceCardDeck() {
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnClickAutoBackToAceCardDeck);
			pokerGame.SoundPlayer.PlaySound(1);

		}
		private OnClickGameStartTutorial() {

			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnClickGameStartTutorial);
			pokerGame.SoundPlayer.PlaySound(1);

		}
		/* 分享到群 */
		public shareToInvite() {
			GameMain.app.mShares++;
			GameMain.shareIndex = 1;
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
			// var htmlC = this.gameBottom.drawToCanvas(76, 116, 0, 0);
			// var canvas = htmlC.getCanvas();
			// canvas.toTempFilePath({
			// 	x: 0,
			// 	y: 0,
			// 	width: 50,
			// 	height: 40,
			// 	destWidth: 50,
			// 	destHeight: 40,
			// 	success: function (res) {
			// 		wx.shareAppMessage({
			// 			imageUrl: res.tempFilePath,
			// 			title: "string"
			// 		})
			// 	}
			// });
		}
		/* 分享到群 */
		public shareToInvite2() {
			GameMain.app.mShares++;
			GameMain.shareIndex = 2;
			GameMain.app.mShareCurrentTime = GameMain.app.getCurrTime();
			var shareTitle = "这局太难了，听说只有1%完成了。";
			var shareImg = "login/share.jpg";
			var surl = "3";
			if (GameMain.app.mWX.shareUrl.length > 0) {
				shareTitle = GameMain.app.mWX.shareUrl[0]["title"];
				shareImg = GameMain.app.mWX.shareUrl[0]["url"];
				// surl = GameMain.app.mWX.shareUrl[2]["id"];
			}
			wx.shareAppMessage({
				title: shareTitle,
				imageUrl: shareImg,
				// query: "uid=" + wxCore.uo.getUserID() + "&id=0&type=0&map=0&surl=" + surl
			});
		}
	}
}