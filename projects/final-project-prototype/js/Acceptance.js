// NEW: Created the Acceptance class and everything in it, thus everything is new.
class Acceptance extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'acceptance'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#f3f3f3');

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'continueG');

        // Creates text with all their different sizes and colours.
        this.add.text(250, 250, 'The Acceptance Level', { fontFamily: 'Lora', fontSize: 35, color: '#959595' });

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 530, [bg]);

        container.setSize(bg.width, bg.height);

        container.setInteractive();

        container.on('pointerover', () => {

            bg.setTint(0xdbdbdb);

        });

        container.on('pointerout', () => {

            bg.clearTint();

        });

        // Changes the scene from the patience to title by clicking on the button.
        container.on('pointerdown', () => {
            this.scene.start('denial');
        });
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}