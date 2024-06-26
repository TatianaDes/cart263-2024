//Credit to my Professor, Pippin Barr, and TA, Mathilde Davan, for helping me with all the code that I have written step by step as I was struggling.
class Acceptance extends Phaser.Scene {
    // Creates the key name that will be used to call this class.
    constructor() {
        super({
            key: 'acceptance'
        });
        // The initial position of the sheep is.
        this.sheepOrientation = 'right';
        // Credit to George Laza, my cousin, for showing me how to make an empty array for the timers.
        // Creates an empty array for the timers.
        this.timers = [];
    }

    // Credit to Pippin Bar for showing me how to use init(data).
    // Creates the concrete data that stores all the previous knowledge of the positions.
    init(data) {
        this.data = data;
    }

    // Credit to George Laza, my cousin, for showing me how to clear the timers.
    // Creates the function to clear timers when it is called and puts the timer back into an empty array.
    clearTimers() {
        this.timers.forEach((timer) => clearTimeout(timer));
        this.timers = [];
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {
        // Creates the createBackgroundColor() function.
        this.createBackgroundColor();
        // Creates the createCursorKey() function.
        this.createCursorKey();
        // Creates the createSound() function.
        this.createSound();
        // Creates the createTrees() function.
        this.createTrees();
        // Creates the createBeerChips() function.
        this.createBeerChips();
        // Creates the createSheep() function.
        this.createSheep();
        // Creates the createCoyosheep() function.
        this.createCoyosheep();
        // Creates the createFriends() function.
        this.createFriends();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {
        // Updates the sheepMovement() function.
        this.sheepMovement();
        // Updates the checkEnding() function.
        this.checkEnding();
    }

    // Calls the createBackgroundColor() function from create to create the background color.
    createBackgroundColor() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#d4d4d4');
    }

    // Calls the createCursorKey() function from create to alllow the cursor keys to work.
    createCursorKey() {
        // Allows for cursor keys to be called and work.
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Credit to the YouTube channel stephendeibler for the "DOTV Coyote Growl HDV 108-43.wmv" sound and BerlinAtmospheres for the "Herd of Sheep SOUND EFFECT - Flocksheep Schafherde Bleating SOUNDS" sound.
    // Calls the createSound() function from create to alllow the cursor keys to work.
    createSound() {
        // Creates the coyoteGrowl sound from the preloaded sound in Boot.
        this.coyoteGrowl = this.sound.add("coyoteGrowl", { loop: false });
        // Creates the sheepHerd sound from the preloaded sound in Boot.
        this.sheepHerd = this.sound.add("sheepHerd", { loop: false });
    }

    // Calls the createTrees() function from create to create the tree group and its attributes.
    createTrees() {
        // Create the tree image and make it a group.
        this.tree = this.physics.add.group({
            // Key name being used.
            key: 'tree',
            // How many are being created.
            quantity: 20,
        });
        // Calls the trees into an array called getChildren and makes them stay between the canvas bounds.
        Phaser.Actions.RandomRectangle(this.tree.getChildren(), { x: 0, y: 0, width: 800, height: 600 });
        // Adds a collider between the trees.
        this.physics.add.collider(this.tree, this.tree);
    }

    // Calls the createBeerChips() function from create to create the beer and chips sprites and its position.
    createBeerChips() {
        // Creates the beer sprite in the Bargaining scene.
        this.beer = this.physics.add.sprite(200, 100, 'beer');
        // Creates the beer sprite in the Bargaining scene.
        this.chips = this.physics.add.sprite(600, 50, 'chips');
    }

    // Credit to Pippin Barr for showing me how to add data to the sheep position.
    // Calls the createSheep() function from create to create the sheep sprite and its position.
    createSheep() {
        // Creates the sheep sprite in Acceptance that now has the same position as the last postion it was in.
        this.sheep = this.physics.add.sprite(50, this.data.sheep.y, 'sheep');
        this.sheepOrientation = this.data.sheepOrientation;

        // Creates a collider between the sheep and the coyosheep.
        this.physics.add.collider(this.sheep, this.coyosheep);
        // Creates a collider between the sheep and the coyote.
        this.physics.add.collider(this.sheep, this.coyote);

        // Creates a bounding boarder that cannot be passed on top of the canvas to give it the ability to have some sides that cannot be passed and others that can.
        const smallBounds = new Phaser.Geom.Rectangle(-100, 0, this.game.canvas.width + 100, this.game.canvas.height);

        // Calls the smallBounds constant to work on the sheep.
        this.sheep.body.customBoundsRectangle = smallBounds;
        // Creates the setCollideWorldBounds function from Phaser 3.
        this.sheep.setCollideWorldBounds(true);
        // Creates the mass of the sheep.
        this.sheep.setMass(5);
    }

    // Calls the createCoyosheep() function from create to create the coyosheep sprite and its position.
    createCoyosheep() {
        // Creating the coyosheep sprite and its initial position.
        this.coyosheep = this.physics.add.sprite(400, 100, 'coyosheep');
        // Making the coyosheep immovable.
        this.coyosheep.setImmovable(true);
        // Creates a collider between the sheep and the coyosheep to then lead to a new function.
        this.physics.add.collider(this.sheep, this.coyosheep, () => {
            // Calls the coyoteMovement() function.
            this.coyoteMovement();
        });
    }

    // Calls the createFriends() function from create to create the friends group and its attributes.
    createFriends() {
        // Create the friends image and make it a group.
        this.friends = this.physics.add.group({
            // Key name being used.
            key: 'friends',
            // How many are being created.
            quantity: 10,
            // Makes the object collide with all the walls and not pass.
            collideWorldBounds: true,
            // Makes the object immovable
            immovable: true
        });
        // Calls the friends into an array called getChildren and makes them stay between the canvas bounds.
        Phaser.Actions.RandomRectangle(this.friends.getChildren(), { x: 200, y: 400, width: 400, height: 400 });

        // Credit to George Laza, my cousin, for showing me how to make a timer to start an ending.
        // Allows for there to be collision between the sheep and the friends to lead to an ending.
        this.physics.add.collider(this.sheep, this.friends, () => {
            // Plays the sheepHerd sound.
            this.sheepHerd.play();
            //Starts the beOkay scene once three seconds pass.
            this.timers.push(setTimeout(() => {
                // The timer is cleared.
                this.clearTimers();
                this.scene.start('beOkay');
            }, 3000));
        });
    }

    // Calls the sheepMovement() function from update to create the movement of the sheep with the arrow keys.
    sheepMovement() {
        // Creating a constant for all cursor left, right, up, and down calls from Phaser 3.
        const { left, right, up, down } = this.cursors;

        // Create variable for all x and y velocities.
        let velocityX = 0;
        let velocityY = 0;

        // Create all the velocities for the left, right, up, and down keys being pressed.
        if (left.isDown) {
            velocityX = -150;
        }
        else if (right.isDown) {
            velocityX = 150;
        }

        if (up.isDown) {
            velocityY = -150;
        }
        else if (down.isDown) {
            velocityY = 150;
        }

        // Makes it so that if all the velocities on the x-axis are less than zero the left animation plays.
        if (velocityX < 0) {
            this.sheepOrientation = 'left';
            this.sheep.anims.play('sheepleft', true);
        }
        // Makes it so that if all the velocities on the x-axis are more than zero the right animation plays.
        else if (velocityX > 0) {
            this.sheepOrientation = 'right';
            this.sheep.anims.play('sheepright', true);
        }
        // Makes it so that if the sheep is moving on the y-axis the sheepOrientation will be remembered from where it was last and face that direction.
        else if (velocityY !== 0) {
            this.sheep.anims.play('sheep' + this.sheepOrientation, true);
        }
        // Makes it so that if nothing that was said above is happening, then plays the animation for both the idle-left and idle-right.
        else {
            this.sheep.anims.play('sheepidle-' + this.sheepOrientation, true);
        }

        // Sets it so the velocity is towards the sheep sprite.
        this.sheep.setVelocity(velocityX, velocityY);
    }

    // Calls the coyoteMovement() function from update to create the movement of the coyote from standing still to running away.
    coyoteMovement() {
        // Destroys the coyosheep.
        this.coyosheep.destroy();
        // Creates the coyote sprite.
        this.coyote = this.physics.add.sprite(400, 100, 'coyote');
        // Making the coyote immovable.
        this.coyote.setImmovable(true);
        // Adds a collider between the sheep and the coyote.
        this.physics.add.collider(this.sheep, this.coyote);
        // Plays the coyoteGrowl sound.
        this.coyoteGrowl.play();
        // Move the sheep 50 pixels down when the interaction occurs.
        this.sheep.body.y += 50;
        // Credit to George Laza, my cousin, for showing me how to create a timer for when the action of the coyote should occur.
        // Sets a timer for three seconds of waiting before the coyote turns and runs right.
        this.timers.push(setTimeout(() => {
            this.coyote.setVelocity(300, 0);
            this.coyote.anims.play('coyoteright', true);
        }, 3000));
        // Credit to George Laza, my cousin, for showing me how to create an ending after a timer is finished.
        // After five seconds the ending scene NeverMeantToBe plays.
        this.timers.push(setTimeout(() => {
            // The timer is cleared.
            this.clearTimers();
            this.scene.start('neverMeantToBe');
        }, 5000));
    }

    // Calls the checkEnding() function from update to go back to the Denial scene if the sheep goes left.
    checkEnding() {
        // Creates the ending for when the sheep goes off the canvas.
        if (this.sheep.x < 0) {
            // The timer is cleared.
            this.clearTimers();
            // Calls the previous scene but also sets the position of the sheep to where it left off in this scene.
            this.scene.start('denial', {
                sheepOrientation: this.sheepOrientation,
                sheep: {
                    x: 750,
                    y: this.sheep.y,
                }
            });
        }
    }
}