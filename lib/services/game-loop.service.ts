import CanvasService from "./canvas.service";
import { ObjectService } from "./object.service";

export class GameLoopService {
    
    private fps: number;
    private isGamePaused = false;
    private frameStart: number;

    constructor(
        private canvasService: CanvasService,
        private objectService: ObjectService
    ) {}

    public start(): void {
        this.isGamePaused = false;
        this.frameStart = performance.now();
        this.step();
    }

    public stop(): void {
        this.isGamePaused = true;
    }

    // Methods that should be executed during single game frame
    private frame(): void {
        this.canvasService.clearCanvas();
        this.objectService.renderObjects(this.fps);
        this.canvasService.drawFPS(this.fps);
    }

    private step(): void {
        const frameEnd = performance.now();
        this.fps = Math.floor( 1000 / (frameEnd - this.frameStart) );
        this.frameStart = performance.now();
        if (this.fps < 25) this.fps = 25;
        if (this.fps > 1000) this.fps = 1000;

        this.frame();
        
        if (!this.isGamePaused) setTimeout(() => this.step(), 0);
    }
}