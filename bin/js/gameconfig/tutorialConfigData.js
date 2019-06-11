/**
* name
*/
var gameconfig;
(function (gameconfig) {
    var tutorialConfigData = /** @class */ (function () {
        function tutorialConfigData() {
            this.tutorialItemList = new Array();
        }
        tutorialConfigData.prototype.StartLoad = function (onLoadDoneHandle) {
            this.onLoadDoneHandle = onLoadDoneHandle;
            //Laya.loader.load("gameconfig/tutorial_config.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
            Laya.loader.load([{ url: "gameconfig/tutorial_config.json", type: Laya.Loader.JSON }], Laya.Handler.create(this, this.onLoaded));
        };
        tutorialConfigData.prototype.onLoaded = function () {
            var json = Laya.loader.getRes("gameconfig/tutorial_config.json");
            for (var i in json) {
                var configID = i;
                var cellJson = json[configID];
                if (cellJson == null) {
                    break;
                }
                var item = new gameconfig.tutorialItem(cellJson);
                this.tutorialItemList.push(item);
            }
            this.onLoadDoneHandle.run();
            this.onLoadDoneHandle.clear();
            this.onLoadDoneHandle = null;
        };
        return tutorialConfigData;
    }());
    gameconfig.tutorialConfigData = tutorialConfigData;
})(gameconfig || (gameconfig = {}));
//# sourceMappingURL=tutorialConfigData.js.map