// NEW: Changed title of class from Patience to CannotBeGone.
class CannotBeGone extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: 'cannotBeGone'
        });
    }

    // Creates the background colour and all the assets I would like to display on this scene.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor('#c5a17f');

        // Creates the button sprite .
        const bg = this.add.image(0, 0, 'continueB');

        // Creates text with all their different sizes and colours.
        // NEW: Changed the wording to work with the denial stage.
        this.add.text(100, 200, 'Maybe in time we will be friends again.\nIt was not all bad,\nperhaps they will see that and try to make things work again.\nThey cannot be gone from my life forever,\nthat would mean I lose everything.\n', { fontFamily: 'Lora', fontSize: 25, color: '#f0e197' });

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

        // Changes the scene from the CannotBeGone to title by clicking on the button.
        container.on('pointerdown', () => {
            this.scene.start('denial');
        });
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {

    }
}