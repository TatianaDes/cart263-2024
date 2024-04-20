class Acceptance extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'acceptance'
        });
        // The initial position of the sheep is.
        this.sheepOrientation = 'right';
        this.coyosheepOrientation = 'right';
        this.coyoteOrientation = 'right';
    }

    // Creates the concrete data that stores all the previous knowledge of the positions.
    init(data) {
        this.data = data;
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#d4d4d4');

        this.coyoteGrowl = this.sound.add("coyoteGrowl", { loop: false });

        this.sheepHerd = this.sound.add("sheepHerd", { loop: false });

        this.treePlacement();

        // Creates the beer sprite in the Bargaining scene.
        this.beer = this.physics.add.sprite(200, 100, 'beer');

        // Creates the beer sprite in the Bargaining scene.
        this.chips = this.physics.add.sprite(600, 50, 'chips');

        // Creates the sheep sprite in Anger that now has the same position as the last postion it was in.
        this.sheep = this.physics.add.sprite(50, this.data.sheep.y, 'sheep');
        this.sheepOrientation = this.data.sheepOrientation;
        // Calls the sheepBoarder() function.
        this.sheepBoarder();

        // Creating the coyosheep sprite and its initial position.
        this.coyosheep = this.physics.add.sprite(400, 100, 'coyosheep');
        // Making the bin immovable.
        this.coyosheep.setImmovable(true);
        this.physics.add.collider(this.sheep, this.coyosheep, () => {
            // Calls the coyosheepMovement() function.
            this.coyosheepMovement();
        });

        // Calls the friendCrowd() function.
        this.friendCrowd();

        // Allows for cursor keys to be called and work.
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

        // Calls the sheepMovement() function.
        this.sheepMovement();

        // Calls the checkEnding() function.
        this.checkEnding();
    }

    // Creates the function that calls the canvas boarder to work on the sheep.
    sheepBoarder() {

        this.sheep.setMass(5);

        this.physics.add.collider(this.sheep, this.coyosheep);
        this.physics.add.collider(this.sheep, this.coyote);

        // Creates a bounding boarder that cannot be passed on top of the canvas to give it the ability to have some sides that cannot be passed and others that can.
        const smallBounds = new Phaser.Geom.Rectangle(-100, 0, this.game.canvas.width + 100, this.game.canvas.height);

        // Calls the smallBounds constant to work on the sheep.
        this.sheep.body.customBoundsRectangle = smallBounds;
        // Creates the setCollideWorldBounds function from Phaser 3.
        this.sheep.setCollideWorldBounds(true);
    }

    // Creates the trees that fall as the time update and changes and collides with the sheep.
    treePlacement() {
        // Create the tree image and make it a group.
        this.tree = this.physics.add.group({
            // Key term being used.
            key: 'tree',
            // How many are being created.
            quantity: 20,
        });
        // Calls the trees into an array called getChildren and makes them stay between the canvas bounds.
        Phaser.Actions.RandomRectangle(this.tree.getChildren(), { x: 0, y: 0, width: 800, height: 600 });

        this.physics.add.collider(this.tree, this.tree);
    }

    friendCrowd() {
        // Create the tree image and make it a group.
        this.friends = this.physics.add.group({
            // Key term being used.
            key: 'friends',
            // How many are being created.
            quantity: 10,

            collideWorldBounds: true,

            immovable: true
        });
        // Calls the trees into an array called getChildren and makes them stay between the canvas bounds.
        Phaser.Actions.RandomRectangle(this.friends.getChildren(), { x: 200, y: 400, width: 400, height: 400 });

        // Allows for there to be collision between the trees and the sheep as well as the trees with one another.
        this.physics.add.collider(this.sheep, this.friends, () => {
            this.sheepHerd.play();
            setTimeout(() => {
                this.scene.start('beOkay');
            }, 3000);
        });
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

    // Creates all the animation code and movement of the coyosheep.
    coyosheepMovement() {
        this.coyosheep.destroy();
        this.coyote = this.physics.add.sprite(400, 100, 'coyote');
        // Making the bin immovable.
        this.coyote.setImmovable(true);
        this.physics.add.collider(this.sheep, this.coyote);
        this.coyoteGrowl.play();
        this.sheep.body.y += 50;
        setTimeout(() => {
            this.coyote.setVelocity(300, 0);
            this.coyote.anims.play('coyoteright', true);
        }, 3000);
        setTimeout(() => {
            this.scene.start('neverMeantToBe');
        }, 5000);
    }

    // Creates the ending for CannotBeGone.
    checkEnding() {
        // Creates the ending for when the sheep goes off the canvas.
        if (this.sheep.x < 0) {
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