class BeOkay extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'beOkay'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#000000');

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'continueB');


        // Creates the button sprite .
        const bg2 = this.add.image(0, 0, 'start-overG');

        // Creates text with all their different sizes and colours.
        this.add.text(160, 150, 'I feel like life is just a learning experience, you fall down, you get back up, and you learn how to not fall the same way again. I feel like each time I fall, it gets easier and easier to get back up. I look at my friends as they smile back at me and I realize that, no matter what happens to me, I am going to be okay.', { fontFamily: 'Lora', fontSize: 25, color: '#959595' });

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 530, [bg]);
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
            this.scene.start('acceptance');
        });

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container2 = this.add.container(200, 530, [bg2]);
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