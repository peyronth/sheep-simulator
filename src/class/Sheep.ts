import { Field } from "./Field.js";
import { Animal } from "./Animal.js";
import * as math from "./../library/math.js"


export class Sheep extends Animal {
    public attractiveSheep: Sheep[] = [];
    private attractiveSheepDistance: number = 100;
    private attractiveSheepAngle: number = Math.PI/2;

    constructor(x: number, y: number, field: Field) {
        super(x, y, field);
        this.field.insertSheep(this.htmlElement, this);
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
        if(sheep.attractiveSheep.includes(this)){
            return false;
        }else if(sheep.attractiveSheep.length > 0){
            for(let followed of sheep.attractiveSheep){
                if(this.checkNotFollower(followed)){
                    return true;
                }
            }
            return false;
        }else{
            return true;
        }
    }

    /**
     * Calculate the attraction of a specific point.
     *
     * @param {number} x - x coordinate of the point
     * @param {number} y - y coordinate of the point
     * @return {number} - the attraction of the point 0 if not attracted between 0 and n if attracted with n being the number of sheep
     * @memberof Sheep
     */
    calculateAttraction(x: number, y: number): number {
        let attirance = 0;

        for (let sheep of this.field.sheep) {
            if (sheep !== this) {
                const distance:number = Math.sqrt(Math.pow(sheep._x - x, 2) + Math.pow(sheep._y - y, 2));
                if (distance < this.attractiveSheepDistance) {
                    const rotationDiff:number = math.angleDiff(this._rotation, sheep._rotation) % (2 * Math.PI);
                    if(rotationDiff < this.attractiveSheepAngle && rotationDiff > -this.attractiveSheepAngle){
                        console.log(`Sheep ${this.name} is attracted by sheep ${sheep.name} By force ${(this.attractiveSheepDistance-distance)/this.attractiveSheepDistance*5}`)
                        attirance += (this.attractiveSheepDistance-distance)/this.attractiveSheepDistance;
                    }
                }
            }
        }
        return attirance*5*(this.maxSpeed/10);
    }

    alterPositionsWeight(possiblePositions : Array<{x: number, y: number, rotation: number, speed: number, weight: number}>): Array<{x: number, y: number, rotation: number, speed: number, weight: number}> {
        for(let position of possiblePositions){
            position.weight += this.calculateAttraction(position.x, position.y);
        }
        return possiblePositions;
    }
}