import { InputObject } from "../interfaces/object.interface";
import CanvasService from "../services/canvas.service";
import { ImageService } from "../services/image.service";
import { BasicObject } from "./basic-object";

export class EntityObject extends BasicObject {

    constructor(
        config: InputObject, 
        imageService: ImageService, 
        canvasService: CanvasService
    ) {
        super(config, imageService, canvasService);
    }
    
}