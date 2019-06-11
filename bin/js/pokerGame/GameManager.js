/**
* 游戏总管  管理游戏进度
*/
var pokerGame;
(function (pokerGame) {
    var GameManager = /** @class */ (function () {
        function GameManager() {
            //设置版本控制类型为使用文件名映射的方式
            Laya.ResourceVersion.type = Laya.ResourceVersion.FILENAME_VERSION;
            //加载版本信息文件
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.beginLoad));
        }
        GameManager.prototype.beginLoad = function () {
            this.Init();
        };
        GameManager.prototype.Init = function () {
            this.UIManager = new pokerGame.GameUIManager();
            this.userData = new pokerGame.UserData();
            this.UIManager.settingUI.FlushSetting(this.userData);
            this.UIManager.shopUI.FlushData(this.userData);
            this.UIManager.challengeUI.FlushUserData(this.userData);
            this.pokerEvent = new pokerGame.EventHandlePoker();
            this.pokerEvent.SetGameManager(this);
            this.tutorialEvent = new pokerGame.EventHandleTutorial();
            this.tutorialEvent.SetGameManager(this);
            this.settingEvent = new pokerGame.EventHandlSetting();
            this.settingEvent.SetGameManager(this);
            this.shopEvent = new pokerGame.EventHandleShop();
            this.shopEvent.SetGameManager(this);
            this.soundPlayer = new pokerGame.SoundPlayer(this.userData);
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.UpdateGoldUI); //刷新金币
        };
        return GameManager;
    }());
    pokerGame.GameManager = GameManager;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=GameManager.js.map