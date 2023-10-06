import { Sheep } from "./Sheep";
var Field = /** @class */ (function () {
    function Field(divId, sheepCount) {
        if (sheepCount === void 0) { sheepCount = 10; }
        this.sheep = [];
        this.width = 800;
        this.height = 530;
        this.htmlElement = document.getElementById(divId);
        this.htmlElement.style.width = this.width.toString() + "px";
        this.htmlElement.style.height = this.height.toString() + "px";
        this.paint();
        for (var i = 0; i < sheepCount; i++) {
            new Sheep(Math.random() * 800, Math.random() * 530, this);
        }
    }
    Field.prototype.paint = function () {
        this.htmlElement.style.backgroundColor = "green";
    };
    Field.prototype.insertSheep = function (element, sheep) {
        this.htmlElement.appendChild(element);
        this.sheep.push(sheep);
    };
    return Field;
}());
export { Field };
