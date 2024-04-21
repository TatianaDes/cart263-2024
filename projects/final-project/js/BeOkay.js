class BeOkay extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'beOkay'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {

        this.createBackgroundColor();

        this.createText();

        this.createStartOverButton();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }

    createBackgroundColor() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#7aae9a');
    }

    createText() {
        // Creates text with all their different sizes and colours.
        this.add.text(160, 120, 'I feel like life is just a learning experience,\nyou fall down,\nyou get back up,\nand you learn how to not fall the same way again.\nI feel like each time I fall,\nit gets easier and easier to get back up.\nI look at my friends as they smile back at me\nand I realize that,\nno matter what happens to me,\nI am going to be okay.\n', { fontFamily: 'Lora', fontSize: 25, color: '#2f5b50' });
    }

    createStartOverButton() {
        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'start-overG');

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 530, [bg]);
        container.setSize(bg.width, bg.height);
        container.setInteractive();

        container.on('pointerover', () => {
            bg.setTint(0xcfe8e2);
        });

        container.on('pointerout', () => {
            bg.clearTint();
        });

        // Changes the scene from Acceptance to Denial by clicking on the button.
        container.on('pointerdown', () => {
            this.scene.start('title');
        });
    }
}