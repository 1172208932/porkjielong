/**
* 游戏中的设置事件处理
*/
var pokerGame;
(function (pokerGame) {
    var EventHandlSetting = /** @class */ (function () {
        function EventHandlSetting() {
        }
        EventHandlSetting.prototype.SetGameManager = function (gameManager) {
            this.gameManager = gameManager;
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickSettingSound, this, this.onClickSettingSound); //声音设置
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickSettingShowTimer, this, this.onClickSettingShowTimer); //时间显示设置			
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickSettingLeftHandMode, this, this.onClickLeftHandMode); //点击左手模式			
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickSettingThreecard, this, this.onClickSettingThreecard); //三张卡模式			
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.onClickSettingVigasMode, this, this.onClickSettingVigasMode); //维加斯模式
            GameGlobal.Dispatcher.GetInstance().addEventHandle(GameGlobal.EVENT.ShowMessage, this, this.ShowMessage); //维加斯模式
        };
        EventHandlSetting.prototype.ShowMessage = function (messageID) {
            var message = this.gameManager.UIManager.pokerTable.GetMessage(messageID);
            this.gameManager.UIManager.pokerTable.ShowMessage(message);
            this.gameManager.UIManager.shopUI.ShowMessage(message);
        };
        //设置维加斯模式
        EventHandlSetting.prototype.onClickSettingVigasMode = function (isSelected) {
            //this.gameManager.userData.isVigasMode=isSelected;
            this.gameManager.userData.SetVigasMode(isSelected);
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.ShowMessage, [10007]);
        };
        //设置三张卡模式
        EventHandlSetting.prototype.onClickSettingThreecard = function (isSelected) {
            //this.gameManager.userData.isThreeCardOnce=isSelected;
            this.gameManager.userData.SetThreeCardOnce(isSelected);
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.ShowMessage, [10007]);
        };
        //设置显示计时器
        EventHandlSetting.prototype.onClickSettingShowTimer = function (isSelected) {
            this.gameManager.UIManager.pokerTop.SetTimerVisible(isSelected);
            //this.gameManager.userData.isTimerOn=isSelected;
            this.gameManager.userData.SetTimerOn(isSelected);
        };
        //点击声音设置
        EventHandlSetting.prototype.onClickSettingSound = function (isSelected) {
            //this.gameManager.userData.isSoundOn=isSelected;
            this.gameManager.userData.SetSoundOn(isSelected);
        };
        //点击左手模式
        EventHandlSetting.prototype.onClickLeftHandMode = function (isSelected) {
            this.gameManager.UIManager.pokerTable.SetLeftMode(isSelected);
            //this.gameManager.userData.isLeftHand=isSelected;
            this.gameManager.userData.SetLeftHand(isSelected);
            this.gameManager.UIManager.pokerTable.FlushAllPoker();
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.FlushTutorialRender);
        };
        return EventHandlSetting;
    }());
    pokerGame.EventHandlSetting = EventHandlSetting;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=EventHandlSetting.js.map