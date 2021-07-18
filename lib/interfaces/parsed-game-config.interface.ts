import { ObjectTypes } from "../services/object.service";
import { CameraDirection } from "./game-config.interface";

export interface ParsedGameConfig {
    canvas: {
        width: number,
        height: number,
    },
    map: ParsedMapConfig,
    camera: ParsedCameraConfig,
    player: ParsedObjectConfig,
    objects: ParsedObjectConfig[]
}

export type ParsedCameraConfig = {[key in CameraDirection]: number};

export interface ParsedMapConfig {
    width: number,
    height: number,
    cells: {
        size: number,
        horizontal: number,
        vertical: number
    }
}

export interface ParsedObjectConfig {
    type: ObjectTypes;
    coords: [number, number];
    size: [number, number],
    model: {
        name: string,
        offset: [number, number],
        size: [number, number]
    }  
}