const GAME_CONFIG = {
    canvasWidth: 900,
    canvasHeight: 600,
    game: {
        mapWidth: 2000,
        mapHeight: 1000
    },
    objects: [
        {
            type: 'player',
            modelName: 'bear',
            modelSize: [70, 85],
            hitboxStart: [0, 10],
            hitboxSize: [70, 75],
            coords: [50, 250]
        },
        {
            type: 'wall',
            modelName: 'grass',
            modelSize: [350, 120],
            hitboxStart: [0, 0],
            hitboxSize: [350, 120],
            coords: [0, 335]
        },
    ]
}