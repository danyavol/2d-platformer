import { ObjectTypes } from "../services/object.service";

export interface GameConfig {
    canvas: {
        width: number;
        height: number;
    },
    map: MapConfig,
    camera: CameraConfig,
    player: ObjectConfig,
    objects: ObjectConfig[]
}

export interface MapConfig {
    width: number;
    height: number;
    cellSize: number;
}

export type CameraConfig = {[key in CameraDirection]: CameraBreakPoint};
export type CameraDirection = 'top' | 'right' | 'bottom' | 'left';
export type CameraBreakPoint = `${number}:${number}`;

export interface ObjectConfig {
    coords: [number, number];
    type: ObjectTypes;
    model: string;
}

