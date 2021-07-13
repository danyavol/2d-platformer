import { InputObject } from "../interfaces/object.interface";
import { PlatformerConfig } from "../interfaces/platformer-config.interface";
import { Player } from "../objects/player/player.object";
import { Wall } from "../objects/wall/wall.object";
import CanvasService from "./canvas.service";
import { GridService } from "./grid.service";
import { ImageService } from "./image.service";

export type ObjectTypes = 'wall' | 'player';

export class ObjectService {

    private staticObjects: Wall[] = [];
    private dynamicObjects: Player[] = [];
    private gridService: GridService;

    constructor(
        private imageService: ImageService,
        private canvasService: CanvasService,
        config: PlatformerConfig
    ) {
        this.gridService = new GridService(config.game.mapWidth, config.game.mapHeight);
    }

    public init(objects: InputObject[]): void {
        this.clearObjects();

        for (let obj of objects) {
            switch(obj.type) {
                case 'wall':
                    this.staticObjects.push(
                        new Wall(obj, this.imageService, this.canvasService)
                    );
                    break
                case 'player':
                    this.dynamicObjects.push(
                        new Player(obj, this.imageService, this.canvasService)
                    ); 
                    break;
            }
        }

        // this.gridService.init([...this.staticObjects, ...this.dynamicObjects]);
    }

    public renderObjects(fps: number): void {
        [...this.staticObjects, ...this.dynamicObjects]
            .forEach( o => this.gridService.removeObjectFromGrid(o) );
        
        this.staticObjects.forEach(o => o.render());
        this.dynamicObjects.forEach(o => o.renderEntity(fps));

        [...this.staticObjects, ...this.dynamicObjects]
            .forEach( o => this.gridService.addObjectToGrid(o) );
    }

    private clearObjects(): void {
        this.staticObjects = [];
        this.dynamicObjects = [];
    }

}