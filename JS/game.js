let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0,
                x: 0
            },
            debug: false
        }
    },
    audio: {
        disableWebAudio: true
    },
    scene: [sceneA, sceneB, endGame, MathFactsStart, MathFactsGame, MathFactsOutcome],
    backgroundColor: "#F08080"

};

var game = new Phaser.Game(config);

