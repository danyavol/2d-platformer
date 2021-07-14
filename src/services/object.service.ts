import { MapConfig, ObjectConfig, PlatformerConfig } from "../interfaces/platformer-config.interface";
import { BasicObject } from "../objects/basic-object";
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
    private mapConfig: MapConfig;
    private objectsConfig: ObjectConfig[];

    constructor(
        private imageService: ImageService,
        private canvasService: CanvasService,
        config: PlatformerConfig
    ) {
        this.mapConfig = config.game.map;
        this.objectsConfig = config.game.objects
        this.gridService = new GridService(this.mapConfig.width, this.mapConfig.height);

        this.init();
    }

    public init(): void {
        this.clearObjects();

        for (let obj of this.objectsConfig) {
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
        this.allObjects.forEach( o => this.gridService.removeObjectFromGrid(o) );
        
        this.staticObjects.forEach(o => o.drawObject());
        this.dynamicObjects.forEach(o => {
            o.renderEntity(fps);
            this.checkBounds(o);
            o.drawObject();
        });

        this.allObjects.forEach( o => this.gridService.addObjectToGrid(o) );
    }

    private clearObjects(): void {
        this.staticObjects = [];
        this.dynamicObjects = [];
    }
    
    get allObjects() {
        return [ ...this.staticObjects, ...this.dynamicObjects ];
    }

    private checkBounds(obj: BasicObject): void {
        let [x, y] = obj.coords;

        if (x < 0) x = 0;
        else if (x + obj.size[0] > this.mapConfig.width)
            x = this.mapConfig.width - obj.size[0];

        if (y < 0) y = 0;
        else if (y + obj.size[1] > this.mapConfig.height)
            y = this.mapConfig.height - obj.size[1];

        obj.coords = [x, y];
    }
}