class Depression extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `depression`
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor(`#1e5f78`);

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'start-overR');

        // Creates text with all their different sizes and colours.
        this.add.text(250, 250, `The Depression Level`, { fontFamily: `Lora`, fontSize: 35, color: `#a0c1c2` });

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 530, [bg]);

        container.setSize(bg.width, bg.height);

        container.setInteractive();

        container.on('pointerover', () => {

            bg.setTint(0xe4d7ba);

        });

        container.on('pointerout', () => {

            bg.clearTint();

        });

        // Changes the scene from the patience to title by clicking on the button.
        container.on(`pointerdown`, () => {
            this.scene.start(`Denial`);
        });
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}