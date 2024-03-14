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
            this.scene.start(`title`);
        });

        this.load.image(`flower`, `assets/images/flower.png`);
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {
        // Calls the createAnimation() function.
        this.createAnimations();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }

    // Creates the animations for what frames are used of the sprite when it is in movement and when it is idle.
    createAnimations() {
        // Creates an array that has all the different assets needed to create call the actions and for what sprite and which frames to use.
        [
            { name: `sheep`, action: `idle-left`, start: 0, end: 0, repeat: 0 },
            { name: `sheep`, action: `left`, start: 0, end: 3, repeat: -1 },
            { name: `sheep`, action: `idle-right`, start: 4, end: 4, repeat: 0 },
            { name: `sheep`, action: `right`, start: 4, end: 7, repeat: -1 },
            { name: `coyote`, action: `left`, start: 0, end: 3, repeat: -1 },
            { name: `coyote`, action: `right`, start: 4, end: 7, repeat: -1 },
        ]
            // Rather than having hard coded words here, the assets from above are called in the right places here.
            .forEach(animation => this.anims.create({
                key: animation.name + animation.action,
                frames: this.anims.generateFrameNumbers(animation.name, {
                    start: animation.start,
                    end: animation.end
                }),
                frameRate: 10,
                repeat: animation.repeat
            }));
    }
}