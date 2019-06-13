class sceneB extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneB' });
    }
    preload() {

        this.load.image('six', 'assets/Number6.png');
        this.load.image('seven', 'assets/Number7.png');
        this.load.image('eight', 'assets/Number8.png');
        this.load.image('nine', 'assets/Number9.png');


    }

    create() {

        //this.add.image(200, 250, 'six');
        this.add.image(350, 250, 'seven');
        this.add.image(500, 250, 'eight');
        this.add.image(650, 250, 'nine');

        var animConfig = {
            key: 'numsix',
            frames: this.anims.generateFrameNames('six', { prefix: 'numsix_', end: 15, zeroPad: 4 }),
            repeat: -1,
            showOnstart: true
        };
        this.anims.create(animConfig);
        var gem = this.add.sprite(200, 250, 'six');
        gem.visible = false;
        gem.play(numsix);



    }
}
