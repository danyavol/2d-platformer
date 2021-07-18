import { GameConfig } from "./interfaces/game-config.interface";
import CanvasService from "./services/canvas.service";
import { ImageService } from "./services/image.service";
import { ObjectService } from "./services/object.service";
import { GameLoopService } from "./services/game-loop.service";
import { ConfigService } from "./services/config.service";
import { ParsedGameConfig } from "./interfaces/parsed-game-config.interface";

export default class Platformer2D {

    private imageService = new ImageService();
    private config: ParsedGameConfig;

    private configService: ConfigService;
    private canvasService: CanvasService;
    private objectService: ObjectService;
    private gameLoopService: GameLoopService;

    constructor(canvas: HTMLCanvasElement, config: GameConfig) {
        this.configService = new ConfigService(config);
        this.config = this.configService.getParsedConfig();
        this.canvasService = new CanvasService(canvas, this.config, this.imageService);
        this.objectService = new ObjectService(
            this.imageService, 
            this.canvasService,
            this.config
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