class Missing extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'missing'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {

        this.createBackgroundColor();

        this.createText();

        this.createContinueButton();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }

    createBackgroundColor() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#000000');
    }

    createText() {
        // Creates text with all their different sizes and colours.
        this.add.text(200, 150, 'I miss you,\nIt feels like there is this void that\nformed after you left.\nThere is a part of me I left with you,\nand while I miss you,\nI miss that person that was so full of love\nand just happy to exist with you.\nI am the one I am missing.\n', { fontFamily: 'Lora', fontSize: 25, color: '#959595' });
    }

    createContinueButton() {
        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'continueB');

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
            this.scene.start('depression');
        });
    }
}