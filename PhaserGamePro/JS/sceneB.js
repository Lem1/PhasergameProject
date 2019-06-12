class sceneB extends Phaser.Scene {
    constructor() {
        super({ key: 'sceneB' });
    }
  
    create() {
        this.countx = 60;
        this.county = 50;
        this.x = 80;
        this.y = 140;
        for (var j = 0; j < 5; j++) {

            for (var i = 0; i < 5; i++) {

                this.add.text(this.x = this.x + this.countx, 140, '6', { font: '32px Courier', color: '000000' });
                this.add.text(this.x = this.x + this.countx, 140, '7', { font: '32px Courier', color: '000000' });
                this.add.text(this.x = this.x + this.countx, 140, '8', { font: '32px Courier', color: '000000' });
                this.add.text(this.x = this.x + this.countx, 140, '9', { font: '32px Courier', color: '000000' });

            }


        }

    }
}
