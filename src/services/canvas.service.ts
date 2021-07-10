// icons https://www.studio-maximus.com/works/apps/birds-to-space/

import { PlatformerConfig } from "../interfaces/platformer-config.interface";

export type RectangleCoords = [number, number, number, number];

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
        this.canvasHeight = config.canvasHeight;
        this.canvasWidth = config.canvasWidth;

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

    public moveCamera(x: number, y: number): void {
        console.log(123);
        
        this.canvas.translate(x, y);
    }

}