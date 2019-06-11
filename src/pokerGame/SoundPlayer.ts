/**
* name 
*/
module pokerGame {
	export class SoundPlayer {

		private res: Array<any> = [
			{ url: "res/sound/cardMove.wav", type: Laya.Loader.SOUND },  //卡片移动 0
			{ url: "res/sound/button_click_settings.wav", type: Laya.Loader.SOUND },  //按钮点击 1
			{ url: "res/sound/deal.wav", type: Laya.Loader.SOUND },  //发牌 2
			{ url: "res/sound/drop_card.wav", type: Laya.Loader.SOUND },//点击牌 3
			{ url: "res/sound/four_card.wav", type: Laya.Loader.SOUND }//点击牌 4

		];


		private userda: UserData;
		constructor(userda: UserData) {

			this.userda = userda;
			Laya.loader.load(this.res, Laya.Handler.create(this, this.onLoadComplite, null, false));

			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.PlayMusic, this, this.PlayMusic);
			GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.PlaySound, this, this.PlaySound);

		}


		private onLoadComplite() {

		}

		private PlayMusic(index: number) {
			if (this.userda.isSoundOn) {
				laya.media.SoundManager.playMusic(this.res[index].url, 0);
			}



		}
		private PlaySound(index: number) {
			if (this.userda.isSoundOn) {
				laya.media.SoundManager.playSound(this.res[index].url, 1);
			}

		}

		//pokerGame.SoundPlayer.PlaySound(0);
		//pokerGame.SoundPlayer.PlaySound(1);

		public static PlaySound(index: number) {
			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.PlaySound, [index]);
		}
		public static PlayMusic(index: number) {
			GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.PlayMusic, [index]);
		}

	}
}