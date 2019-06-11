/**
* name
*/
var pokerGame;
(function (pokerGame) {
    var SoundPlayer = /** @class */ (function () {
        function SoundPlayer(userda) {
            this.res = [
                { url: "res/sound/cardMove.wav", type: Laya.Loader.SOUND },
                { url: "res/sound/button_click_settings.wav", type: Laya.Loader.SOUND },
                { url: "res/sound/deal.wav", type: Laya.Loader.SOUND },
                { url: "res/sound/drop_card.wav", type: Laya.Loader.SOUND },
                { url: "res/sound/four_card.wav", type: Laya.Loader.SOUND } //点击牌 4
            ];
            this.userda = userda;
            Laya.loader.load(this.res, Laya.Handler.create(this, this.onLoadComplite, null, false));
            GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.PlayMusic, this, this.PlayMusic);
            GameGlobal.Dispatcher.addEvent(GameGlobal.EVENT.PlaySound, this, this.PlaySound);
        }
        SoundPlayer.prototype.onLoadComplite = function () {
        };
        SoundPlayer.prototype.PlayMusic = function (index) {
            if (this.userda.isSoundOn) {
                laya.media.SoundManager.playMusic(this.res[index].url, 0);
            }
        };
        SoundPlayer.prototype.PlaySound = function (index) {
            if (this.userda.isSoundOn) {
                laya.media.SoundManager.playSound(this.res[index].url, 1);
            }
        };
        //pokerGame.SoundPlayer.PlaySound(0);
        //pokerGame.SoundPlayer.PlaySound(1);
        SoundPlayer.PlaySound = function (index) {
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.PlaySound, [index]);
        };
        SoundPlayer.PlayMusic = function (index) {
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.PlayMusic, [index]);
        };
        return SoundPlayer;
    }());
    pokerGame.SoundPlayer = SoundPlayer;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=SoundPlayer.js.map