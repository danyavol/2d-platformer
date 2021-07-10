import { InputObject } from "../../interfaces/object.interface";
import CanvasService from "../../services/canvas.service";
import { ImageService } from "../../services/image.service";
import { EntityObject } from "../entity-object";

export class Player extends EntityObject {

    constructor(
        config: InputObject, 
        imageService: ImageService, 
        canvasService: CanvasService
    ) {
        super(config, imageService, canvasService);

        this.object.hasCollision = true;
        this.object.layer = 2;        
    }

}