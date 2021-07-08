import { PlatformerConfig } from "./interfaces/platformer-config.interface";
import CanvasService from "./services/canvas.service";

export default class Platformer2D {

    private canvasService: CanvasService;

    constructor(canvas: HTMLCanvasElement, config: PlatformerConfig) {
        this.canvasService = new CanvasService(canvas, config);

        this.init();
    }

    private init(): void {
        this.canvasService.drawBear();
    }
};