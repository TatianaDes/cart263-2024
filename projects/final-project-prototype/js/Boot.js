class Boot extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'boot'
        });
    }

    // Loads all the images I would like to use.
    preload() {
        // Loads the tree in the Denial scene.
        this.load.image('tree', 'assets/images/tree.png');

        // Loads the sheep sprite.
        this.load.spritesheet('sheep', 'assets/images/sheep.png', {
            frameWidth: 38,
            frameHeight: 30,
            endFrame: 7,
        });
        // NEW: Loads the coyosheep to have the same mechanics as the coyote because they are the same.
        this.load.spritesheet('coyosheep', 'assets/images/coyosheep.png', {
            frameWidth: 38,
            frameHeight: 30,
            endFrame: 7,
        });
        // Loads the coyote sprite.
        this.load.spritesheet('coyote', 'assets/images/coyote.png', {
            frameWidth: 60,
            frameHeight: 36,
            endFrame: 7,
        });

        // Loads the flower in the Denial scene.
        this.load.image('flower', 'assets/images/flower.png');

        // NEW: Creating objects for the Anger scene.
        this.load.image('jar', 'assets/images/jar.png');
        this.load.image('scale', 'assets/images/scale.png');
        this.load.image('owl', 'assets/images/owl.png');
        this.load.image('butterfly', 'assets/images/butterfly.png');

        // Loads the start and start over buttons for the title and ending scenes.
        this.load.image('start', 'assets/images/start.png');
        this.load.image('start-overR', 'assets/images/start-overR.png');
        this.load.image('start-overG', 'assets/images/start-overG.png');
        // NEW: Creating continue buttons instead of start over buttons.
        this.load.image('continueG', 'assets/images/continueG.png');
        this.load.image('continueB', 'assets/images/continueB.png');


        // Calls on the next scene keyname to occur automatically once the program boots up.
        this.load.on('complete', () => {
            this.scene.start('title');
        });
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
        // Creates an array that has all the different parameters needed to create call the actions and for what sprite and which frames to use.
        [
            { name: 'sheep', action: 'idle-left', start: 0, end: 0, repeat: 0 },
            { name: 'sheep', action: 'left', start: 0, end: 3, repeat: -1 },
            { name: 'sheep', action: 'idle-right', start: 4, end: 4, repeat: 0 },
            { name: 'sheep', action: 'right', start: 4, end: 7, repeat: -1 },
            // NEW: Adding the animation frames for the coyosheep.
            { name: 'coyosheep', action: 'left', start: 0, end: 3, repeat: -1 },
            { name: 'coyosheep', action: 'right', start: 4, end: 7, repeat: -1 },
            { name: 'coyote', action: 'left', start: 0, end: 3, repeat: -1 },
            { name: 'coyote', action: 'right', start: 4, end: 7, repeat: -1 },
        ]
            // Rather than having hard coded words here, the assets from above are called in the right places.
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