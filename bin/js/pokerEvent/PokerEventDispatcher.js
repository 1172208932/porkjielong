/**
* 游戏事件的分发器
*/
var pokerEvent;
(function (pokerEvent) {
    var PokerEventDispatcher = /** @class */ (function () {
        function PokerEventDispatcher() {
            this.eventHandleMap = new laya.utils.Dictionary();
        }
        PokerEventDispatcher.GetInstance = function () {
            if (this._instance == null) {
                this._instance = new pokerEvent.PokerEventDispatcher();
            }
            return this._instance;
        };
        //广播一个事件
        PokerEventDispatcher.prototype.brodcastEvent = function (event, args) {
            //console.debug("brodcastEvent="+event);
            var eventHandleArr = this.eventHandleMap.get(event);
            if (eventHandleArr != null) {
                eventHandleArr.forEach(function (element) {
                    var handle = element;
                    if (args != null) {
                        handle.runWith(args);
                    }
                    else {
                        handle.run();
                    }
                });
            }
        };
        //注册一个事件监听
        PokerEventDispatcher.prototype.addEventHandle = function (event, caller, listener, args) {
            //console.debug("addEventHandle="+event);
            var eventHandleArr = this.eventHandleMap.get(event);
            if (eventHandleArr == null) {
                eventHandleArr = new Array();
                this.eventHandleMap.set(event, eventHandleArr);
            }
            var handleArray = eventHandleArr;
            var handle = new Laya.Handler(caller, listener, args);
            handleArray.push(handle);
        };
        return PokerEventDispatcher;
    }());
    pokerEvent.PokerEventDispatcher = PokerEventDispatcher;
})(pokerEvent || (pokerEvent = {}));
//# sourceMappingURL=PokerEventDispatcher.js.map