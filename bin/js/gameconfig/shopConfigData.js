/**
* 商店配置表信息
*/
var gameconfig;
(function (gameconfig) {
    var shopConfigData = /** @class */ (function () {
        function shopConfigData() {
            this.DataArrayPage1 = new Array();
            this.DataArrayPage2 = new Array();
            this.DataArrayPage3 = new Array();
        }
        shopConfigData.prototype.StartLoad = function (onLoadDoneHandle) {
            this.onLoadDoneHandle = onLoadDoneHandle;
            //Laya.loader.load("gameconfig/shop_config.json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
            Laya.loader.load([{ url: "gameconfig/shop_config.json", type: Laya.Loader.JSON }], Laya.Handler.create(this, this.onLoaded));
        };
        shopConfigData.prototype.GetItem = function (IDStr, page) {
            var arr = this.getDataArray(page);
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].ItemID.toString() == IDStr) {
                    return arr[i];
                }
            }
            return null;
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
        shopConfigData.prototype.GetItemConfigData = function (ItemID) {
            var tRet = this.FindData(1, ItemID);
            if (tRet == null) {
                tRet = this.FindData(2, ItemID);
            }
            if (tRet == null) {
                tRet = this.FindData(3, ItemID);
            }
            return tRet;
        };
        shopConfigData.prototype.FindData = function (pageNum, ItemID) {
            var arr = this.getDataArray(pageNum);
            for (var i = 0; i < arr.length; i++) {
                if (ItemID == arr[i].ItemID) {
                    return arr[i];
                }
            }
            return null;
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
                var item = new gameconfig.shopItem();
                item.ItemID = configID;
                item.ItemIcon = cellJson["ICON"];
                item.ItemPrice = cellJson["ItemPrice"];
                item.ItemName = cellJson["ItemName"];
                item.ItemAtlas = cellJson["Atlas"];
                item.shopIcon = cellJson["shopIcon"];
                var page = cellJson["page"];
                item.page = page;
                var arr = this.getDataArray(page);
                arr.push(item);
            }
            this.onLoadDoneHandle.run();
            this.onLoadDoneHandle.clear();
            this.onLoadDoneHandle = null;
        };
        return shopConfigData;
    }());
    gameconfig.shopConfigData = shopConfigData;
})(gameconfig || (gameconfig = {}));
//# sourceMappingURL=shopConfigData.js.map