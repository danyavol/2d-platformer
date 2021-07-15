import { abs } from "../helpers/common-methods";
import { MapConfig, ObjectConfig, PlatformerConfig } from "../interfaces/platformer-config.interface";
import { BasicObject } from "../objects/basic-object";
import { EntityObject } from "../objects/entity-object";
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

        this.staticObjects.forEach( o => this.gridService.addObjectToGrid(o) );
    }

    public renderObjects(fps: number): void {
        this.staticObjects.forEach(o => o.drawObject());

        this.dynamicObjects.forEach(o => {
            o.updateState(fps);
            this.checkBounds(o);
            this.gridService.updateObjectPosition(o);
            this.checkAllCollisions(o, this.gridService.getNeighbors(o));
            o.drawObject();
        });  
    }

    private clearObjects(): void {
        this.staticObjects = [];
        this.dynamicObjects = [];
    }
    
    get allObjects() {
        return [ ...this.staticObjects, ...this.dynamicObjects ];
    }

    private checkBounds(obj: EntityObject): void {
        let [x, y] = obj.coords;

        if (x < 0) {
            x = 0;
            obj.resetSideAcceleration();
        } else if (x + obj.size[0] > this.mapConfig.width) {
            x = this.mapConfig.width - obj.size[0];
            obj.resetSideAcceleration();
        }

        if (y < 0) {
            y = 0;
            obj.startFalling();
        } else if (y + obj.size[1] > this.mapConfig.height) {
            y = this.mapConfig.height - obj.size[1];
            obj.stopFalling();
        }
            

        obj.coords = [x, y];
    }

    private checkAllCollisions(obj: EntityObject, objectsAround: BasicObject[]): void {
        let hasOverlaps = false;
        objectsAround.forEach( o => this.checkCollision(obj, o) ? hasOverlaps = true : null );
        if (hasOverlaps) this.gridService.updateObjectPosition(obj);
    }
    
    private checkCollision(o1: EntityObject, o2: BasicObject): boolean {
        // if o1 overlaps with o2, then o1 will be moved out from o2
        // P.S. This function is hell for debugging :)
        let [o1_x1, o1_y1] = o1.coords;
        const [o1_x2, o1_y2] = [ o1.coords[0]+o1.size[0], o1.coords[1]+o1.size[1] ];

        const [o2_x1, o2_y1] = o2.coords;
        const [o2_x2, o2_y2] = [ o2.coords[0]+o2.size[0], o2.coords[1]+o2.size[1] ];

        // Check horizontal overlaps
        let horizontalOverlap = false;
        const h1 = o1_x2 - o2_x1;
        const h2 = o1_x1 - o2_x2;
        if ( (h1 < 0 && h2 > 0) || (h1 > 0 && h2 < 0) ) horizontalOverlap = true;

        // Check vertical overlaps
        let verticalOverlap = false;
        const v1 = o1_y2 - o2_y1;
        const v2 = o1_y1 - o2_y2;
        if ( (v1 < 0 && v2 > 0) || (v1 > 0 && v2 < 0) ) verticalOverlap = true;

        // If overlaps in all axes
        if (verticalOverlap && horizontalOverlap) {
            const hOffset = abs(h1) < abs(h2) ? h1 : h2;
            const vOffset = abs(v1) < abs(v2) ? v1 : v2;
            
            if (abs(hOffset) < abs(vOffset)) {
                o1_x1 -= hOffset;
                o1.resetSideAcceleration();
            } else {
                o1_y1 -= vOffset;
                if (vOffset > 0) {
                    o1.stopFalling(); 
                } else {
                    o1.startFalling();
                }
            }
                

            o1.coords = [o1_x1, o1_y1];
            return true;
        }

        return false;
    }
}