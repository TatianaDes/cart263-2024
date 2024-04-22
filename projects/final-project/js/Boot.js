class Boot extends Phaser.Scene {
    // Creates the keyname that will be used to call this class.
    constructor() {
        super({
            key: 'boot'
        });
    }

    // Loads all the images I would like to use.
    preload() {
        // Loads the soundPreload() function.
        this.soundPreload();
        // Loads the mainCharactersPreload() function.
        this.mainCharactersPreload();
        // Loads the denialPreload() function.
        this.denialPreload();
        // Loads the angerPreload() function.
        this.angerPreload();
        // Loads the bargainingPreload() function.
        this.bargainingPreload();
        // Loads the depressionPreload() function.
        this.depressionPreload();
        // Loads the acceptancePreload() function.
        this.acceptancePreload();
        // Loads the buttonPreload() function.
        this.buttonPreload();
        // Loads the changeScenePreload() function.
        this.changeScenePreload();
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {
        // Creates the createAnimation() function.
        this.createAnimations();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }

    // Calls the soundPreload() function from preload to load the audio files I want in my program.
    soundPreload() {
        // Loads the coyotegrowl.mp3 from the sounds folder.
        this.load.audio("coyoteGrowl", ['assets/sounds/coyotegrowl.mp3']);
        // Loads the sheepherd.mp3 from the sounds folder.
        this.load.audio("sheepHerd", ['assets/sounds/sheepherd.mp3']);
    }

    // Calls the mainCharactersPreload() function from preload to load the reoccurring characters I want in my program.
    mainCharactersPreload() {
        // Loads the sheep sprite.
        this.load.spritesheet('sheep', 'assets/images/sheep.png', {
            frameWidth: 38,
            frameHeight: 30,
            endFrame: 7,
        });
        // Loads the coyosheep sprite.
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

    // Calls the denialPreload() function from preload to load the images and sprites for the Denial stage.
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

    // Calls the angerPreload() function from preload to load the images and sprites for the Anger stage.
    angerPreload() {
        // Loads the jar image.
        this.load.image('jar', 'assets/images/jar.png');
        // Loads the scale image.
        this.load.image('scale', 'assets/images/scale.png');
        // Loads the butterfly image.
        this.load.image('butterfly', 'assets/images/butterfly.png');
        // Loads the owl sprite.
        this.load.spritesheet('owl', 'assets/images/owl.png', {
            frameWidth: 58,
            frameHeight: 66,
            endFrame: 1,
        });
    }

    // Calls the bargainingPreload() function from preload to load the images and sprites for the Bargaining stage.
    bargainingPreload() {
        // Loads the beer image.
        this.load.image('beer', 'assets/images/beer.png');
        // Loads the chips image.
        this.load.image('chips', 'assets/images/chips.png');
        // Loads the mirror sprite.
        this.load.spritesheet('mirror', 'assets/images/mirror.png', {
            frameWidth: 165,
            frameHeight: 171,
            endFrame: 4,
        });
    }

    // Calls the depressionPreload() function from preload to load the images and sprites for the Depression stage.
    depressionPreload() {
        // Loads the bed image.
        this.load.image('bed', 'assets/images/bed.png');
        // Loads the rain image.
        this.load.image('rain', 'assets/images/rain.png');
        // Loads the tissue image.
        this.load.image('tissue', 'assets/images/tissue.png');
        // Loads the bin sprite.
        this.load.spritesheet('bin', 'assets/images/bin.png', {
            frameWidth: 70,
            frameHeight: 80,
            endFrame: 4,
        });
    }

    // Calls the acceptancePreload() function from preload to load the sprites for the Acceptance stage.
    acceptancePreload() {
        // Loads the friends sprite.
        this.load.spritesheet('friends', 'assets/images/friends.png', {
            frameWidth: 38,
            frameHeight: 30,
            endFrame: 7,
        });
    }

    // Calls the buttonPreload() function from preload to load the images for the start, statements, and endings.
    buttonPreload() {
        // Loads the start button image.
        this.load.image('start', 'assets/images/start.png');
        // Loads the start-over button in red image.
        this.load.image('start-overR', 'assets/images/start-overR.png');
        // Loads the start-over button in green image.
        this.load.image('start-overG', 'assets/images/start-overG.png');
        // Loads the continue button in green image.
        this.load.image('continueG', 'assets/images/continueG.png');
        // Loads the continue button in blue image.
        this.load.image('continueB', 'assets/images/continueB.png');
    }

    // Calls the changeScenePreload() function from preload to load the images for the changing of scenes from Boot to Title.
    changeScenePreload() {
        // Loads the Title scene automatically once the program boots up.
        this.load.on('complete', () => {
            this.scene.start('title');
        });
    }

    // Calls the createAnimations() function from create to create the animations for what frames are used of the sprite when that keyname is called.
    createAnimations() {
        // Creates an array that has all the different parameters needed to call the actions and for what sprite and which frames to use.
        [
            // Creates the sheep movement with each frame having a different keyname to use.
            { name: 'sheep', action: 'idle-left', start: 0, end: 0, repeat: 0 },
            { name: 'sheep', action: 'left', start: 0, end: 3, repeat: -1 },
            { name: 'sheep', action: 'idle-right', start: 4, end: 4, repeat: 0 },
            { name: 'sheep', action: 'right', start: 4, end: 7, repeat: -1 },

            // Creates the coyosheep movement with each frame having a different keyname to use.
            { name: 'coyosheep', action: 'idle-left', start: 0, end: 0, repeat: 0 },
            { name: 'coyosheep', action: 'left', start: 0, end: 3, repeat: -1 },
            { name: 'coyosheep', action: 'idle-right', start: 4, end: 4, repeat: 0 },
            { name: 'coyosheep', action: 'right', start: 4, end: 7, repeat: -1 },

            // Creates the coyote movement with each frame having a different keyname to use.
            { name: 'coyote', action: 'idle-left', start: 0, end: 0, repeat: 0 },
            { name: 'coyote', action: 'right', start: 4, end: 7, repeat: -1 },

            // Creates the flower bloooming with each frame having a different keyname to use.
            { name: 'flower', action: 'seed', start: 0, end: 0, repeat: 0 },
            { name: 'flower', action: 'stem', start: 1, end: 1, repeat: 0 },
            { name: 'flower', action: 'budding', start: 2, end: 2, repeat: 0 },
            { name: 'flower', action: 'blooming', start: 3, end: 3, repeat: 0 },
            { name: 'flower', action: 'bloomed', start: 4, end: 4, repeat: 0 },

            // Creates the owl's eyes opening and closing with each frame having a different keyname to use.
            { name: 'owl', action: 'close', start: 1, end: 1, repeat: 0 },
            { name: 'owl', action: 'open', start: 0, end: 0, repeat: 0 },

            // Creates the mirror breaking with each frame having a different keyname to use.
            { name: 'mirror', action: 'full', start: 0, end: 0, repeat: 0 },
            { name: 'mirror', action: 'cracked', start: 1, end: 1, repeat: 0 },
            { name: 'mirror', action: 'breaking', start: 2, end: 2, repeat: 0 },
            { name: 'mirror', action: 'falling', start: 3, end: 3, repeat: 0 },
            { name: 'mirror', action: 'broken', start: 4, end: 4, repeat: 0 },

            // Creates the bin filling with each frame having a different keyname to use.
            { name: 'bin', action: 'empty', start: 0, end: 0, repeat: 0 },
            { name: 'bin', action: 'filling', start: 1, end: 1, repeat: 0 },
            { name: 'bin', action: 'full', start: 2, end: 2, repeat: 0 },
            { name: 'bin', action: 'overflow', start: 3, end: 3, repeat: 0 },
            { name: 'bin', action: 'floor', start: 4, end: 4, repeat: 0 }
        ]
            // Rather than having hard coded words here, the assets from above are called in the right places for the name, action, start, end, and repeat of each animation.
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