import { ObjectConfig } from "../../interfaces/platformer-config.interface";
import CanvasService from "../../services/canvas.service";
import { ImageService } from "../../services/image.service";
import { BasicObject } from "../basic-object";

export class Wall extends BasicObject {

    constructor(
        config: ObjectConfig, 
        imageService: ImageService, 
        canvasService: CanvasService
    ) {
        super(config, imageService, canvasService);

        this.hasCollision = true;       
    }

}