import CanvasService from "./canvas.service";
import { ObjectService } from "./object.service";

export class ProcessService {
    constructor(
        private canvasService: CanvasService,
        private objectService: ObjectService
    ) {}

    public start() {
        const t = setInterval(() => this.step(), 25);
        setTimeout(() => {clearInterval(t); console.log('interval stopped');
        }, 10000);
    }

    private step() {
        this.canvasService.clearCanvas();
        this.objectService.renderObjects();
    }
}