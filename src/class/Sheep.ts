import { Field } from "./Field";

export class Sheep {
    private _x: number;
    private _y: number;
    private _rotation: number = 0;
    private htmlElement: HTMLElement;
    private field: Field;

    private width: number = 30;
    private height: number = 30;
    private speed: number = 1;

    constructor(x: number, y: number, field: Field) {
        this._x = x;
        this._y = y;
        this.field = field;
        this.htmlElement = document.createElement("span");
        this.htmlElement.style.left = `${this._x}px`;
        this.htmlElement.style.top = `${this._y}px`;
        this.htmlElement.classList.add("sheep");
        this.htmlElement.innerHTML = "&nbsp;";
        this.field.insert(this.htmlElement);
        this._rotation = Math.random() * 2 * Math.PI;
        this.updatePosition();
        this.handler();
    }

    handler() {
        this.randomMove();
        setTimeout(() => this.handler(), 1000 / 30);
    }

    randomMove() {
        this._rotation += (Math.random() - 0.5) * 0.5;
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
        this.htmlElement.style.transform = `rotate(${this._rotation}rad)`;

    }


}