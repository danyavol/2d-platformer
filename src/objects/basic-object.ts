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
        };
    }

    public drawObject() {
        const modelCoords: RectangleCoords = [ 
            ...this.config.coords, ...this.config.modelSize 
        ];
        this.canvasService.drawImage(this.object.model, modelCoords);
    }

    public render(): void {
        this.drawObject();
    };
}