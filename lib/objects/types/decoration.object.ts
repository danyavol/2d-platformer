import { ParsedObjectConfig } from "../../interfaces/parsed-game-config.interface";
import CanvasService from "../../services/canvas.service";
import { ImageService, StaticTextureNames } from "../../services/image.service";
import { BasicObject, ObjectModel } from "../basic-object";

export class Decoration extends BasicObject {

    public hasCollision = false;
    public model: ObjectModel;

    private modelParams: {offset: [number, number], size: [number, number]};

    constructor(
        config: ParsedObjectConfig, 
        canvasService: CanvasService,
        imageService: ImageService
    ) {
        super(config, canvasService);

        this.setModelParams(config);
        this.model = {
            image: imageService.static[config.model.name],
            offset: config.model.offset,
            size: config.model.size
        };  
    }

    private setModelParams(config: ParsedObjectConfig) {
        switch (config.model.name as StaticTextureNames) {
            case 'bush':
                this.updateObjectSize(config, 1.66, 1);
                break;
            case 'herb':
                this.updateObjectSize(config, 0.4, 0.5, true);
                break;
            case 'fence':
                this.updateObjectSize(config, 1.2, 0.75);
                break;
            case 'fence_broken':
                this.updateObjectSize(config, 1.2, 0.75);
                break;
            case 'rock':
                this.updateObjectSize(config, 0.9, 0.53);
                break;
            case 'mushroomRed':
                this.updateObjectSize(config, 0.6, 0.5, true);
                break;
            case 'mushroomBrown':
                this.updateObjectSize(config, 0.6, 0.5, true);
                break;
        }  
    }

    private updateObjectSize(config: ParsedObjectConfig, widthRate: number, heightRate: number, randomX = false): void {
        const xRandom = randomX ? Math.random()*1.2+0.4 : 1;

        this.coords[0] += (this.size[0] - this.size[0]*widthRate)/2*xRandom;
        this.coords[1] += (this.size[1] - this.size[1]*heightRate);
        this.size[0] *= widthRate;
        this.size[1] *= heightRate;
        config.model.size = [this.size[0], this.size[1]];
    }

}