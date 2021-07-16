// icons https://www.studio-maximus.com/works/apps/birds-to-space/

import { CameraBreakPoint, CameraConfig, CameraDirection, PlatformerConfig } from "../interfaces/platformer-config.interface";

export type RectangleCoords = [number, number, number, number]; // x, y, width, height
export default class CanvasService {

    private element: HTMLCanvasElement;
    private canvas: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;
    private mapWidth: number;
    private mapHeight: number;
    private breakpoints: {[key in CameraDirection]: number};
    private translation = {
        h: 0,
        v: 0
    };

    constructor(
        canvasElement: HTMLCanvasElement, 
        config: PlatformerConfig
    ) {
        this.element = canvasElement;
        this.canvas = canvasElement.getContext('2d');
        this.canvasWidth = config.canvas.width;
        this.canvasHeight = config.canvas.height;
        this.mapWidth = config.game.map.width;
        this.mapHeight = config.game.map.height;

        this.element.width = this.canvasWidth;
        this.element.height = this.canvasHeight;

        this.updateCameraBreakpoint(config.game.camera);
    }


    public updateCameraTranslation(x: number, y: number, w: number, h: number): void {

        // Horizontal translation
        let transX;
        if ( this.translation.h + this.breakpoints.left > x) {
            transX = this.translation.h - (this.breakpoints.left + this.translation.h - x);
        } else if ( this.translation.h + this.canvasWidth - this.breakpoints.right < x + w) {
            transX = this.translation.h + ( x + w - (this.translation.h + this.canvasWidth - this.breakpoints.right));
        }
        if (transX != null && transX != this.translation.h && transX >= 0 && transX <= this.mapWidth-this.canvasWidth) {
            this.canvas.translate(this.translation.h - transX, 0);
            this.translation.h = transX;
        }

        // Vertical translation
        let transY;
        if ( this.translation.v + this.breakpoints.top > y) {
            transY = this.translation.v - (this.breakpoints.top + this.translation.v - y);
        } else if ( this.translation.v + this.canvasHeight - this.breakpoints.bottom < y + h) {
            transY = this.translation.v + ( y + h - (this.translation.v + this.canvasHeight - this.breakpoints.bottom));
        }
        if (transY != null && transY >= 0 && transY <= this.mapHeight-this.canvasHeight) {
            this.canvas.translate(0, this.translation.v - transY);
            this.translation.v = transY;
        }
    }
    

    public clearCanvas(): void {
        this.canvas.clearRect(
            0 + this.translation.h, 0 + this.translation.v, 
            this.canvasWidth, this.canvasHeight
        );
    }

    public drawImage(img: HTMLImageElement, coords: RectangleCoords): void {
        this.canvas.drawImage(img, ...coords);
    }

    public drawFlippedImage(img: HTMLImageElement, coords: RectangleCoords): void {
        this.canvas.translate(coords[0] + coords[2], coords[1]);
        this.canvas.scale(-1, 1);
        this.canvas.drawImage(img, 0, 0, coords[2], coords[3]);
        this.canvas.setTransform(1, 0, 0, 1, -this.translation.h, -this.translation.v);
    }

    public drawFPS(fps: number): void {
        this.canvas.font = '14px sans-serif';
        this.canvas.fillText('FPS: ' + fps, 0 + this.translation.h , 14 + this.translation.v);
    }

    private updateCameraBreakpoint(config: CameraConfig): void {
        this.breakpoints = {
            top: getPoint(this.canvasHeight, config.top),
            right: getPoint(this.canvasWidth, config.right),
            bottom: getPoint(this.canvasHeight, config.bottom),
            left: getPoint(this.canvasWidth, config.left)
        };

        function getPoint(x: number, y: CameraBreakPoint): number {
            const [a, b] = y.split(':');
            return x / parseInt(b) * parseInt(a);
        }
    }

}