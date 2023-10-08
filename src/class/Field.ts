import { Sheep } from "./Sheep.js";
import { Animal } from "./Animal.js";

export class Field {
    private htmlElement: HTMLElement;
    public animals: Animal[] = [];
    public sheep: Sheep[] = [];
    public width: number = 800;
    public height: number = 530;
    private _paused: boolean = false;

    constructor(divId: string, sheepCount: number = 10) {
        this.htmlElement = document.getElementById(divId) as HTMLElement;
        this.htmlElement.style.width = this.width.toString() + "px";
        this.htmlElement.style.height = this.height.toString() + "px";
        this.paint();
        for (let i = 0; i < sheepCount; i++) {
            new Sheep(Math.random() * 800, Math.random() * 530, this);
        }
        this.addActionButtons();
        this.handler();
    }

    addActionButtons() {
        const buttonPause = document.createElement("button");
        const buttonPlay = document.createElement("button");
        const buttonNextStep = document.createElement("button");
        buttonPause.innerHTML = "Pause";
        buttonPlay.innerHTML = "Play";
        buttonNextStep.innerHTML = "Next Step";
        buttonPause.addEventListener("click", () => this._paused = true);
        buttonPlay.addEventListener("click", () => {
            this._paused = false;
            this.handler();
        });
        buttonNextStep.addEventListener("click", () => {
            this._paused = true;
            this.handler();
        });
        this.htmlElement.insertAdjacentElement("afterend", buttonPause);
        this.htmlElement.insertAdjacentElement("afterend", buttonPlay);
        this.htmlElement.insertAdjacentElement("afterend", buttonNextStep);
    }

    paint() {
        this.htmlElement.style.backgroundColor = "green";
    }

    public insertSheep(element: HTMLElement, sheep: Sheep) {
        this.htmlElement.appendChild(element);
        this.sheep.push(sheep);
        this.animals.push(sheep);
    }

    handler() {
        for (let animal of this.animals) {
            animal.handler();
        }
        if(!this._paused){
            requestAnimationFrame(() => this.handler());
        }
    }
}
