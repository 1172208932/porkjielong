var pokerRender = poker.pokerRender;
/**
* 接龙用的扑克结构体
*/
var poker;
(function (poker) {
    var pokerChain = /** @class */ (function () {
        function pokerChain(type, num) {
            this.data = new poker.pokerdata(type, num);
        }
        pokerChain.prototype.Dispose = function () {
            if (this.render != null) {
                this.render.Dispose();
            }
        };
        pokerChain.prototype.CreateRender = function () {
            this.render = new poker.pokerRender();
            this.render.ChangeRenderByData(this.data);
        };
        pokerChain.prototype.FlushRender = function () {
            if (this.render == null) {
                this.CreateRender();
            }
            else {
                this.render.ChangeRenderByData(this.data);
            }
        };
        return pokerChain;
    }());
    poker.pokerChain = pokerChain;
})(poker || (poker = {}));
//# sourceMappingURL=pokerChain.js.map