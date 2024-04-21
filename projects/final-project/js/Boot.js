class Boot extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'boot'
        });
    }

    // Loads all the images I would like to use.
    preload() {

        this.soundPreload();

        this.mainCharactersPreload();

        this.denialPreload();

        this.angerPreload();

        this.bargainingPreload();

        this.depressionPreload();

        this.acceptancePreload();

        this.buttonPreload();

        this.changeScenePreload();
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {
        // Calls the createAnimation() function.
        this.createAnimations();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }

    soundPreload() {
        this.load.audio("coyoteGrowl", ['assets/sounds/coyotegrowl.mp3']);
        this.load.audio("sheepHerd", ['assets/sounds/sheepherd.mp3']);
    }

    mainCharactersPreload() {
        // Loads the sheep sprite.
        this.load.spritesheet('sheep', 'assets/images/sheep.png', {
            frameWidth: 38,
            frameHeight: 30,
            endFrame: 7,
        });
        // Loads the coyosheep to have the same mechanics as the coyote because they are the same.
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
    }

    denialPreload() {
        // Loads the tree in the Denial scene.
        this.load.image('tree', 'assets/images/tree.png');

        // Loads the flower in the Denial scene.
        this.load.spritesheet('flower', 'assets/images/flower.png', {
            frameWidth: 19,
            frameHeight: 30,
            endFrame: 4,
        });
    }

    angerPreload() {
        // Creating objects for the Anger scene.
        this.load.image('jar', 'assets/images/jar.png');
        this.load.image('scale', 'assets/images/scale.png');
        this.load.image('butterfly', 'assets/images/butterfly.png');
        this.load.spritesheet('owl', 'assets/images/owl.png', {
            frameWidth: 58,
            frameHeight: 66,
            endFrame: 1,
        });
    }

    bargainingPreload() {
        // Creating objects for the Bargaining scene.
        this.load.image('beer', 'assets/images/beer.png');
        this.load.image('chips', 'assets/images/chips.png');
        this.load.spritesheet('mirror', 'assets/images/mirror.png', {
            frameWidth: 165,
            frameHeight: 171,
            endFrame: 4,
        });
    }

    depressionPreload() {
        // Creating objects for the Depression scene.
        this.load.image('bed', 'assets/images/bed.png');
        this.load.image('rain', 'assets/images/rain.png');
        this.load.image('tissue', 'assets/images/tissue.png');
        this.load.spritesheet('bin', 'assets/images/bin.png', {
            frameWidth: 70,
            frameHeight: 80,
            endFrame: 4,
        });
    }

    acceptancePreload() {
        // Creating objects for the Acceptance scene.
        // Loads the sheep sprite.
        this.load.spritesheet('friends', 'assets/images/friends.png', {
            frameWidth: 38,
            frameHeight: 30,
            endFrame: 7,
        });
    }

    buttonPreload() {
        // Loads the start and start over buttons for the title and ending scenes.
        this.load.image('start', 'assets/images/start.png');
        this.load.image('start-overR', 'assets/images/start-overR.png');
        this.load.image('start-overG', 'assets/images/start-overG.png');
        // Creating continue buttons instead of start over buttons.
        this.load.image('continueG', 'assets/images/continueG.png');
        this.load.image('continueB', 'assets/images/continueB.png');
    }

    changeScenePreload() {
        // Calls on the next scene keyname to occur automatically once the program boots up.
        this.load.on('complete', () => {
            this.scene.start('title');
        });
    }

    // Creates the animations for what frames are used of the sprite when it is in movement and when it is idle.
    createAnimations() {
        // Creates an array that has all the different parameters needed to create call the actions and for what sprite and which frames to use.
        [
            { name: 'sheep', action: 'idle-left', start: 0, end: 0, repeat: 0 },
            { name: 'sheep', action: 'left', start: 0, end: 3, repeat: -1 },
            { name: 'sheep', action: 'idle-right', start: 4, end: 4, repeat: 0 },
            { name: 'sheep', action: 'right', start: 4, end: 7, repeat: -1 },

            { name: 'coyosheep', action: 'idle-left', start: 0, end: 0, repeat: 0 },
            { name: 'coyosheep', action: 'left', start: 0, end: 3, repeat: -1 },
            { name: 'coyosheep', action: 'idle-right', start: 4, end: 4, repeat: 0 },
            { name: 'coyosheep', action: 'right', start: 4, end: 7, repeat: -1 },

            { name: 'coyote', action: 'idle-left', start: 0, end: 0, repeat: 0 },
            { name: 'coyote', action: 'left', start: 0, end: 3, repeat: -1 },
            { name: 'coyote', action: 'idle-right', start: 4, end: 4, repeat: 0 },
            { name: 'coyote', action: 'right', start: 4, end: 7, repeat: -1 },

            { name: 'flower', action: 'seed', start: 0, end: 0, repeat: 0 },
            { name: 'flower', action: 'stem', start: 1, end: 1, repeat: 0 },
            { name: 'flower', action: 'budding', start: 2, end: 2, repeat: 0 },
            { name: 'flower', action: 'blooming', start: 3, end: 3, repeat: 0 },
            { name: 'flower', action: 'bloomed', start: 4, end: 4, repeat: 0 },

            { name: 'owl', action: 'close', start: 1, end: 1, repeat: 0 },
            { name: 'owl', action: 'open', start: 0, end: 0, repeat: 0 },

            { name: 'mirror', action: 'full', start: 0, end: 0, repeat: 0 },
            { name: 'mirror', action: 'cracked', start: 1, end: 1, repeat: 0 },
            { name: 'mirror', action: 'breaking', start: 2, end: 2, repeat: 0 },
            { name: 'mirror', action: 'falling', start: 3, end: 3, repeat: 0 },
            { name: 'mirror', action: 'broken', start: 4, end: 4, repeat: 0 },

            { name: 'bin', action: 'empty', start: 0, end: 0, repeat: 0 },
            { name: 'bin', action: 'filling', start: 1, end: 1, repeat: 0 },
            { name: 'bin', action: 'full', start: 2, end: 2, repeat: 0 },
            { name: 'bin', action: 'overflow', start: 3, end: 3, repeat: 0 },
            { name: 'bin', action: 'floor', start: 4, end: 4, repeat: 0 },

            { name: 'friends', action: 'idle-left', start: 0, end: 0, repeat: 0 },
            { name: 'friends', action: 'left', start: 0, end: 3, repeat: -1 },
            { name: 'friends', action: 'idle-right', start: 4, end: 4, repeat: 0 },
            { name: 'friends', action: 'right', start: 4, end: 7, repeat: -1 },
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