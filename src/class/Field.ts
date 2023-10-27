import { Sheep } from "./Sheep.js";
import { Animal } from "./Animal.js";

export class Field {
    public htmlElement: HTMLElement;
    public animals: Animal[] = [];
    public sheep: Sheep[] = [];
    public width: number = 800;
    public height: number = 530;
    public speed: number = 20;
    private _paused: boolean = true;
    public _debug: boolean = true;

    constructor(divId: string, sheepCount: number = 8) {
        this.htmlElement = document.getElementById(divId) as HTMLElement;
        this.htmlElement.style.width = this.width.toString() + "px";
        this.htmlElement.style.height = this.height.toString() + "px";
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
        const simulationSpeed = document.createElement("input");
        simulationSpeed.type = "range";
        simulationSpeed.min = "1";
        simulationSpeed.max = "100";
        simulationSpeed.value = this.speed.toString();
        buttonPause.innerHTML = '<span class="material-symbols-outlined">pause</span>';
        buttonPlay.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>';
        buttonNextStep.innerHTML = '<span class="material-symbols-outlined">skip_next</span>';
        buttonPause.addEventListener("click", () => this._paused = true);
        buttonPlay.addEventListener("click", () => {
            if(this._paused) {
                this._paused = false;
                this.handler();
            }
        });
        buttonNextStep.addEventListener("click", () => {
            this._paused = true;
            this.handler();
        });
        simulationSpeed.addEventListener("change", () => this.speed = parseInt(simulationSpeed.value));
        const controls = document.createElement("div");
        controls.classList.add("controls");
        controls.insertAdjacentElement("beforeend", buttonPause);
        controls.insertAdjacentElement("beforeend", buttonPlay);
        controls.insertAdjacentElement("beforeend", buttonNextStep);
        controls.insertAdjacentElement("beforeend", simulationSpeed);
        this.htmlElement.insertAdjacentElement("afterend", controls);
    }

    public insertSheep(element: HTMLElement, sheep: Sheep) {
        this.htmlElement.appendChild(element);
        this.sheep.push(sheep);
        this.animals.push(sheep);
    }

    handler() {
        const elementsToRemove = document.getElementsByClassName("temp_turn")
        for (let i = elementsToRemove.length - 1; i >= 0; i--) {
            elementsToRemove[i].remove();
        }
        for (let animal of this.animals) {
            animal.handler();
        }
        if(!this._paused){
            setTimeout(() => this.handler(), (100 - this.speed));
        }
    }
}
