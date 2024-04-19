class Depression extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'depression'
        });
        // The initial position of the sheep is.
        this.sheepOrientation = 'right';
        this.coyosheepOrientation = 'right';
        this.binStage = 0;

        // Creates the variable lastTrees and makes it record the amount of live time it has taken for them to be created.
        this.lastRain = new Date().getTime();
    }

    // Creates the concrete data that stores all the previous knowledge of the positions.
    init(data) {
        this.data = data;
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#1e5f78');

        // Creating the coyosheep sprite and its initial position.
        this.coyosheep = this.physics.add.sprite(80, 180, 'coyosheep');

        // Creates the bed sprite in the Depression scene.
        this.bed = this.physics.add.sprite(110, 200, 'bed');

        // Creates the sheep sprite in Anger that now has the same position as the last postion it was in.
        this.sheep = this.physics.add.sprite(750, this.data.sheep.y, 'sheep');
        this.sheepOrientation = this.data.sheepOrientation;
        // Calls the sheepBoarder() function.
        this.sheepBoarder();

        // Creating the bin sprite and its initial position.
        this.bin = this.physics.add.sprite(50, 250, 'bin');

        // Calls the tissueLaying() function.
        this.tissueLaying();

        // Calls the tissueActivity() function.
        this.tissueActivity();

        // Calls the binAnimation() function.
        this.binAnimation();

        // Allows for cursor keys to be called and work.
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {
        // Calls the sheepMovement() function.
        this.sheepMovement();

        // Calls the treesFalling() function.
        this.rainFalling();

        // Calls the coyosheepMovement() function.
        this.coyosheepMovement();

        // Calls the checkEnding() function.
        this.checkEnding();
    }

    // Creates the trees that fall as the time update and changes and collides with the sheep.
    tissueLaying() {
        // Create the tree image and make it a group.
        this.tissue = this.physics.add.group({
            // Key term being used.
            key: 'tissue',
            // How many are being created.
            quantity: 8,
            // How heavy the object will be when falling and colliding with objects.
            mass: 1,

            drag: 100,

            bounceX: 0.5,

            bounceY: 0.5,

            collideWorldBounds: true
        });
        // Calls the trees into an array called getChildren and makes them stay between the canvas bounds.
        Phaser.Actions.RandomRectangle(this.tissue.getChildren(), { x: 50, y: 50, width: 800, height: 200 });

        // Allows for there to be collision between the trees and the sheep as well as the trees with one another.
        this.physics.add.collider(this.sheep, this.tissue);
        this.physics.add.collider(this.tissue, this.tissue);
    }

    // Creates the function that allows all the interactions and movements of the butterfly.
    tissueActivity() {
        // Adding a collider between the sheep and the butterfly.
        this.physics.add.collider(this.tissue, this.bin, (bin, tissue) => {
            let allStages = ['binfilling', 'binfull', 'binoverflow', 'binfloor'];
            if (this.binStage < allStages.length) {
                this.bin.anims.play(allStages[this.binStage]);
                this.binStage++;
                tissue.destroy();
            }
            else if (this.binStage >= allStages.length) {
                this.binStage = 0;
                this.scene.start('missing');
            }
        });
    }

    binAnimation() {
        // Making the bin immovable.
        this.bin.setImmovable(true);
        // Adding a collider between the sheep and the butterfly.
        this.physics.add.collider(this.sheep, this.bin);
    }

    // Creates the function that calls the canvas boarder to work on the sheep.
    sheepBoarder() {
        this.sheep.setMass(5);
        // Creates a bounding boarder that cannot be passed on top of the canvas to give it the ability to have some sides that cannot be passed and others that can.
        const smallBounds = new Phaser.Geom.Rectangle(0, 0, this.game.canvas.width + 100, this.game.canvas.height);

        // Calls the smallBounds constant to work on the sheep.
        this.sheep.body.customBoundsRectangle = smallBounds;
        // Creates the setCollideWorldBounds function from Phaser 3.
        this.sheep.setCollideWorldBounds(true);
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

    // Creates the trees that fall as the time update and changes and collides with the sheep.
    rainFalling() {
        // Creates a constant for the function new Date().getTime() which is a function already understood by JavaScript to get the current live time.
        const currentTime = new Date().getTime();
        // Creates an if statement that measure if the current live time minus the last set of trees that fell are less than 1 second in between each other, then new trees will fall.
        if (currentTime - this.lastRain > 1000) {
            // Calls the this.lastRain information from the constructor.
            this.lastRain = new Date().getTime();
            // Create the tree image and make it a group.
            this.rain = this.physics.add.group({
                // Key term being used.
                key: 'rain',
                // How many are being created.
                quantity: 8,
                // How quickly the gravity will make the object fall.
                gravityY: 100,

                velocityX: -100,

                // How heavy the object will be when falling and colliding with objects.
                mass: 20
            });
            // Calls the trees into an array called getChildren and makes them stay between the canvas bounds.
            Phaser.Actions.RandomRectangle(this.rain.getChildren(), { x: 0, y: 0, width: 1200, height: 50 });

            Phaser.Actions.SetAlpha(this.rain.getChildren(), 0.6);
        }
    }

    // Creates all the animation code and movement of the coyosheep.
    coyosheepMovement() {
        // Allows for the coyosheep to run away to the right when the sheep gets near.
        let d = Phaser.Math.Distance.Between(this.sheep.x, this.sheep.y, this.coyosheep.x, this.coyosheep.y);
        if (d < 70) {
            this.coyosheep.isPacing = false;
            this.coyosheep.setVelocity(300, 0);
        }

        // Creates the coyosheep animation right and left when the coyosheep moves completely to the left and then completely to the right.
        if (this.coyosheep.body.velocity.x === 0) {
            this.coyosheep.anims.play('coyosheepidle-' + this.coyosheepOrientation, true);
        }
        else if (this.coyosheep.body.velocity.x > 0) {
            this.coyosheep.anims.play('coyosheepright', true);
        }
    }

    // Creates the ending for CannotBeGone.
    checkEnding() {
        // Creates the ending for when the sheep goes off the canvas.
        if (this.sheep.x > this.game.canvas.width) {
            // Calls the previous scene but also sets the position of the sheep to where it left off in this scene.
            this.scene.start('denial', {
                sheepOrientation: this.sheepOrientation,
                sheep: {
                    x: 50,
                    y: this.sheep.y
                }
            });
        }
    }
}
