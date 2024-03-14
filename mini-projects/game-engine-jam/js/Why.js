class Why extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `why`
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor(`#2e574f`);

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'start-over2');

        // Creates text with all their different sizes and colours.
        this.add.text(150, 200, `Why do you keep going back?\nYou know there is nothing\ngood there for you anymore.\nWhy hurt yourself over something\nthat happened that was out of your control.\nIt's time to move on.\n`, { fontFamily: `Lora`, fontSize: 30, color: `#9bded1` });

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 530, [bg]);

        container.setSize(bg.width, bg.height);

        container.setInteractive();

        container.on('pointerover', () => {

            bg.setTint(0xd99797);

        });

        container.on('pointerout', () => {

            bg.clearTint();

        });

        container.on(`pointerdown`, () => {
            this.scene.stop('why');
            this.scene.start(`play`);
        });
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}