class NeverMeantToBe extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'neverMeantToBe'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#854444');

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'continueG');

        // Creates the button sprite .
        const bg2 = this.add.image(0, 0, 'start-overR');

        // Creates text with all their different sizes and colours.
        this.add.text(180, 80, 'That\'s right, I remember now...\nI remember all those things you said,\nand they way you treated me in the end.\nHow is it that all this time I kept trying\nto convince myself that you were a great person\nand that I should not have left,\nwhen in reality we were never\nmeant to be like I thought we were.\nBecause if we were,\nyou would have looked into my eyes\non that last day and said\n"I am ready to listen."\n', { fontFamily: 'Lora', fontSize: 25, color: '#b2b2b2' });

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(300, 530, [bg]);
        container.setSize(bg.width, bg.height);
        container.setInteractive();

        container.on('pointerover', () => {
            bg.setTint(0xd4d4d4);
        });

        container.on('pointerout', () => {
            bg.clearTint();
        });

        // Changes the scene from Acceptance to Denial by clicking on the button.
        container.on('pointerdown', () => {
            this.scene.start('acceptance');
        });

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container2 = this.add.container(460, 530, [bg2]);
        container2.setSize(bg2.width, bg2.height);
        container2.setInteractive();

        container2.on('pointerover', () => {
            bg2.setTint(0xe6c3c3);
        });

        container2.on('pointerout', () => {
            bg2.clearTint();
        });

        // Changes the scene from Acceptance to Denial by clicking on the button.
        container2.on('pointerdown', () => {
            this.scene.start('title');
        });
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}