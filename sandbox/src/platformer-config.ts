import { GameConfig } from "../../lib/interfaces/game-config.interface";

const GAME_CONFIG: GameConfig = {
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
    player: { coords: [2, 7], type: 'player', model: 'alien2', },
    objects: [
        { coords: [0, 8], type: 'wall', model: 'grassMid' },
        { coords: [1, 8], type: 'wall', model: 'grassMid' },
        { coords: [2, 8], type: 'wall', model: 'grassMid' },
        { coords: [3, 8], type: 'wall', model: 'grassMid' },
        { coords: [4, 8], type: 'wall', model: 'grassMid' },
        { coords: [5, 8], type: 'wall', model: 'grassMid' },
        { coords: [6, 8], type: 'wall', model: 'grassMid' },
        { coords: [7, 8], type: 'wall', model: 'grassMid' },
        { coords: [0, 9], type: 'wall', model: 'grassCenter' },
        { coords: [1, 9], type: 'wall', model: 'grassCenter' },
        { coords: [2, 9], type: 'wall', model: 'grassCenter' },
        { coords: [3, 9], type: 'wall', model: 'grassCenter' },
        { coords: [4, 9], type: 'wall', model: 'grassCenter' },
        { coords: [5, 9], type: 'wall', model: 'grassCenter' },
        { coords: [6, 9], type: 'wall', model: 'grassCenter' },
        { coords: [7, 9], type: 'wall', model: 'grassCenter' },
        { coords: [8, 9], type: 'wall', model: 'grassCenter' },
        { coords: [8, 8], type: 'wall', model: 'grassCenter' },
        { coords: [8, 7], type: 'wall', model: 'grassCenter' },
        { coords: [8, 6], type: 'wall', model: 'grassMid' },
        { coords: [9, 7], type: 'wall', model: 'grassMid' },
        { coords: [10, 7], type: 'wall', model: 'grassMid' },
        { coords: [12, 9], type: 'wall', model: 'grassMid' },
        // Decorations
        { coords: [1, 7], type: 'decoration', model: 'bush' },
        { coords: [3, 7], type: 'decoration', model: 'fence' },
        { coords: [4, 7], type: 'decoration', model: 'fence_broken' },
        { coords: [5, 7], type: 'decoration', model: 'fence' },
        { coords: [6, 7], type: 'decoration', model: 'rock' },
        { coords: [7, 7], type: 'decoration', model: 'herb' },
        { coords: [9, 6], type: 'decoration', model: 'mushroomBrown' },
        { coords: [10, 6], type: 'decoration', model: 'mushroomRed' },
    ] 
}
export default GAME_CONFIG;