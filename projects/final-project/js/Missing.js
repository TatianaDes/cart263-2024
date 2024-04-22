//Credit to my Professor, Pippin Barr, and TA, Mathilde Davan, for helping me with all the code that I have written step by step as I was struggling.
class Missing extends Phaser.Scene {
    // Creates the key name that will be used to call this class.
    constructor() {
        super({
            key: 'missing'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates the createBackgroundColor() function.
        this.createBackgroundColor();
        // Creates the createText() function.
        this.createText();
        // Creates the createContinueButton() function.
        this.createContinueButton();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }

    // Calls the createBackgroundColor() function from create to create the background color.
    createBackgroundColor() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#000000');
    }

    // Calls the createText() function from create to create the text.
    createText() {
        // Creates text with all their different sizes and colours.
        this.add.text(200, 150, 'I miss you,\nIt feels like there is this void that\nformed after you left.\nThere is a part of me I left with you,\nand while I miss you,\nI miss that person that was so full of love\nand just happy to exist with you.\nI am the one I am missing.\n', { fontFamily: 'Lora', fontSize: 25, color: '#959595' });
    }

    // Credit to Phaser 3 examples for showing me how to make this button be able to change tint as the cursor hovers over it.
    // Calls the createContinueButton() function from create to create the button.
    createContinueButton() {
        // Creates the button sprite .
        const continueButton = this.add.image(0, 0, 'continueB');

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 530, [continueButton]);
        container.setSize(continueButton.width, continueButton.height);
        container.setInteractive();

        container.on('pointerover', () => {
            continueButton.setTint(0x9c9c9c);
        });

        container.on('pointerout', () => {
            continueButton.clearTint();
        });

        // Changes the scene from Missing to Depression by clicking on the button.
        container.on('pointerdown', () => {
            this.scene.start('depression');
        });
    }
}