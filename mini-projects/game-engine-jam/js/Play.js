class Play extends Phaser.Scene {
    // Creates the key term that will be used to call this class.
    constructor() {
        super({
            key: `play`
        })
    }

    // Creates a function that allows all code that wants to be done immediately on the program.
    create() {
        // Creates background colour.
        this.cameras.main.setBackgroundColor("#244f28");

        this.sheep = this.physics.add.sprite(200, 200, `sheep`);
        // this.sheep.setScale(2);
        this.coyote = this.physics.add.sprite(400, 200, `coyote`);
        // this.coyote.setScale(2);

        this.createAnimations();

        this.sheep.play(`sheep-idle`);
        this.sheep.setCollideWorldBounds(true);
        this.coyote.play(`coyote-idle`);
        this.coyote.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {
        const { left, right, up } = this.cursors;

        if (left.isDown) {
            this.sheep.setVelocityX(-160);

            this.sheep.anims.play('left', true);
        }
        else if (right.isDown) {
            this.sheep.setVelocityX(160);

            this.sheep.anims.play('right', true);
        }
        else {
            this.sheep.setVelocityX(0);

            this.sheep.anims.play('sheep-idle');
        }

        if (up.isDown && this.sheep.body.touching.down) {
            this.sheep.setVelocityY(-330);
        }
    }

    // this.sheep.setVelocity(0);

    // if (this.cursors.left.isDown) {
    //     this.sheep.setVelocityX(-300);
    // }
    // else if (this.cursors.right.isDown) {
    //     this.sheep.setVelocityX(300);
    // }

    // if (this.cursors.up.isDown) {
    //     this.sheep.setVelocityY(-300);
    // }
    // else if (this.cursors.down.isDown) {
    //     this.sheep.setVelocityY(300);
    // }

    // if (this.sheep.body.velocity.x !== 0 || this.sheep.body.velocity.y !== 0) {
    //     this.sheep.play(`sheep-moving`, true);
    // }
    // else {
    //     this.sheep.play(`sheep-idle`, true);
    // }


    createAnimations() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('sheep', {
                start: 0,
                end: 4
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: `sheep-idle`,
            frames: this.anims.generateFrameNumbers(`sheep`, {
                start: 0,
                end: 0
            }),
            frameRate: 24,
            repeat: 0
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('sheep', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: `coyote-moving`,
            frames: this.anims.generateFrameNumbers(`coyote`, {
                start: 0,
                end: 4
            }),
            frameRate: 24,
            repeat: -1
        });

        this.anims.create({
            key: `coyote-idle`,
            frames: this.anims.generateFrameNumbers(`coyote`, {
                start: 0,
                end: 0
            }),
            frameRate: 24,
            repeat: 0
        });
    }
}