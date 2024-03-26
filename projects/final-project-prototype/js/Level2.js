// NEW: Created the Level2 class
class Level2 extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `level2`
        })
       // What the frames changes start out as.
       this.frameCounter = 0;
       // The initial position of the sheep is.
       this.sheepOrientation = `right`;
   }

   // Creates a function that allows all code that wants to be done immediately on the program.
   create() {
       // Creates background colour.
       this.cameras.main.setBackgroundColor(`#681616`);

       // Creates the sheep sprite in the level1 scene.
       this.sheep = this.physics.add.sprite(80, 50, `sheep`);

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

   // Creates the ending for patience.
   checkEnding() {
      // Creates the ending for when the sheep goes off the canvas.
      if (this.sheep.y < 0) {
        this.scene.start(`level1`);
    }
   }
}





