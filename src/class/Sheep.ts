import { Field } from "./Field";
import { Animal } from "./Animal";

export class Sheep extends Animal {
    public attractiveSheep: Sheep|null = null;

    constructor(x: number, y: number, field: Field) {
        super(x, y, field);
        this.field.insertSheep(this.htmlElement, this);
        this.handler();
    }

    calculateAttraction() {
        let closestSheep = null;
        let closestDistance = Infinity;

        for (let sheep of this.field.sheep) {
            if (sheep !== this) {
                let directionX = sheep._x - this._x;
                let directionY = sheep._y - this._y;
                let distance = Math.sqrt(directionX * directionX + directionY * directionY);

                if (distance < 100) {
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSheep = sheep;
                    }
                }
            }
        }
        if(closestSheep && Math.abs(closestSheep._rotation-this._rotation) < 1 && closestSheep.attractiveSheep !== this) {
            this._rotation = (this._rotation + closestSheep._rotation) / 2;
            this.attractiveSheep = closestSheep;
            return true;
        }
        this.attractiveSheep = null;
        return false;
    }

    handler() {
        if(this.calculateAttraction()){
            this.move(0.4);
        }else{
            this.randomMove();
        }
        requestAnimationFrame(() => this.handler());
    }
}