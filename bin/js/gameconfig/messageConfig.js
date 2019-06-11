/**
* name
*/
var gameconfig;
(function (gameconfig) {
    var messageConfig = /** @class */ (function () {
        function messageConfig() {
            this.messageMap = new laya.utils.Dictionary();
        }
        messageConfig.prototype.StartLoad = function (onLoadDoneHandle) {
            this.onLoadDoneHandle = onLoadDoneHandle;
            //Laya.loader.load("gameconfig/shop_config.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
            Laya.loader.load([{ url: "gameconfig/message_config.json", type: Laya.Loader.JSON }], Laya.Handler.create(this, this.onLoaded));
        };
        messageConfig.prototype.GetMessage = function (messageID) {
            return this.messageMap.get(messageID.toString());
        };
        messageConfig.prototype.onLoaded = function () {
            var json = Laya.loader.getRes("gameconfig/message_config.json");
            for (var i in json) {
                var configID = i;
                var cellJson = json[configID];
                if (cellJson == null) {
                    break;
                }
                var message = cellJson["message"];
                this.messageMap.set(configID, message);
            }
            if (this.onLoadDoneHandle != null) {
                this.onLoadDoneHandle.run();
                this.onLoadDoneHandle.clear();
                this.onLoadDoneHandle = null;
            }
        };
        return messageConfig;
    }());
    gameconfig.messageConfig = messageConfig;
})(gameconfig || (gameconfig = {}));
//# sourceMappingURL=messageConfig.js.map