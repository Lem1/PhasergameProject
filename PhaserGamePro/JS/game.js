let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
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
    scene: [sceneA, sceneB],
    backgroundColor: "#F08080"

};

var game = new Phaser.Game(config);
