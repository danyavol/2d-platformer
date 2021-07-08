import { PlatformerConfig } from "./interfaces/platformer-config.interface";
import CanvasService from "./services/canvas.service";
import { ImageService } from "./services/image.service";

export default class Platformer2D {

    private canvasService: CanvasService;
    private imageService: ImageService;

    constructor(canvas: HTMLCanvasElement, config: PlatformerConfig) {
        this.canvasService = new CanvasService(canvas, config);
        this.imageService = new ImageService();

        this.init();
    }

    private init(): void {
        this.imageService.isLoaded$.subscribe( isLoaded => isLoaded ? this.drawBear() : null );
    }

    private drawBear(): void {
        const bear = this.imageService.files.bear;
        this.canvasService.drawImage(bear);
    }
};