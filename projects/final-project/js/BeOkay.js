class BeOkay extends Phaser.Scene {
    // Creates the key name that will be used to call this class.
    constructor() {
        super({
            key: 'beOkay'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates the createBackgroundColor() function.
        this.createBackgroundColor();
        // Creates the createText() function.
        this.createText();
        // Creates the createStartOverButton() function.
        this.createStartOverButton();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }

    // Calls the createBackgroundColor() function from create to create the background color.
    createBackgroundColor() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#7aae9a');
    }

    // Calls the createText() function from create to create the text.
    createText() {
        // Creates text with all their different sizes and colours.
        this.add.text(160, 120, 'I feel like life is just a learning experience,\nyou fall down,\nyou get back up,\nand you learn how to not fall the same way again.\nI feel like each time I fall,\nit gets easier and easier to get back up.\nI look at my friends as they smile back at me\nand I realize that,\nno matter what happens to me,\nI am going to be okay.\n', { fontFamily: 'Lora', fontSize: 25, color: '#2f5b50' });
    }

    // Calls the createStartOverButton() function from create to create the button.
    createStartOverButton() {
        // Creates the button sprite .
        const startOverButton = this.add.image(0, 0, 'start-overG');

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 530, [startOverButton]);
        container.setSize(startOverButton.width, startOverButton.height);
        container.setInteractive();

        container.on('pointerover', () => {
            startOverButton.setTint(0xcfe8e2);
        });

        container.on('pointerout', () => {
            startOverButton.clearTint();
        });

        // Changes the scene from BeOkay to Title by clicking on the button.
        container.on('pointerdown', () => {
            this.scene.start('title');
        });
    }
}