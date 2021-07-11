import { ExtendedObject, InputObject } from "../interfaces/object.interface";
import CanvasService, { RectangleCoords } from "../services/canvas.service";
import { ImageService } from "../services/image.service";

export abstract class BasicObject {

    protected object: Partial<ExtendedObject>;

    constructor(
        private config: InputObject,
        private imageService: ImageService,
        private canvasService: CanvasService
    ) {
        
        this.object = {
            ...config,
            model: this.imageService.files[config.modelName],
            isModelFlipped: false
        };
    }

    protected render(): void {
        this.drawObject();
    };

    private drawObject() {
        const modelCoords: RectangleCoords = [ 
            ...this.config.coords, ...this.config.modelSize 
        ];
        if (this.object.isModelFlipped)
            this.canvasService.drawFlippedImage(this.object.model, modelCoords)
        else
            this.canvasService.drawImage(this.object.model, modelCoords);
    }
    
}