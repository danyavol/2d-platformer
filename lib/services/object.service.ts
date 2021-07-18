import { abs } from "../helpers/common-methods";
import { ObjectConfig } from "../interfaces/game-config.interface";
import { ParsedGameConfig, ParsedObjectConfig } from "../interfaces/parsed-game-config.interface";
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
    private player: Player;
    
    private gridService: GridService;
    private map: {width: number, height: number};

    constructor(
        private imageService: ImageService,
        private canvasService: CanvasService,
        config: ParsedGameConfig
    ) {
        this.map = {
            width: config.map.width,
            height: config.map.height,
        };
        this.gridService = new GridService(config.map);
        

        this.init(config);
    }

    public init(config: ParsedGameConfig): void {
        this.clearObjects();
        this.player = new Player(config.player, this.canvasService, this.imageService);
        
        for (let obj of config.objects) {
            switch(obj.type) {
                case 'wall':
                    this.staticObjects.push(
                        new Wall(obj, this.canvasService, this.imageService)
                    );
                    break
            }
        }

        this.staticObjects.forEach( o => this.gridService.addObjectToGrid(o) );
    }

    public renderObjects(fps: number): void {
        /* Static objects render */
        this.staticObjects.forEach(o => o.drawObject());

        /* Player render */
        this.renderDynamicObject(this.player, fps);
        this.canvasService.updateCameraTranslation(...this.player.coords, ...this.player.size);


        /* Dynamic objects render */
        this.dynamicObjects.forEach(o => {
            this.renderDynamicObject(o, fps);
        });
    }

    private renderDynamicObject(object: EntityObject, fps: number): void {
        object.updateState(fps);
        this.checkBounds(object);
        this.gridService.updateObjectPosition(object);
        this.checkAllCollisions(object, this.gridService.getNeighbors(object));
        object.applyTextures();
        object.drawObject();
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
        } else if (x + obj.size[0] > this.map.width) {
            x = this.map.width - obj.size[0];
            obj.resetSideAcceleration();
        }

        if (y < 0) {
            y = 0;
            obj.startFalling();
        } else if (y + obj.size[1] > this.map.height) {
            y = this.map.height - obj.size[1];
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