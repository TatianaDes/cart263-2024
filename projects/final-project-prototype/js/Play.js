class Play extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `play`
        })
        // What the frames changes start out as.
        this.frameCounter = 0;
        // The initial position of the sheep is.
        this.sheepOrientation = `right`;
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor(`#20252e`);

        // Creates the sheep sprite in the play scene.
        this.sheep = this.physics.add.sprite(80, 450, `sheep`);

        // Creates the flower sprite in the play scene.
        this.flower = this.physics.add.sprite(0, 0, "flower");
        // Sets the bounce of the flower.
        this.flower.setBounce(0.5, 0.5);
        // Sets how far the flower will drag.
        this.flower.setDrag(50, 50);
        // Puts the flower in random positions each time.
        Phaser.Actions.RandomRectangle([this.flower], this.physics.world.bounds);

        // Allows for cursor keys to be called and work.
        this.cursors = this.input.keyboard.createCursorKeys();

        // Calls the coyoteMovement() function.
        this.coyoteMovement();

        // Calls the flowerCollide() function.
        this.flowerCollide();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {
        // Calls the treesFalling() function.
        this.treesFalling();

        // Calls the sheepMovement() function.
        this.sheepMovement();

        // Calls the checkEnding() function.
        this.checkEnding();
    }

    // Creates all the animation code and movement of the coyote.
    coyoteMovement() {
        // Calls the createCoyotePath() function.
        const path = this.createCoyotePath();
        // Creates the graphics for the path to have it loop.
        const graphics = this.add.graphics();

        // Creates constants for all the different assets of the path and its duration and speed.
        const start = path.getStartPoint();
        const distance = path.getLength();
        const duration = 20000;
        const speed = distance / duration;
        const speedSec = 1000 * speed;
        const tSpeed = 1 / duration;
        const tSpeedSec = 1000 * tSpeed;

        // Creates a variable.
        let t = 0;

        // Creating the coyote sprite and making it immovable.
        this.coyote = this.physics.add.sprite(start.x, start.y, `coyote`)
            .setImmovable(true);

        // Makes the sheep and coyote collide and not go through each other and send that information to the sheepHitCoyote.
        this.physics.add.collider(this.sheep, this.coyote, this.sheepHitCoyote, undefined, this);

        // Creates the physics for the path and how it will be followed by the coyote.
        this.physics.world.on(`worldstep`, (delta) => {
            t += delta * tSpeedSec;

            // Allowing the path to loop and for the coyote to repeat on the path.
            if (t > 1) {
                t -= 1;
                this.coyote.body.reset(start.x, start.y);
                graphics.clear();
                path.draw(graphics);
            }

            // Creates the coyote animation right and left when the coyote lines up with the right time it takes to finish the path.
            // this.coyote.anims.play(t < 0.5 ? `left` : `right`, true); <- This code is a simplified version of the code bellow.
            if (t < 0.5) {
                this.coyote.anims.play(`coyoteleft`, true);
            }
            else {
                this.coyote.anims.play(`coyoteright`, true);
            }

            // Calling back all the different variables.
            path.getTangent(t, this.coyote.body.velocity);
            this.coyote.body.velocity.scale(speedSec);
        });
    }

    // Makes it so when the sheep collides with the coyote it changes the scene to an ending.
    sheepHitCoyote() {
        this.scene.start(`why`);
    }

    // Creates the path shape that the coyote will repeatedly follow.
    createCoyotePath() {
        const path = new Phaser.Curves.Path(650, 70);

        path.lineTo(400, 100);

        path.lineTo(650, 70);

        return path;
    }

    // Creates the trees that fall as the frames update and collides with the sheep.
    treesFalling() {
        this.frameCounter++;
        if ((this.frameCounter % 150) === 0) {
            // Create the tree image and make it a group.
            this.tree = this.physics.add.group({
                // Image key to use.
                key: `tree`,
                // How many.
                quantity: 20,
                // Gravity (how fast will they start and continue to fall).
                gravityY: 100,
                // Mass (how heavy are they).
                mass: 20
            });
            // Calls the trees into an array called getChildren and makes them stay between the canvas bounds.
            Phaser.Actions.RandomRectangle(this.tree.getChildren(), { x: 0, y: 0, width: 800, height: 50 });

            // Allows for there to be collision between the trees and the sheep as well as the trees with one another.
            this.physics.add.collider(this.sheep, this.tree);
            this.physics.add.collider(this.tree, this.tree);
        }
    }

    // Creates the movement of the sheep and its animations.
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

        // Makes it so that if all the velocities on the x axis are less than zero the left animation plays.
        if (velocityX < 0) {
            this.sheepOrientation = `left`;
            this.sheep.anims.play(`sheepleft`, true);
        }
        // Makes it so that if all the velocities on the x axis are more than zero the right animation plays.
        else if (velocityX > 0) {
            this.sheepOrientation = `right`;
            this.sheep.anims.play(`sheepright`, true);
        }
        // Makes it so that if the sheep is moving on the y axis the sheepOrientation will be remembered from where it was last and face that direction.
        else if (velocityY !== 0) {
            this.sheep.anims.play(`sheep` + this.sheepOrientation, true);
        }
        // Makes it so that if nothing that was said above is happening, then play the animation for both the idle-left and idle-right.
        else {
            this.sheep.anims.play(`sheepidle-` + this.sheepOrientation);
        }

        // Sets it so the velocity is towards the sheep sprite.
        this.sheep.setVelocity(velocityX, velocityY);
    }

    // Creates the movement of the flower when the sheep collides with it.
    flowerCollide() {
        this.physics.add.collider(this.sheep, this.flower);
    }

    // Creates the endings for both growing and patience.
    checkEnding() {
        // Creates the ending for when the sheep goes off the canvas.
        if (this.sheep.y > this.game.canvas.height) {
            this.scene.start(`growing`);
        }

        // Creates the ending for when the flower goes off the canvas.
        if (this.flower.x < 0 || this.flower.x > this.game.canvas.width || this.flower.y < 0 || this.flower.y > this.game.canvas.height) {
            this.scene.start(`patience`);
        }
    }
}