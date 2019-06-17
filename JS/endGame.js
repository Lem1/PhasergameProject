
class endGame extends Phaser.Scene {
    constructor() {
        super({ key: 'endGame' });
    }
    init(data) {
        this.scoreDisplay = data.score
    }
    Preload() {

    }

    create() {

        this.add.text(300, 220, 'Game Over', { font: '36px times', color: '000000' });

        this.add.text(250, 300, 'Score: ' + this.scoreDisplay, { font: '36px Courier', color: '000000' });
    }
}

