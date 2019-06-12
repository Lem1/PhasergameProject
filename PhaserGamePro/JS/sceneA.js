class sceneA extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneA' });
    }

    create() {
        var graphics;

        this.add.text(60, 140, 'Are You Smarter Than 5th Grader?', { font: '32px Courier', color: '000000' });
        graphics = this.add.graphics();
        graphics.fillStyle(0xffd900, 1)
        graphics.fillRect(150, 200, 450, 250);
        this.add.text(150, 300, 'PUSH ENTER KEY TO START', { font: '32px Courier', color: '000000' });

    }

    update() {
        this.input.keyboard.on('keydown_ENTER', function (event) {
            //console.log("hello");
            this.scene.start('sceneB');
        }, this);

    }

}
