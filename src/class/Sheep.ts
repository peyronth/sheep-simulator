import { Field } from "./Field.js";
import { Animal } from "./Animal.js";
import * as math from "./../library/math.js"


export class Sheep extends Animal {
    public attractiveSheep: Sheep|null = null;
    private attractiveSheepDistance: number = 100;
    private attractiveSheepRotation: number = 0.2;

    constructor(x: number, y: number, field: Field) {
        super(x, y, field);
        this.field.insertSheep(this.htmlElement, this);
        this.handler();
    }

    /**
     * Check if sheep is not a follower of this sheep.
     *
     * @private
     * @param {Sheep} sheep
     * @return {boolean}
     * @memberof Sheep
     */
    private checkNotFollower(sheep: Sheep): boolean {
        if(sheep.attractiveSheep === this){
            return false;
        }else if(sheep.attractiveSheep){
            return this.checkNotFollower(sheep.attractiveSheep);
        }else{
            return true;
        }
    }

    calculateAttraction() {
        let closestSheep = null;
        let closestDistance = Infinity;

        for (let sheep of this.field.sheep) {
            if (sheep !== this) {
                const distance = this.distanceTo(sheep);
                if (distance < this.attractiveSheepDistance) {
                    if (distance < closestDistance && this.checkNotFollower(sheep)) {
                        closestDistance = distance;
                        closestSheep = sheep;
                    }
                }
            }
        }
        if(closestSheep) {
            const rotationToSheep = Math.atan2(closestSheep._y - this._y, closestSheep._x - this._x);
            if(math.angleDiff(this._rotation, rotationToSheep) < this.attractiveSheepRotation){
                this._rotation = rotationToSheep;
                this.attractiveSheep = closestSheep;
                return true;
            }
        }
        this.attractiveSheep = null;
        return false;
    }

    handler() {
        this.calculateAttraction();
        if(this.attractiveSheep){
            this.move(0.4 + ((this.distanceTo(this.attractiveSheep)-(this.width))/this.attractiveSheepDistance));
        }else{
            this.randomMove();
        }
        requestAnimationFrame(() => this.handler());
    }
}