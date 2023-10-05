import { Field } from "./Field";

/**
 *
 *
 * @export
 * @class Animal
 */
export class Animal {
    public name: string = "Animal";
    protected _x: number;
    protected _y: number;
    /**
     * Rotation in radians
     *
     * @protected
     * @type {number}
     * @memberof Animal
     */
    protected _rotation: number = 0;
    protected htmlElement: HTMLElement;
    protected field: Field;

    protected width: number = 30;
    protected height: number = 30;
    protected speed: number = 1;

    constructor(x: number, y: number, field: Field) {
        this._x = x;
        this._y = y;
        this.field = field;
        this.htmlElement = document.createElement("span");
        this.htmlElement.style.left = `${this._x}px`;
        this.htmlElement.style.top = `${this._y}px`;
        this.htmlElement.classList.add("sheep");
        this.name = (Math.floor(Math.random() * 1000)).toString();
        this.htmlElement.innerHTML = this.name;
        this._rotation = Math.random() * 2 * Math.PI;
        this.updatePosition();
    }

    

    randomMove() {
        const randomness: number = 0.2;
        this._rotation += (Math.random() - 0.5) * randomness;
        this.move(0.4);
    }

    move(speedFactor: number = 1) {
        this._x += Math.cos(this._rotation) * this.speed * speedFactor;
        this._y += Math.sin(this._rotation) * this.speed * speedFactor;
        this.updatePosition();
    }

    updatePosition() {
        this.htmlElement.style.left = `${this._x}px`;
        this.htmlElement.style.top = `${this._y}px`;
        this.htmlElement.style.transform = `rotate(${this._rotation + Math.PI/2}rad)`;

    }
}