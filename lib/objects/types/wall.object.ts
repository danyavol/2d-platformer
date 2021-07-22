import { ParsedObjectConfig } from "../../interfaces/parsed-game-config.interface";
import CanvasService from "../../services/canvas.service";
import { ImageService } from "../../services/image.service";
import { BasicObject, ObjectModel } from "../basic-object";

export class Wall extends BasicObject {

    public hasCollision = true;
    public model: ObjectModel;

    constructor(
        config: ParsedObjectConfig, 
        canvasService: CanvasService,
        imageService: ImageService
    ) {
        super(config, canvasService);

        this.model = {
            image: imageService.static[config.model.name],
            offset: config.model.offset,
            size: config.model.size
        };  
    }

}