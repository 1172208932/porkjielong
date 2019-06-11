/**
* 设置主界面
*/

module pokerUI {


	export class startGame {

		public startGameUI: ui.poker.StartGameUI;


		constructor() {
			Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
			// this.onUILoad()
		}

		public onUILoad() {
			this.startGameUI = new ui.poker.StartGameUI();
			// if (GameMain.app.mWX.fhOnoff == 0) {
			this.startGameUI.shop.visible = false
			// }
			Laya.stage.addChild(this.startGameUI);
			this.startGameUI.visible = false
			Laya.timer.once(1000,this,this.onClickStartGame)
			// this.onClickStartGame()
			// this.startGameUI.startGame.clickHandler = new Laya.Handler(this, this.onClickStartGame);
			// this.startGameUI.shop.clickHandler = new Laya.Handler(this, this.onClickShop);
		}
		public onClickStartGame() {
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnGameStart);
			pokerGame.SoundPlayer.PlaySound(1);

		}
		public onClickShop() {
			GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnClickShop);
			pokerGame.SoundPlayer.PlaySound(1);
		}


	}
}