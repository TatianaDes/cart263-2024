class Level1 extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `level1`
        })
        // What the frames changes start out as.
        this.frameCounter = 0;
        // The initial position of the sheep is.
        this.sheepOrientation = `right`;
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {
        // Creates background colour.
        // NEW: Changed it to a dark grey 
        this.cameras.main.setBackgroundColor(`#3a3a3a`);

        // Creates the sheep sprite in the level1 scene.
        this.sheep = this.physics.add.sprite(80, 450, `sheep`);

        // NEW: Creating the coyote sprite and its initial position.
        this.coyote = this.physics.add.sprite(650, 70, `coyote`);
        // NEW: Creating the initial state of the coyote to be pacing.
        this.coyote.isPacing = true;
        // NEW: Stting the velocity for the coyote.
        this.coyote.setVelocity(-50, 0);

        // Creates the flower sprite in the level1 scene.
        this.flower = this.physics.add.sprite(0, 0, "flower");
        // Sets the bounce of the flower.
        this.flower.setBounce(0.5, 0.5);
        // Sets how far the flower will drag.
        this.flower.setDrag(50, 50);
        // Puts the flower in random positions each time.
        Phaser.Actions.RandomRectangle([this.flower], this.physics.world.bounds);

        // Allows for cursor keys to be called and work.
        this.cursors = this.input.keyboard.createCursorKeys();

        // Calls the flowerCollide() function.
        this.flowerCollide();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {
        // Calls the coyoteMovement() function.
        this.coyoteMovement();


        // Calls the treesFalling() function.
        this.treesFalling();

        // Calls the sheepMovement() function.
        this.sheepMovement();

        // Calls the checkEnding() function.
        this.checkEnding();
    }

    // Creates all the animation code and movement of the coyote.
    coyoteMovement() {
        // NEW: Creates the pacing to the left and its speed as well as when it turns back to the right and its speed.
        if (this.coyote.isPacing) {
            if (this.coyote.x < 100) {
                this.coyote.setVelocity(50, 0);
            }
            else if (this.coyote.x > 650) {
                this.coyote.setVelocity(-50, 0)
            }
        }

        // NEW: Allows for the coyote to run away to the right when the sheep gets near.
        let d = Phaser.Math.Distance.Between(this.sheep.x, this.sheep.y, this.coyote.x, this.coyote.y);
        if (d < 100) {
            this.coyote.isPacing = false;
            this.coyote.setVelocity(300, 0);
        }

        // Creates the coyote animation right and left when the coyote moves completely to the left and then completely to the right.
        // this.coyote.anims.play(this.coyote.body.velocity.x < 0 ? `left` : `right`, true); <- This code is a simplified version of the code bellow.
        if (this.coyote.body.velocity.x < 0) {
            this.coyote.anims.play(`coyoteleft`, true);
        }
        else {
            this.coyote.anims.play(`coyoteright`, true);
        }
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

        // Makes it so that if all the velocities on the x axis are less than zero the left animation level1s.
        if (velocityX < 0) {
            this.sheepOrientation = `left`;
            this.sheep.anims.play(`sheepleft`, true);
        }
        // Makes it so that if all the velocities on the x axis are more than zero the right animation level1s.
        else if (velocityX > 0) {
            this.sheepOrientation = `right`;
            this.sheep.anims.play(`sheepright`, true);
        }
        // Makes it so that if the sheep is moving on the y axis the sheepOrientation will be remembered from where it was last and face that direction.
        else if (velocityY !== 0) {
            this.sheep.anims.play(`sheep` + this.sheepOrientation, true);
        }
        // Makes it so that if nothing that was said above is happening, then level1 the animation for both the idle-left and idle-right.
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

    // Creates the ending for patience.
    checkEnding() {
        // NEW: Goes to the next level when the sheep goes off the bottom of the canvas.
        if (this.sheep.y > this.game.canvas.height) {
            this.scene.start(`level2`, {
                sheep: {
                    x: this.sheep.x,
                    y: this.sheep.y
                }
            });
        }
        // Creates the ending for when the flower goes off the canvas.
        if (this.flower.x < 0 || this.flower.x > this.game.canvas.width || this.flower.y < 0 || this.flower.y > this.game.canvas.height) {
            this.scene.start(`patience`);
        }
    }
}