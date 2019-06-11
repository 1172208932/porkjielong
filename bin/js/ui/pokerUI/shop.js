/**
* 商店界面
*/
var pokerUI;
(function (pokerUI) {
    var shop = /** @class */ (function () {
        function shop() {
            this.shopConfigData = new gameconfig.shopConfigData();
            this.IsInit = false;
            this.IsFromGame = false;
            Laya.loader.load([{ url: "res/atlas/UI.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onUILoad));
        }
        shop.prototype.OpenShop = function (isFromGame) {
            this.IsFromGame = isFromGame;
            this.shopUI.CloseBTN.visible = isFromGame;
            this.shopUI.BackBTN.visible = !isFromGame;
            this.shopUI.visible = true;
            Laya.stage.addChild(this.shopUI);
        };
        shop.prototype.onUILoad = function () {
            this.shopUI = new ui.poker.ShopUI();
            this.shopUI.visible = false;
            Laya.stage.addChild(this.shopUI);
            this.shopUI.tab.selectHandler = new Laya.Handler(this, this.onSelecte);
            this.shopUI.BackBTN.on(Laya.Event.CLICK, this, this.ClickBack);
            this.shopUI.CloseBTN.on(Laya.Event.CLICK, this, this.CloseUI);
            //this.setup();
            this.shopConfigData.StartLoad(new Laya.Handler(this, this.setup));
        };
        shop.prototype.FlushData = function (userdata) {
            this.userdata = userdata;
            if (this.IsInit) {
                this.setup();
            }
        };
        shop.prototype.setup = function () {
            this.setupPage(1);
            this.setupPage(2);
            this.setupPage(3);
            this.FlushSelectedItem(1);
            this.FlushSelectedItem(2);
            this.FlushSelectedItem(3);
            this.IsInit = true;
        };
        shop.prototype.FlushSelectedItem = function (pageNum) {
            var IDStr = this.userdata.GetAplayItemID(pageNum);
            switch (pageNum) {
                case 1:
                    shop.ItemSelectedInPage1 = this.shopConfigData.GetItem(IDStr, 1);
                    break;
                case 2:
                    shop.ItemSelectedInPage2 = this.shopConfigData.GetItem(IDStr, 2);
                    break;
                case 3:
                    shop.ItemSelectedInPage3 = this.shopConfigData.GetItem(IDStr, 3);
                    break;
            }
        };
        shop.prototype.GetItemConfigData = function (ItemID) {
            return this.shopConfigData.GetItemConfigData(ItemID);
        };
        shop.prototype.setupPage = function (page) {
            var dataArray = this.shopConfigData.getDataArray(page);
            var list = this.getPageList(page);
            var cells = list.cells;
            var ardata = [];
            for (var i = 0; i < dataArray.length; i++) {
                ardata.push({ label: "i=" + i.toString() });
            }
            list.array = ardata;
            //list.vScrollBarSkin="";
            list.scrollBar.hide = true; //隐藏列表的滚动条。
            list.scrollBar.elasticBackTime = 200; //设置橡皮筋回弹时间。单位为毫秒。
            list.scrollBar.elasticDistance = 50; //设置橡皮筋极限距离。
            //list.repeatX=2;
            //list.repeatY= dataArray.length/2 +dataArray.length%2;
            switch (page) {
                case 1:
                    list.renderHandler = new Laya.Handler(this, this.SetCellDataPage1);
                    break;
                case 2:
                    list.renderHandler = new Laya.Handler(this, this.SetCellDataPage2);
                    break;
                case 3:
                    list.renderHandler = new Laya.Handler(this, this.SetCellDataPage3);
                    break;
            }
            // for (var i = 0; i < dataArray.length; i++) {
            // 	var cell = cells[i];
            // 	var data = dataArray[i];
            // 	this.setCellData(cell, data);
            // }
        };
        shop.prototype.SetCellDataPage1 = function (cell, index) {
            //console.log("SetCellDataPage1 ,index="+index.toString());
            var dataArray = this.shopConfigData.getDataArray(1);
            this.setCellData(cell, dataArray[index]);
        };
        shop.prototype.SetCellDataPage2 = function (cell, index) {
            //console.log("SetCellDataPage2 ,index="+index.toString());
            var dataArray = this.shopConfigData.getDataArray(2);
            this.setCellData(cell, dataArray[index]);
        };
        shop.prototype.SetCellDataPage3 = function (cell, index) {
            //console.log("SetCellDataPage3 ,index="+index.toString());
            var dataArray = this.shopConfigData.getDataArray(3);
            this.setCellData(cell, dataArray[index]);
        };
        shop.prototype.FlushPageData = function (page) {
            var dataArray = this.shopConfigData.getDataArray(page);
            var list = this.getPageList(page);
            var cells = list.cells;
            for (var i = 0; i < dataArray.length; i++) {
                var cell = null;
                var data = dataArray[i];
                for (var j = 0; j < cells.length; j++) {
                    var cellTest = cells[j];
                    if (data.ItemName == cellTest.getChildByName("name").text) {
                        cell = cellTest;
                        break;
                    }
                }
                if (cell != null) {
                    this.setCellData(cell, data);
                }
            }
        };
        shop.prototype.getPageList = function (page) {
            var tRet = null;
            switch (page) {
                case 1:
                    tRet = this.shopUI.listBG;
                    break;
                case 2:
                    tRet = this.shopUI.listCard;
                    break;
                case 3:
                    tRet = this.shopUI.listCardBack;
                    break;
            }
            return tRet;
        };
        shop.prototype.LoadAndChangeIcon = function (icon, atlas, skin) {
            if (icon == null) {
                console.debug("Erro");
            }
            Laya.loader.load([{ url: atlas, type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.ChangeIconSkin, [icon, skin]));
        };
        shop.prototype.ChangeIconSkin = function (icon, skin) {
            icon.skin = skin;
        };
        shop.prototype.setIconData = function (cell, itemData) {
            var box = cell;
            switch (itemData.page) {
                case 1: //背景
                    {
                        var icon = box.getChildByName("icon1");
                        this.LoadAndChangeIcon(icon, itemData.ItemAtlas, itemData.ItemIcon);
                    }
                    break;
                case 2: //扑克
                    {
                        var icon1 = box.getChildByName("icon1");
                        this.LoadAndChangeIcon(icon1, itemData.ItemAtlas, itemData.ItemIcon + pokerRender.GetImgFileNameWithTypeNum(PokerType.club, 1));
                        var icon2 = box.getChildByName("icon2");
                        this.LoadAndChangeIcon(icon2, itemData.ItemAtlas, itemData.ItemIcon + pokerRender.GetImgFileNameWithTypeNum(PokerType.diamond, 13));
                        var icon3 = box.getChildByName("icon3");
                        this.LoadAndChangeIcon(icon3, itemData.ItemAtlas, itemData.ItemIcon + pokerRender.GetImgFileNameWithTypeNum(PokerType.heart, 12));
                    }
                    break;
                case 3: //卡背
                    {
                        var icon1 = box.getChildByName("icon1");
                        this.LoadAndChangeIcon(icon1, itemData.ItemAtlas, itemData.ItemIcon);
                        var icon3 = box.getChildByName("icon3");
                        this.LoadAndChangeIcon(icon3, itemData.ItemAtlas, itemData.ItemIcon);
                    }
                    break;
            }
        };
        shop.prototype.setCellData = function (cell, itemData) {
            var box = cell;
            //var icon = <Laya.Image>box.getChildByName("icon");
            var name = box.getChildByName("name");
            var buy = box.getChildByName("buy");
            var trybtn = box.getChildByName("try");
            var usebtn = box.getChildByName("use");
            var usingText = box.getChildByName("using");
            this.setIconData(cell, itemData);
            name.text = itemData.ItemName;
            buy.label = itemData.ItemPrice + "金币";
            var IDStr = this.userdata.GetAplayItemID(itemData.page);
            //console.debug("IDStr="+IDStr);
            var IsUsing = IDStr == itemData.ItemID;
            usingText.visible = IsUsing;
            if (IsUsing) {
                buy.visible = false;
                trybtn.visible = false;
                usebtn.visible = false;
                switch (itemData.page) {
                    case 1:
                        shop.ItemSelectedInPage1 = itemData;
                        break;
                    case 2:
                        shop.ItemSelectedInPage2 = itemData;
                        break;
                    case 3:
                        shop.ItemSelectedInPage3 = itemData;
                        break;
                }
            }
            else if (this.userdata != null) {
                var IsPurchasedItemID = this.userdata.IsPurchasedItemID(itemData.ItemID);
                buy.visible = !IsPurchasedItemID;
                trybtn.visible = !IsPurchasedItemID;
                usebtn.visible = IsPurchasedItemID;
            }
            buy.clickHandler = new Laya.Handler(this, this.OnClickBuy, [itemData]);
            trybtn.clickHandler = new Laya.Handler(this, this.OnClickTry, [itemData]);
            usebtn.clickHandler = new Laya.Handler(this, this.OnClickUse, [itemData]);
        };
        shop.prototype.OnClickUse = function (itemData) {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnClickUse, [itemData]);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        shop.prototype.OnClickBuy = function (itemData) {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnClickBuy, [itemData]);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        shop.prototype.OnClickTry = function (itemData) {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.OnClickTry, [itemData]);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        shop.prototype.CloseUI = function () {
            this.shopUI.visible = false;
            pokerGame.SoundPlayer.PlaySound(1);
        };
        shop.prototype.ClickBack = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickBackToMainFromShop);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        shop.prototype.ClickClose = function () {
            GameGlobal.Dispatcher.GetInstance().brodcastEvent(GameGlobal.EVENT.onClickBackToMainFromShop);
            pokerGame.SoundPlayer.PlaySound(1);
        };
        /**根据选择tab的索引切换页面**/
        shop.prototype.onSelecte = function (index) {
            //切换ViewStack子页面
            this.shopUI.viewstack.selectedIndex = index;
        };
        shop.prototype.ShowMessage = function (message) {
            if (!this.shopUI.visible) {
                return;
            }
            if (message != null) {
                this.shopUI.message.text = message;
                this.shopUI.message.alpha = 1;
                Laya.Tween.clearAll(this.shopUI.message);
                Laya.Tween.to(this.shopUI.message, { alpha: 0 }, 2000, Laya.Ease.sineInOut, null, 0);
            }
        };
        shop.prototype.SetGoldText = function (goldNumText) {
            if (this.shopUI != null) {
                this.shopUI.GoldText.text = goldNumText;
            }
        };
        return shop;
    }());
    pokerUI.shop = shop;
})(pokerUI || (pokerUI = {}));
//# sourceMappingURL=shop.js.map