import { ParsedCameraConfig, ParsedGameConfig } from "../interfaces/parsed-game-config.interface";
import { ImageService } from "./image.service";

export type RectangleCoords = [number, number, number, number]; // x, y, width, height
export default class CanvasService {

    private element: HTMLCanvasElement;
    private canvas: {
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    };
    private map: {
        width: number,
        height: number
    };
    private breakpoints: ParsedCameraConfig;
    private translation = {
        h: 0,
        v: 0
    };

    private backgroundImage: HTMLImageElement;

    constructor(
        canvasElement: HTMLCanvasElement, 
        config: ParsedGameConfig,
        imageService: ImageService
    ) {
        this.backgroundImage = imageService.background.background1;
        this.element = canvasElement;
        this.canvas = {
            ...config.canvas,
            ctx: canvasElement.getContext('2d')
        };
        this.map = {
            width: config.map.width,
            height: config.map.height
        };
        this.element.width = this.canvas.width;
        this.element.height = this.canvas.height;

        this.breakpoints = config.camera;
    }


    public updateCameraTranslation(x: number, y: number, w: number, h: number): void {
        // P.S. Don't try to understand this method :# This is hell

        // Horizontal translation
        let transX;
        if ( this.translation.h + this.breakpoints.left > x) {
            transX = this.translation.h - (this.breakpoints.left + this.translation.h - x);
        } else if ( this.translation.h + this.canvas.width - this.breakpoints.right < x + w) {
            transX = this.translation.h + ( x + w - (this.translation.h + this.canvas.width - this.breakpoints.right));
        }
        if (transX != null && transX != this.translation.h && transX >= 0 && transX <= this.map.width-this.canvas.width) {
            this.canvas.ctx.translate(this.translation.h - transX, 0);
            this.translation.h = transX;
        }

        if (transX != null && transX != this.translation.h) {
            if (transX < 0) {
                this.canvas.ctx.translate(0, this.translation.h);
                this.translation.h = 0;
            } else if (transX > this.map.width-this.canvas.width) {
                this.canvas.ctx.translate(0, this.canvas.width - this.map.width + this.translation.h);
                this.translation.h = this.map.width - this.canvas.width;
            } else {
                this.canvas.ctx.translate(0, this.translation.h - transX);
                this.translation.h = transX;
            }
        }

        // Vertical translation
        let transY;
        if ( this.translation.v + this.breakpoints.top > y) {
            transY = this.translation.v - (this.breakpoints.top + this.translation.v - y);
        } else if ( this.translation.v + this.canvas.height - this.breakpoints.bottom < y + h) {
            transY = this.translation.v + ( y + h - (this.translation.v + this.canvas.height - this.breakpoints.bottom));
        }
        if (transY != null && transY != this.translation.v) {
            if (transY < 0) {
                this.canvas.ctx.translate(0, this.translation.v);
                this.translation.v = 0;
            } else if (transY > this.map.height-this.canvas.height) {
                this.canvas.ctx.translate(0, this.canvas.height - this.map.height + this.translation.v);
                this.translation.v = this.map.height - this.canvas.height;
            } else {
                this.canvas.ctx.translate(0, this.translation.v - transY);
                this.translation.v = transY;
            }
        }
    }
    

    public clearCanvas(): void {
        this.canvas.ctx.drawImage(this.backgroundImage, 
            0 + this.translation.h, 0 + this.translation.v, 
            this.canvas.width, this.canvas.height
        );
    }

    public drawImage(img: HTMLImageElement, coords: RectangleCoords): void {
        this.canvas.ctx.drawImage(img, ...coords);
    }

    public drawFlippedImage(img: HTMLImageElement, coords: RectangleCoords): void {
        this.canvas.ctx.translate(coords[0] + coords[2], coords[1]);
        this.canvas.ctx.scale(-1, 1);
        this.canvas.ctx.drawImage(img, 0, 0, coords[2], coords[3]);
        this.canvas.ctx.setTransform(1, 0, 0, 1, -this.translation.h, -this.translation.v);
    }

    public drawFPS(fps: number): void {
        this.canvas.ctx.font = '14px sans-serif';
        this.canvas.ctx.fillText('FPS: ' + fps, 0 + this.translation.h , 14 + this.translation.v);
    }

}