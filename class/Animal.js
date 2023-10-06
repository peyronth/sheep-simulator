/**
 *
 *
 * @export
 * @class Animal
 */
var Animal = /** @class */ (function () {
    function Animal(x, y, field) {
        this.name = "Animal";
        /**
         * Rotation in radians
         *
         * @protected
         * @type {number}
         * @memberof Animal
         */
        this._rotation = 0;
        this.width = 30;
        this.height = 30;
        this.speed = 1;
        this._x = x;
        this._y = y;
        this.field = field;
        this.htmlElement = document.createElement("span");
        this.htmlElement.style.left = "".concat(this._x, "px");
        this.htmlElement.style.top = "".concat(this._y, "px");
        this.htmlElement.classList.add("sheep");
        this.name = (Math.floor(Math.random() * 1000)).toString();
        this.htmlElement.innerHTML = this.name;
        this._rotation = Math.random() * 2 * Math.PI;
        this.updatePosition();
    }
    Animal.prototype.randomMove = function () {
        var randomness = 0.2;
        this._rotation += (Math.random() - 0.5) * randomness;
        this.move(0.4);
    };
    Animal.prototype.move = function (speedFactor) {
        if (speedFactor === void 0) { speedFactor = 1; }
        var bufferX = this._x + Math.cos(this._rotation) * this.speed * speedFactor;
        var bufferY = this._y + Math.sin(this._rotation) * this.speed * speedFactor;
        if (bufferX > 0 && bufferX < this.field.width && bufferY > 0 && bufferY < this.field.height) {
            this._x = bufferX;
            this._y = bufferY;
            this.updatePosition();
        }
        else {
            this._rotation += Math.PI / 2;
        }
    };
    Animal.prototype.updatePosition = function () {
        this.htmlElement.style.left = "".concat(this._x, "px");
        this.htmlElement.style.top = "".concat(this._y, "px");
        this.htmlElement.style.transform = "rotate(".concat((this._rotation + Math.PI / 2) / (2 * Math.PI), "rad)");
    };
    Animal.prototype.distanceTo = function (animal) {
        var directionX = animal._x - this._x;
        var directionY = animal._y - this._y;
        return Math.sqrt(directionX * directionX + directionY * directionY);
    };
    return Animal;
}());
export { Animal };
