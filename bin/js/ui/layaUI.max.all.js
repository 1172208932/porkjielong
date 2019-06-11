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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var poker;
    (function (poker) {
        var challengeUI = /** @class */ (function (_super) {
            __extends(challengeUI, _super);
            function challengeUI() {
                return _super.call(this) || this;
            }
            challengeUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.challengeUI.uiView);
            };
            challengeUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Button", "props": { "y": -50, "x": 5, "width": 765, "skin": "UI/button.png", "height": 1402, "alpha": 0 } }, { "type": "Sprite", "props": { "y": 366, "x": 33, "width": 708, "height": 514 }, "child": [{ "type": "Image", "props": { "y": -216, "x": -8, "width": 716, "skin": "UI/introduction_play_ruban.png", "height": 916, "sizeGrid": "50,100,50,100" } }, { "type": "Image", "props": { "y": -191, "x": 29, "width": 638, "skin": "UI/bg.png", "height": 884, "sizeGrid": "32,9,6,12" }, "child": [{ "type": "Rect", "props": { "y": 340, "x": 0, "width": 638, "lineWidth": 1, "height": 546, "fillColor": "#2677a4" } }, { "type": "Image", "props": { "y": -1, "x": 566, "var": "CloseButton", "skin": "UI/anniu_guanbi.png" } }] }] }, { "type": "List", "props": { "y": 524, "x": 98, "width": 602, "var": "weekName", "spaceY": 10, "spaceX": 35, "repeatY": 1, "repeatX": 7, "height": 370 }, "child": [{ "type": "Box", "props": { "name": "render" }, "child": [{ "type": "Label", "props": { "width": 50, "text": "1", "strokeColor": "#346ebb", "stroke": 2, "name": "text", "height": 50, "fontSize": 30, "color": "#346ebb", "centerY": 0, "centerX": 0 } }] }] }, { "type": "List", "props": { "y": 591, "x": 106, "width": 602, "var": "days", "spaceY": 10, "spaceX": 35, "repeatY": 6, "repeatX": 7, "height": 360 }, "child": [{ "type": "Box", "props": { "name": "render" }, "child": [{ "type": "Label", "props": { "y": 0, "x": 0, "width": 50, "text": "1", "strokeColor": "#346ebb", "stroke": 2, "name": "text", "height": 50, "fontSize": 35, "color": "#675f0e", "anchorY": 0.5, "anchorX": 0.5, "align": "center" } }, { "type": "Image", "props": { "y": -6, "x": 2, "width": 50, "skin": "UI/Checkmark.png", "scaleY": 0.8, "scaleX": 0.8, "name": "doneImg", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": -5, "x": 2, "width": 50, "skin": "UI/select.png", "name": "selectIMG", "height": 50, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": -5, "x": 2, "width": 50, "skin": "UI/select.png", "name": "ClickIMG", "height": 50, "anchorY": 0.5, "anchorX": 0.5, "alpha": 0 } }] }] }, { "type": "Button", "props": { "y": 952, "x": 258, "width": 232, "var": "startChallenge", "skin": "UI/button.png", "name": "startChallenge", "labelStrokeColor": "#346ebb", "labelStroke": 2, "labelSize": 30, "labelFont": "SimHei", "label": "开始游戏", "height": 71 } }, { "type": "Text", "props": { "y": 422, "x": 297, "width": 168, "var": "monthText", "text": "十一月", "height": 70, "fontSize": 50, "font": "Microsoft YaHei", "color": "#346ebb", "bold": true, "align": "center" } }, { "type": "Button", "props": { "y": 438, "x": 82, "width": 68, "var": "preMonth", "strokeColors": "#346ebb", "skin": "UI/button.png", "labelStrokeColor": "#346ebb", "labelStroke": 2, "labelSize": 30, "label": "<", "height": 46 } }, { "type": "Button", "props": { "y": 436, "x": 611, "width": 68, "var": "nextMonth", "skin": "UI/button.png", "labelStrokeColor": "#346ebb", "labelStroke": 2, "labelSize": 30, "label": ">", "height": 46 } }, { "type": "Text", "props": { "y": 294, "x": 109, "width": 345, "var": "today", "text": "2018年11月8日", "height": 38, "fontSize": 55, "font": "Microsoft YaHei", "color": "#346ebb", "align": "center" } }, { "type": "Image", "props": { "y": -1, "x": -5, "width": 713, "var": "CloseButton2", "skin": "UI/anniu_guanbi.png", "height": 176, "alpha": 0 } }] };
            return challengeUI;
        }(Dialog));
        poker.challengeUI = challengeUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var ConfirmAutoPlayUI = /** @class */ (function (_super) {
            __extends(ConfirmAutoPlayUI, _super);
            function ConfirmAutoPlayUI() {
                return _super.call(this) || this;
            }
            ConfirmAutoPlayUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.ConfirmAutoPlayUI.uiView);
            };
            ConfirmAutoPlayUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Sprite", "props": { "y": 69, "x": 202 }, "child": [{ "type": "Image", "props": { "y": 275, "x": -160, "width": 647, "skin": "UI/chunbai_diban.png", "height": 472, "sizeGrid": "36,152,37,142" } }, { "type": "Text", "props": { "y": 415, "x": -85, "width": 411, "text": "恭喜！您已解开了所有卡牌！", "height": 114, "fontSize": 40, "font": "Microsoft YaHei", "color": "#d28908", "bold": true } }, { "type": "Button", "props": { "y": 627, "x": 74, "width": 169, "var": "shareWechat", "skin": "UI/button.png", "name": "shareWechat", "labelSize": 30, "labelFont": "SimHei", "labelColors": "#346ebb", "labelBold": true, "label": "分享", "height": 59 } }, { "type": "Text", "props": { "y": 529, "x": 5, "text": "分享后,自动完成剩余牌局", "fontSize": 30, "font": "Microsoft YaHei", "color": "#d28908", "bold": true } }, { "type": "Image", "props": { "y": 304, "x": 361, "var": "CloseBTN", "skin": "UI/anniu_guanbi.png" } }] }] };
            return ConfirmAutoPlayUI;
        }(Dialog));
        poker.ConfirmAutoPlayUI = ConfirmAutoPlayUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var ConfirmShowCardUI = /** @class */ (function (_super) {
            __extends(ConfirmShowCardUI, _super);
            function ConfirmShowCardUI() {
                return _super.call(this) || this;
            }
            ConfirmShowCardUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.ConfirmShowCardUI.uiView);
            };
            ConfirmShowCardUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Sprite", "props": { "y": 79, "x": 212 }, "child": [{ "type": "Image", "props": { "y": 275, "x": -160, "width": 647, "skin": "UI/chunbai_diban.png", "height": 472, "sizeGrid": "36,152,37,142" } }, { "type": "Text", "props": { "y": 432, "x": -72, "width": 411, "text": "使用道具,将所有暗牌解锁？", "height": 114, "fontSize": 40, "font": "SimHei", "color": "#d28908", "bold": true } }, { "type": "Button", "props": { "y": 582, "x": -13, "width": 169, "var": "GoldUse", "skin": "UI/button.png", "name": "GoldUse", "labelSize": 30, "labelFont": "SimHei", "labelColors": "#346ebb", "labelBold": true, "label": "10金币使用", "height": 59 } }, { "type": "Image", "props": { "y": 299, "x": 364, "var": "CloseBTN", "skin": "UI/anniu_guanbi.png" } }, { "type": "Button", "props": { "y": 582, "x": 180, "width": 169, "var": "videoUse", "skin": "UI/button.png", "name": "videoUse", "labelSize": 30, "labelFont": "SimHei", "labelColors": "#346ebb", "labelBold": true, "label": "看视频使用", "height": 59 } }] }] };
            return ConfirmShowCardUI;
        }(Dialog));
        poker.ConfirmShowCardUI = ConfirmShowCardUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var gameBottomUI = /** @class */ (function (_super) {
            __extends(gameBottomUI, _super);
            function gameBottomUI() {
                return _super.call(this) || this;
            }
            gameBottomUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.gameBottomUI.uiView);
            };
            gameBottomUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 148, "centerX": 0, "bottom": 0 }, "child": [{ "type": "Image", "props": { "skin": "UI/bg_bottom.png" } }, { "type": "Sprite", "props": { "y": -85, "x": 40, "name": "newgame" }, "child": [{ "type": "Image", "props": { "y": 100, "x": 0, "var": "showPopup", "skin": "UI/add.png", "name": "showPopup" } }] }, { "type": "Sprite", "props": { "y": -59, "x": -224, "width": 100, "visible": false, "name": "auto" }, "child": [{ "type": "Image", "props": { "y": 86, "var": "autoPlay", "skin": "UI/auto.png", "name": "autoPlay" } }, { "type": "Label", "props": { "y": 191, "var": "autoPlayText", "text": "自动", "fontSize": 25, "font": "SimHei", "color": "#348ff8", "centerX": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }, { "type": "Sprite", "props": { "y": -85, "x": 638, "name": "back" }, "child": [{ "type": "Image", "props": { "y": 100, "x": 0, "var": "back", "skin": "UI/back.png", "name": "back" } }] }, { "type": "Sprite", "props": { "y": -85, "x": 399, "name": "tips" }, "child": [{ "type": "Image", "props": { "y": 100, "x": 0, "var": "showTips", "skin": "UI/tip.png" } }] }, { "type": "Sprite", "props": { "y": -85, "x": 518, "name": "showHiddenCard" }, "child": [{ "type": "Image", "props": { "y": 100, "x": 0, "var": "showHiddenCard", "skin": "UI/mingpai.png", "name": "showHiddenCard" } }] }, { "type": "Sprite", "props": { "y": -85, "x": 279, "name": "rules" }, "child": [{ "type": "Image", "props": { "y": 100, "x": 0, "var": "rules", "skin": "UI/rule.png", "name": "rules" } }] }, { "type": "Sprite", "props": { "y": -85, "x": 160, "name": "set" }, "child": [{ "type": "Image", "props": { "y": 100, "x": 0, "var": "set", "skin": "UI/btn_6.png", "name": "set" } }] }] };
            return gameBottomUI;
        }(Dialog));
        poker.gameBottomUI = gameBottomUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var gamePopupUI = /** @class */ (function (_super) {
            __extends(gamePopupUI, _super);
            function gamePopupUI() {
                return _super.call(this) || this;
            }
            gamePopupUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.gamePopupUI.uiView);
            };
            gamePopupUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 400, "centerX": 0, "bottom": 100 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 766, "var": "CloseBTN", "skin": "UI/bg_tab.png", "name": "CloseBTN", "height": 301, "alpha": 0, "sizeGrid": "25,27,20,26" } }, { "type": "Sprite", "props": { "y": 15, "x": -3, "var": "endGame" }, "child": [{ "type": "Image", "props": { "y": -8, "x": 0, "width": 204, "var": "EndGame", "skin": "UI/Popsbtn.png", "height": 79 } }, { "type": "Label", "props": { "y": 9, "x": 52, "text": "结束游戏", "fontSize": 25, "font": "Microsoft YaHei", "color": "#346ebb", "bold": true } }] }, { "type": "Sprite", "props": { "y": 175, "x": 15, "name": "reTry" }, "child": [{ "type": "Image", "props": { "y": -8, "x": 0, "var": "RETRY", "skin": "UI/btn_again.png" } }] }, { "type": "Sprite", "props": { "y": 271, "x": 15, "name": "newGame" }, "child": [{ "type": "Image", "props": { "y": -8, "x": 0, "var": "NEWGame", "skin": "UI/btn_new.png" } }] }] };
            return gamePopupUI;
        }(Dialog));
        poker.gamePopupUI = gamePopupUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var gameTopUI = /** @class */ (function (_super) {
            __extends(gameTopUI, _super);
            function gameTopUI() {
                return _super.call(this) || this;
            }
            gameTopUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.gameTopUI.uiView);
            };
            gameTopUI.uiView = { "type": "Dialog", "props": { "y": 0, "width": 750, "top": 0, "height": 40, "centerX": 0 }, "child": [{ "type": "Text", "props": { "y": -4, "x": 388, "var": "TimeCount", "text": "01:11", "name": "TimeCount", "fontSize": 37, "font": "Microsoft YaHei", "color": "#ffffff" } }, { "type": "Sprite", "props": { "y": -633, "x": 415, "visible": false, "scaleY": 0.7, "scaleX": 0.7, "name": "challenge" }, "child": [{ "type": "Image", "props": { "width": 268, "var": "challenge", "skin": "UI/Popsbtn.png", "height": 143 }, "child": [{ "type": "Label", "props": { "width": 180, "text": "每日挑战", "height": 84, "fontSize": 45, "font": "Microsoft YaHei", "color": "#346ebb", "centerY": 0, "centerX": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }] }, { "type": "Sprite", "props": { "y": -633, "x": 572, "visible": false, "scaleY": 0.7, "scaleX": 0.7, "name": "setting" }, "child": [{ "type": "Image", "props": { "width": 268, "var": "setting", "skin": "UI/Popsbtn.png", "height": 143 }, "child": [{ "type": "Label", "props": { "width": 100, "text": "设置", "height": 84, "fontSize": 50, "font": "Microsoft YaHei", "color": "#346ebb", "centerY": 0, "centerX": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }] }, { "type": "Sprite", "props": { "y": -633, "x": 730, "visible": false, "scaleY": 0.7, "scaleX": 0.7, "name": "shop" }, "child": [{ "type": "Image", "props": { "width": 268, "var": "shop", "skin": "UI/Popsbtn.png", "height": 143 }, "child": [{ "type": "Label", "props": { "width": 100, "text": "商城", "height": 84, "fontSize": 50, "font": "Microsoft YaHei", "color": "#346ebb", "centerY": 0, "centerX": 0, "bold": true, "anchorY": 0.5, "anchorX": 0.5 } }] }] }, { "type": "Box", "props": { "y": -639, "x": 905, "visible": false, "var": "money" }, "child": [{ "type": "Text", "props": { "y": 39, "x": 134, "width": 116, "var": "GoldText", "text": "999999", "name": "GoldText", "height": 42, "fontSize": 33, "font": "Microsoft YaHei", "color": "#ffffff" } }, { "type": "Text", "props": { "y": 47, "x": 109, "text": "X", "name": "x", "fontSize": 23, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }, { "type": "Image", "props": { "skin": "UI/gold.png" } }] }] };
            return gameTopUI;
        }(Dialog));
        poker.gameTopUI = gameTopUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var pokerTableUI = /** @class */ (function (_super) {
            __extends(pokerTableUI, _super);
            function pokerTableUI() {
                return _super.call(this) || this;
            }
            pokerTableUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.pokerTableUI.uiView);
            };
            pokerTableUI.uiView = { "type": "View", "props": { "x": 0, "width": 750, "top": 0, "height": 1334 }, "child": [{ "type": "Sprite", "props": { "y": 95, "x": 51, "width": 637, "name": "BackGround", "height": 411 }, "child": [{ "type": "Image", "props": { "y": -99, "x": -404, "width": 1500, "var": "BGImg", "skin": "login/bk.jpg", "height": 1766, "alpha": 0.7 } }, { "type": "Rect", "props": { "y": -97, "x": -88, "width": 908, "lineWidth": 1, "height": 1723, "fillColor": "#172c4c" } }] }, { "type": "Sprite", "props": { "y": 1282, "x": 185, "width": 50, "name": "message", "mouseThrough": false, "mouseEnabled": false, "hitTestPrior": false, "height": 50 }, "child": [{ "type": "Text", "props": { "y": -204, "x": -144, "var": "message", "text": "这是一条提示信息", "name": "message", "mouseThrough": false, "mouseEnabled": false, "hitTestPrior": false, "fontSize": 30, "font": "SimHei", "color": "#ffffff", "alpha": 0, "align": "left" } }] }, { "type": "Sprite", "props": { "y": 334, "x": 63, "width": 656, "name": "PokerTable", "height": 627 }, "child": [{ "type": "Sprite", "props": { "y": 32, "x": -48, "var": "Line1", "scaleY": 1, "scaleX": 1, "name": "Line1" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": 32, "x": 56, "var": "Line2", "scaleY": 1, "scaleX": 1, "name": "Line2" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": 32, "x": 160, "var": "Line3", "scaleY": 1, "scaleX": 1, "name": "Line3" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": 32, "x": 264, "var": "Line4", "scaleY": 1, "scaleX": 1, "name": "Line4" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": 32, "x": 367, "var": "Line5", "scaleY": 1, "scaleX": 1, "name": "Line5" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": 32, "x": 471, "var": "Line6", "scaleY": 1, "scaleX": 1, "name": "Line6" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": 32, "x": 575, "var": "Line7", "scaleY": 1, "scaleX": 1, "name": "Line7" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -141, "x": 388, "var": "ThreeCard", "scaleY": 1, "scaleX": 1, "name": "ThreeCard" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -141, "x": 575, "var": "StartCard", "scaleY": 1, "scaleX": 1, "name": "StartCard" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -141, "x": -48, "var": "Deck1", "scaleY": 1, "scaleX": 1, "name": "Deck1" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -141, "x": 56, "var": "Deck2", "scaleY": 1, "scaleX": 1, "name": "Deck2" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -141, "x": 160, "var": "Deck3", "scaleY": 1, "scaleX": 1, "name": "Deck3" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -141, "x": 264, "var": "Deck4", "scaleY": 1, "scaleX": 1, "name": "Deck4" }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 98, "skin": "UI/img_card_c01.png", "height": 160 } }] }, { "type": "Sprite", "props": { "y": -699, "x": -436, "var": "tutorialMask", "name": "tutorialMask", "mouseThrough": true, "mouseEnabled": true, "hitTestPrior": true, "alpha": 0.5 }, "child": [{ "type": "Rect", "props": { "y": 0, "x": 0, "width": 1380, "lineWidth": 0, "lineColor": "#000000", "height": 2153, "fillColor": "#000000" } }] }, { "type": "Sprite", "props": { "y": 0, "x": 0, "scaleY": 1, "scaleX": 1, "name": "tutorialCardSpr" }, "child": [{ "type": "Sprite", "props": { "var": "tutorialCardSpr1", "name": "tutorialCardSpr1" } }] }, { "type": "Sprite", "props": { "y": 10, "x": 10, "scaleY": 1, "scaleX": 1, "name": "tutorialCardSpr" }, "child": [{ "type": "Sprite", "props": { "var": "tutorialCardSpr2", "name": "tutorialCardSpr2" } }] }, { "type": "Sprite", "props": { "y": -126, "x": 3, "var": "LineMove", "scaleY": 1, "scaleX": 1, "name": "LineMove", "mouseThrough": false, "mouseEnabled": false, "hitTestPrior": false } }, { "type": "Sprite", "props": { "y": 0, "x": 0, "var": "LineTips", "scaleY": 1, "scaleX": 1, "name": "LineTips", "mouseThrough": false, "mouseEnabled": false, "hitTestPrior": false, "alpha": 0.8 } }] }] };
            return pokerTableUI;
        }(View));
        poker.pokerTableUI = pokerTableUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var settingPopupUI = /** @class */ (function (_super) {
            __extends(settingPopupUI, _super);
            function settingPopupUI() {
                return _super.call(this) || this;
            }
            settingPopupUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.settingPopupUI.uiView);
            };
            settingPopupUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Image", "props": { "y": 1000, "x": 64, "skin": "UI/bg_1.png", "scaleY": -1 } }, { "type": "Sprite", "props": { "y": 256, "x": 87 } }, { "type": "Text", "props": { "y": 542, "x": 890, "var": "lefthandText", "text": "左手习惯", "fontSize": 30, "font": "SimHei", "color": "#5077aa" } }, { "type": "Text", "props": { "y": 577, "x": 890, "var": "timerText", "text": "计时器", "fontSize": 30, "font": "SimHei", "color": "#5077aa" } }, { "type": "Text", "props": { "y": 612, "x": 890, "var": "threecardOnce", "text": "一次发三张", "fontSize": 30, "font": "SimHei", "color": "#5077aa" } }, { "type": "Text", "props": { "y": 648, "x": 889, "var": "lasvigasMode", "text": "维加斯模式", "fontSize": 30, "font": "SimHei", "color": "#5077aa" } }, { "type": "Text", "props": { "y": 507, "x": 892, "var": "soundText", "text": "音效", "height": 30, "fontSize": 30, "font": "SimHei", "color": "#5077aa" } }, { "type": "Sprite", "props": { "y": 591, "x": 479, "var": "timerSwitch", "name": "switch" }, "child": [{ "type": "Image", "props": { "skin": "UI/1.png", "name": "state1" } }, { "type": "Image", "props": { "skin": "UI/2.png", "name": "state2" } }, { "type": "Image", "props": { "skin": "UI/3.png", "name": "state3" } }] }, { "type": "Sprite", "props": { "y": 481, "x": 479, "var": "lefthandSwitch", "name": "switch" }, "child": [{ "type": "Image", "props": { "skin": "UI/1.png", "name": "state1" } }, { "type": "Image", "props": { "skin": "UI/2.png", "name": "state2" } }, { "type": "Image", "props": { "skin": "UI/3.png", "name": "state3" } }] }, { "type": "Sprite", "props": { "y": 700, "x": 479, "var": "threecardSwitch", "name": "switch" }, "child": [{ "type": "Image", "props": { "skin": "UI/1.png", "name": "state1" } }, { "type": "Image", "props": { "skin": "UI/2.png", "name": "state2" } }, { "type": "Image", "props": { "skin": "UI/3.png", "name": "state3" } }] }, { "type": "Sprite", "props": { "y": 809, "x": 479, "var": "vigasSwitch", "name": "switch" }, "child": [{ "type": "Image", "props": { "skin": "UI/1.png", "name": "state1" } }, { "type": "Image", "props": { "skin": "UI/2.png", "name": "state2" } }, { "type": "Image", "props": { "skin": "UI/3.png", "name": "state3" } }] }, { "type": "Sprite", "props": { "y": 372, "x": 479, "var": "soundSwitch", "name": "switch" }, "child": [{ "type": "Image", "props": { "skin": "UI/1.png", "name": "state1" } }, { "type": "Image", "props": { "skin": "UI/2.png", "name": "state2" } }, { "type": "Image", "props": { "skin": "UI/3.png", "name": "state3" } }] }, { "type": "Image", "props": { "y": 592, "x": 198, "width": 412, "var": "timerBTN", "skin": "UI/Popsbtn.png", "height": 72, "alpha": 0 } }, { "type": "Image", "props": { "y": 479, "x": 187, "width": 426, "var": "lefthandBTN", "skin": "UI/Popsbtn.png", "height": 84, "alpha": 0 } }, { "type": "Image", "props": { "y": 361, "x": 197, "width": 413, "var": "soundBTNImg", "skin": "UI/Popsbtn.png", "height": 83, "alpha": 0 } }, { "type": "Image", "props": { "y": 681, "x": 164, "width": 429, "var": "ThreeCardBTN", "skin": "UI/Popsbtn.png", "height": 80, "alpha": 0 } }, { "type": "Image", "props": { "y": 804, "x": 165, "width": 419, "var": "VigasBTN", "skin": "UI/Popsbtn.png", "height": 71, "alpha": 0 } }, { "type": "Image", "props": { "y": 244, "x": 605, "var": "CloseBTN", "skin": "UI/btn_0.png" } }, { "type": "Image", "props": { "y": -123, "x": 9, "width": 524, "var": "CloseBTN2", "skin": "UI/anniu_guanbi.png", "scaleY": 0.5, "scaleX": 0.5, "height": 74, "alpha": 0 } }, { "type": "Image", "props": { "y": 490, "x": 166, "skin": "UI/bg_3.png" } }, { "type": "Image", "props": { "y": 599, "x": 166, "skin": "UI/bg_4.png" } }, { "type": "Image", "props": { "y": 707, "x": 166, "skin": "UI/bg_5.png" } }, { "type": "Image", "props": { "y": 816, "x": 166, "skin": "UI/bg_6text.png" } }, { "type": "Image", "props": { "y": 381, "x": 166, "skin": "UI/sound_1.png" } }, { "type": "Image", "props": { "y": 453, "x": 132, "skin": "UI/bg_7.png" } }, { "type": "Image", "props": { "y": 562, "x": 132, "skin": "UI/bg_7.png" } }, { "type": "Image", "props": { "y": 672, "x": 132, "skin": "UI/bg_7.png" } }, { "type": "Image", "props": { "y": 793, "x": 132, "skin": "UI/bg_7.png" } }] };
            return settingPopupUI;
        }(View));
        poker.settingPopupUI = settingPopupUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var ShopUI = /** @class */ (function (_super) {
            __extends(ShopUI, _super);
            function ShopUI() {
                return _super.call(this) || this;
            }
            ShopUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.ShopUI.uiView);
            };
            ShopUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Sprite", "props": { "y": 71, "x": 3 }, "child": [{ "type": "Image", "props": { "y": -155, "x": -133, "width": 1000, "skin": "UI/img_bg_bluefelt_thumb.png", "height": 2000 } }] }, { "type": "Sprite", "props": { "y": 241, "x": -25 }, "child": [{ "type": "Image", "props": { "y": -16, "x": 69, "width": 670, "skin": "UI/chunbai_diban.png", "height": 1089, "sizeGrid": "36,152,37,142" } }, { "type": "Tab", "props": { "y": 14, "x": 136, "var": "tab", "skin": "UI/tab.png", "selectedIndex": 0, "scaleY": 0.85, "scaleX": 0.85, "name": "tab", "labels": "背景,牌面,牌背", "labelSize": 36, "labelPadding": "0", "labelFont": "SimHei", "labelColors": "#ffffff,#ffffff,#ffffff" } }, { "type": "Label", "props": { "y": -53, "x": 54, "var": "BackBTN", "text": "< 返回", "name": "BackBTN", "fontSize": 40, "font": "Microsoft YaHei", "color": "#a8dff9" } }, { "type": "Label", "props": { "y": -53, "x": 54, "var": "CloseBTN", "text": "< 返回", "name": "CloseBTN", "fontSize": 40, "font": "Microsoft YaHei", "color": "#a8dff9" } }] }, { "type": "Text", "props": { "y": 175, "x": 316, "text": "商城", "strokeColor": "#7d97ea", "stroke": 1, "fontSize": 50, "font": "SimHei", "color": "#ffffff" } }, { "type": "ViewStack", "props": { "y": 335, "x": 67, "width": 690, "var": "viewstack", "selectedIndex": 0, "name": "viewstack", "height": 981 }, "child": [{ "type": "List", "props": { "y": -10, "x": 39, "width": 617, "var": "listBG", "vScrollBarSkin": "UI/vscroll.png", "spaceX": 3, "name": "item0", "height": 933 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 274, "renderType": "render", "name": "render", "height": 318 }, "child": [{ "type": "Rect", "props": { "y": 259, "x": -2, "width": 273, "lineWidth": 1, "height": 51, "fillColor": "#273755" } }, { "type": "Image", "props": { "y": 0, "x": -2, "width": 909, "skin": "UI/Bg_6.png", "scaleY": 0.3, "scaleX": 0.3, "name": "icon1", "height": 881 } }, { "type": "Image", "props": { "y": 56, "x": 58, "skin": "UI/cardskin1.png", "scaleY": 0.6, "scaleX": 0.6, "name": "cardShow" } }, { "type": "Button", "props": { "y": 209, "x": 3, "width": 125, "skin": "UI/btn_3.png", "name": "buy", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "1元", "height": 43 } }, { "type": "Button", "props": { "y": 209, "x": 133, "width": 131, "skin": "UI/btn_3.png", "name": "try", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "体验", "height": 43 } }, { "type": "Label", "props": { "y": 264, "text": "国王背景", "name": "name", "fontSize": 25, "font": "Microsoft YaHei", "color": "#fdfdfd", "centerX": 0, "align": "center" } }, { "type": "Button", "props": { "y": 207, "x": 35, "width": 181, "skin": "UI/btn_3.png", "name": "use", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "使用", "height": 46 } }, { "type": "Text", "props": { "y": 213, "x": 72, "text": "正在使用", "name": "using", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }, { "type": "Rect", "props": { "y": -1, "x": -2, "width": 273, "lineWidth": 1, "height": 263, "fillColor": "#346ebb" } }] }] }, { "type": "List", "props": { "y": -9, "x": 36, "width": 617, "var": "listCard", "vScrollBarSkin": "UI/vscroll.png", "spaceX": 5, "name": "item1", "height": 933 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 269, "renderType": "render", "name": "render", "height": 318 }, "child": [{ "type": "Image", "props": { "y": 262, "x": -2, "width": 270, "skin": "UI/background.png", "scaleY": -1, "height": 265 } }, { "type": "Rect", "props": { "y": 261, "x": 1, "width": 265, "lineWidth": 1, "height": 43, "fillColor": "#273755" } }, { "type": "Image", "props": { "y": 181, "x": 168, "skin": "UI/img_card_c01.png", "rotation": -20, "name": "icon1", "anchorY": 1, "anchorX": 1 } }, { "type": "Image", "props": { "y": 36, "x": 88, "skin": "UI/img_card_c01.png", "name": "icon2" } }, { "type": "Image", "props": { "y": 224, "x": 223, "skin": "UI/img_card_c01.png", "rotation": 10, "name": "icon3", "anchorY": 1, "anchorX": 1 } }, { "type": "Button", "props": { "y": 209, "x": -3, "width": 131, "skin": "UI/btn_3.png", "name": "buy", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "1元", "height": 43 } }, { "type": "Button", "props": { "y": 209, "x": 133, "width": 131, "skin": "UI/btn_3.png", "name": "try", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "体验", "height": 43 } }, { "type": "Label", "props": { "y": 266, "text": "国王背景", "name": "name", "fontSize": 25, "font": "Microsoft YaHei", "color": "#fdfdfd", "centerX": 0, "align": "center" } }, { "type": "Button", "props": { "y": 207, "x": 35, "width": 181, "skin": "UI/btn_3.png", "name": "use", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "使用", "height": 46 } }, { "type": "Text", "props": { "y": 208, "x": 78, "text": "正在使用", "name": "using", "fontSize": 30, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }] }] }, { "type": "List", "props": { "y": -10, "x": 41, "width": 617, "var": "listCardBack", "vScrollBarSkin": "UI/vscroll.png", "spaceX": 1, "name": "item2", "height": 933 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 270, "renderType": "render", "name": "render", "height": 305 }, "child": [{ "type": "Image", "props": { "y": 262, "x": 0, "width": 268, "skin": "UI/background.png", "scaleY": -1, "height": 265 } }, { "type": "Rect", "props": { "y": 259, "x": -1, "width": 270, "lineWidth": 1, "height": 43, "fillColor": "#273755" } }, { "type": "Image", "props": { "y": 187, "x": 170, "skin": "UI/img_card_c01.png", "rotation": -20, "name": "icon1", "anchorY": 1, "anchorX": 1 } }, { "type": "Image", "props": { "y": 42, "x": 90, "skin": "UI/img_card_c01.png", "name": "icon2" } }, { "type": "Image", "props": { "y": 230, "x": 225, "skin": "UI/img_card_c01.png", "rotation": 10, "name": "icon3", "anchorY": 1, "anchorX": 1 } }, { "type": "Button", "props": { "y": 209, "x": -3, "width": 131, "skin": "UI/btn_3.png", "name": "buy", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "1元", "height": 43 } }, { "type": "Button", "props": { "y": 209, "x": 133, "width": 131, "skin": "UI/btn_3.png", "name": "try", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "体验", "height": 43 } }, { "type": "Label", "props": { "y": 264, "text": "国王背景", "name": "name", "fontSize": 25, "font": "Microsoft YaHei", "color": "#fdfdfd", "centerX": -20, "align": "center" } }, { "type": "Button", "props": { "y": 207, "x": 35, "width": 181, "skin": "UI/btn_3.png", "name": "use", "labelSize": 25, "labelFont": "SimHei", "labelColors": "#ffffff", "label": "使用", "height": 46 } }, { "type": "Text", "props": { "y": 210, "x": 74, "text": "正在使用", "name": "using", "fontSize": 30, "font": "Microsoft YaHei", "color": "#f7f8f4", "bold": true } }] }] }] }, { "type": "Text", "props": { "y": 195, "x": 632, "width": 116, "var": "GoldText", "text": "999999", "name": "GoldText", "height": 42, "fontSize": 33, "font": "Microsoft YaHei", "color": "#ffffff" } }, { "type": "Text", "props": { "y": 203, "x": 607, "text": "X", "name": "x", "fontSize": 23, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true } }, { "type": "Image", "props": { "y": 156, "x": 498, "skin": "UI/gold.png" } }, { "type": "Sprite", "props": { "y": 626, "x": 242, "width": 50, "name": "message", "mouseThrough": false, "mouseEnabled": false, "hitTestPrior": false, "height": 50 }, "child": [{ "type": "Text", "props": { "y": -6, "x": -7, "var": "message", "text": "这是一条提示信息", "name": "message", "mouseThrough": false, "mouseEnabled": false, "hitTestPrior": false, "fontSize": 30, "font": "SimHei", "color": "#ffffff", "alpha": 0, "align": "left" } }] }] };
            return ShopUI;
        }(View));
        poker.ShopUI = ShopUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var StartGameUI = /** @class */ (function (_super) {
            __extends(StartGameUI, _super);
            function StartGameUI() {
                return _super.call(this) || this;
            }
            StartGameUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.StartGameUI.uiView);
            };
            StartGameUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Rect", "props": { "y": 2, "x": -27, "width": 800, "lineWidth": 1, "height": 2111, "fillColor": "#346ebb" } }, { "type": "Text", "props": { "y": 358, "x": 111, "text": "经典接龙升级版", "strokeColor": "#eac77d", "stroke": 1, "fontSize": 80, "font": "SimHei", "color": "#ffffff", "blendMode": "lighter" } }, { "type": "Button", "props": { "y": 930, "x": 258, "width": 242, "var": "shop", "strokeColors": "#346ebb", "skin": "UI/button.png", "name": "shop", "labelStrokeColor": "#346ebb", "labelStroke": 2, "labelSize": 40, "labelFont": "SimHei", "label": "商城", "height": 118 } }, { "type": "Button", "props": { "y": 755, "x": 259, "width": 240, "var": "startGame", "skin": "UI/button.png", "name": "startGame", "labelStrokeColor": "#346ebb", "labelStroke": 2, "labelSize": 40, "labelFont": "SimHei", "label": "开始游戏", "height": 115 } }] };
            return StartGameUI;
        }(View));
        poker.StartGameUI = StartGameUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var tutorialUI = /** @class */ (function (_super) {
            __extends(tutorialUI, _super);
            function tutorialUI() {
                return _super.call(this) || this;
            }
            tutorialUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.tutorialUI.uiView);
            };
            tutorialUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 550, "centerX": 0, "bottom": 0 }, "child": [{ "type": "Image", "props": { "y": 408, "x": 60, "width": 663, "skin": "UI/introduction_play_ruban.png", "scaleY": -1, "height": 262, "sizeGrid": "50,100,50,100" } }, { "type": "Label", "props": { "y": 175, "x": 75, "width": 439, "var": "tutorialDesc", "text": "新手指引文本", "strokeColor": "#668ab0", "stroke": 1, "name": "tutorialDesc", "height": 198, "fontSize": 35, "font": "SimHei", "color": "#ffffff", "bold": false } }, { "type": "Sprite", "props": { "y": 329, "x": 516, "width": 185, "height": 61 }, "child": [{ "type": "Image", "props": { "var": "QuitTutorial", "skin": "UI/btn_1.png" } }] }] };
            return tutorialUI;
        }(Dialog));
        poker.tutorialUI = tutorialUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var poker;
    (function (poker) {
        var WinUI = /** @class */ (function (_super) {
            __extends(WinUI, _super);
            function WinUI() {
                return _super.call(this) || this;
            }
            WinUI.prototype.createChildren = function () {
                View.regComponent("Text", laya.display.Text);
                _super.prototype.createChildren.call(this);
                this.createView(ui.poker.WinUI.uiView);
            };
            WinUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "width": 741, "skin": "UI/button.png", "label": "label", "height": 1316, "alpha": 0 } }, { "type": "Sprite", "props": { "y": 199, "x": 92 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "skin": "UI/result_3.png" } }, { "type": "Text", "props": { "y": 354, "x": 276, "var": "timeCount", "text": "00:25", "name": "timeCount", "fontSize": 35, "color": "#ffffff", "bold": true } }, { "type": "Button", "props": { "y": 540, "x": 151, "var": "startNewgame", "stateNum": 1, "skin": "UI/result_2.png", "name": "startNewgame", "labelSize": 30, "labelFont": "Microsoft YaHei", "labelColors": "#d28908", "labelBold": true } }, { "type": "Image", "props": { "y": 345, "x": 187, "skin": "UI/result_1.png" } }] }] };
            return WinUI;
        }(Dialog));
        poker.WinUI = WinUI;
    })(poker = ui.poker || (ui.poker = {}));
})(ui || (ui = {}));
(function (ui) {
    var wx;
    (function (wx) {
        var loginUI = /** @class */ (function (_super) {
            __extends(loginUI, _super);
            function loginUI() {
                return _super.call(this) || this;
            }
            loginUI.prototype.createChildren = function () {
                _super.prototype.createChildren.call(this);
                this.createView(ui.wx.loginUI.uiView);
            };
            loginUI.uiView = { "type": "View", "props": { "width": 750, "top": 0, "right": 0, "left": 0, "height": 1334, "bottom": 0 }, "child": [{ "type": "Image", "props": { "var": "bk", "top": 0, "skin": "login/bk.jpg", "right": 0, "left": 0, "bottom": 0 } }, { "type": "Image", "props": { "y": 460, "x": 375, "visible": false, "var": "logo", "skin": "login/logo.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 800, "x": 375, "visible": false, "var": "btnStar", "skin": "login/star.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 600, "x": 375, "visible": false, "var": "login", "skin": "login/bk2.png", "anchorY": 0.5, "anchorX": 0.5 }, "child": [{ "type": "Image", "props": { "y": 288, "x": 225, "var": "btnStar2", "skin": "login/login.png", "anchorY": 0, "anchorX": 0.5 } }] }, { "type": "Image", "props": { "y": 300, "x": 115, "skin": "login/bg_2.png" } }] };
            return loginUI;
        }(View));
        wx.loginUI = loginUI;
    })(wx = ui.wx || (ui.wx = {}));
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map