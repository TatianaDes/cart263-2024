class Title extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `title`
        });
    }

    // Loads all the images I would like to use.
    preload() {
        this.load.image(`start`, `assets/images/start.png`);
        this.load.image(`start-overR`, `assets/images/start-overR.png`);
        this.load.image(`start-overG`, `assets/images/start-overG.png`);
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor(`#7a3131`);

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'start');

        // Makes a conatiner around the button sprite that allows for it to change colour when the cursor hovers over it.
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
        this.add.text(150, 250, `Hard to Move On`, { fontFamily: `Lora`, fontSize: 64, color: `#ff7171` });
        this.add.text(420, 550, `Move with the arrow keys and try to keep moving onward.`, { fontFamily: `Lora`, fontSize: 15, color: `#9e7c7c` });

        // Changes the scene from the title to play by clicking on the button.
        container.on(`pointerdown`, () => {
            this.scene.start(`play`);
        });
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}