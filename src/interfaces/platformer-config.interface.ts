import { ObjectModels } from "../services/image.service";
import { ObjectTypes } from "../services/object.service";

export interface PlatformerConfig {
    canvas: {
        width: number;
        height: number;
    },
    game: {
        map: MapConfig,
        camera: CameraConfig,
        objects: ObjectConfig[]
    } 
}

export interface MapConfig {
    width: number;
    height: number;
}

export type CameraConfig = {[key in CameraDirection]: CameraBreakPoint};
export type CameraDirection = 'top' | 'right' | 'bottom' | 'left';
export type CameraBreakPoint = `${number}:${number}`;

export interface ObjectConfig {
    type: ObjectTypes;
    coords: [number, number];
    size: [number, number];

    modelName: ObjectModels;
    modelOffset: [number, number];
    modelSize: [number, number];
}

