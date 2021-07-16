import { abs } from "../helpers/common-methods";
import { ObjectConfig } from "../interfaces/platformer-config.interface";
import CanvasService from "../services/canvas.service";
import { ImageService } from "../services/image.service";
import { BasicObject } from "./basic-object";

const DEFAULT_CONFIG = {
    maxSpeed: 100,
    sideAcceleration: 0.2,
    gravity: 2000,
    maxFallSpeed: 2000,
    jumpPower: 800
};

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

    constructor(
        config: ObjectConfig, 
        imageService: ImageService, 
        canvasService: CanvasService
    ) {
        super(config, imageService, canvasService);
    }

    // TODO: Don't let player to go out of bounds
    public moveRight(): void {
        this.sideButtonPressed = true;
        this.isModelFlipped = true;
        if (this.vx < 0) this.vx = -this.slowDown(this.vx);
        else this.vx = this.speedUp(this.vx);
        
        this.coords[0] = this.coords[0] + this.vx/this.fps;
    }

    public moveLeft(): void {
        this.sideButtonPressed = true;
        this.isModelFlipped = false;
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
        // if (!this.inAir) return;
        this.inAir = true;
        this.vy = this.applyGravity(this.vy);
        this.coords[1] = this.coords[1] - this.vy/this.fps;
    }

    

    /****************** Helpers *********************/

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