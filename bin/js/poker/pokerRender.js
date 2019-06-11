/**
* 扑克图片渲染体
*/
var poker;
(function (poker) {
    var cardRenderType;
    (function (cardRenderType) {
        cardRenderType[cardRenderType["cardIMG"] = 0] = "cardIMG";
        cardRenderType[cardRenderType["cardBack"] = 1] = "cardBack";
        cardRenderType[cardRenderType["systemIMG"] = 2] = "systemIMG"; //系统图案
    })(cardRenderType = poker.cardRenderType || (poker.cardRenderType = {}));
    var pokerRender = /** @class */ (function () {
        function pokerRender() {
            this.ImageFileName = "";
            this.cardType = cardRenderType.cardIMG; //卡片图类型
            this.img = new Laya.Image();
        }
        pokerRender.ReadSkin = function () {
            pokerRender.backSkinName = pokerUI.shop.ItemSelectedInPage3.ItemIcon;
            if (GameMain.app.mWX.fhOnoff == 0) {
                pokerRender.cardSkinName = "poker4/";
            }
            else {
                pokerRender.cardSkinName = pokerUI.shop.ItemSelectedInPage2.ItemIcon;
            }
        };
        pokerRender.prototype.Dispose = function () {
            if (this.img) {
                this.img.removeSelf();
                this.img.dispose();
                this.img = null;
            }
        };
        pokerRender.prototype.ChangeRenderToSystemCard = function (systemImgName) {
            this.cardType = cardRenderType.systemIMG;
            this.ImageFileName = "system/" + systemImgName;
            //Laya.loader.load("res/atlas/system.atlas",Laya.Handler.create(this,this.onLoadedSystemIMG));	
            Laya.loader.load([{ url: "res/atlas/system.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onLoadedSystemIMG));
        };
        pokerRender.prototype.ChangeRenderByData = function (data) {
            //this.IsCardBack=data.IsCardBack;
            if (data.IsCardBack) {
                this.cardType = cardRenderType.cardBack;
                //this.ImageFileName=this.GetImgFileName(data);
                if (pokerUI.shop.ItemSelectedInPage3 != null) {
                    //Laya.loader.load(pokerUI.shop.ItemSelectedInPage3.ItemAtlas,Laya.Handler.create(this,this.onCardBackIMGLoaded));
                    Laya.loader.load([{ url: pokerUI.shop.ItemSelectedInPage3.ItemAtlas, type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onCardBackIMGLoaded));
                }
            }
            else {
                this.cardType = cardRenderType.cardIMG;
                if (pokerUI.shop.ItemSelectedInPage2 != null) {
                    this.ImageFileName = pokerRender.cardSkinName + pokerRender.GetImgFileName(data);
                    //pokerUI.shop.ItemSelectedInPage2.ItemIcon+pokerRender.GetImgFileName(data);
                    //Laya.loader.load(pokerUI.shop.ItemSelectedInPage2.ItemAtlas,Laya.Handler.create(this,this.onLoadedCardIMG));
                    if (GameMain.app.mWX.fhOnoff == 0) {
                        Laya.loader.load([{ url: "res/atlas/poker4.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onLoadedCardIMG));
                    }
                    else {
                        Laya.loader.load([{ url: pokerUI.shop.ItemSelectedInPage2.ItemAtlas, type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this.onLoadedCardIMG));
                    }
                }
            }
        };
        pokerRender.prototype.onCardBackIMGLoaded = function () {
            if (this.cardType != cardRenderType.cardBack) {
                return;
            }
            var newSkinName = pokerRender.backSkinName; //pokerUI.shop.ItemSelectedInPage3.ItemIcon;
            if (this.img.skin != newSkinName) {
                this.img.graphics.clear();
                this.img.skin = newSkinName; //"back/"+this.backSkinFileName+".png"
                //	console.debug("this.img.skin="+this.img.skin);
            }
        };
        pokerRender.prototype.onLoadedCardIMG = function () {
            if (this.cardType != cardRenderType.cardIMG) {
                return;
            }
            var newSkinName = this.ImageFileName;
            if (this.img.skin != newSkinName) {
                this.img.graphics.clear();
                this.img.skin = this.ImageFileName;
                //	 console.debug("this.img.skin="+this.img.skin);
            }
        };
        pokerRender.prototype.onLoadedSystemIMG = function () {
            if (this.cardType != cardRenderType.systemIMG) {
                return;
            }
            var newSkinName = this.ImageFileName;
            if (this.img.skin != newSkinName) {
                this.img.graphics.clear();
                this.img.skin = this.ImageFileName;
                // console.debug("this.img.skin="+this.img.skin);
            }
        };
        pokerRender.GetImgFileNameWithTypeNum = function (type, pokerNum) {
            var data = new poker.pokerdata(type, pokerNum);
            return pokerRender.GetImgFileName(data);
        };
        pokerRender.GetImgFileName = function (data) {
            var typeStr = "";
            switch (data.mType) {
                case PokerType.club: //梅花
                    typeStr = "c";
                    break;
                case PokerType.diamond: //方块
                    typeStr = "d";
                    break;
                case PokerType.heart: //红桃
                    typeStr = "h";
                    break;
                case PokerType.spade: //黑桃
                    typeStr = "s";
                    break;
            }
            var numStr = data.mNum.toString();
            if (data.mNum < 10) {
                numStr = "0" + numStr;
            }
            var tRet = "img_card_" + typeStr + numStr + ".png";
            return tRet;
        };
        pokerRender.backSkinName = "img_card_back7";
        pokerRender.cardSkinName = "poker";
        return pokerRender;
    }());
    poker.pokerRender = pokerRender;
})(poker || (poker = {}));
//# sourceMappingURL=pokerRender.js.map