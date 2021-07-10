import { ObjectTypes } from "../services/object.service";
import { ObjectModels } from "../services/image.service";

export interface InputObject {
    type: ObjectTypes;
    modelName: ObjectModels;
    modelSize: [number, number];
    hitboxStart: [number, number];
    hitboxSize: [number, number];
    coords: [number, number];
}

export interface ExtendedObject extends InputObject {
    model: HTMLImageElement;
    hasCollision: boolean;
    layer: number;
    speed?: number;
    jumpHeight?: number;
}

