class Anger extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'anger'
        });
        // The initial position of the sheep is.
        this.sheepOrientation = 'right';
        this.owlTimer = undefined;
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
        // Creates the createJar() function.
        this.createJar();
        // Creates the createScale() function.
        this.createScale();
        // Creates the createOwl() function.
        this.createOwl();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {
        // Updates the sheepShoot() function.
        this.sheepShoot();
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
        this.cameras.main.setBackgroundColor('#581b1b');
    }

    // Calls the createCursorKey() function from create to alllow the cursor keys to work.
    createCursorKey() {
        // Allows for cursor keys to be called and work.
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Calls the createSheep() function from create to create the sheep sprite and its position.
    createSheep() {
        // Creates the sheep sprite in Anger that now has the same position as the last postion it was in.
        this.sheep = this.physics.add.sprite(this.data.sheep.x, this.data.sheep.y, 'sheep');
        this.sheepOrientation = this.data.sheepOrientation;

        // Creates a bounding boarder that cannot be passed on top of the canvas to give it the ability to have some sides that cannot be passed and others that can.
        const smallBounds = new Phaser.Geom.Rectangle(0, -100, this.game.canvas.width, this.game.canvas.height + 100);

        // Calls the smallBounds constant to work on the sheep.
        this.sheep.body.customBoundsRectangle = smallBounds;
        // Creates the setCollideWorldBounds function from Phaser 3.
        this.sheep.setCollideWorldBounds(true);
    }

    // Calls the createCoyosheep() function from create to create the coyosheep sprite and its position.
    createCoyosheep() {
        // Creating the coyosheep sprite and its initial position.
        this.coyosheep = this.physics.add.sprite(785, 585, 'coyosheep');
    }

    // Calls the createJar() function from create to create the jar and its opacity.
    createJar() {
        // Creates the jar sprite in the Anger scene.
        this.jar = this.physics.add.sprite(400, 500, 'jar');
        // Sets the opacity of the image to 0.6.
        this.jar.setAlpha(0.6);
    }

    // Calls the createScale() function from create to create the scale and its opacity.
    createScale() {
        // Creates the scale sprite in the Anger scene.
        this.scale = this.physics.add.sprite(100, 350, 'scale');
        // Sets the opacity of the image to 0.6.
        this.scale.setAlpha(0.6);
    }

    // Calls the createOwl() function from create to create the owl and its opacity.
    createOwl() {
        // Creates the owl sprite in the Anger scene.
        this.owl = this.physics.add.sprite(700, 250, 'owl');
        this.owl.anims.play('owlclose', true);
        // Sets the opacity of the image to 0.6.
        this.owl.setAlpha(0.6);
    }

    // Calls the sheepShoot() function from update to create the sheep being able to shoot butterflies when the spacebar is pressed.
    sheepShoot() {
        if (this.input.keyboard.checkDown(this.cursors.space, 300)) {
            // Creates the butterfly sprite in the Anger scene.
            const butterfly = this.physics.add.sprite(this.sheep.x, this.sheep.y, 'butterfly');
            // Adding velocity to the butterfly movement and making it random each time the scene starts.
            butterfly.setVelocity(Phaser.Math.Between(-500, 500), 500);
            this.owl.anims.play('owlopen', true);
            if (this.owlTimer) {
                clearTimeout(this.owlTimer);
            }
            this.owlTimer = setTimeout(() => {
                this.owl.anims.play('owlclose', true);
                this.owlTimer = undefined;
            }, 2000);
        }
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
            velocityX = -100;
        }
        else if (right.isDown) {
            velocityX = 100;
        }

        if (up.isDown) {
            velocityY = -100;
        }
        else if (down.isDown) {
            velocityY = 100;
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
        if (d < 90) {
            this.coyosheep.isPacing = false;
            this.coyosheep.setVelocity(300, 0);
            this.scene.start('forNothing');
        }

        // Creates the coyosheep animation right and left when the coyosheep moves completely to the left and then completely to the right.
        if (this.coyosheep.body.velocity.x > 0) {
            this.coyosheep.anims.play('coyosheepright', true);
        }
    }

    // Calls the checkEnding() function from update to go back to the Denial scene if the sheep goes up.
    checkEnding() {
        // Creates the ending for when the sheep goes off the canvas.
        if (this.sheep.y < 0) {
            // Calls the previous scene but also sets the position of the sheep to where it left off in this scene.
            this.scene.start('denial', {
                sheepOrientation: this.sheepOrientation,
                sheep: {
                    x: this.sheep.x,
                    y: 550
                }
            });
        }
    }
}





