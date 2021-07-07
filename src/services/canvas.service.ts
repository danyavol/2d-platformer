// icons https://www.studio-maximus.com/works/apps/birds-to-space/

import { PlatformerConfig } from "../interfaces/platformer-config.interface";
import { ImageList } from "./image-loader/image-list";
import { ImageService } from "./image-loader/image.service";

export type RectangleCoords = [number, number, number, number];

export default class CanvasService {

    private element: HTMLCanvasElement;
    private canvas: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;

    constructor(canvasElement: HTMLCanvasElement, config: PlatformerConfig) {
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

    public drawRectangle(coords: RectangleCoords): void {
        this.canvas.fillStyle = "rgb(200,0,0)";
        this.canvas.fillRect(...coords);
    }

    public clearCanvas(): void {
        this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        
    }

    public drawBear(): void {
        const img = ImageService.bear();
        this.canvas.drawImage(img, 10, 10, 70, 90);
        
    }

}