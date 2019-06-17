class MathFactsStart extends Phaser.Scene {

    constructor() {
        super({ key: 'MathFactsStart' });
    }

    create() {
        var myFont = '32px Arial',
            rect,
            graphics

        this.input.keyboard.on('keydown_ONE', this.moveOver, this);
        this.input.keyboard.on('keydown_TWO', this.moveOver, this);
        this.input.keyboard.on('keydown_THREE', this.moveOver, this);
        this.input.keyboard.on('keydown_FOUR', this.moveOver, this);


        rect = new Phaser.Geom.Rectangle(25, 25, 750, 550),
        graphics = this.add.graphics({ fillStyle: { color: 0xCCDDEE, transparancy: 0.8 } })
        graphics.fillRectShape(rect);

        // Enter Game Rules
        this.add.text(150, 50, 'Welcome to Math Facts Mastery!', { font: myFont, color: '#0030A7' });
        this.add.text(50, 100, '"Take Mathematics.  How can you shorten the subject?  ' +
            'That stern struggle \nwith the multiplication table, for many ' +
            'people not yet ended in victory, how \ncan you make it less?' +
            '  Square root, as obdurate as a hardwood stump in a \npasture ' +
            'nothing but years of effort can extract it.  You can’t hurry ' +
            'the process.  \nOr pass from arithmetic to algebra; you can’t ' +
            'shoulder your way past quadratic \nequations or ripple through ' +
            'the binomial theorem.  Instead, the other way; your \nfeet are ' +
            'impeded in the tangled growth, your pace slackens, you sink ' +
            'and fall \nsomewhere near the binomial theorem with the calculus ' +
            'in sight on the horizon.  \nSo died, for each of us, still bravely ' +
            'fighting, our mathematical training; except \nfor a set of people ' +
            'called \'mathematicians\'”      Stephen Lealock', { font: '20px Arial', color: '#000', letterSpacing: '.5px' });
        this.add.text(50, 350, 'Demonstrate your victory today! Do 100 math facts in 2 minutes!' +
            '\nOn your keyboard, press:', { font: '24px Arial', color: '#0030A7' });
        this.add.text(140, 420, '1 for Addition,', { font: '24px Arial', color: '#0030A7' });
        this.add.text(140, 450, '2 for Subtraction,', { font: '24px Arial', color: '#0030A7' });
        this.add.text(140, 480, '3 for Multiplication,', { font: '24px Arial', color: '#0030A7' });
        this.add.text(140, 510, '4 for a mix of all three,', { font: '24px Arial', color: '#0030A7' });
    }

    moveOver() {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ONE) {
            this.scene.sleep('MathFactsStart');
            this.scene.start('MathFactsGame', { opNumber: 1 });
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.TWO) {
            this.scene.sleep('MathFactsStart');
            this.scene.start('MathFactsGame', { opNumber: 2 });
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.THREE) {
            this.scene.sleep('MathFactsStart');
            this.scene.start('MathFactsGame', { opNumber: 3 });
        } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.FOUR) {
            this.scene.sleep('MathFactsStart');
            this.scene.start('MathFactsGame', { opNumber: 4 });
        }
    }
}
