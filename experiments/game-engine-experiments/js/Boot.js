class Boot extends Phaser.Scene {

    constructor() {
        super({
            key: `boot`
        });
    }

    preload() {
        this.load.image(`wall`, `assets/images/wall.png`);
        this.load.spritesheet(`avatar`, 'assets/images/avatar.png', {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 6
        });

        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    create() {
        let style = {
            fontFamily: `sans-serif`,
            fontSize: `40px`,
            color: `#ffffff`
        };
        let loadingString = `Loading...`;
        this.add.text(100, 100, loadingString, style);
    }

    update() {

    }
}