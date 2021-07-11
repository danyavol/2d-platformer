import { InputObject } from "../interfaces/object.interface";
import CanvasService from "../services/canvas.service";
import { ImageService } from "../services/image.service";
import { BasicObject } from "./basic-object";

const STEPS_COUNT = 30;

export abstract class EntityObject extends BasicObject {

    private vx = 0;
    private vy = 0;

    private speedStep: number;
    private maxSpeed: number;

    protected fps: number;

    constructor(
        config: InputObject, 
        imageService: ImageService, 
        canvasService: CanvasService
    ) {
        super(config, imageService, canvasService);

        this.setMaxSpeed(100); // default max speed for all entities
    }

    protected abstract renderEntity(fps: number): void;

    protected setMaxSpeed(maxSpeed: number): void {
        this.maxSpeed = maxSpeed;
        this.speedStep = maxSpeed / STEPS_COUNT;
    }
    // TODO: Fix bug. With slow fps it is slow acceleration
    protected moveRight(): void {
        this.object.isModelFlipped = true;
        if (this.vx < 0) this.vx = -this.slowDown(this.vx);
        else this.vx = this.speedUp(this.vx);
        
        this.object.coords[0] = this.object.coords[0] + this.vx/this.fps;
    }

    protected moveLeft(): void {
        this.object.isModelFlipped = false;
        if (this.vx > 0) this.vx = this.slowDown(this.vx);
        else this.vx = -this.speedUp(this.vx);

        this.object.coords[0] = this.object.coords[0] + this.vx/this.fps;
    }

    protected stop(): void {
        if (this.vx === 0) return;
        if (this.vx > 0) this.vx = this.slowDown(this.vx);
        else this.vx = -this.slowDown(this.vx);

        this.object.coords[0] = this.object.coords[0] + this.vx/this.fps;
    }

    protected jump(): void {

    }

    private speedUp(currSpeed: number): number {
        const speed = this.abs(currSpeed);

        const newSpeed = speed + this.speedStep;

        if (newSpeed > this.maxSpeed) return this.maxSpeed;
        else return newSpeed;
    }

    private slowDown(currSpeed: number): number {
        const speed = this.abs(currSpeed);

        const newSpeed = speed - this.speedStep;

        if (newSpeed < 0) return 0;
        else return newSpeed;
    }

    private abs(num: number): number {
        if (num < 0) return -num;
        return num;
    }
    
}