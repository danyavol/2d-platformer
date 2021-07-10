import { InputObject } from "../interfaces/object.interface";
import CanvasService from "../services/canvas.service";
import { ImageService } from "../services/image.service";
import { BasicObject } from "./basic-object";

export abstract class EntityObject extends BasicObject {

    private vx = 0;
    private vy = 0;

    private minSpeed = 1;

    constructor(
        config: InputObject, 
        imageService: ImageService, 
        canvasService: CanvasService
    ) {
        super(config, imageService, canvasService);
    }

    protected moveRight(): void {
        if (this.vx < 0) this.vx = -this.slowDown(this.vx);
        else this.vx = this.speedUp(this.vx);

        this.object.coords[0] = this.object.coords[0] + this.vx;
    }

    protected moveLeft(): void {
        if (this.vx > 0) this.vx = this.slowDown(this.vx);
        else this.vx = -this.speedUp(this.vx);

        this.object.coords[0] = this.object.coords[0] + this.vx;
    }

    protected stop(): void {
        if (this.vx === 0) return;
        if (this.vx > 0) this.vx = this.slowDown(this.vx);
        this.vx = -this.slowDown(this.vx);

        this.object.coords[0] = this.object.coords[0] + this.vx;
    }

    protected jump(): void {

    }

    private speedUp(currSpeed: number): number {
        const speed = this.abs(currSpeed);

        if (speed < this.minSpeed) return this.minSpeed;
        if (speed * 2 > this.object.speed) return this.object.speed;
        return speed * 2;
    }

    private slowDown(currSpeed: number): number {
        const speed = this.abs(currSpeed);

        if (speed > this.minSpeed) {
            if (speed / 2 < this.minSpeed) return 0;
            return speed / 2;
        }
        return 0;
    }

    private abs(num: number): number {
        if (num < 0) return -num;
        return num;
    }
    
}