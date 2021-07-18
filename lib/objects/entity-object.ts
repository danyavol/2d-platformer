import { abs } from "../helpers/common-methods";
import { ParsedObjectConfig } from "../interfaces/parsed-game-config.interface";
import CanvasService from "../services/canvas.service";
import { BasicObject } from "./basic-object";

const DEFAULT_CONFIG = {
    maxSpeed: 100,
    sideAcceleration: 0.2,
    gravity: 2000,
    maxFallSpeed: 800,
    jumpPower: 800
};

export interface AnimationConfig {
    images: HTMLImageElement[],
    frequent: number,
    frame?: number,
    index?: number
}

export interface EntityConfig {
    maxSpeed: number;           // Max speed (in pixels per second)
    sideAcceleration: number;   // Duration of acceleration animation (in seconds)
    gravity: number;            // Gravity (in pixels per second)
    maxFallSpeed: number;       // Max fall speed (in pixels per second)
    jumpPower: number;          // Jump power (in pixels per second)
}

export abstract class EntityObject extends BasicObject {

    protected fps: number;

    private vx = 0; // X-axis speed (in pixels per second)
    private vy = 0; // Y-axis speed (in pixels per second)
    private entityConfig: EntityConfig = DEFAULT_CONFIG;  
    private sideButtonPressed = false;
    private jumpButtonPressed = false;
    private inAir = false;
    protected textures: {
        time: number,
        stand: {
            image: HTMLImageElement,
        },
        walk: {
            images: HTMLImageElement[],
            frequent: number,
            index?: number,
        },
        jump: {
            image: HTMLImageElement
        }
    };

    constructor(
        config: ParsedObjectConfig, 
        canvasService: CanvasService
    ) {
        super(config, canvasService);

        this.textures = {
            time: 0,
            stand: { image: null },
            walk: { images: null, frequent: null },
            jump: { image: null }
        };
    }

    public moveRight(): void {
        this.sideButtonPressed = true;
        this.isModelFlipped = false;
        if (this.vx < 0) this.vx = -this.slowDown(this.vx);
        else this.vx = this.speedUp(this.vx);
        
        this.coords[0] = this.coords[0] + this.vx/this.fps;
    }

    public moveLeft(): void {
        this.sideButtonPressed = true;
        this.isModelFlipped = true;
        if (this.vx > 0) this.vx = this.slowDown(this.vx);
        else this.vx = -this.speedUp(this.vx);

        this.coords[0] = this.coords[0] + this.vx/this.fps;
    }

    public jump(): void {
        if (!this.inAir) {
            this.jumpButtonPressed = true;
            this.inAir = true;
            this.vy = this.entityConfig.jumpPower;
            this.coords[1] = this.coords[1] - this.vy/this.fps;
        }
    }

    public updateState(fps: number): void {
        this.fps = fps;

        if (!this.sideButtonPressed) this._stop();
        if (!this.jumpButtonPressed) this._fall();

        this.sideButtonPressed = false;
        this.jumpButtonPressed = false;
    };

    protected setEntityConfig(entityConfig: Partial<EntityConfig>): void {
        this.entityConfig = { ...DEFAULT_CONFIG, ...entityConfig };
    }

    public stopFalling(): void {
        this.inAir = false;
        this.vy = 0;
    }

    public startFalling(): void {
        this.vy = this.applyGravity(0);
    }

    public resetSideAcceleration(): void {
        this.vx = 0;
    }
    
    /****************** Execute this if no buttons pressed *********************/


    private _stop(): void {
        if (this.vx === 0) return;

        if (this.vx > 0) this.vx = this.slowDown(this.vx);
        else this.vx = -this.slowDown(this.vx);
        this.coords[0] = this.coords[0] + this.vx/this.fps;
    }

    private _fall(): void {
        this.inAir = true;
        this.vy = this.applyGravity(this.vy);
        this.coords[1] = this.coords[1] - this.vy/this.fps;
    }

    

    /****************** Helpers *********************/

    public applyTextures(): void {
        let img: HTMLImageElement;

        this.textures.time += 1000/this.fps;
        if (this.textures.time >= 1000) this.textures.time = 0;
        

        if (this.inAir) {
            img = this.textures.jump.image;
        } else if (this.vx != 0) {
            this.calculateTextureIndex(this.textures.walk);
            img = this.textures.walk.images[this.textures.walk.index]
        } else {
            img = this.textures.stand.image;
        }

        img ? this.model.image = img : null;
    }

    private calculateTextureIndex(anim: AnimationConfig): void {
        const frame = Math.floor(this.textures.time / (1000 / anim.frequent));
        anim.index = frame - Math.floor(frame/anim.images.length)*anim.images.length;
    }

    private applyGravity(vy: number): number {
        const ySpeed = vy - this.entityConfig.gravity / this.fps;
        if (-ySpeed > this.entityConfig.maxFallSpeed) return -this.entityConfig.maxFallSpeed;
        else return ySpeed;
    }

    private speedUp(currSpeed: number): number {
        const speed = abs(currSpeed);
        const newSpeed = speed + this.entityConfig.maxSpeed / (this.fps * this.entityConfig.sideAcceleration);

        if (newSpeed > this.entityConfig.maxSpeed) return this.entityConfig.maxSpeed;
        else return newSpeed;
    }

    private slowDown(currSpeed: number): number {
        const speed = abs(currSpeed);
        const newSpeed = speed - this.entityConfig.maxSpeed / (this.fps * this.entityConfig.sideAcceleration);

        if (newSpeed < 0) return 0;
        else return newSpeed;
    }
    
}