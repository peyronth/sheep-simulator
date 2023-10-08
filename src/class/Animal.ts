import { Field } from "./Field.js";

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
    protected maxSpeed: number = 120;

    constructor(x: number, y: number, field: Field) {
        this._x = x;
        this._y = y;
        this.field = field;
        this.htmlElement = document.createElement("span");
        this.htmlElement.classList.add("sheep");
        this.name = (Math.floor(Math.random() * 1000)).toString();
        this.htmlElement.innerHTML = this.name;
        this._rotation = Math.random() * 2 * Math.PI;
        this.updatePosition();
    }

    move(x: number, y: number) {
        this._rotation = Math.atan2(y - this._y, x - this._x);
        this._x = x;
        this._y = y;
    }
    /**
     * Update html element psoition of the animal.
     *
     * @memberof Animal
     */
    updatePosition() {
        this.htmlElement.style.left = `${this._x-(this.width/2)}px`;
        this.htmlElement.style.top = `${this._y-(this.width/2)}px`;
        this.htmlElement.style.transform = `rotate(${(this._rotation + Math.PI/2)%(2*Math.PI)}rad)`;

    }

    checkOtherAnimalsCollision(x : number, y : number, animals: Animal[]): boolean {
        if(animals.length === 0){
            return true;
        }else{
            const animal = animals.pop();
            if(animal !== this && animal !== undefined){
                if(animal?._x > x - this.width/2 && animal?._x < x + this.width/2 && animal?._y > y - this.width/2 && animal?._y < y + this.width/2){
                    return false;
                }else{
                    return this.checkOtherAnimalsCollision(x, y, animals);
                }
            }else{
                return this.checkOtherAnimalsCollision(x, y, animals);
            }
        }
    }


    checkCollision(x: number, y: number): boolean {
        return (
            x > 0 && x < this.field.width && y > 0 && y < this.field.height &&
            this.checkOtherAnimalsCollision(x, y, [...this.field.animals])
        )
    }

    /**
     * Generate an array of all possible next step positions
     *
     * @return {Array} 
     * @memberof Animal
     */
    generateNextStepPossiblePositions(): Array<{x: number, y: number, rotation: number, speed: number, weight: number}> {
        const possibleRotations = [-Math.PI/2, -Math.PI/4, 0, Math.PI/4, Math.PI/2];
        const possibleSpeedFactor = [0.2, 0.5, 0.75, 1];
        const possiblePositions = Array<{x: number, y: number, rotation: number, speed: number, weight: number}>();
        for(let rotation of possibleRotations){
            for(let speedFactor of possibleSpeedFactor){
                const weight = (1-speedFactor) * ((Math.abs(Math.cos(rotation))+1) / 2) + Math.random() * 0.5;
                speedFactor = speedFactor * ((Math.abs(Math.cos(rotation))+1) / 2);
                const speed = this.maxSpeed * speedFactor;
                const bufferX : number = this._x + Math.cos(this._rotation + rotation) * speed;
                const bufferY : number = this._y + Math.sin(this._rotation + rotation) * speed;

                if(this.checkCollision(bufferX, bufferY)){
                    possiblePositions.push({
                        x: bufferX,
                        y: bufferY,
                        rotation: rotation,
                        speed: speed,
                        weight: weight
                    });
                }
            }
        }
        return possiblePositions;
    }

    drawNextStepPossiblePositions(): void {
        const possiblePositions = this.generateNextStepPossiblePositions();
        for(let position of possiblePositions){
            const div = document.createElement("div");
            div.style.position = "absolute";
            div.style.width = "4px";
            div.style.height = "4px";
            div.style.borderRadius = "2px";
            div.innerHTML = position.weight.toFixed(2);
            div.style.backgroundColor = position.weight === 0 ? "red" : "blue";
            div.style.fontSize = "10px";
            div.style.left = `${position.x}px`;
            div.style.top = `${position.y}px`;
            this.field.htmlElement.appendChild(div);
        }
    }

    public distanceTo(animal: Animal): number {
        const directionX = animal._x - this._x;
        const directionY = animal._y - this._y;
        return Math.sqrt(directionX * directionX + directionY * directionY);
    }


    public handler(): void {
        const possiblePositions = this.generateNextStepPossiblePositions();
        let bestPosition = null;
        let bestWeight = 0;
        for(let position of possiblePositions){
            if(position.weight > bestWeight){
                bestWeight = position.weight;
                bestPosition = position;
            }
        }
        if(bestPosition){
            this.move(bestPosition.x, bestPosition.y);
        }
        this.updatePosition();
        this.drawNextStepPossiblePositions();
    }
}