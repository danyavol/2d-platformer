const GAME_CONFIG = {
    canvas: {
        width: 900,
        height: 600
    },
    game: {
        map: {
            width: 900,
            height: 600
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
        ]
    } 
}