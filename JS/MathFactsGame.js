// Javascript document

class MathFactsGame extends Phaser.Scene {

    constructor() {
        super({
            key: 'MathFactsGame'
        })
    };

    init(data) {
        this.operator = data.opNumber;
    }

    preload() {
        // sprite
        this.load.spritesheet("dude", "images/dude.png", { frameWidth: 32, frameHeight: 48 });

        // audio

        this.load.audio('onyourmark', 'audio/On_Your_Marks_Get_Set_Go.mp3')
        this.load.audio('correct', 'audio/correct.mp3');
    }

    create() {
        config.backgroundColor = "#000000";
        config.physics.arcade.gravity.y = 0;

        let rect = new Phaser.Geom.Rectangle(0, 0, 800, 600),
        graphics = this.add.graphics({ fillStyle: { color: 0x000000, transparancy: 0.8 } })
        graphics.fillRectShape(rect);

        // class variables
        this.completed = 0;
        this.correct = 0;
        this.a = 0;
        this.b = 0;
        this.opNum = 0;
        this.expected = 0;
        this.row = 0;
        this.column = 0;
        this.moveX = 38.5;
        this.moveY = 34;
        this.velocity = 130;
        this.target = {
            x: 0,
            y: 0
        };
        this.gameStarted = false;
        this.audio;
        this.startingSeconds = 123;

        // create keyboard listeners
        this.input.keyboard.on('keyup_ZERO', this.updateAnswer, this);
        this.input.keyboard.on('keyup_ONE', this.updateAnswer, this);
        this.input.keyboard.on('keyup_TWO', this.updateAnswer, this);
        this.input.keyboard.on('keyup_THREE', this.updateAnswer, this);
        this.input.keyboard.on('keyup_FOUR', this.updateAnswer, this);
        this.input.keyboard.on('keyup_FIVE', this.updateAnswer, this);
        this.input.keyboard.on('keyup_SIX', this.updateAnswer, this);
        this.input.keyboard.on('keyup_SEVEN', this.updateAnswer, this);
        this.input.keyboard.on('keyup_EIGHT', this.updateAnswer, this);
        this.input.keyboard.on('keyup_NINE', this.updateAnswer, this);
        this.input.keyboard.on('keyup_ENTER', this.updateAnswer, this);
        this.input.keyboard.on('keyup_DELETE', this.updateAnswer, this);
        this.input.keyboard.on('keyup_S', this.updateAnswer, this);

        // create the timer
        // create the timer
        this.timedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            args: [],
            loop: true
        }, this);

        // create MathFact array and dislay matrix
        this.mathFactArray = Phaser.Utils.Array.NumberArray(0, 99);
        this.mathFactArray = Phaser.Utils.Array.Shuffle(this.mathFactArray);

        this.matrixDisplay = [
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            [20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
            [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
            [40, 39, 38, 37, 36, 35, 34, 33, 32, 31],
            [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
            [60, 59, 58, 57, 56, 55, 54, 53, 52, 51],
            [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
            [80, 79, 78, 77, 76, 75, 74, 73, 72, 71],
            [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
            [100, 99, 98, 97, 96, 95, 94, 93, 92, 91]
        ]



        // create text fields
        var matrixText = this.add.text(50, 50, '', { font: '16px Courier', color: '#00ff00' });
        matrixText.setText(Phaser.Utils.Array.Matrix.MatrixToString(this.matrixDisplay));

        // math facts text
        this.aText = this.add.text(655, 50, '', { font: '128pt KGTenThousandReasons' });
        this.bText = this.add.text(655, 220, '', { font: '128pt KGTenThousandReasons' });
        this.opText = this.add.text(505, 220, '', { font: '128pt KGTenThousandReasons' });

        // status text
        this.correctText = this.add.text(50, 400, "Correct:  " + this.correct, { font: "20px Arial", fill: "#ffffff" });
        this.timeText = this.add.text(50, 440, 'Time Remaining:  2:03', { font: "20px Arial", fill: "#ffffff" });

        // start tex
        this.startText = this.add.text(50, 500, "Press the 'S' key to begin", { font: "36px Times", fill: "#ff0044", align: "center" });

        // create the player, animations
        this.player = this.physics.add.sprite(65, 50, "dude", 4);
        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", { frames: [0, 1, 2, 3] }),
            frameRate: 10,
            repeat: -1,
            nextAnim: "turn"
        });

        // physics
        this.player.enableBody = true;
        this.player.immovable = false;

        // animation
        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", { frames: [0, 1, 2, 3] }),
            frameRate: 10,
            duration: 750,
            repeat: -1,
            nextAnim: "turn"
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", { frames: [5, 6, 7, 8] }),
            frameRate: 10,
            duration: 750,
            repeat: -1,
            nextAnim: "turn"
        });
    }

    updateTimer() {
        if (this.gameStarted == true) {
            this.startingSeconds--;
            let seconds = this.startingSeconds;

            let minutes = Phaser.Math.FloorTo(seconds / 60);
            seconds = seconds % 60;
            let zero = (seconds < 10) ? ":0" : ":";
            let gameTime = minutes + zero + seconds;

            this.timeText.text = 'Time Remaining:  ' + gameTime;

            if (this.startingSeconds == 0) {
                this.gameOver();
            }
        }
    }

    startGame() {
        // remove start text
        this.startText.destroy();
        this.gameStarted = true;

        // audio correct
        let effect = this.sound.add('onyourmark');
        effect.play( {
            name: '',
            start: 0,
            duration: effect.duration,
            config: {
                mute: false,
                volume: 1,
                rate: 1,
                loop: false,
                delay: 0
            }
        });


        // display first math fact
        this.answer = 0;
        this.gameControl(-1);
    }

    gameControl(actual) {
        // skip first time
        if (actual != -1) {
            // increment comppleted
            this.completed++;

            // determine correct
            if (this.expected === actual) {
                // update correct, text
                this.correct = this.correct + 1;
                this.correctText.text = "Correct:  " + this.correct;

                // audio correct
                let effect = this.sound.add('correct');
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

            // determine game over
            if (this.row == 9 && this.column == 0) {
                // stop seconds
                this.timedEvent.remove();

                // clear the facts
                this.aText.text = "";
                this.bText.text = "";
                this.opText.text = "";

                // game over
                this.gameOver();
            }

            // move sprite
            this.MoveSprite();
        }

        console.log('get math fact');
        // get next mathFact
        let mathFact = Phaser.Utils.Array.SpliceOne(this.mathFactArray, 0);

        // spit into top operands
        this.a = Phaser.Math.FloorTo(mathFact / 10);
        this.b = mathFact % 10;

        // get the operation
        this.opNum = this.operator;
        if (this.operator == 4) {
            this.opNum = Phaser.Math.Between(1, 3);
        }


        // calculate expected answer
        this.CalculateExpected();

        console.log('Render');
        // update display
        this.Render();
    }

    MoveSprite() {
        console.log('move sprite');
        // move sprite
        if (this.row % 2 == true) {
            if (this.column == 0) {
                this.row++;
                this.MoveDownOneRow()
            } else {
                this.column--;
                this.MoveLeftOneColumn();
            }
        } else {
            if (this.column == 9) {
                this.row++;
                this.MoveDownOneRow();
            } else {
                this.column++;
                this.MoveRightOneColumn();
            }
        }
    }

    MoveLeftOneColumn() {
        // move player left one column
        this.target.x = this.player.x - this.moveX;
        this.target.y = this.player.y;
        this.physics.moveToObject(this.player, this.target, this.velocity);
        this.player.anims.play("left", true);
    }

    MoveRightOneColumn() {
        // move player right one column
        this.target.x = this.player.x + this.moveX;
        this.target.y = this.player.y;
        this.physics.moveToObject(this.player, this.target, this.velocity);
        this.player.anims.play("right", true);
    }

    MoveDownOneRow() {
        // move player down one row
        this.target.x = this.player.x;
        this.target.y = this.player.y + this.moveY;
        this.physics.moveToObject(this.player, this.target, this.velocity);
        this.player.anims.play("turn", true);
    }

    CalculateExpected() {
        console.log('CalculateExpected');
        switch (this.opNum) {
            case 1:  // addition
                this.expected = this.a + this.b;
                break;
            case 2:  // subtraction
                // ensure a is larger number
                if (this.b > this.a) {
                    let temp = this.a;
                    this.a = this.b;
                    this.b = temp;
                }
                this.expected = this.a - this.b;
                break
            case 3:
                this.expected = this.a * this.b;
                break;
            default:
                break;
        }
    }

    Render() {
        // update time
        //this.updateTime();

        // display math fact
        this.aText.text = this.a;
        this.bText.text = this.b;

        // diplay the operator
        switch (this.opNum) {
            case 1:
                if (this.opText.text != '+') {
                    this.opText.text = '+'
                }
                break;
            case 2:
                if (this.opText.text != '-') {
                    this.opText.text = '-';
                }
                break;
            case 3:
                if (this.opText.text != 'x') {
                    this.opText.text = 'x';
                }
                break;
            default:
                break;
        }
    }

    gameOver() {
        // move to outcome scene
        this.scene.sleep('MathFactsGame');
        this.scene.start('MathFactsOutcome', { completed: this.completed, time: this.startingSeconds, score: this.correct, operator: this.operator })
    }

    updateAnswer(event) {
        if (this.gameStarted == true) {
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ZERO) {
                this.answer = this.answer * 10;
            } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ONE) {
                this.answer = this.answer * 10 + 1;
            } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.TWO) {
                this.answer = this.answer * 10 + 2;
            } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.THREE) {
                this.answer = this.answer * 10 + 3;
            } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.FOUR) {
                this.answer = this.answer * 10 + 4;
            } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.FIVE) {
                this.answer = this.answer * 10 + 5;
            } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SIX) {
                this.answer = this.answer * 10 + 6;
            } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SEVEN) {
                this.answer = this.answer * 10 + 7;
            } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.EIGHT) {
                this.answer = this.answer * 10 + 8;
            } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.NINE) {
                this.answer = this.answer * 10 + 9;
            } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.DELETE) {
                this.answer = this.answer / 10
                this.answer = Phaser.Math.FloorTo(this.answer);
            } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER) {
                console.log('enter key');
                // save actual
                this.actual = this.answer;
                // reset answer
                this.answer = 0;
                // go to gameControl
                this.gameControl(this.actual);
            }
        }

        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.S) {
            this.startGame();
        }
    }

    update() {
        var distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.target.x, this.target.y);

        if (this.player.body.speed > 0) {
            //  4 is our distance tolerance, i.e. how close the source can get to the target
            //  before it is considered as being there. The faster it moves, the more tolerance is required.
            if (distance < 4) {
                this.player.body.reset(this.target.x, this.target.y);
                this.player.play("turn");
            }
        }
    }
}