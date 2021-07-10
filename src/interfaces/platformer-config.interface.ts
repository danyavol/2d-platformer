import { InputObject } from "./object.interface";

export interface PlatformerConfig {
    canvasWidth: number;
    canvasHeight: number;
    game: {
        mapWidth: number;
        mapHeight: number;
    },
    objects: InputObject[]
}