/**
* name
*/
var gameconfig;
(function (gameconfig) {
    var tutorialItem = /** @class */ (function () {
        function tutorialItem(jsonCell) {
            this.Type = jsonCell["TYPE"];
            this.Type2 = jsonCell["TYPE_2"];
            this.NUM = jsonCell["NUM"];
            this.NUM2 = jsonCell["NUM_2"];
            this.INDEX = jsonCell["Index"];
            this.INDEX2 = jsonCell["Index_2"];
            this.DESC = jsonCell["DESC"];
        }
        return tutorialItem;
    }());
    gameconfig.tutorialItem = tutorialItem;
})(gameconfig || (gameconfig = {}));
//# sourceMappingURL=tutorialItem.js.map