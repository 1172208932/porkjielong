/**
* name
*/
var pokerUI;
(function (pokerUI) {
    var setting = /** @class */ (function () {
        function setting() {
            //	Laya.loader.load("res/atlas/UI.atlas",Laya.Handler.create(this,this.onUILoad));
            Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
        }
        setting.prototype.onUILoad = function () {
            this.settingPopup = new ui.poker.settingPopupUI();
            Laya.stage.addChild(this.settingPopup);
            this.settingPopup.visible = false;
            this.settingPopup.CloseBTN.on(Laya.Event.CLICK, this, this.ClickClosePopup);
            this.settingPopup.CloseBTN2.on(Laya.Event.CLICK, this, this.ClickClosePopup);
            this.settingPopup.soundBTNImg.on(Laya.Event.CLICK, this, this.onClickSound);
            this.settingPopup.timerBTN.on(Laya.Event.CLICK, this, this.onClickShowTimer);
            this.settingPopup.lefthandBTN.on(Laya.Event.CLICK, this, this.onClickLeftHand);
            this.settingPopup.ThreeCardBTN.on(Laya.Event.CLICK, this, this.onClickThreecard);
            this.settingPopup.VigasBTN.on(Laya.Event.CLICK, this, this.onClickVigasMode);
            if (this.userData != null) {
                this.FlushSetting(this.userData);
            }
        };
        setting.prototype.ClickClosePopup = function () {
            this.settingPopup.visible = false;
            pokerGame.SoundPlayer.PlaySound(1);
        };
        setting.prototype.IsSelected = function (switchImg) {
            var state1 = switchImg.getChildByName("state1");
            if (state1.alpha > 0) {
                return true;
            }
            return false;
        };
        setting.prototype.IsSwtichAniPlaying = function (switchImg) {
            var state2 = switchImg.getChildByName("state2");
            if (state2.alpha > 0) {
                return true;
            }
            return false;
        };
        setting.prototype.Swtich = function (switchImg) {
            var state1 = switchImg.getChildByName("state1");
            this.SetSwitchState(switchImg, !this.IsSelected(switchImg));
            //state1
            //state2
            //state3
            return true;
        };
        setting.prototype.SetSwitchState = function (switchImg, isOn) {
            var state1 = switchImg.getChildByName("state1");
            var state2 = switchImg.getChildByName("state2");
            var state3 = switchImg.getChildByName("state3");
            if (isOn) {
                var aniDruation = 0.2;
                Laya.Tween.clearAll(state1);
                Laya.Tween.clearAll(state2);
                Laya.Tween.clearAll(state3);
                Laya.Tween.to(state3, { alpha: 0 }, 0, Laya.Ease.sineIn, null, 0);
                Laya.Tween.to(state2, { alpha: 1 }, 0, Laya.Ease.sineIn, null, 0);
                Laya.Tween.to(state2, { alpha: 0 }, 0, Laya.Ease.sineIn, null, aniDruation * 1);
                Laya.Tween.to(state1, { alpha: 1 }, 0, Laya.Ease.sineIn, null, aniDruation * 1);
                //Laya.
            }
            else {
                var aniDruation = 0.2;
                Laya.Tween.clearAll(state1);
                Laya.Tween.clearAll(state2);
                Laya.Tween.clearAll(state3);
                Laya.Tween.to(state1, { alpha: 0 }, 0, Laya.Ease.sineIn, null, 0);
                Laya.Tween.to(state2, { alpha: 1 }, 0, Laya.Ease.sineIn, null, 0);
                Laya.Tween.to(state2, { alpha: 0 }, 0, Laya.Ease.sineIn, null, aniDruation * 1);
                Laya.Tween.to(state3, { alpha: 1 }, 0, Laya.Ease.sineIn, null, aniDruation * 1);
            }
        };
        setting.prototype.OnClickSwitch = function (switchImg, event) {
            if (this.IsSwtichAniPlaying(switchImg)) {
                return;
            }
            var selected = this.IsSelected(switchImg);
            this.Swtich(switchImg);
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(event, [!selected]);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        setting.prototype.onClickSound = function () {
            this.OnClickSwitch(this.settingPopup.soundSwitch, GameGlobal.EVENT.onClickSettingSound);
        };
        setting.prototype.onClickShowTimer = function () {
            this.OnClickSwitch(this.settingPopup.timerSwitch, GameGlobal.EVENT.onClickSettingShowTimer);
        };
        setting.prototype.onClickThreecard = function () {
            this.OnClickSwitch(this.settingPopup.threecardSwitch, GameGlobal.EVENT.onClickSettingThreecard);
        };
        setting.prototype.onClickVigasMode = function () {
            this.OnClickSwitch(this.settingPopup.vigasSwitch, GameGlobal.EVENT.onClickSettingVigasMode);
        };
        setting.prototype.onClickLeftHand = function () {
            this.OnClickSwitch(this.settingPopup.lefthandSwitch, GameGlobal.EVENT.onClickSettingLeftHandMode);
        };
        setting.prototype.FlushSetting = function (userData) {
            this.userData = userData;
            if (this.settingPopup != null) {
                this.SetSwitchState(this.settingPopup.soundSwitch, this.userData.isSoundOn);
                this.SetSwitchState(this.settingPopup.timerSwitch, this.userData.isTimerOn);
                this.SetSwitchState(this.settingPopup.lefthandSwitch, this.userData.isLeftHand);
                this.SetSwitchState(this.settingPopup.threecardSwitch, this.userData.isThreeCardOnce);
                this.SetSwitchState(this.settingPopup.vigasSwitch, this.userData.isVigasMode);
                // this.settingPopup.soundSetting.selected=this.userData.isSoundOn;
                // this.settingPopup.showtimer.selected=this.userData.isTimerOn;
                // this.settingPopup.lefthand.selected=this.userData.isLeftHand;
                // this.settingPopup.threecard.selected=this.userData.isThreeCardOnce;
                // this.settingPopup.vigasMode.selected=this.userData.isVigasMode;
                this.userData = null;
            }
        };
        return setting;
    }());
    pokerUI.setting = setting;
})(pokerUI || (pokerUI = {}));
//# sourceMappingURL=setting.js.map