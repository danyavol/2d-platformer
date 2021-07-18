
import { ParsedObjectConfig } from "../interfaces/parsed-game-config.interface";
import CanvasService, { RectangleCoords } from "../services/canvas.service";

export interface ObjectModel {
    image: HTMLImageElement,
    offset: [number, number],
    size: [number, number]
}

export abstract class BasicObject {

    public coords: [number, number];
    public size: [number, number];
    public abstract model: ObjectModel;
    public abstract hasCollision: boolean;
    public relatedCells: string[] = [];
    protected isModelFlipped: boolean = false;
    protected reverseModel = false;


    constructor(
        config: ParsedObjectConfig,
        private canvasService: CanvasService
    ) {
        this.coords = config.coords;
        this.size = config.size;
        
    }

    public drawObject() {
        const modelCoords: RectangleCoords = [ 
            this.coords[0] + this.model.offset[0],
            this.coords[1] + this.model.offset[1],
            ...this.model.size
        ];

        if ((!this.isModelFlipped && !this.reverseModel) || (this.isModelFlipped && this.reverseModel))
            this.canvasService.drawImage(this.model.image, modelCoords);
        else
            this.canvasService.drawFlippedImage(this.model.image, modelCoords);
    }
    
}