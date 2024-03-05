class Title extends Phaser.Scene {
    constructor() {
        super({
            key: `title`
        });
    }

    create() {
        this.cameras.main.setBackgroundColor("#7a3131");
        this.add.text(150, 250, 'Hard to Move On', { fontFamily: 'Lora', fontSize: 64, color: '#ff7171' });
        this.add.text(220, 320, '(Press the Spacebar Key to Continue)', { fontFamily: 'Lora', fontSize: 20, color: '#000000' });
        this.add.text(550, 550, 'Move around with the arrow keys', { fontFamily: 'Lora', fontSize: 15, color: '#9e7c7c' });


        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceBar.on('down', () => {
            this.scene.start(`boot`);
        })
    }

    update() {

    }
}