import { InputObject } from "../../interfaces/object.interface";
import CanvasService from "../../services/canvas.service";
import { ImageService } from "../../services/image.service";
import { EntityObject } from "../entity-object";

export class Player extends EntityObject {

    private pressedDirection: 'left' | 'right' = null;
    private isJumpPressed = false;

    constructor(
        config: InputObject, 
        imageService: ImageService, 
        canvasService: CanvasService
    ) {
        super(config, imageService, canvasService);

        this.object.hasCollision = true;
        this.object.layer = 2;
        this.object.speed = 10;
        this.object.jumpHeight = 40;
        
        this.initEventListeners();
    }

    public render(): void {
        switch (this.pressedDirection) {
            case 'left':
                this.moveLeft(); break;
            case 'right':
                this.moveRight(); break;
            default:
                this.stop();
        }
        
        super.render();
    }

    private initEventListeners(): void {
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowRight':
                    this.pressedDirection = 'right'; break;
                case 'ArrowLeft':
                    this.pressedDirection = 'left'; break;
                case 'ArrowUp':
                    this.isJumpPressed = true; break;
            }            
        });
        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 'ArrowRight':
                    this.pressedDirection === 'right' ? 
                        this.pressedDirection = null : null; 
                    break;
                case 'ArrowLeft':
                    this.pressedDirection === 'left' ? 
                        this.pressedDirection = null : null; 
                    break;
                case 'ArrowUp':
                    this.isJumpPressed = false; break;
            }
        });
    }

}