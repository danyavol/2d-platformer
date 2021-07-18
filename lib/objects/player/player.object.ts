import { ParsedObjectConfig } from "../../interfaces/parsed-game-config.interface";
import CanvasService from "../../services/canvas.service";
import { ImageService, PlayerTextures } from "../../services/image.service";
import { ObjectModel } from "../basic-object";
import { EntityObject } from "../entity-object";

export class Player extends EntityObject {

    public hasCollision = true;
    public model: ObjectModel;

    private textures: PlayerTextures;
    private pressedDirection: 'left' | 'right' = null;
    private isLeftPressed = false;
    private isRightPressed = false;
    private isJumpPressed = false;

    constructor(
        config: ParsedObjectConfig, 
        canvasService: CanvasService,
        imageService: ImageService
    ) {
        super(config, canvasService);

        this.setEntityConfig({
            maxSpeed: 350
        });
        this.textures = imageService.players[config.model.name];

        config.coords[1] = config.coords[1]*1.4;
        config.size[1] = config.size[1]*1.4;

        this.model = {
            image: this.textures.stand,
            offset: config.model.offset,
            size: [config.model.size[0], config.model.size[1]*1.4]
        };
        
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