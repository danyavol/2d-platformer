// icons https://www.studio-maximus.com/works/apps/birds-to-space/

import { PlatformerConfig } from "../interfaces/platformer-config.interface";

export type RectangleCoords = [number, number, number, number]; // x, y, width, height

export default class CanvasService {

    private element: HTMLCanvasElement;
    private canvas: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;

    constructor(
        canvasElement: HTMLCanvasElement, 
        config: PlatformerConfig
    ) {
        this.element = canvasElement;
        this.canvas = canvasElement.getContext('2d');
        this.canvasHeight = config.canvas.height;
        this.canvasWidth = config.canvas.width;

        this.init();
    }

    private init() {
        this.element.width = this.canvasWidth;
        this.element.height = this.canvasHeight;
    }

    public clearCanvas(): void {
        this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    public drawImage(img: HTMLImageElement, coords: RectangleCoords): void {
        this.canvas.drawImage(img, ...coords);
    }

    public drawFlippedImage(img: HTMLImageElement, coords: RectangleCoords): void {
        this.canvas.translate(coords[0] + coords[2], coords[1]);
        this.canvas.scale(-1, 1);
        this.canvas.drawImage(img, 0, 0, coords[2], coords[3]);
        this.canvas.setTransform(1, 0, 0, 1, 0, 0);
    }

    public drawFPS(fps: number): void {
        this.canvas.font = '14px sans-serif';
        this.canvas.fillText('FPS: ' + fps, 0, 14);
    }

    public moveCamera(x: number, y: number): void {
        console.log(123);
        
        this.canvas.translate(x, y);
    }

}