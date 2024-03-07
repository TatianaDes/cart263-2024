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
        // this.cameras.main.setBackgroundColor("#244f28");
        this.outdoors = this.add.image(400, 300, `outdoors`);

        this.sheep = this.physics.add.sprite(80, 590, `sheep`);
        // this.sheep.setScale(2);

        // this.coyote = this.physics.add.sprite(600, 455, `coyote`);
        // // // this.coyote.setScale(2);
        // this.coyote.setCollideWorldBounds(true);

        this.createAnimations();


        this.sheep.play(`sheep-idle`);
        // this.coyote.play(`coyote-idle`);

        this.cursors = this.input.keyboard.createCursorKeys();



        // const path = this.createLoopPath();
        const path = this.createZigZagPath();

        const graphics = this.add.graphics();

        const start = path.getStartPoint();
        const distance = path.getLength();
        const duration = 20000;
        const speed = distance / duration;
        const speedSec = 1000 * speed;
        const tSpeed = 1 / duration;
        const tSpeedSec = 1000 * tSpeed;

        let t = 0;

        const coyote = this.physics.add.sprite(start.x, start.y, 'coyote')
            .setImmovable(true);

        this.physics.world.on('worldstep', (delta) => {
            t += delta * tSpeedSec;

            if (t > 1) {
                t -= 1;
                coyote.body.reset(start.x, start.y);
                graphics.clear();
                path.draw(graphics);
            }

            path.getTangent(t, coyote.body.velocity);
            coyote.body.velocity.scale(speedSec);
        });
    }

    createLoopPath() {
        const path = new Phaser.Curves.Path(50, 500);

        path.splineTo([164, 446, 274, 542, 412, 457, 522, 541, 664, 464]);
        path.lineTo(700, 300);
        path.lineTo(600, 350);
        path.ellipseTo(200, 100, 100, 250, false, 0);
        path.cubicBezierTo(222, 119, 308, 107, 208, 368);
        path.ellipseTo(60, 60, 0, 360, true);

        return path;
    }

    createZigZagPath() {
        const path = new Phaser.Curves.Path(600, 460);

        path.lineTo(200, 480);

        path.lineTo(600, 460);

        return path;
    }

    // Creates changes for individual frames so that each frame could have its own event.
    update() {
    //     this.sheep.setVelocity(0);

    //     if (this.cursors.left.isDown) {
    //         this.sheep.setVelocityX(-100);
    //     }
    //     else if (this.cursors.right.isDown) {
    //         this.sheep.setVelocityX(100);
    //     }

    //     if (this.cursors.up.isDown) {
    //         this.sheep.setVelocityY(-100);
    //     }
    //     else if (this.cursors.down.isDown) {
    //         this.sheep.setVelocityY(100);
    //     }

    //     if (this.sheep.body.velocity.x !== 0 || this.sheep.body.velocity.y !== 0) {
    //         this.sheep.play(`sheep-moving`, true);
    //     }
    //     else {
    //         this.sheep.play(`sheep-idle`, true);
    //     }


    // }
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

    // Creates the animations for what frames are used of the sprite when it is in movement and when it is idle.
    createAnimations() {
        // Animation frames for the sheep.
        // this.anims.create({
        //     key: `sheep-moving`,
        //     frames: this.anims.generateFrameNumbers(`sheep`, {
        //         start: 0,
        //         end: 3
        //     }),
        //     frameRate: 24,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: `sheep-idle`,
        //     frames: this.anims.generateFrameNumbers(`sheep`, {
        //         start: 0,
        //         end: 0
        //     }),
        //     frameRate: 24,
        //     repeat: 0
        // });

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

        // Animation frames for the coyote.
        this.anims.create({
            key: `coyote-moving`,
            frames: this.anims.generateFrameNumbers(`coyote`, {
                start: 0,
                end: 3
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