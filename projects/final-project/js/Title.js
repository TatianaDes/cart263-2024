class Title extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'title'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {

        // Creates the createBackgroundColor() function.
        this.createBackgroundColor();

        // Creates the createText() function.
        this.createText();

        // Creates the createStartButton() function.
        this.createStartButton();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }

    // Calls the createBackgroundColor() function from create to create the background color.
    createBackgroundColor() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#7a3131');
    }

    // Calls the createText() function from create to create the text.
    createText() {
        // Creates text with all their different sizes and colours.
        this.add.text(150, 250, 'Hard to Move On', { fontFamily: 'Lora', fontSize: 64, color: '#ff7171' });
        this.add.text(355, 550, 'Move with the arrow keys, and sometimes the spacebar is applicable.\nTurn audio up, and try to keep moving onward.', { fontFamily: 'Lora', fontSize: 15, color: '#9e7c7c' });
    }

    // Calls the createStartButton() function from create to create the button.
    createStartButton() {
        // Creates the button sprite .
        const startButton = this.add.image(0, 0, 'start');

        // Makes a conatiner around the button sprite that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 360, [startButton]);
        container.setSize(startButton.width, startButton.height);
        container.setInteractive();

        container.on('pointerover', () => {
            startButton.setTint(0xd99797);
        });

        container.on('pointerout', () => {
            startButton.clearTint();
        });

        // Changes the scene from the Title to Denial by clicking on the button.
        container.on('pointerdown', () => {
            this.scene.start('denial', {
                sheepOrientation: 'right',
                sheep: {
                    x: 80,
                    y: 450
                }
            });
        });
    }
}