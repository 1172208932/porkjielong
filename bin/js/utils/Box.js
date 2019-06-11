/**
* name
*/
var BoundingBox;
(function (BoundingBox) {
    var Box = (function () {
        function Box() {
        }
        Box.CheckTowRect = function (rect1, rect2) {
            return rect1.intersects(rect2);
        };
        return Box;
    }());
    BoundingBox.Box = Box;
})(BoundingBox || (BoundingBox = {}));
//# sourceMappingURL=Box.js.map