import { Sheep } from "./Sheep";

export class Field {
    private htmlElement: HTMLElement;
    public sheep: Sheep[] = [];
    public width: number = 800;
    public height: number = 530;

    constructor(divId: string, sheepCount: number = 10) {
        this.htmlElement = document.getElementById(divId) as HTMLElement;
        this.htmlElement.style.width = this.width.toString() + "px";
        this.htmlElement.style.height = this.height.toString() + "px";
        this.paint();
        for (let i = 0; i < sheepCount; i++) {
            new Sheep(Math.random() * 800, Math.random() * 530, this);
        }
    }

    paint() {
        this.htmlElement.style.backgroundColor = "green";
    }

    public insertSheep(element: HTMLElement, sheep: Sheep) {
        this.htmlElement.appendChild(element);
        this.sheep.push(sheep);
    }
}
