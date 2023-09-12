import { Sheep } from "./Sheep";

export class Field {
    htmlElement: HTMLElement;

    constructor(divId: string, sheepCount: number = 10) {
        this.htmlElement = document.getElementById(divId) as HTMLElement;
        this.htmlElement.style.width = "800px";
        this.htmlElement.style.height = "530px";
        this.paint();
        for (let i = 0; i < sheepCount; i++) {
            new Sheep(Math.random() * 800, Math.random() * 530, this);
        }
    }

    paint() {
        this.htmlElement.style.backgroundColor = "green";
    }

    public insert(element: HTMLElement) {
        this.htmlElement.appendChild(element);
    }
}
