import { PlatformerConfig } from "./interfaces/platformer-config.interface";
import CanvasService from "./services/canvas.service";
import { ImageService } from "./services/image.service";
import { ObjectService } from "./services/object.service";
import { GameLoopService } from "./services/game-loop.service";

export default class Platformer2D {

    private imageService = new ImageService();
    private canvasService: CanvasService;
    private objectService: ObjectService;
    private gameLoopService: GameLoopService;

    constructor(canvas: HTMLCanvasElement, private config: PlatformerConfig) {
        this.canvasService = new CanvasService(canvas, config);
        this.objectService = new ObjectService(
            this.imageService, 
            this.canvasService,
            config
        );
        this.gameLoopService = new GameLoopService(
            this.canvasService, 
            this.objectService
        );

        this.imageService.isLoaded.then(() => this.init());
    }

    private init(): void {
        this.gameLoopService.start();
    }
};