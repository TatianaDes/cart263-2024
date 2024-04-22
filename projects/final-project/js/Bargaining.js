class Bargaining extends Phaser.Scene {
    // Creates the key name that will be used to call this class.
    constructor() {
        super({
            key: 'bargaining'
        });
        // The initial position of the sheep is.
        this.sheepOrientation = 'right';
        // The initial position of the coyosheep is.
        this.coyosheepOrientation = 'right';
        // The initial stage of the mirror starts at the first frame.
        this.mirrorStage = 0;
    }

    // Creates the concrete data that stores all the previous knowledge of the positions.
    init(data) {
        this.data = data;
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {
        // Creates the createBackgroundColor() function.
        this.createBackgroundColor();
        // Creates the createCursorKey() function.
        this.createCursorKey();
        // Creates the createSheep() function.
        this.createSheep();
        // Creates the createCoyosheep() function.
        this.createCoyosheep();
        // Creates the createMirror() function.
        this.createMirror();
        // Creates the createBeerChips() function.
        this.createBeerChips();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {
        // Updates the sheepMovement() function.
        this.sheepMovement();
        // Updates the coyosheepMovement() function.
        this.coyosheepMovement();
        // Updates the checkEnding() function.
        this.checkEnding();
    }

    // Calls the createBackgroundColor() function from create to create the background color.
    createBackgroundColor() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#033d0c');
    }

    // Calls the createCursorKey() function from create to alllow the cursor keys to work.
    createCursorKey() {
        // Allows for cursor keys to be called and work.
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Calls the createSheep() function from create to create the sheep sprite and its position.
    createSheep() {
        // Creates the sheep sprite in Bargaining that now has the same position as the last postion it was in.
        this.sheep = this.physics.add.sprite(this.data.sheep.x, 550, 'sheep');
        this.sheepOrientation = this.data.sheepOrientation;

        // Creates a bounding boarder that cannot be passed on top of the canvas to give it the ability to have some sides that cannot be passed and others that can.
        const smallBounds = new Phaser.Geom.Rectangle(0, 0, this.game.canvas.width, this.game.canvas.height + 100);

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
        this.coyosheep = this.physics.add.sprite(440, 100, 'coyosheep');
    }

    // Calls the createMirror() function from create to create the mirror sprite and its position.
    createMirror() {
        // Creating the mirror sprite and its initial position.
        this.mirror = this.physics.add.sprite(400, 100, 'mirror');
        // Making the mirror immovable.
        this.mirror.setImmovable(true);
        // Adding a collider between the sheep and the mirror.
        this.physics.add.collider(this.sheep, this.mirror);
    }

    // Calls the createBeerChips() function from create to create the beer and chips sprites and its position.
    createBeerChips() {
        // Creates the beer sprite in the Bargaining scene.
        this.beer = this.physics.add.sprite(200, 400, 'beer');

        // Creates the chips sprite in the Bargaining scene.
        this.chips = this.physics.add.sprite(600, 500, 'chips');

        // Calls the objectActivity() function.
        // When the objectActivity() function is called object 1 is the beer and object 2 are the chips.
        this.objectActivity(this.beer, this.chips);
        // When the objectActivity() function is called object 1 are the chips and object 2 is the beer.
        this.objectActivity(this.chips, this.beer);
    }

    // Calls the objectActivity() function from the createBeerChips function to create the mirror animation when the beer or the chips sprite collide with the mirror.
    objectActivity(object1, object2) {
        // Adding a collider between the sheep and the first object.
        this.physics.add.collider(this.sheep, object1);
        // Adding a collider between the first object and the second object.
        this.physics.add.collider(object1, object2);
        // Adding a collider between the first object and the mirror.
        this.physics.add.collider(object1, this.mirror, (theObject, mirror) => {
            let allStages = ['mirrorcracked', 'mirrorbreaking', 'mirrorfalling', 'mirrorbroken'];
            if (this.mirrorStage < allStages.length) {
                this.mirror.anims.play(`${allStages[this.mirrorStage]}`);
                this.mirrorStage++;
            }
            else if (this.mirrorStage >= allStages.length) {
                this.mirrorStage = 0;
                this.scene.start('maybeIf');
            }
        });
        // Adding a bounce to the first object.
        object1.setBounce(1);
        // Adding mass to the first object.
        object1.setMass(10);
        // Creates the wall boundary for the first object.
        object1.setCollideWorldBounds(true);
        // Adding velocity to the first object movement and making it random each time the scene starts.
        object1.setVelocity(Phaser.Math.Between(5, 300), Phaser.Math.Between(5, 300));
        // Puts the first object in random positions each time.
        Phaser.Actions.RandomRectangle([object1], this.physics.world.bounds);
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

    // Calls the coyosheepMovement() function from update to create the movement of the coyosheep from pacing to running away.
    coyosheepMovement() {
        // Allows for the coyosheep to run away to the right when the sheep gets near.
        let d = Phaser.Math.Distance.Between(this.sheep.x, this.sheep.y, this.coyosheep.x, this.coyosheep.y);
        if (d < 70) {
            this.coyosheep.isPacing = false;
            this.coyosheep.setVelocity(300, 0);
        }

        // Creates the coyosheep animation right and idle when the coyosheep moves completely to the right or is idle.
        if (this.coyosheep.body.velocity.x === 0) {
            this.coyosheep.anims.play('coyosheepidle-' + this.coyosheepOrientation, true);
        }
        else if (this.coyosheep.body.velocity.x > 0) {
            this.coyosheep.anims.play('coyosheepright', true);
        }
    }

    // Calls the checkEnding() function from update to go back to the Denial scene if the sheep goes down.
    checkEnding() {
        // Creates the ending for when the sheep goes off the canvas.
        if (this.sheep.y > this.game.canvas.height) {
            // Calls the previous scene but also sets the position of the sheep to where it left off in this scene.
            this.scene.start('denial', {
                sheepOrientation: this.sheepOrientation,
                sheep: {
                    x: this.sheep.x,
                    y: 50
                }
            });
        }
    }
}

