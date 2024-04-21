class MaybeIf extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'maybeIf'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates the createBackgroundColor() function.
        this.createBackgroundColor();
        // Creates the createText() function.
        this.createText();
        // Creates the createStartButton() function.
        this.createContinueButton();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }

    // Calls the createBackgroundColor() function from create to create the background color.
    createBackgroundColor() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#ad6513');
    }

    // Calls the createText() function from create to create the text.
    createText() {
        // Creates text with all their different sizes and colours.
        this.add.text(230, 150, 'Maybe if I was more accepting\nof your bad habits,\nor maybe if I closed my mouth\nand let you keep\ndoing what you were doing\nwithout interfeering\neven when it did really hurt me,\nmaybe things would not have\nended the way they did or at all.\n', { fontFamily: 'Lora', fontSize: 25, color: '#502a00' });
    }

    // Calls the createContinueButton() function from create to create the button.
    createContinueButton() {
        // Creates the button sprite .
        const continueButton = this.add.image(0, 0, 'continueB');

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 530, [continueButton]);
        container.setSize(continueButton.width, continueButton.height);
        container.setInteractive();

        container.on('pointerover', () => {
            continueButton.setTint(0xfce2c5);
        });

        container.on('pointerout', () => {
            continueButton.clearTint();
        });

        // Changes the scene from ForNothing to Anger by clicking on the button.
        container.on('pointerdown', () => {
            this.scene.start('bargaining');
        });
    }
}