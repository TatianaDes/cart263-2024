// NEW: Created the ForNothing class and everything in it, thus everything is new.
class ForNothing extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'forNothing'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#979797');

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'continueB');

        // Creates text with all their different sizes and colours.
        this.add.text(100, 150, 'Was this really all for nothing?\nWere my efforts pointless in the end?\nI tried.\nI tried and I tried and I tried, and what did I get from all of this,\nNothing.\nYou could not even be honest with me by the end,\nand you struggled so much to prioritize me,\nlet alone the way you acted like a child when it was all over.\nWhat was the point in trying for you any longer?\n', { fontFamily: 'Lora', fontSize: 25, color: '#cbcd21' });

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 530, [bg]);
        container.setSize(bg.width, bg.height);
        container.setInteractive();

        container.on('pointerover', () => {
            bg.setTint(0xd5eed9);
        });

        container.on('pointerout', () => {
            bg.clearTint();
        });

        // Changes the scene from ForNothing to Anger by clicking on the button.
        container.on('pointerdown', () => {
            this.scene.start('anger');
        });
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}