class Patience extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `patience`
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor(`#c5a17f`);

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'start-overR');

        // Creates text with all their different sizes and colours.
        this.add.text(250, 200, `Take your time,\nfind the little things you\nlike and focus on that.\nYou can do this.\n`, { fontFamily: `Lora`, fontSize: 35, color: `#f0e197` });

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
            this.scene.start(`level1`);
        });
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}