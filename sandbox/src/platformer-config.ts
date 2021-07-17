import { PlatformerConfig } from "../../lib/interfaces/platformer-config.interface";

const GAME_CONFIG: PlatformerConfig = {
    canvas: {
        width: 900,
        height: 600
    },
    game: {
        map: {
            width: 1500,
            height: 800
        },
        camera: {
            top: '1:4',
            right: '1:2',
            bottom: '1:4',
            left: '1:4',
        },
        objects: [
            {
                type: 'player',
                coords: [50, 265],
                size: [70, 70],
                modelName: 'bear',
                modelOffset: [0, -15],
                modelSize: [70, 85], 
            },
            {
                type: 'wall',
                coords: [0, 335],
                size: [350, 120],
                modelName: 'grass',
                modelOffset: [0, 0],
                modelSize: [350, 120],   
            },
            {
                type: 'wall',
                coords: [400, 455],
                size: [120, 20],
                modelName: 'grass',
                modelOffset: [0, 0],
                modelSize: [120, 20],   
            },
            {
                type: 'wall',
                coords: [400, 655],
                size: [120, 20],
                modelName: 'grass',
                modelOffset: [0, 0],
                modelSize: [120, 20],   
            },
            {
                type: 'wall',
                coords: [700, 555],
                size: [60, 20],
                modelName: 'grass',
                modelOffset: [0, 0],
                modelSize: [60, 20],   
            },
            {
                type: 'wall',
                coords: [600, 290],
                size: [40, 20],
                modelName: 'grass',
                modelOffset: [0, 0],
                modelSize: [40, 20],   
            },
            {
                type: 'wall',
                coords: [800, 150],
                size: [40, 30],
                modelName: 'grass',
                modelOffset: [0, 0],
                modelSize: [40, 30],   
            },
        ]
    } 
}
export default GAME_CONFIG;