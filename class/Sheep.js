var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Animal } from "./Animal.js";
import * as math from "./../library/math.js";
var Sheep = /** @class */ (function (_super) {
    __extends(Sheep, _super);
    function Sheep(x, y, field) {
        var _this = _super.call(this, x, y, field) || this;
        _this.attractiveSheep = null;
        _this.attractiveSheepDistance = 100;
        _this.attractiveSheepRotation = 0.2;
        _this.field.insertSheep(_this.htmlElement, _this);
        _this.handler();
        return _this;
    }
    /**
     * Check if sheep is not a follower of this sheep.
     *
     * @private
     * @param {Sheep} sheep
     * @return {boolean}
     * @memberof Sheep
     */
    Sheep.prototype.checkNotFollower = function (sheep) {
        if (sheep.attractiveSheep === this) {
            return false;
        }
        else if (sheep.attractiveSheep) {
            return this.checkNotFollower(sheep.attractiveSheep);
        }
        else {
            return true;
        }
    };
    Sheep.prototype.calculateAttraction = function () {
        var closestSheep = null;
        var closestDistance = Infinity;
        for (var _i = 0, _a = this.field.sheep; _i < _a.length; _i++) {
            var sheep = _a[_i];
            if (sheep !== this) {
                var distance = this.distanceTo(sheep);
                if (distance < this.attractiveSheepDistance) {
                    if (distance < closestDistance && this.checkNotFollower(sheep)) {
                        closestDistance = distance;
                        closestSheep = sheep;
                    }
                }
            }
        }
        if (closestSheep) {
            var rotationToSheep = Math.atan2(closestSheep._y - this._y, closestSheep._x - this._x);
            if (math.angleDiff(this._rotation, rotationToSheep) < this.attractiveSheepRotation) {
                this._rotation = rotationToSheep;
                this.attractiveSheep = closestSheep;
                return true;
            }
        }
        this.attractiveSheep = null;
        return false;
    };
    Sheep.prototype.handler = function () {
        var _this = this;
        this.calculateAttraction();
        if (this.attractiveSheep) {
            this.move(0.4 + ((this.distanceTo(this.attractiveSheep) - (this.width)) / this.attractiveSheepDistance));
        }
        else {
            this.randomMove();
        }
        requestAnimationFrame(function () { return _this.handler(); });
    };
    return Sheep;
}(Animal));
export { Sheep };
