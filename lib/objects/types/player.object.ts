import { ParsedObjectConfig } from "../../interfaces/parsed-game-config.interface";
import CanvasService from "../../services/canvas.service";
import { ImageService, PlayerTextures } from "../../services/image.service";
import { ObjectModel } from "../basic-object";
import { EntityObject } from "../entity-object";

export class Player extends EntityObject {

    public hasCollision = true;
    public model: ObjectModel;

    private pressedDirection: 'left' | 'right' = null;
    private isLeftPressed = false;
    private isRightPressed = false;
    private isJumpPressed = false;

    private heightRate = 1.2;
    private widthRate = 0.8;

    constructor(
        config: ParsedObjectConfig, 
        canvasService: CanvasService,
        imageService: ImageService
    ) {
        super(config, canvasService);

        this.setEntityConfig({
            maxSpeed: 350
        });

        const textures = imageService.players[config.model.name];
        this.textures = {
            time: 0,
            stand: {image: textures.stand},
            walk: {images: textures.walk, frequent: 6},
            jump: {image: textures.jump}
        };

        this.coords[1] = this.coords[1]-this.size[1]*(this.heightRate-1);
        this.size = [this.size[0]*this.widthRate, this.size[1]*this.heightRate];

        this.model = {
            image: textures.stand,
            offset: config.model.offset,
            size: [this.size[0], this.size[1]]
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