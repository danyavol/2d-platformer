import { PlatformerConfig } from "./interfaces/platformer-config.interface";
import CanvasService from "./services/canvas.service";
import { ImageService } from "./services/image.service";
import { ObjectService } from "./services/object.service";
import { ProcessService } from "./services/process.service";

export default class Platformer2D {

    private canvasService: CanvasService;
    private imageService: ImageService;
    private objectService: ObjectService;
    private processService: ProcessService;

    constructor(canvas: HTMLCanvasElement, private config: PlatformerConfig) {
        this.imageService = new ImageService();
        this.canvasService = new CanvasService(canvas, config);
        this.objectService = new ObjectService(
            this.imageService, 
            this.canvasService
        );
        this.processService = new ProcessService(
            this.canvasService, 
            this.objectService
        );

        this.init();
    }

    private init(): void {
        const sub = this.imageService.isLoaded$.subscribe(isLoaded => {
            if (isLoaded) {
                sub.unsubscribe();
                this.objectService.init(this.config.objects);
                this.afterInit();
            }
        });
    }

    private afterInit(): void {
        this.processService.start();
    }
};