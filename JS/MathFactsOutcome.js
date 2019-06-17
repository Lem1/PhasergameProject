class MathFactsOutcome extends Phaser.Scene {
    constructor() {
        super({ key: 'MathFactsOutcome' });
    }

    init(data) {
        this.numDone = data.completed;
        this.playerTime = data.time;
        this.correct = data.score;
        this.operation = data.operator;
    }

    preload() {
        this.load.audio('applause', 'audio/applause.mp3');
    }

    create() {
        // set listener
        this.input.keyboard.on('keyup_A', this.personalBest, this);

        let seconds = 120 - this.playerTime;
        let minutes = Phaser.Math.FloorTo(seconds / 60);
        seconds = seconds % 60;
        let zero = (seconds < 10) ? ":0" : ":";
        this.gameTime = minutes + zero + seconds;

        let fontStyle = '36px Arial';
        this.add.text(70, 100, "Your time was " + this.gameTime + ".", { font: fontStyle, color: '#000000' })
        this.add.text(70, 175, "You completed " + this.numDone + " math facts.", { font: fontStyle, color: '#000000' })
        this.add.text(70, 250, "Your score was " + this.correct + " correct!", { font: fontStyle, color: '#000000' })
        let outcome = "";
        if (this.playerTime < 120 && this.correct >= 95) {
            switch (this.operation) {
                case "1":
                    outcome = "You have mastered Addition!"
                    break;
                case "2":
                    outcome = "You have mastered Subtraction!"
                    break;
                case "3":
                    outcome = "You have mastered Multiplication!"
                    break;
                case "4":
                    outcome = "Congratulations!  You are a Math Facts Master!"
                    break;
            }
            if (outcome != "") {
                this.add.text(70, 350, outcome, { font: fontStyle, color: '#000000' })
                this.applause();
            }

        } else {
            this.add.text(70, 400, "If this score is a personal best, \npress the A key to give yourself a hand!", { font: fontStyle, color: '#000000' })
        }
    }


    applause() {
        // play appause!
        let effect = this.sound.add('applause');
        effect.play({
            name: '',
            start: 0,
            duration: effect.duration,
            config: {
                mute: false,
                volume: 0.1,
                rate: 1,
                loop: false,
                delay: 0
            }
        });
    }


    personalBest() {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.A) {
            this.applause();
        }
    }
}