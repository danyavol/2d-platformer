import { ExtendedObject, InputObject } from "../interfaces/object.interface";
import CanvasService, { RectangleCoords } from "../services/canvas.service";
import { ImageService } from "../services/image.service";

export abstract class BasicObject {

    protected object: Partial<ExtendedObject>;

    constructor(
        config: InputObject,
        imageService: ImageService,
        private canvasService: CanvasService
    ) {
        
        this.object = {
            ...config,
            model: imageService.files[config.modelName],
            isModelFlipped: false,
            relatedCells: []
        };
    }

    get coords() {
        return this.object.coords;
    }

    get modelSize() {
        return this.object.modelSize;
    }

    get relatedCells() {
        return this.object.relatedCells;
    }

    set relatedCells(value: string[]) {
        this.object.relatedCells = value;
    }

    protected render(): void {
        this.drawObject();
    };

    private drawObject() {
        const modelCoords: RectangleCoords = [ 
            ...this.object.coords, ...this.object.modelSize 
        ];
        if (this.object.isModelFlipped)
            this.canvasService.drawFlippedImage(this.object.model, modelCoords)
        else
            this.canvasService.drawImage(this.object.model, modelCoords);
    }
    
}