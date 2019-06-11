/**
* 商店配置表信息
*/
var shopItems;
(function (shopItems) {
    var shopConfigData = (function () {
        function shopConfigData() {
            this.DataArrayPage1 = new Array();
            this.DataArrayPage2 = new Array();
            this.DataArrayPage3 = new Array();
        }
        shopConfigData.prototype.StartLoad = function (onLoadDoneHandle) {
            this.onLoadDoneHandle = onLoadDoneHandle;
            Laya.loader.load("gameconfig/shop_config.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
        };
        shopConfigData.prototype.getDataArray = function (pageNum) {
            var tRet = null;
            switch (pageNum) {
                case 1:
                    tRet = this.DataArrayPage1;
                    break;
                case 2:
                    tRet = this.DataArrayPage2;
                    break;
                case 3:
                    tRet = this.DataArrayPage3;
                    break;
            }
            return tRet;
        };
        shopConfigData.prototype.onLoaded = function () {
            var json = Laya.loader.getRes("gameconfig/shop_config.json");
            var startConfig = 10001;
            for (var i in json) {
                var configID = i;
                var cellJson = json[configID];
                if (cellJson == null) {
                    break;
                }
                var item = new shopItems.shopItem();
                item.ItemIcon = cellJson["ICON"];
                item.ItemPrice = cellJson["ItemPrice"];
                item.ItemName = cellJson["ItemName"];
                var page = cellJson["page"];
                var arr = this.getDataArray(page);
                arr.push(item);
            }
            this.onLoadDoneHandle.run();
            this.onLoadDoneHandle.clear();
            this.onLoadDoneHandle = null;
        };
        return shopConfigData;
    }());
    shopItems.shopConfigData = shopConfigData;
})(shopItems || (shopItems = {}));
//# sourceMappingURL=shopConfigData.js.map