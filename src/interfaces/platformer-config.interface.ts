import { ObjectModels } from "../services/image.service";
import { ObjectTypes } from "../services/object.service";

export interface PlatformerConfig {
    canvas: {
        width: number;
        height: number;
    },
    game: {
        map: MapConfig,
        objects: ObjectConfig[]
    } 
}

export interface MapConfig {
    width: number;
    height: number;
}

export interface ObjectConfig {
    type: ObjectTypes;
    coords: [number, number];
    size: [number, number];

    modelName: ObjectModels;
    modelOffset: [number, number];
    modelSize: [number, number];
}