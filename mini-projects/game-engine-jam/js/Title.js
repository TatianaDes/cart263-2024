class Title extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `title`
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor("#7a3131");

        // Creates text with all their different sizes and colours.
        this.add.text(150, 250, 'Hard to Move On', { fontFamily: 'Lora', fontSize: 64, color: '#ff7171' });
        this.add.text(220, 320, '(Press the Spacebar Key to Continue)', { fontFamily: 'Lora', fontSize: 20, color: '#000000' });
        this.add.text(550, 550, 'Move around with the arrow keys', { fontFamily: 'Lora', fontSize: 15, color: '#9e7c7c' });

        // Allows the spacebar to call the next scene to start the program.
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceBar.on('down', () => {
            this.scene.start(`boot`);
        })
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}