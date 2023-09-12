export class Field {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvasName: string) {
        this.canvas = <HTMLCanvasElement> document.getElementById(canvasName);
        if (!this.canvas) {
            throw new Error(`Canvas element with id '${canvasName}' not found.`);
        }
        this.ctx = this.canvas.getContext('2d') as unknown as CanvasRenderingContext2D;
        if (!this.ctx) {
            throw new Error('Canvas 2D context is not available.');
        }
        this.paint();
    }

    paint() {
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
