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
    player: { coords: [1, 3], type: 'player', model: 'alien2', },
    objects: [
        { coords: [0, 5], type: 'wall', model: 'grassMid' },
        { coords: [1, 5], type: 'wall', model: 'grassMid' },
        { coords: [2, 5], type: 'wall', model: 'grassMid' },
        { coords: [3, 6], type: 'wall', model: 'grassMid' },
        { coords: [3, 7], type: 'wall', model: 'grassCenter' },
        { coords: [4, 8], type: 'wall', model: 'grassMid' },
        { coords: [5, 9], type: 'wall', model: 'grassMid' },
    ] 
}
export default GAME_CONFIG;