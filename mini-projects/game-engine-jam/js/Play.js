class Play extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `play`
        })
        this.sheepOrientation = `left`;
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor("#20252e");
        // this.outdoors = this.add.image(400, 300, `outdoors`);

        this.sheep = this.physics.add.sprite(80, 550, `sheep`);
        // this.sheep.setScale(2);

        // this.coyote = this.physics.add.sprite(600, 455, `coyote`);
        // // // this.coyote.setScale(2);
        // this.coyote.setCollideWorldBounds(true);

        this.tree = this.physics.add.group({
            // Image key to use
            key: `tree`,
            // How many
            quantity: 120,
            // Gravity (how fast will they start and continue to fall)
            gravityY: 100,
            // Mass (how heavy are they)
            mass: 20
        });

        Phaser.Actions.RandomRectangle(this.tree.getChildren(), this.physics.world.bounds);

        this.physics.add.collider(this.sheep, this.tree);
        this.physics.add.collider(this.tree, this.tree);


        // Calls the createAnimation() function.
        this.createAnimations();

        // Set the initial sheep-idle to the left animation.
        this.sheep.play(`sheep-idle-left`);
        // this.coyote.play(`coyote-idle`);

        // Allows foir cursor keys to be called and work.
        this.cursors = this.input.keyboard.createCursorKeys();

        // Calls the createZigZagPath() function.
        const path = this.createZigZagPath();

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
        const coyote = this.physics.add.sprite(start.x, start.y, 'coyote')
            .setImmovable(true);

        // Creates the physics for the path and how it will be followed by the coyote.
        this.physics.world.on('worldstep', (delta) => {
            t += delta * tSpeedSec;

            // Allowing the path to loop and for the coyote to repeat on the path.
            if (t > 1) {
                t -= 1;
                coyote.body.reset(start.x, start.y);
                graphics.clear();
                path.draw(graphics);
            }

            // Calling back all the different variables.
            path.getTangent(t, coyote.body.velocity);
            coyote.body.velocity.scale(speedSec);
        });
    }

    // Creates the path shape that the coyote will repeatedly follow.
    createZigZagPath() {
        const path = new Phaser.Curves.Path(650, 70);

        path.lineTo(400, 100);

        path.lineTo(650, 70);

        return path;
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {
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
            this.sheep.anims.play(`left`, true);
        }
        // Makes it so that if all the velocities on the x axis are more than zero the left animation plays.
        else if (velocityX > 0) {
            this.sheepOrientation = `right`;
            this.sheep.anims.play(`right`, true);
        }
        // Makes it so that if the sheep is moving on the y axis the sheepOrientation will be remembered from where it was last and face that direction.
        else if (velocityY !== 0) {
            this.sheep.anims.play(this.sheepOrientation, true);
        }
        // Makes it so that if nothing that was said above is happening, then play the animation for both the sheep-idle-left and sheep-idle-right.
        else {
            this.sheep.anims.play(`sheep-idle-${this.sheepOrientation}`);
        }

        // Sets it so the velocity is towards the sheep sprite.
        this.sheep.setVelocity(velocityX, velocityY);
    }

    // Creates the animations for what frames are used of the sprite when it is in movement and when it is idle.
    createAnimations() {
        // Creates the animation for the sheep being idle to the left.
        this.anims.create({
            key: `sheep-idle-left`,
            frames: this.anims.generateFrameNumbers(`sheep`, {
                start: 0,
                end: 0
            }),
            frameRate: 10,
            repeat: 0
        });

        // Creates the animation for when the left arrow key is pressed for the sheep.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('sheep', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        // Creates the animation for the sheep being idle to the right.
        this.anims.create({
            key: `sheep-idle-right`,
            frames: this.anims.generateFrameNumbers(`sheep`, {
                start: 4,
                end: 4
            }),
            frameRate: 10,
            repeat: 0
        });

        // Creates the animation for when the right arrow key is pressed for the sheep.
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('sheep', {
                start: 4,
                end: 7
            }),
            frameRate: 10,
            repeat: -1
        });

        // Animation frames for the coyote.
        this.anims.create({
            key: `coyote-moving`,
            frames: this.anims.generateFrameNumbers(`coyote`, {
                start: 0,
                end: 3
            }),
            frameRate: 24,
            repeat: -1
        });

        this.anims.create({
            key: `coyote-idle`,
            frames: this.anims.generateFrameNumbers(`coyote`, {
                start: 0,
                end: 0
            }),
            frameRate: 24,
            repeat: 0
        });
    }
}