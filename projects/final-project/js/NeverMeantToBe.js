class NeverMeantToBe extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'neverMeantToBe'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {

        this.createBackgroundColor();

        this.createText();

        this.createContinueButton();

        this.createStartOverButton();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }

    createBackgroundColor() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#854444');
    }

    createText() {
        // Creates text with all their different sizes and colours.
        this.add.text(180, 80, 'That\'s right, I remember now...\nI remember all those things you said,\nand they way you treated me in the end.\nHow is it that all this time I kept trying\nto convince myself that you were a great person\nand that I should not have left,\nwhen in reality we were never\nmeant to be like I thought we were.\nBecause if we were,\nyou would have looked into my eyes\non that last day and said\n"I am ready to listen."\n', { fontFamily: 'Lora', fontSize: 25, color: '#b2b2b2' });
    }

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

        // Changes the scene from Acceptance to Denial by clicking on the button.
        containerContinue.on('pointerdown', () => {
            this.scene.start('acceptance');
        });
    }

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

        // Changes the scene from Acceptance to Denial by clicking on the button.
        containerStartOver.on('pointerdown', () => {
            this.scene.start('title');
        });
    }
}