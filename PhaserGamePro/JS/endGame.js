class endGame extends Phaser.Scene {
    constructor() {
        super({ key: 'endGame' });
    }

    create() {
        this.add.text(60, 120, 'Game Over', { font: '36px Courier', color: '000000' });
    }
}
