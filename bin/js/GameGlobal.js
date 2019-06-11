var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* name
*/
var GameGlobal;
(function (GameGlobal) {
    var EVENT = /** @class */ (function (_super) {
        __extends(EVENT, _super);
        function EVENT() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return EVENT;
    }(pokerEvent.GameEvent));
    GameGlobal.EVENT = EVENT;
    var Dispatcher = /** @class */ (function (_super) {
        __extends(Dispatcher, _super);
        function Dispatcher() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Dispatcher.sendEvent = function (event, args) {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(event, args);
        };
        Dispatcher.addEvent = function (event, caller, listener, args) {
            GameGlobal.Dispatcher.GetInstance().addEventHandle(event, caller, listener, args); //维加斯模式
        };
        return Dispatcher;
    }(pokerEvent.PokerEventDispatcher));
    GameGlobal.Dispatcher = Dispatcher;
})(GameGlobal || (GameGlobal = {}));
//# sourceMappingURL=GameGlobal.js.map