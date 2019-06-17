let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    audio: {
        disableWebAudio: true
    },
    scene: [sceneA, sceneB, endGame],
    backgroundColor: "#F08080"

};

var game = new Phaser.Game(config);

