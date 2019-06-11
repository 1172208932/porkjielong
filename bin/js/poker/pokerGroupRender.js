/**
* name
*/
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
var poker;
(function (poker) {
    var PokerGroupRenderMode;
    (function (PokerGroupRenderMode) {
        PokerGroupRenderMode[PokerGroupRenderMode["line"] = 0] = "line";
        PokerGroupRenderMode[PokerGroupRenderMode["lastOneCard"] = 1] = "lastOneCard";
        PokerGroupRenderMode[PokerGroupRenderMode["lastThreeCard"] = 2] = "lastThreeCard";
    })(PokerGroupRenderMode = poker.PokerGroupRenderMode || (poker.PokerGroupRenderMode = {}));
    var PokerGroupCollisionMode;
    (function (PokerGroupCollisionMode) {
        PokerGroupCollisionMode[PokerGroupCollisionMode["LastCardCollision"] = 0] = "LastCardCollision";
        PokerGroupCollisionMode[PokerGroupCollisionMode["FirstCardCollision"] = 1] = "FirstCardCollision";
    })(PokerGroupCollisionMode = poker.PokerGroupCollisionMode || (poker.PokerGroupCollisionMode = {}));
    var pokerGroupRender = /** @class */ (function (_super) {
        __extends(pokerGroupRender, _super);
        function pokerGroupRender(mode) {
            var _this = _super.call(this) || this;
            _this.collisionMode = PokerGroupCollisionMode.LastCardCollision;
            _this.zeroCardName = ""; //空的时候显示的系统卡片
            _this.renderMode = mode;
            return _this;
        }
        pokerGroupRender.prototype.FlushCollisionImage = function (vGroupData) {
            switch (this.renderMode) {
                case PokerGroupRenderMode.line: //一条直线
                case PokerGroupRenderMode.lastOneCard: //只显示最后一张
                    {
                        switch (this.collisionMode) {
                            case PokerGroupCollisionMode.LastCardCollision:
                                {
                                    var lastindex = vGroupData.pokerList.length - 1;
                                    if (lastindex >= 0) {
                                        this.collisionImage = vGroupData.pokerList[lastindex].render.img; //最后一张牌
                                    }
                                }
                                break;
                            case PokerGroupCollisionMode.FirstCardCollision:
                                {
                                    if (vGroupData.pokerList.length > 0) {
                                        this.collisionImage = vGroupData.pokerList[0].render.img; //第一张牌
                                    }
                                }
                                break;
                        }
                    }
                    break;
                case PokerGroupRenderMode.lastThreeCard: //只显示最后三张
                    break;
            }
        };
        //加入一张卡片,isHaveAni：是否有动画 aniIndex：动画序号
        pokerGroupRender.prototype.addCardImg = function (img, isHaveAni) {
            if (isHaveAni === void 0) { isHaveAni = true; }
            if (img.parent == null || !isHaveAni) {
                this.addChild(img);
                //img.pos(0,0);
                return;
            }
            var oldRoot = img.parent.parent;
            var newRoot = this.parent;
            var scaleX = newRoot.scaleX;
            var scaleY = newRoot.scaleY;
            var rootOffSet = new Laya.Point((oldRoot.x - newRoot.x) / scaleX, (oldRoot.y - newRoot.y) / scaleY);
            var newStartPos = new Laya.Point(img.x + rootOffSet.x, img.y + rootOffSet.y);
            this.addChild(img);
            img.pos(newStartPos.x, newStartPos.y);
        };
        //新加入一个pokerGroupData
        pokerGroupRender.prototype.AddPokerList = function (vGroupData) {
            switch (this.renderMode) {
                case PokerGroupRenderMode.line: //一条直线
                    {
                        for (var i = 0; i < vGroupData.pokerList.length; i++) {
                            var chain = vGroupData.pokerList[i];
                            //this.addChild(chain.render.img);
                            this.addChild(chain.render.img);
                        }
                        this.SortPos();
                    }
                    break;
                case PokerGroupRenderMode.lastOneCard: //只显示最后一张
                    {
                        var lastindex = vGroupData.pokerList.length - 1;
                        if (lastindex >= 0) {
                            this.addChild(vGroupData.pokerList[lastindex].render.img);
                            this.collisionImage = vGroupData.pokerList[lastindex].render.img; //最后一张牌
                        }
                        this.SortPos();
                    }
                    break;
                case PokerGroupRenderMode.lastThreeCard: //加入队伍中
                    {
                        var LastXPos = 0;
                        var lastIndex = this.numChildren - 1;
                        if (this.numChildren > 0) {
                            LastXPos = this.numChildren * pokerGroupRender.threeCardSpacing;
                        }
                        for (var i = 0; i < vGroupData.pokerList.length; i++) {
                            vGroupData.pokerList[i].render.img.x = LastXPos + pokerGroupRender.threeCardSpacing * (i);
                            this.addChild(vGroupData.pokerList[i].render.img);
                        }
                        //this.SortPos();
                    }
                    break;
            }
            this.FlushCollisionImage(vGroupData);
        };
        //刷新显示一个groupdata
        pokerGroupRender.prototype.FlushPokerList = function (vGroupData, withSort) {
            if (withSort === void 0) { withSort = true; }
            switch (this.renderMode) {
                case PokerGroupRenderMode.line: //一条直线
                    {
                        this.graphics.clear();
                        this.removeChildren(0);
                        for (var i = 0; i < vGroupData.pokerList.length; i++) {
                            var chain = vGroupData.pokerList[i];
                            //chain.render.ChangeRenderByData(chain.data);
                            chain.FlushRender();
                            //chain.render.img.pos(0,0);
                            this.addChild(chain.render.img);
                        }
                    }
                    break;
                case PokerGroupRenderMode.lastOneCard: //只显示最后一张
                    {
                        this.graphics.clear();
                        this.removeChildren(0);
                        var lastindex = vGroupData.pokerList.length - 1;
                        if (lastindex >= 0) {
                            var lastcard = vGroupData.pokerList[lastindex];
                            //lastcard.render.ChangeRenderByData(lastcard.data);
                            lastcard.FlushRender();
                            vGroupData.pokerList[lastindex].render.img.pos(0, 0);
                            this.addChild(vGroupData.pokerList[lastindex].render.img);
                        }
                    }
                    break;
                case PokerGroupRenderMode.lastThreeCard:
                    {
                        this.graphics.clear();
                        this.removeChildren(0);
                        var oldChildNum = this.numChildren; //
                        var lastindex = vGroupData.pokerList.length - 1;
                        for (var i = lastindex - 2; i < vGroupData.pokerList.length; i++) {
                            if (i >= 0) {
                                //vGroupData.pokerList[i].render.ChangeRenderByData(vGroupData.pokerList[i].data);
                                vGroupData.pokerList[i].FlushRender();
                                vGroupData.pokerList[i].render.img.pos(0, 0);
                                this.addChild(vGroupData.pokerList[i].render.img);
                            }
                        }
                    }
                    break;
            }
            this.FlushCollisionImage(vGroupData);
            if (vGroupData.pokerList.length == 0) {
                if (this.zeroCardName.length > 4) ///带.png的文件名
                 {
                    var pokerRd = new poker.pokerRender();
                    pokerRd.ChangeRenderToSystemCard(this.zeroCardName);
                    this.addChild(pokerRd.img);
                    this.collisionImage = pokerRd.img; //最后一张牌
                }
            }
            if (withSort) {
                this.SortPos();
            }
            //画圆点
            // var sp = new Laya.Sprite();
            // this.addChild(sp);
            // sp.graphics.drawCircle(0,0,5,"#ff0000");
        };
        pokerGroupRender.prototype.CheckAndMoveImgWithAniToPos = function (img, posX, posY) {
            if (img.x == posX && img.y == posY) {
                return false;
            }
            Laya.Tween.clearAll(img);
            Laya.Tween.to(img, { x: posX, y: posY }, 800, Laya.Ease.sineIn, null, 0);
            return true;
        };
        pokerGroupRender.prototype.RemoveCardIMG = function (img) {
            img.removeSelf();
        };
        pokerGroupRender.prototype.SortAndMoveToPos = function (sortEndHandle) {
            for (var i = 0; i < this.numChildren; i++) {
                var img = this.getChildAt(i);
                switch (this.renderMode) {
                    case PokerGroupRenderMode.line: //一条直线
                        {
                            img.pos(0, 0);
                            var pos = new Laya.Point(0, i * pokerGroupRender.lineHeightSpacing);
                            if (i == this.numChildren - 1) {
                                Laya.Tween.to(img, { x: pos.x, y: pos.y }, 70 * i, Laya.Ease.sineOut, sortEndHandle, 0);
                            }
                            else {
                                Laya.Tween.to(img, { x: pos.x, y: pos.y }, 70 * i, Laya.Ease.sineOut, null, 0);
                            }
                        }
                        break;
                    case PokerGroupRenderMode.lastThreeCard:
                        {
                            //img.pos(0,0);
                            var indexFromLast = this.numChildren - 1 - i;
                            if (indexFromLast <= 2) {
                                var posIndex = 2 - indexFromLast;
                                if (this.numChildren < 3) {
                                    posIndex = i;
                                }
                                var pos = new Laya.Point(posIndex * pokerGroupRender.threeCardSpacing, 0);
                                //img.pos(pos.x,pos.y);
                                Laya.Tween.to(img, { x: pos.x, y: pos.y }, 200, null, null, 0);
                            }
                            else {
                                Laya.Tween.to(img, { x: 0, y: 0 }, 200, null, Laya.Handler.create(this, this.RemoveCardIMG, [img]), 0);
                                //img.pos(0,0);
                            }
                        }
                        break;
                    case PokerGroupRenderMode.lastOneCard:
                        img.pos(0, 0);
                        break;
                }
            }
        };
        pokerGroupRender.prototype.GetSortedPos = function (index, img) {
            switch (this.renderMode) {
                case PokerGroupRenderMode.line: //一条直线
                    if (img["_skin"] != null) {
                        if (img["_skin"].indexOf("back") != -1) {
                            return new Laya.Point(0, index * pokerGroupRender.lineHeightSpacing);
                        }
                        else {
                            var i = 0;
                            this["_childs"].forEach(function (value, index) {
                                if (value['_skin'].indexOf("back") != -1) {
                                    i++;
                                }
                            });
                            return new Laya.Point(0, i * pokerGroupRender.lineHeightSpacing + (index - i) * pokerGroupRender.lineHeightBackSpacing);
                        }
                    }
                    else {
                        return new Laya.Point(0, index * pokerGroupRender.lineHeightSpacing);
                    }
                case PokerGroupRenderMode.lastThreeCard:
                    return new Laya.Point(index * pokerGroupRender.threeCardSpacing, 0);
                case PokerGroupRenderMode.lastOneCard:
                    return new Laya.Point(0, 0);
            }
            return new Laya.Point(0, 0);
        };
        pokerGroupRender.prototype.SortPos = function () {
            for (var i = 0; i < this.numChildren; i++) {
                var img = this.getChildAt(i);
                var pos = this.GetSortedPos(i, img);
                img.pos(pos.x, pos.y);
            }
        };
        pokerGroupRender.lineHeightSpacing = 15; //线性排列的时候的牌之间的间隔值
        pokerGroupRender.lineHeightBackSpacing = 55; //线性排列的时候的牌之间的间隔值	
        pokerGroupRender.threeCardSpacing = 30; //三张牌的时候的牌之间的间隔值
        return pokerGroupRender;
    }(Laya.Sprite));
    poker.pokerGroupRender = pokerGroupRender;
})(poker || (poker = {}));
//# sourceMappingURL=pokerGroupRender.js.map