
class endGame extends Phaser.Scene {
    constructor() {
        super({ key: 'endGame' });
    }
    Preload() {

    }

    create() {

        this.add.text(160, 120, 'Game Over', { font: '36px Courier', color: '000000' });

        this.add.text(160, 200, 'Score: ' + this.score, { font: '36px Courier', color: '000000' });
    }
}

