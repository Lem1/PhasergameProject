class sceneA extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneA' });
    } //constracter 
    /*  preload() {
 
     } */

    create() {
        var graphics;

        this.add.text(60, 120, 'Are You Smarter Than 5th Grader?', { font: '22px Courier', color: '000000' });
        this.add.text(60, 170, 'Welcome to a Number Game!', { font: '22px Courier', color: '000000' });
        graphics = this.add.graphics();
        graphics.fillStyle(0xffd900, 1)
        graphics.fillRect(150, 200, 450, 200);
        this.add.text(150, 300, 'PUSH ENTER KEY TO START', { font: '32px Courier', color: '000000' });

       //enter key to start game scene
        this.enterKey = this.input.keyboard.addKey('ENTER');

    }

    update() {
        //updating enter key
        this.enterKey.on('down', function (event) {

            this.scene.start('sceneB');
        }, this);
    }

}
