class MaybeIf extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'maybeIf'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#ad6513');

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'continueB');

        // Creates text with all their different sizes and colours.
        this.add.text(230, 150, 'Maybe if I was more accepting\nof your bad habits,\nor maybe if I closed my mouth\nand let you keep\ndoing what you were doing\nwithout interfeering\neven when it did really hurt me,\nmaybe things would not have\nended the way they did or at all.\n', { fontFamily: 'Lora', fontSize: 25, color: '#502a00' });

        // Makes a conatiner around it that allows for it to change colour when the cursor hovers over it.
        const container = this.add.container(400, 530, [bg]);
        container.setSize(bg.width, bg.height);
        container.setInteractive();

        container.on('pointerover', () => {
            bg.setTint(0xfce2c5);
        });

        container.on('pointerout', () => {
            bg.clearTint();
        });

        // Changes the scene from ForNothing to Anger by clicking on the button.
        container.on('pointerdown', () => {
            this.scene.start('bargaining');
        });
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}