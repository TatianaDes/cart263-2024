// NEW: Created the Anger class and everything in it.
class Anger extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `anger`
        });

        // What the frames changes start out as.
        this.frameCounter = 0;
        // The initial position of the sheep is.
        this.sheepOrientation = `right`;
    }

    // Creates the concrete data that stores all the previous knowledge of the positions.
    init(data) {
        this.data = data;
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor(`#581b1b`);

        // Creates the sheep sprite in the Anger that now has the same position as the last postion it was in.
        this.sheep = this.physics.add.sprite(this.data.sheep.x, 50, `sheep`);
        // Calls the sheepBoarder() function.
        this.sheepBoarder();

        // NEW: Creating the coyosheep sprite and its initial position.
        this.coyosheep = this.physics.add.sprite(785, 585, `coyosheep`);
        this.coyosheep.setImmovable(true);

        // Creates the butterfly sprite in the Anger scene.
        this.butterfly = this.physics.add.sprite(100, 100, `butterfly`);

        // Creates the jar sprite in the Anger scene.
        this.jar = this.physics.add.sprite(400, 500, `jar`);
        this.jar.setAlpha(0.6);

        // Creates the scale sprite in the Anger scene.
        this.scale = this.physics.add.sprite(100, 350, `scale`);
        this.scale.setAlpha(0.6);

        // Creates the owl sprite in the Anger scene.
        this.owl = this.physics.add.sprite(700, 250, `owl`);
        this.owl.setAlpha(0.6);

        // Calls the butterflyInteraction() function. 
        this.butterflyInteraction();

        // Allows for cursor keys to be called and work.
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {
        // Calls the sheepMovement() function.
        this.sheepMovement();

        // Calls the coyosheepMovement() function.
        this.coyosheepMovement();

        // Calls the checkEnding() function.
        this.checkEnding();
    }

    // Creates the function that calls the canvas boarder to work on the sheep.
    sheepBoarder() {
        // Creates a bounding boarder that cannot be passed on top of the canvas to give it the ability to have some sides that cannot be passed and other that can.
        const smallBounds = new Phaser.Geom.Rectangle(0, -100, this.game.canvas.width, this.game.canvas.height + 100);

        // Calls the smallBounds constant to work on the sheep.
        this.sheep.body.customBoundsRectangle = smallBounds;
        // Creates the setCollideWorldBounds function from Phaser 3.
        this.sheep.setCollideWorldBounds(true);
    }

    // Creates the function that allows all the interactions and movements of the butterfly.
    butterflyInteraction() {
        // Adding a collider between the sheep and the butterfly.
        this.physics.add.collider(this.sheep, this.butterfly);
        // Adding a collider between the coyosheep and the butterfly.
        this.physics.add.collider(this.coyosheep, this.butterfly);
        // Adding a bounce to the butterfly.
        this.butterfly.setBounce(0.7);
        // Adding a drag to the butterfly.
        this.butterfly.setDrag(1);
        // Creates the wall boundary for the butterfly.
        this.butterfly.setCollideWorldBounds(true);
        // Adding velocity to the butterfly movement.
        this.butterfly.setVelocity(Phaser.Math.Between(-800, 800), 0);
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

        // Makes it so that if all the velocities on the x axis are less than zero the left animation Denials.
        if (velocityX < 0) {
            this.sheepOrientation = `left`;
            this.sheep.anims.play(`sheepleft`, true);
        }
        // Makes it so that if all the velocities on the x axis are more than zero the right animation Denials.
        else if (velocityX > 0) {
            this.sheepOrientation = `right`;
            this.sheep.anims.play(`sheepright`, true);
        }
        // Makes it so that if the sheep is moving on the y axis the sheepOrientation will be remembered from where it was last and face that direction.
        else if (velocityY !== 0) {
            this.sheep.anims.play(`sheep` + this.sheepOrientation, true);
        }
        // Makes it so that if nothing that was said above is happening, then Denial the animation for both the idle-left and idle-right.
        else {
            this.sheep.anims.play(`sheepidle-` + this.sheepOrientation);
        }

        // Sets it so the velocity is towards the sheep sprite.
        this.sheep.setVelocity(velocityX, velocityY);
    }

    // Creates all the animation code and movement of the coyosheep.
    coyosheepMovement() {
        // NEW: Allows for the coyosheep to run away to the right when the sheep gets near.
        let d = Phaser.Math.Distance.Between(this.sheep.x, this.sheep.y, this.coyosheep.x, this.coyosheep.y);
        if (d < 100) {
            this.coyosheep.isPacing = false;
            this.coyosheep.setVelocity(300, 0);
            this.scene.start(`forNothing`);
        }

        // Creates the coyosheep animation right and left when the coyosheep moves completely to the left and then completely to the right.
        // this.coyosheep.anims.play(this.coyosheep.body.velocity.x < 0 ? `left` : `right`, true); <- This code is a simplified version of the code bellow.
        if (this.coyosheep.body.velocity.x > 0) {
            this.coyosheep.anims.play(`coyosheepright`, true);
        }
    }

    // Creates the ending for patience.
    checkEnding() {
        // Creates the ending for when the sheep goes off the canvas.
        if (this.sheep.y < 0) {
            this.scene.start(`Denial`);
            // Calls the previous scene but also sets the initial position of the sheep.
            // this.scene.start(`Denial`, {
            //     sheep: {
            //         x: this.sheep.x,
            //         y: this.sheep.y
            //     }
            // });
        }
    }
}





