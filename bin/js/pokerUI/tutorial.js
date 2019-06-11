/**
* name
*/
var pokerUI;
(function (pokerUI) {
    var tutorial = /** @class */ (function () {
        //public tutorialHandAni:tutorialHandAni=new tutorialHandAni();
        function tutorial() {
            this.tutorialConfigData = new gameconfig.tutorialConfigData();
            this.stepIndex = 0;
            this.stepDeckCardNum = 0;
            Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
        }
        tutorial.prototype.onUILoad = function () {
            this.tutorialUI = new ui.poker.tutorialUI();
            Laya.stage.addChild(this.tutorialUI);
            this.tutorialUI.visible = false;
            this.tutorialConfigData.StartLoad(new Laya.Handler(this, this.setup));
            this.tutorialUI.QuitTutorial.on(Laya.Event.CLICK, this, this.QuitTutorial);
            //this.tutorialUI.addChild(this.tutorialHandAni.tutorialHandAni);
        };
        tutorial.prototype.QuitTutorial = function () {
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.OnClickQuitTutorial);
        };
        tutorial.prototype.setup = function () {
        };
        tutorial.prototype.StartTutorial = function () {
            this.stepIndex = -1;
            //this.ShowThisStepTutorial();
        };
        tutorial.prototype.ShowNextStepTutorial = function () {
            this.stepIndex++;
            this.ShowThisStepTutorial();
        };
        tutorial.prototype.ShowThisStepTutorial = function () {
            if (this.stepIndex < this.tutorialConfigData.tutorialItemList.length) {
                var tutorialItem = this.tutorialConfigData.tutorialItemList[this.stepIndex];
                this.ShowTutorialDesc(tutorialItem.DESC);
                if (this.stepIndex == this.tutorialConfigData.tutorialItemList.length - 1) //最后一个
                 {
                    GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.ShowLastTutorial);
                }
            }
        };
        tutorial.prototype.GetTutorialItem = function () {
            if (this.stepIndex < this.tutorialConfigData.tutorialItemList.length) {
                var tutorialItem = this.tutorialConfigData.tutorialItemList[this.stepIndex];
                return tutorialItem;
            }
            return null;
        };
        tutorial.prototype.ShowTutorialDesc = function (tutorialDesc) {
            this.tutorialUI.visible = true;
            this.tutorialUI.tutorialDesc.text = tutorialDesc;
        };
        tutorial.prototype.HideTutorial = function () {
            this.tutorialUI.visible = false;
        };
        return tutorial;
    }());
    pokerUI.tutorial = tutorial;
})(pokerUI || (pokerUI = {}));
//# sourceMappingURL=tutorial.js.map