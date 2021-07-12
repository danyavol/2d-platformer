import { InputObject } from "../interfaces/object.interface";
import CanvasService from "../services/canvas.service";
import { ImageService } from "../services/image.service";
import { BasicObject } from "./basic-object";

const DEFAULT = {
    sideAcceleration: 0.2,
    maxSpeed: 100,
    gravity: 2000,
    maxFallSpeed: 2000,
    jumpPower: 800
};

export abstract class EntityObject extends BasicObject {

    private vx = 0; // X-axis speed (in pixels per second)
    private vy = 0; // Y-axis speed (in pixels per second)
    private sideAcceleration: number = DEFAULT.sideAcceleration; // Duration of acceleration animation (in seconds)
    private maxSpeed: number = DEFAULT.maxSpeed; // Max speed (in pixels per second)
    private gravity: number = DEFAULT.gravity; // Gravity (in pixels per second)
    private maxFallSpeed: number = DEFAULT.maxFallSpeed; // Max fall speed (in pixels per second)
    private jumpPower: number = DEFAULT.jumpPower; // Jump power (in pixels per second)

    protected fps: number;
    private inAir = false;
    private sideButtonPressed = false;
    private jumpButtonPressed = false;

    constructor(
        config: InputObject, 
        imageService: ImageService, 
        canvasService: CanvasService
    ) {
        super(config, imageService, canvasService);
    }

    public moveRight(): void {
        this.sideButtonPressed = true;
        this.object.isModelFlipped = true;
        if (this.vx < 0) this.vx = -this.slowDown(this.vx);
        else this.vx = this.speedUp(this.vx);
        
        this.object.coords[0] = this.object.coords[0] + this.vx/this.fps;
    }

    public moveLeft(): void {
        this.sideButtonPressed = true;
        this.object.isModelFlipped = false;
        if (this.vx > 0) this.vx = this.slowDown(this.vx);
        else this.vx = -this.speedUp(this.vx);

        this.object.coords[0] = this.object.coords[0] + this.vx/this.fps;
    }

    public jump(): void {
        if (!this.inAir) {
            this.jumpButtonPressed = true;
            this.inAir = true;
            this.vy = this.jumpPower;
            this.object.coords[1] = this.object.coords[1] - this.vy/this.fps;
        }
    }

    protected renderEntity(fps: number): void {
        this.fps = fps;

        if (!this.sideButtonPressed) this._stop();
        if (!this.jumpButtonPressed) this._jump();

        this.sideButtonPressed = false;
        this.jumpButtonPressed = false;

        super.render();
    };

    protected setMaxSpeed(maxSpeed: number): void {
        this.maxSpeed = maxSpeed;
    }

    protected setSideAcceleration(sideAcceleration: number): void {
        this.sideAcceleration = sideAcceleration;
    }

    
    /****************** Execute this if no buttons pressed *********************/


    private _stop(): void {
        if (this.vx === 0) return;

        if (this.vx > 0) this.vx = this.slowDown(this.vx);
        else this.vx = -this.slowDown(this.vx);
        this.object.coords[0] = this.object.coords[0] + this.vx/this.fps;
    }

    private _jump(): void {
        if (!this.inAir) return;

        this.vy = this.applyGravity(this.vy);
        this.object.coords[1] = this.object.coords[1] - this.vy/this.fps;
    }

    

    /****************** Helpers *********************/

    private applyGravity(vy: number): number {
        const ySpeed = vy - this.gravity / this.fps;
        if (-ySpeed > this.maxFallSpeed) return -this.maxFallSpeed;
        else return ySpeed;
    }

    private speedUp(currSpeed: number): number {
        const speed = this.abs(currSpeed);
        const newSpeed = speed + this.maxSpeed / (this.fps * this.sideAcceleration);

        if (newSpeed > this.maxSpeed) return this.maxSpeed;
        else return newSpeed;
    }

    private slowDown(currSpeed: number): number {
        const speed = this.abs(currSpeed);
        const newSpeed = speed - this.maxSpeed / (this.fps * this.sideAcceleration);

        if (newSpeed < 0) return 0;
        else return newSpeed;
    }

    private abs(num: number): number {
        if (num < 0) return -num;
        return num;
    }
    
}