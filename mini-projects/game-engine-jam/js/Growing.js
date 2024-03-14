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
        this.cameras.main.setBackgroundColor(`#4383a8`);

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'start-over');

        // Creates text with all their different sizes and colours.
        this.add.text(150, 150, `Everything will be just fine.\nYou are doing great finally thinking\nabout yourself and what you want.\nI know it is hard, but to me,\nyou are the bravest individual\nI have ever met.\n`, { fontFamily: `Lora`, fontSize: 35, color: `#aed3e0` });

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 530, [bg]);

        container.setSize(bg.width, bg.height);

        container.setInteractive();

        container.on('pointerover', () => {

            bg.setTint(0xbddbe5);

        });

        container.on('pointerout', () => {

            bg.clearTint();

        });

        container.on(`pointerdown`, () => {
            this.scene.stop('growing');
            this.scene.start(`title`);
        });
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}