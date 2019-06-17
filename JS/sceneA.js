class sceneA extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneA' });
    } //constracter
    preload() {
        //this.load.image('nine12', 'assets/Number2nd_9.png');

    }

    create() {
        var graphics;

        this.add.text(200, 120, 'Number Game!', { font: '32px Courier', color: '000000' });
        this.add.text(200, 170, 'Find Mutiplication of 3', { font: '22px Courier', color: '000000' });
        this.add.text(200, 200, 'You have 5 sec to complete!', { font: '32px Courier', color: '000000' });
        graphics = this.add.graphics();
        graphics.fillStyle(0xffd900, 1)
        graphics.fillRect(200, 270, 450, 100);
        this.add.text(200, 300, 'PUSH ENTER KEY TO START', { font: '32px Courier', color: '000000' });

        //enter key to start game scene
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


    }

    update() {
        //updating enter key
        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.cameras.main.shake(500);
            this.scene.start('sceneB');
        }
    }
}
