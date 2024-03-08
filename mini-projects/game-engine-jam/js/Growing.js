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

        // Creates text with all their different sizes and colours.
        this.add.text(150, 250, `Everything will be just fine.\n You are doing great finally thinking about yourself and what you want.\n I know it is hard, but to me,\n you are the bravest individual I have ever met.\n`, { fontFamily: `Lora`, fontSize: 30, color: `#ff7171` });
        this.add.text(220, 320, `(Press the Spacebar Key to Go Back to Title)`, { fontFamily: `Lora`, fontSize: 20, color: `#000000` });

        // Allows the spacebar to call the next scene to start the program.
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceBar.on(`down`, () => {
            this.scene.start(`title`);
        })
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}