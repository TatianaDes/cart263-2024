class Growing extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `growing`
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor(`#7a3131`);

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'start');

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 360, [bg]);

        container.setSize(bg.width, bg.height);

        container.setInteractive();

        container.on('pointerover', () => {

            bg.setTint(0xd99797);

        });

        container.on('pointerout', () => {

            bg.clearTint();

        });

        // Creates text with all their different sizes and colours.
        this.add.text(150, 250, `Everything will be just fine.\n You are doing great finally thinking about yourself and what you want.\n I know it is hard, but to me,\n you are the bravest individual I have ever met.\n`, { fontFamily: `Lora`, fontSize: 30, color: `#ff7171` });
        this.add.text(220, 320, `(Press the Spacebar Key to Go Back to Title)`, { fontFamily: `Lora`, fontSize: 20, color: `#000000` });

        container.on(`pointerdown`, () => this.scene.start(`title`));
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}