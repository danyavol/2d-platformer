
import { ObjectConfig } from "../interfaces/platformer-config.interface";
import CanvasService, { RectangleCoords } from "../services/canvas.service";
import { ImageService, ObjectModels } from "../services/image.service";

export abstract class BasicObject {

    public coords: [number, number];
    public readonly size: [number, number];
    public readonly model: {
        name: ObjectModels,
        image: HTMLImageElement,
        offset: [number, number],
        size: [number, number],
    };
    public hasCollision: boolean;
    public isModelFlipped: boolean = false;
    public relatedCells: string[] = [];


    constructor(
        config: ObjectConfig,
        imageService: ImageService,
        private canvasService: CanvasService
    ) {
        this.coords = config.coords;
        this.size = config.size;
        this.model = {
            name: config.modelName,
            image: imageService.files[config.modelName],
            offset: config.modelOffset,
            size: config.modelSize
        };
    }

    public drawObject() {
        const modelCoords: RectangleCoords = [ 
            this.coords[0] + this.model.offset[0],
            this.coords[1] + this.model.offset[1],
            ...this.model.size
        ];

        if (this.isModelFlipped)
            this.canvasService.drawFlippedImage(this.model.image, modelCoords)
        else
            this.canvasService.drawImage(this.model.image, modelCoords);
    }
    
}