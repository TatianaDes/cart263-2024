//Credit to my Professor, Pippin Barr, and TA, Mathilde Davan, for helping me with all the code that I have written step by step as I was struggling.
class Denial extends Phaser.Scene {
    // Creates the key name that will be used to call this class.
    constructor() {
        super({
            key: 'denial'
        })
        // Credit to George Laza, my cousin, for showing me how to use sheepOrentation to start out the sheep in a position.
        // The initial position of the sheep is.
        this.sheepOrientation = 'right';
        // Credit to Mathilde Davan for showing me how to start out my flower stage.
        // The initial stage of the flower starts at the first frame.
        this.flowerStage = 0;
        // Credit to George Laza, my cousin, for showing me how to use new Date().getTime().
        // Creates the variable lastTrees and makes it record the amount of live time it has taken for them to be created.
        this.lastTrees = new Date().getTime();
    }

    // Credit to Pippin Bar for showing me how to use init(data).
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
        // Creates the createFlower() function.
        this.createFlower();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {
        // Updates the treesFalling() function.
        this.treesFalling();
        // Updates the flowerCollide() function.
        this.flowerCollide();
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
        this.cameras.main.setBackgroundColor('#3a3a3a');
    }

    // Calls the createCursorKey() function from create to alllow the cursor keys to work.
    createCursorKey() {
        // Allows for cursor keys to be called and work.
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Calls the createSheep() function from create to create the sheep sprite and its position.
    createSheep() {
        // Credit to Pippin Barr for showing me how to add data to the sheep position.
        // Creates an if statement that if the position of the sheep is already there, then the scene will remember it and save it, but if there is no previous position information it will start at 80 on the x-axis and 450 on the y-axis. 
        if (this.data && this.data.sheep) {
            // Calls the sheep's x position from the last scene and places the sheep at the bottom of the scene.
            this.sheep = this.physics.add.sprite(this.data.sheep.x, this.data.sheep.y, 'sheep');
            this.sheepOrientation = this.data.sheepOrientation;
        } else {
            // Creates the initial position of the sheep when the program first starts.
            this.sheep = this.physics.add.sprite(80, 450, 'sheep');
        }
    }

    // Calls the createCoyosheep() function from create to create the coyosheep sprite and its position.
    createCoyosheep() {
        // Creating the coyosheep sprite and its initial position.
        this.coyosheep = this.physics.add.sprite(650, 70, 'coyosheep');
        // Creating the initial state of the coyosheep to be pacing.
        this.coyosheep.isPacing = true;
        // Setting the velocity for the coyosheep.
        this.coyosheep.setVelocity(-50, 0);
    }

    // Calls the createFlower() function from create to create the flower sprite and its position.
    createFlower() {
        // Creates the flower sprite in the Denial scene.
        this.flower = this.physics.add.sprite(0, 0, 'flower');
        // Making the flower immovable.
        this.flower.setImmovable(true);
        // Making the flower not able to collide with the sheep.
        this.physics.add.collider(this.sheep, this.flower);
        // Puts the flower in random positions each time.
        Phaser.Actions.RandomRectangle([this.flower], { x: 0, y: 0, width: 770, height: 570 });
    }

    // Credit to George Laza, my cousin, for showing me how to use new Date().getTime() to make new trees as time continues.
    // Calls the treesFalling() function from update to create the tree group and its attributes.
    treesFalling() {
        // Creates a constant for the function new Date().getTime() which is a function already understood by JavaScript to get the current live time.
        const currentTime = new Date().getTime();
        // Creates an if statement that measures if the current live time minus the last set of trees that fell are less than 1 second in between each other, then new trees will fall.
        if (currentTime - this.lastTrees > 1000) {
            // Calls the this.lastTrees information from the constructor.
            this.lastTrees = new Date().getTime();
            // Creates the tree image and makes it a group.
            this.tree = this.physics.add.group({
                // Key name being used.
                key: 'tree',
                // How many are being created.
                quantity: 8,
                // How quickly the gravity will make the object fall.
                gravityY: 100,
                // How heavy the object will be when falling and colliding with objects.
                mass: 20
            });
            // Calls the trees into an array called getChildren and makes them stay between the canvas bounds.
            Phaser.Actions.RandomRectangle(this.tree.getChildren(), { x: 0, y: 0, width: 800, height: 50 });

            // Allows for there to be collision between the trees and the sheep as well as the trees with one another.
            this.physics.add.collider(this.sheep, this.tree);
            this.physics.add.collider(this.tree, this.tree);
        }
    }

    // Credit to Mathilde Davan for showing me how to make my animations continue rach time an action occurs.
    // Calls the flowerCollide() function from update to create the flower animation when the spacebar is pressed.
    flowerCollide() {
        // Measures the distance between the sheep and the flower and then allows the spacebar to be pressed for the animation to start.
        const d = Phaser.Math.Distance.Between(this.sheep.x, this.sheep.y, this.flower.x, this.flower.y);
        if (d < 50 && this.input.keyboard.checkDown(this.cursors.space, 300)) {
            const allStages = ['flowerstem', 'flowerbudding', 'flowerblooming', 'flowerbloomed'];
            if (this.flowerStage < allStages.length) {
                this.flower.anims.play(allStages[this.flowerStage]);
                this.flowerStage++;
            }
            // Once the animation is on the last frame, then it starts the CannotBeGone scene.
            else if (this.flowerStage >= allStages.length) {
                this.flowerStage = 0;
                this.scene.start('cannotBeGone');
            }
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

    // Credit to Pippin Barr for showing me how to make the coyote pace and run away.
    // Calls the coyosheepMovement() function from update to create the movement of the coyosheep from pacing to running away.
    coyosheepMovement() {
        // Creates the pacing to the left and its speed as well as when it turns back to the right and its speed.
        if (this.coyosheep.isPacing) {
            if (this.coyosheep.x < 150) {
                this.coyosheep.setVelocity(50, 0);
            }
            else if (this.coyosheep.x > 650) {
                this.coyosheep.setVelocity(-50, 0)
            }
        }

        // Allows for the coyosheep to run away to the right when the sheep gets near.
        let d = Phaser.Math.Distance.Between(this.sheep.x, this.sheep.y, this.coyosheep.x, this.coyosheep.y);
        if (d < 100) {
            this.coyosheep.isPacing = false;
            this.coyosheep.setVelocity(300, 0);
        }

        // Creates the coyosheep animation right and left when the coyosheep moves completely to the left and then completely to the right.
        if (this.coyosheep.body.velocity.x < 0) {
            this.coyosheep.anims.play('coyosheepleft', true);
        }
        else {
            this.coyosheep.anims.play('coyosheepright', true);
        }
    }

    // Credit to Pippin Barr for showing me how to make each new scene start the position of the sheep over.
    // Calls the checkEnding() function from update to create the next scene depending on what direction the sheep goes.
    checkEnding() {
        // Goes to the next level when the sheep goes off the bottom of the canvas.
        if (this.sheep.y > this.game.canvas.height) {
            this.scene.start('anger', {
                // Sets the position of the sheep to wherever it was leaving this scene to the next and vice versa.
                sheepOrientation: this.sheepOrientation,
                sheep: {
                    x: this.sheep.x,
                    y: 50
                }
            });
        }

        // Goes to the next level when the sheep goes off the top of the canvas.
        if (this.sheep.y < 0) {
            this.scene.start('bargaining', {
                // Sets the position of the sheep to wherever it was leaving this scene to the next and vice versa.
                sheepOrientation: this.sheepOrientation,
                sheep: {
                    x: this.sheep.x,
                    y: 550
                }
            });
        }

        // Goes to the next level when the sheep goes off the left of the canvas.
        if (this.sheep.x < 0) {
            this.scene.start('depression', {
                // Sets the position of the sheep to wherever it was leaving this scene to the next and vice versa.
                sheepOrientation: this.sheepOrientation,
                sheep: {
                    x: 50,
                    y: this.sheep.y
                }
            });
        }

        // Goes to the next level when the sheep goes off the right of the canvas.
        if (this.sheep.x > this.game.canvas.width) {
            this.scene.start('acceptance', {
                // Sets the position of the sheep to wherever it was leaving this scene to the next and vice versa.
                sheepOrientation: this.sheepOrientation,
                sheep: {
                    x: 50,
                    y: this.sheep.y
                }
            });
        }
    }
}