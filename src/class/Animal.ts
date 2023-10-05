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
        const bufferX : number = this._x + Math.cos(this._rotation) * this.speed * speedFactor;
        const bufferY : number = this._y + Math.sin(this._rotation) * this.speed * speedFactor;
        if(bufferX > 0 && bufferX < this.field.width && bufferY > 0 && bufferY < this.field.height){
            this._x = bufferX;
            this._y = bufferY;
            this.updatePosition();
        }else{
            this._rotation += Math.PI/2;
        }
    }

    updatePosition() {
        this.htmlElement.style.left = `${this._x}px`;
        this.htmlElement.style.top = `${this._y}px`;
        this.htmlElement.style.transform = `rotate(${(this._rotation + Math.PI/2)/(2*Math.PI)}rad)`;

    }

    public distanceTo(animal: Animal): number {
        const directionX = animal._x - this._x;
        const directionY = animal._y - this._y;
        return Math.sqrt(directionX * directionX + directionY * directionY);
    }
}