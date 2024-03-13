class Boot extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `boot`
        });
    }

    // Loads all the images I would like to use.
    preload() {
        // this.load.image(`outdoors`, `assets/images/outdoors.jpg`);

        this.load.image(`tree`, `assets/images/tree.png`);

        this.load.spritesheet(`sheep`, `assets/images/sheep.png`, {
            frameWidth: 38,
            frameHeight: 30,
            endFrame: 7,
        });
        this.load.spritesheet(`coyote`, `assets/images/coyote.png`, {
            frameWidth: 60,
            frameHeight: 36,
            endFrame: 7,
        });

        // Calls on the next scene keyname to occur automatically once the program boots up.
        this.load.on(`complete`, () => {
            this.scene.stop('boot');
            this.scene.start(`play`);
        });

        this.load.image(`flower`, `assets/images/flower.png`);
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {

    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}