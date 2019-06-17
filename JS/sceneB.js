
class sceneB extends Phaser.Scene {

    constructor() {
        super({ key: 'sceneB' });
    }

    preload() {
        this.load.image('one', 'assets/Number0.png');
        this.load.image('two', 'assets/Number2.png');
        this.load.image('three', 'assets/Number3.png');
        this.load.image('four', 'assets/Number4.png');
        this.load.image('five', 'assets/Number5.png');
        this.load.image('six', 'assets/Number6.png');
        this.load.image('seven', 'assets/Number7.png');
        this.load.image('eight', 'assets/Number8.png');
        this.load.image('nine', 'assets/Number9.png');
        this.load.image('six2', 'assets/Number2nd_6.png');
        this.load.image('nine2', 'assets/Number2nd_9.png');
        this.load.audio('buzz', 'assets/Buzz.mp3');
    }


    create() {
        this.score = 0;
        this.timeCount = 5;
        this.wrongNum = this.sound.add('buzz');

        this.six = this.add.image(250, 250, 'six').setInteractive();
        this.one = this.add.image(350, 250, 'one').setInteractive();
        this.two = this.add.image(450, 250, 'two').setInteractive();
        this.five = this.add.image(550, 250, 'five').setInteractive();
        this.six1 = this.add.image(250, 350, 'six').setInteractive();
        this.seven = this.add.image(350, 350, 'seven').setInteractive();
        this.eight = this.add.image(450, 350, 'eight').setInteractive();
        this.nine = this.add.image(550, 350, 'nine').setInteractive();
        this.six2 = this.add.image(250, 450, 'six2').setInteractive();
        this.nine2 = this.add.image(350, 450, 'nine2').setInteractive();
        this.three = this.add.image(450, 450, 'three').setInteractive();
        this.four = this.add.image(550, 450, 'four').setInteractive();
        this.scoreText = this.add.text(16, 25, 'Score: 0', { fontSize: '32px', fill: '000000' });
        this.timeText = this.add.text(600, 25, 'Time: 10', { fontSize: '32px', fill: '000000' });

        this.six.inputEnabled = true;

        this.input.on('gameobjectdown', function (pointer, gameObject, event) {
            event.stopPropagation();
            this.ImageClick(gameObject);
        }, this);

        this.timer = this.time.addEvent({
            delay: 500,
            callback: this.GameTimer,
            callbackScope: this,
            loop: true
        }, this);
    }

    ImageClick(gameObject) {
        switch (gameObject) {
            case this.six:
                this.score += 1;
                this.six.setTint(0xff0000);
                this.scoreText.setText('Score: ' + this.score);
                this.six.disableInteractive();
                break;
            case this.one:
                this.score -= 1;
                this.scoreText.setText('Score: ' + this.score);
                this.wrongNum.play();
                break;
            case this.two:
                this.score -= 1;
                this.scoreText.setText('Score: ' + this.score);
                this.wrongNum.play();
                break;
            case this.five:
                this.score -= 1;
                this.scoreText.setText('Score: ' + this.score);
                this.wrongNum.play();
                break;
            case this.seven:
                this.score -= 1;
                this.scoreText.setText('Score: ' + this.score);
                this.wrongNum.play();
                break;
            case this.five:
                this.score -= 1;
                this.scoreText.setText('Score: ' + this.score);
                this.wrongNum.play();
                break;
            case this.eight:
                this.score -= 1;
                this.scoreText.setText('Score: ' + this.score);
                this.wrongNum.play();
                break;
            case this.six1:
                this.score += 1;
                this.six1.setTint(0xff0000);
                this.scoreText.setText('Score: ' + this.score);
                this.six1.disableInteractive();
                break;
            case this.nine2:
                this.score += 1;
                this.nine2.setTint(0xff0000);
                this.scoreText.setText('Score: ' + this.score);
                this.nine2.disableInteractive();
                break;
            case this.nine:
                this.score += 1;
                this.nine.setTint(0xff0000);
                this.scoreText.setText('Score: ' + this.score);
                this.nine.disableInteractive();
                break;
            case this.six2:
                this.score += 1;
                this.six2.setTint(0xff0000);
                this.scoreText.setText('Score: ' + this.score);
                this.six2.disableInteractive();
                break;
            case this.three:
                this.score += 1;
                this.three.setTint(0xff0000);
                this.scoreText.setText('Score: ' + this.score);
                this.three.disableInteractive();
                break;
            case this.four:
                this.score -= 1;
                this.scoreText.setText('Score: ' + this.score);
                this.wrongNum.play();
                break;
        }

    }

    GameTimer() {
        this.timeCount -= 1;
        this.timeText.setText('Time: ' + this.timeCount);
        if (this.timeCount == 0 || this.score == 6 ) {
            this.scene.sleep('sceneB');
            this.scene.start('endGame', {score: this.score});
        }
    }

    update() {

    }
}
