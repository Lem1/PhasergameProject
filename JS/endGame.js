
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
        this.input.keyboard.on('keyup_ENTER', this.moveOn, this);

        this.add.text(300, 220, 'Game Over', { font: '36px times', color: '000000' });

        this.add.text(250, 300, 'Score: ' + this.scoreDisplay, { font: '36px Courier', color: '000000' });

        this.add.text(30, 500, 'Press Enter to proceed to the next game!', { font: '36px times', color: '000000' });
    }


    moveOn() {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
            this.scene.sleep('endGame');
            this.scene.start('MathFactsStart');
        }
    }
}