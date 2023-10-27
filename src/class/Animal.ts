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
    protected maxSpeed: number = 40;

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
            if(animal !== this && animal !== undefined && animal.distanceTo(this) < this.maxSpeed){
                if(animal?._x > x - this.width && animal?._x < x + this.width && animal?._y > y - this.width && animal?._y < y + this.width){
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
        const possibleRotations = [-Math.PI * 0.75, -Math.PI/2, -Math.PI/4, 0, Math.PI/4, Math.PI/2, Math.PI * 0.75];
        const possibleSpeedFactor = [0.2, 0.5, 1];
        const possiblePositions = Array<{x: number, y: number, rotation: number, speed: number, weight: number}>();

        const randomness = 0.2;
        /** @type {number} - Coefficient of want perspective go go straight (Allow more turn => improve divisor number) */
        const straightWillingness = this.maxSpeed / 80;
        const speedAffection = 0.5;

        for(let rotation of possibleRotations){
            for(let speedFactor of possibleSpeedFactor){
                const weight = (1-speedFactor) * (10 - speedAffection*10) + (Math.abs(rotation)) * -straightWillingness + Math.random() * randomness;
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
        let possiblePositions = this.generateNextStepPossiblePositions();
        possiblePositions = this.alterPositionsWeight(possiblePositions);
        for(let position of possiblePositions){
            const div = document.createElement("div");
            div.style.position = "absolute";
            div.style.width = "4px";
            div.style.height = "4px";
            div.style.borderRadius = "2px";
            div.style.backgroundColor = position.weight > 0 ? `rgb(0, 0, ${Math.floor(position.weight*100)})` : `rgb(${Math.floor(-position.weight*10)}, 0, 0)`;
            div.style.fontSize = "12px";
            div.style.left = `${position.x}px`;
            div.style.top = `${position.y}px`;
            div.classList.add("temp_turn");
            this.field.htmlElement.appendChild(div);
            if(position.weight >= 0){
                div.innerHTML = position.weight.toFixed(2);
            }
            if(position.speed < (0.4*this.maxSpeed)) {
                div.style.opacity = "0.5";
            }
        }
    }

    public distanceTo(animal: Animal): number {
        const directionX = animal._x - this._x;
        const directionY = animal._y - this._y;
        return Math.sqrt(directionX * directionX + directionY * directionY);
    }

    alterPositionsWeight(possiblePositions : Array<{x: number, y: number, rotation: number, speed: number, weight: number}>): Array<{x: number, y: number, rotation: number, speed: number, weight: number}> {
        return possiblePositions;
    }

    public handler(): void {
        let possiblePositions = this.generateNextStepPossiblePositions();
        possiblePositions = this.alterPositionsWeight(possiblePositions);
        let bestPosition = null;
        let bestWeight = null;
        for(let position of possiblePositions){
            if(bestWeight===null || position.weight > bestWeight){
                bestWeight = position.weight;
                bestPosition = position;
            }
        }
        if(bestPosition){
            this.move(bestPosition.x, bestPosition.y);
        }
        this.updatePosition();
        if(this.field._debug){
            this.drawNextStepPossiblePositions();
        }
    }
}