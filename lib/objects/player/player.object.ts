import { ObjectConfig } from "../../interfaces/platformer-config.interface";
import CanvasService from "../../services/canvas.service";
import { ImageService } from "../../services/image.service";
import { EntityObject } from "../entity-object";

export class Player extends EntityObject {

    private pressedDirection: 'left' | 'right' = null;
    private isLeftPressed = false;
    private isRightPressed = false;
    private isJumpPressed = false;

    constructor(
        config: ObjectConfig, 
        imageService: ImageService, 
        canvasService: CanvasService
    ) {
        super(config, imageService, canvasService);
        
        this.hasCollision = true;
        this.setEntityConfig({
            maxSpeed: 350
        });
        
        this.initEventListeners();
    }

    public updateState(fps: number): void {
        switch (this.pressedDirection) {
            case 'left':
                super.moveLeft(); break;
            case 'right':
                super.moveRight(); break;
        }

        if (this.isJumpPressed) super.jump();

        super.updateState(fps);
    }

    private initEventListeners(): void {
        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowRight':
                    this.isRightPressed = true; this.updateDirection(); break;
                case 'ArrowLeft':
                    this.isLeftPressed = true; this.updateDirection(); break;
                case 'ArrowUp':
                    this.isJumpPressed = true; break;
            }            
        });
        document.addEventListener('keyup', e => {
            switch (e.key) {
                case 'ArrowRight':
                    this.isRightPressed = false; this.updateDirection(); break;
                case 'ArrowLeft':
                    this.isLeftPressed = false; this.updateDirection(); break;
                case 'ArrowUp':
                    this.isJumpPressed = false; break;
            }
        });
    }

    private updateDirection(): void {
        if ( this.isLeftPressed && !this.isRightPressed ) {
            this.pressedDirection = 'left';
        } else if ( !this.isLeftPressed && this.isRightPressed ) {
            this.pressedDirection = 'right';
        } else if ( !this.isLeftPressed && !this.isRightPressed ) {
            this.pressedDirection = null;
        }
    }

}