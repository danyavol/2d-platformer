import { InputObject } from "../../interfaces/object.interface";
import CanvasService from "../../services/canvas.service";
import { ImageService } from "../../services/image.service";
import { BasicObject } from "../basic-object";

export class Wall extends BasicObject {

    constructor(
        config: InputObject, 
        imageService: ImageService, 
        canvasService: CanvasService
    ) {
        super(config, imageService, canvasService);

        this.object.hasCollision = true;
        this.object.layer = 1;        
    }
}