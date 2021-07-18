import { ParsedCameraConfig, ParsedGameConfig, ParsedObjectConfig } from "../interfaces/parsed-game-config.interface";
import { CameraBreakPoint, GameConfig, ObjectConfig } from "../interfaces/game-config.interface";


export class ConfigService {

    private parsedConfig: ParsedGameConfig;
    private config: GameConfig;

    constructor(config: GameConfig) {
        this.config = this.applyDefaultConfig(config);
        this.parsedConfig = this.parseConfig(this.config);
    }

    public getParsedConfig(): ParsedGameConfig {
        return this.parsedConfig;
    }

    private parseConfig(config: GameConfig): ParsedGameConfig {
        const parsedConfig: ParsedGameConfig = {
            canvas: { ...config.canvas },
            map: {
                width: config.map.width * config.map.cellSize,
                height: config.map.height * config.map.cellSize,
                cells: {
                    size: config.map.cellSize,
                    horizontal: config.map.width,
                    vertical: config.map.height
                }
            },
            camera: this.getParsedCameraConfig(config),
            player: this.getParsedObjectConfig(config.player, config),
            objects: config.objects.map( obj => this.getParsedObjectConfig(obj, config) )
        };
        return parsedConfig;
    }

    private getParsedObjectConfig(obj: ObjectConfig, config: GameConfig): ParsedObjectConfig {
        const parsedConfig: ParsedObjectConfig = {
            type: obj.type,
            coords: [obj.coords[0]*config.map.cellSize, obj.coords[1]*config.map.cellSize],
            size: [config.map.cellSize, config.map.cellSize],
            model: {
                name: obj.model,
                offset: [0, 0],
                size: [config.map.cellSize, config.map.cellSize]
            }
        };
        return parsedConfig;
    }

    private getParsedCameraConfig(config: GameConfig): ParsedCameraConfig  {
        const breakpoints: ParsedCameraConfig = {
            top: getPoint(config.canvas.height, config.camera.top),
            right: getPoint(config.canvas.width, config.camera.right),
            bottom: getPoint(config.canvas.height, config.camera.bottom),
            left: getPoint(config.canvas.width, config.camera.left)
        };
        return breakpoints;

        function getPoint(x: number, y: CameraBreakPoint): number {
            const [a, b] = y.split(':');
            return x / parseInt(b) * parseInt(a);
        }
    }

    /************** DEFAULT CONFIG **************/
 
    private applyDefaultConfig(config: GameConfig): GameConfig {
        const def = this.getDefaultConfig();
        return {
            canvas: {...def.canvas, ...config.canvas },
            map: {...def.map, ...config.map},
            camera: {...def.camera, ...config.camera},
            player: {...config.player},
            objects: [...def.objects, ...config.objects]
            
        };
    }

    private getDefaultConfig(): GameConfig {
        return {
            canvas: {
                width: 900,
                height: 600  
            },
            map: {
                width: 20,
                height: 10,
                cellSize: 70,
            },
            camera: {
                top: '1:4',
                right: '1:2',
                bottom: '1:4',
                left: '1:4',
            },
            player: null,
            objects: []
        };
    }

}