import { InputObject } from "../interfaces/object.interface";
import { Player } from "../objects/player/player.object";
import { Wall } from "../objects/wall/wall.object";
import CanvasService from "./canvas.service";
import { ImageService } from "./image.service";

export type ObjectTypes = 'wall' | 'player';

export class ObjectService {

    private staticObjects: Wall[] = [];

    private dynamicObjects: Player[] = [];

    constructor(
        private imageService: ImageService,
        private canvasService: CanvasService
    ) {

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

        this.renderObjects();
    }

    public renderObjects(): void {
        this.staticObjects.forEach(o => o.render());
        this.dynamicObjects.forEach(o => o.render());
    }

    private clearObjects(): void {
        this.staticObjects = [];
        this.dynamicObjects = [];
    }

}