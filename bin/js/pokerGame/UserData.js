/**
* 用户数据 第一次登陆的时候需要与服务器数据 同步
*/
var pokerGame;
(function (pokerGame) {
    var UserData = /** @class */ (function () {
        function UserData() {
            //---------------留的接口
            this.defaultGold = 100; //初始金币值
            this.showCardNeedGold = 10; //明牌需要的金币
            this.compliteOneGameGoldGain = 5; //完成一局获得的金币
            this.Gold = 0; //金币值
            this.purchasedItemIDList = new laya.utils.Dictionary(); //已购买的物品ID字典
            this.challengeDataMap = new laya.utils.Dictionary(); //挑战模式的年月日储存
            this.isFirstPlay = true; //是否为第一次玩 (开启新手指引)
            this.isSoundOn = true; //声音打开
            this.isTimerOn = true; //计时器打开
            this.isLeftHand = false; //左手习惯是否打开
            this.isThreeCardOnce = false; //一次发三张
            this.isVigasMode = false; //维加斯模式
            //this.challengeDataMap.set("20181102","20181102");
            this.ReadLocalData();
        }
        UserData.prototype.SetGold = function (setNum) {
            this.Gold = setNum;
            Laya.LocalStorage.setItem("UserGold", this.Gold.toString());
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.UpdateGoldUI);
        };
        UserData.prototype.IsHaveGold = function (NumCheck) {
            return this.Gold >= NumCheck;
        };
        UserData.prototype.AddGold = function (addNum) {
            this.Gold += addNum;
            if (this.Gold < 0) {
                this.Gold = 0;
            }
            Laya.LocalStorage.setItem("UserGold", this.Gold.toString());
            GameGlobal.Dispatcher.sendEvent(GameGlobal.EVENT.UpdateGoldUI);
        };
        //初始化用户数据
        UserData.prototype.LoadFirstPlayData = function () {
            this.SetGold(this.defaultGold);
            Laya.LocalStorage.setItem("isFirstPlay", "1");
            this.LoadGameSetting();
        };
        UserData.prototype.ReadLocalData = function () {
            var firstPlayString = Laya.LocalStorage.getItem("isFirstPlay");
            if (firstPlayString == null || firstPlayString == "1") {
                this.isFirstPlay = true;
                this.LoadFirstPlayData();
                return;
            }
            else {
                var firstPlayvalue = parseInt(firstPlayString);
                if (isNaN(firstPlayvalue)) {
                    this.isFirstPlay = true;
                    Laya.LocalStorage.setItem("isFirstPlay", "1");
                }
                else {
                    this.isFirstPlay = false;
                    Laya.LocalStorage.setItem("isFirstPlay", "0");
                }
            }
            this.UsingItemPage1 = Laya.LocalStorage.getItem("UsingItemPage1");
            this.UsingItemPage2 = Laya.LocalStorage.getItem("UsingItemPage2");
            this.UsingItemPage3 = Laya.LocalStorage.getItem("UsingItemPage3");
            var goldLocal = Laya.LocalStorage.getItem("UserGold");
            if (goldLocal != null) {
                var gold = parseInt(goldLocal);
                if (isNaN(gold) || gold == null) {
                    this.SetGold(this.defaultGold); //初始值
                }
                else {
                    this.Gold = gold;
                }
            }
            else {
                this.SetGold(this.defaultGold); //初始值
            }
            this.LoadChallengeDataMap();
            this.LoadPurchasedItemIDList();
            this.LoadGameSetting();
        };
        UserData.prototype.SetUsingItem = function (page, IDStr) {
            switch (page) {
                case 1:
                    this.UsingItemPage1 = IDStr;
                    Laya.LocalStorage.setItem("UsingItemPage1", this.UsingItemPage1);
                    this.TryingItemPage1 = null;
                    break;
                case 2:
                    this.UsingItemPage2 = IDStr;
                    Laya.LocalStorage.setItem("UsingItemPage2", this.UsingItemPage2);
                    this.TryingItemPage2 = null;
                    break;
                case 3:
                    this.UsingItemPage3 = IDStr;
                    Laya.LocalStorage.setItem("UsingItemPage3", this.UsingItemPage3);
                    this.TryingItemPage3 = null;
                    break;
            }
        };
        UserData.prototype.SetFirstPlay = function (IsFirst) {
            this.isFirstPlay = IsFirst;
            var strValue = IsFirst ? "1" : "0";
            Laya.LocalStorage.setItem("isFirstPlay", strValue);
        };
        //清理试用
        UserData.prototype.ClearTry = function () {
            this.TryingItemPage1 = null;
            this.TryingItemPage2 = null;
            this.TryingItemPage3 = null;
            //	console.debug("ClearTry");
        };
        //是否已购买
        UserData.prototype.IsPurchasedItemID = function (itemID) {
            if (this.purchasedItemIDList.get(itemID) != null) {
                return true;
            }
            else if (itemID == "10001" || itemID == "20001" || itemID == "30001") {
                return true;
            }
            return false;
        };
        UserData.prototype.IsNullData = function (dataStr) {
            return dataStr == null || dataStr.length == 0;
        };
        //正在起作用的道具
        UserData.prototype.GetAplayItemID = function (page) {
            switch (page) {
                case 1:
                    if (!this.IsNullData(this.TryingItemPage1)) {
                        return this.TryingItemPage1;
                    }
                    else if (!this.IsNullData(this.UsingItemPage1)) {
                        return this.UsingItemPage1;
                    }
                    else {
                        return "10001";
                    }
                case 2:
                    if (!this.IsNullData(this.TryingItemPage2)) {
                        return this.TryingItemPage2;
                    }
                    else if (!this.IsNullData(this.UsingItemPage2)) {
                        return this.UsingItemPage2;
                    }
                    else {
                        return "20001";
                    }
                case 3:
                    if (!this.IsNullData(this.TryingItemPage3)) {
                        return this.TryingItemPage3;
                    }
                    else if (!this.IsNullData(this.UsingItemPage3)) {
                        return this.UsingItemPage3;
                    }
                    else {
                        return "30001";
                    }
            }
            return "";
        };
        //使用物品
        UserData.prototype.UseItem = function (itemdata) {
            this.SetUsingItem(itemdata.page, itemdata.ItemID.toString());
        };
        //试用物品
        UserData.prototype.TryItem = function (itemdata) {
            switch (itemdata.page) {
                case 1:
                    this.TryingItemPage1 = itemdata.ItemID;
                    break;
                case 2:
                    this.TryingItemPage2 = itemdata.ItemID;
                    break;
                case 3:
                    this.TryingItemPage3 = itemdata.ItemID;
                    break;
            }
        };
        UserData.prototype.AddPurchasedItemID = function (itemID) {
            if (this.purchasedItemIDList.get(itemID) == null) {
                this.purchasedItemIDList.set(itemID, itemID);
            }
            this.SavePurchasedItemIDList();
        };
        UserData.prototype.SavePurchasedItemIDList = function () {
            Laya.LocalStorage.setJSON("purchasedItemIDList", this.purchasedItemIDList);
        };
        UserData.prototype.LoadPurchasedItemIDList = function () {
            var mapJson = Laya.LocalStorage.getJSON("purchasedItemIDList");
            if (mapJson != null) {
                var keysArray = mapJson["_keys"];
                for (var i in keysArray) {
                    var str = keysArray[i];
                    this.purchasedItemIDList.set(str, str);
                }
            }
        };
        UserData.prototype.IsChallengePassed = function (datestr) {
            //var str=pokerUI.challenge.GetDateString(date);//.toDateString();
            return this.challengeDataMap.get(datestr) != null;
        };
        UserData.prototype.addTochallengeMap = function (datestr) {
            //var str=pokerUI.challenge.GetDateString(date);//date.toDateString();
            if (this.challengeDataMap.get(datestr) == null) {
                this.challengeDataMap.set(datestr, datestr);
            }
            this.SaveChallengeDataMap();
        };
        UserData.prototype.LoadChallengeDataMap = function () {
            //this.challengeDataMap.clear();
            var mapJson = Laya.LocalStorage.getJSON("ChallengeDataMap");
            if (mapJson != null) {
                var keysArray = mapJson["_keys"];
                for (var i in keysArray) {
                    var str = keysArray[i];
                    this.challengeDataMap.set(str, str);
                }
            }
        };
        UserData.prototype.SaveChallengeDataMap = function () {
            Laya.LocalStorage.setJSON("ChallengeDataMap", this.challengeDataMap);
            //	var mapJson:JSON= <JSON>Laya.LocalStorage.getJSON("ChallengeDataMap");
        };
        UserData.prototype.GetSettingIntData = function (key, defaultData) {
            var tRet = 0;
            var dataLocal = Laya.LocalStorage.getItem(key);
            if (dataLocal != null) {
                var tpNum = parseInt(dataLocal);
                if (isNaN(tpNum) || tpNum == null) {
                    tRet = defaultData;
                }
                else {
                    tRet = tpNum;
                }
            }
            else {
                tRet = defaultData;
            }
            return tRet;
        };
        // public isSoundOn: boolean = true;//声音打开
        // public isTimerOn: boolean = true;//计时器打开
        // public isLeftHand: boolean = false;//左手习惯是否打开
        // public isThreeCardOnce: boolean = false;//一次发三张
        // public isVigasMode: boolean = false;//维加斯模式
        UserData.prototype.LoadGameSetting = function () {
            this.isSoundOn = this.GetSettingIntData("isSoundOn", 1) == 1;
            this.isTimerOn = this.GetSettingIntData("isTimerOn", 1) == 1;
            this.isLeftHand = this.GetSettingIntData("isLeftHand", 0) == 1;
            this.isThreeCardOnce = this.GetSettingIntData("isThreeCardOnce", 0) == 1;
            this.isVigasMode = this.GetSettingIntData("isVigasMode", 0) == 1;
        };
        UserData.prototype.SetSoundOn = function (isOn) {
            this.isSoundOn = isOn;
            Laya.LocalStorage.setItem("isSoundOn", this.isSoundOn ? "1" : "0");
        };
        UserData.prototype.SetTimerOn = function (isOn) {
            this.isTimerOn = isOn;
            Laya.LocalStorage.setItem("isTimerOn", this.isTimerOn ? "1" : "0");
        };
        UserData.prototype.SetLeftHand = function (isOn) {
            this.isLeftHand = isOn;
            Laya.LocalStorage.setItem("isLeftHand", this.isLeftHand ? "1" : "0");
        };
        UserData.prototype.SetThreeCardOnce = function (isOn) {
            this.isThreeCardOnce = isOn;
            Laya.LocalStorage.setItem("isThreeCardOnce", this.isThreeCardOnce ? "1" : "0");
        };
        UserData.prototype.SetVigasMode = function (isOn) {
            this.isVigasMode = isOn;
            Laya.LocalStorage.setItem("isVigasMode", this.isVigasMode ? "1" : "0");
        };
        return UserData;
    }());
    pokerGame.UserData = UserData;
})(pokerGame || (pokerGame = {}));
//# sourceMappingURL=UserData.js.map