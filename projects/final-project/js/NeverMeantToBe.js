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
        this.cameras.main.setBackgroundColor('#000000');

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'continueB');

        // Creates the button sprite .
        const bg2 = this.add.image(0, 0, 'start-overR');

        // Creates text with all their different sizes and colours.
        this.add.text(160, 150, 'That\'s right, I remember now...\nI remember all those things you said,\nand they way you treated me in the end.\nHow is it that all this time I kept trying to convince myself\nthat you were a great person and that I should not have left,\nwhen in reality we were never meant to be like I thought we were.\nBecause if we were,\nyou would have looked into my eyes\non that last day and said\n"I am ready to listen."\n', { fontFamily: 'Lora', fontSize: 25, color: '#959595' });

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(200, 530, [bg]);
        container.setSize(bg.width, bg.height);
        container.setInteractive();

        container.on('pointerover', () => {
            bg.setTint(0x9c9c9c);
        });

        container.on('pointerout', () => {
            bg.clearTint();
        });

        // Changes the scene from Acceptance to Denial by clicking on the button.
        container.on('pointerdown', () => {
            this.scene.start('depression');
        });

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container2 = this.add.container(400, 530, [bg2]);
        container2.setSize(bg2.width, bg2.height);
        container2.setInteractive();

        container2.on('pointerover', () => {
            bg2.setTint(0x9c9c9c);
        });

        container2.on('pointerout', () => {
            bg2.clearTint();
        });

        // Changes the scene from Acceptance to Denial by clicking on the button.
        container2.on('pointerdown', () => {
            this.scene.start('depression');
        });
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}