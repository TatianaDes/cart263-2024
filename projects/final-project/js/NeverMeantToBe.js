//Credit to my Professor, Pippin Barr, and TA, Mathilde Davan, for helping me with all the code that I have written step by step as I was struggling.
class NeverMeantToBe extends Phaser.Scene {
    // Creates the key name that will be used to call this class.
    constructor() {
        super({
            key: 'neverMeantToBe'
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
        // Creates the createStartOverButton() function.
        this.createStartOverButton();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }

    // Calls the createBackgroundColor() function from create to create the background color.
    createBackgroundColor() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#854444');
    }

    // Calls the createText() function from create to create the text.
    createText() {
        // Creates text with all their different sizes and colours.
        this.add.text(180, 80, 'That\'s right, I remember now...\nI remember all those things you said,\nand they way you treated me in the end.\nHow is it that all this time I kept trying\nto convince myself that you were a great person\nand that I should not have left,\nwhen in reality we were never\nmeant to be like I thought we were.\nBecause if we were,\nyou would have looked into my eyes\non that last day and said\n"I am ready to listen."\n', { fontFamily: 'Lora', fontSize: 25, color: '#b2b2b2' });
    }

    // Credit to Phaser 3 examples for showing me how to make this button be able to change tint as the cursor hovers over it.
    // Calls the createContinueButton() function from create to create the button.
    createContinueButton() {
        // Creates the button sprite .
        const continueButton = this.add.image(0, 0, 'continueG');

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const containerContinue = this.add.container(300, 530, [continueButton]);
        containerContinue.setSize(continueButton.width, continueButton.height);
        containerContinue.setInteractive();

        containerContinue.on('pointerover', () => {
            continueButton.setTint(0xd4d4d4);
        });

        containerContinue.on('pointerout', () => {
            continueButton.clearTint();
        });

        // Changes the scene from NeverMeantToBe to Acceptance by clicking on the button.
        containerContinue.on('pointerdown', () => {
            this.scene.start('acceptance');
        });
    }

    // Calls the createStartOverButton() function from create to create the button.
    createStartOverButton() {
        // Creates the button sprite .
        const startOverButton = this.add.image(0, 0, 'start-overR');

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const containerStartOver = this.add.container(460, 530, [startOverButton]);
        containerStartOver.setSize(startOverButton.width, startOverButton.height);
        containerStartOver.setInteractive();

        containerStartOver.on('pointerover', () => {
            startOverButton.setTint(0xe6c3c3);
        });

        containerStartOver.on('pointerout', () => {
            startOverButton.clearTint();
        });

        // Changes the scene from NeverMeantToBe to Title by clicking on the button.
        containerStartOver.on('pointerdown', () => {
            this.scene.start('title');
        });
    }
}