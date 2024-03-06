class Boot extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `boot`
        });
    }

    // Loads all the images I would like to use.
    preload() {
        this.load.spritesheet(`avatar`, 'assets/images/sheep.png', {
            frameWidth: 32,
            frameHeight: 32,
            endFrame: 3,
        });

        // Calls on the next scene keyname to occur automatically once the program boots up.
        this.load.on(`complete`, () => {
            this.scene.start(`play`);
        });
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {

    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}