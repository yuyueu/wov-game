import constants from '../utils/constants';

import Phaser from 'phaser';
import MatterCollisionPlugin from 'phaser-matter-collision-plugin';

class Level_Base extends Phaser.Scene {
    constructor(key) {
        super({key: key});
    }

    preload() {
        this.load.spritesheet('car', 'assets/volvo.png', { frameWidth: 101, frameHeight: 54 });
        this.load.json('carPhysics', 'assets/json/Volvo.json');

        this.load.spritesheet('flag', 'assets/flags.png', { frameWidth: 78, frameHeight: 131 });

        this.load.image('restart', 'assets/restart.png');

        this.load.image('start-finish-line', 'assets/start-finish-line.png');

        this.load.audio('explosion', 'assets/music/sfx/car-explode.wav');
        this.load.audio('victory', 'assets/music/sfx/car-victory.wav');
    }

    create(scene) {
        if (scene.car === undefined) {
            throw new Error(scene.scene.key + ': Car not defined before calling super.create()');
        }

        if (scene.flag === undefined) {
            throw new Error(scene.scene.key + ': Flag not defined before calling super.create()');
        }

        if (scene.head === undefined) {
            throw new Error(scene.scene.key + ': Head not defined before calling super.create()');
        }

        // Add restart button on upper right corner
        this.restartButton = this.add.image(this.sys.game.config.width - 100, 100, 'restart');
        this.restartButton.setInteractive();
        this.restartButton.setScrollFactor(0);
        this.restartButton.setScale(0.5);

        this.restartButton.on('pointerdown', () => {
            scene.scene.restart();
        });

        if (!this.anims.exists('stationary')) {
            this.anims.create({
                key: 'stationary',
                frames: [{ key: 'car', frame: 0 }],
                frameRate: 10
            });
        }

        if (!this.anims.exists('accelerating')) {
            this.anims.create({
                key: 'accelerating',
                frames: this.anims.generateFrameNumbers('car', { start: 1, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!this.anims.exists('retarding')) {
            this.anims.create({
                key: 'retarding',
                frames: this.anims.generateFrameNumbers('car', { start: 4, end: 6 }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!this.anims.exists('flag-wave')) {
            this.anims.create({
                key: 'flag-wave',
                frames: this.anims.generateFrameNumbers('flag', { start: 0, end: 1 }),
                frameRate: 2,
                repeat: -1
            });
        }

        scene.flag.anims.play('flag-wave', true);

        scene.matterCollision.addOnCollideStart({
            objectA: scene.car,
            objectB: scene.flag,
            callback: () => {
                this.levelComplete(scene);
            },
            context: this
        });

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.instructionText = scene.add.text(scene.sys.game.config.width/2, 500, 'Tap to drive forward', { font: '72px Helvetica', fill: '#000000' });
        this.instructionText.setOrigin(0.5, 0.5);

        this.spacebar.on('down', () => {
            this.instructionText.destroy();
        });

        this.input.on('pointerdown', () => {
            this.instructionText.destroy();
        });

        scene.cameras.main.startFollow(scene.car);
        scene.cameras.main.setBounds(0, 0, 1920 * 5, 1080);
    }

    createCar(scene, x, y) {
        let car = scene.matter.add.sprite(x, y, 'car', null, { shape: scene.cache.json.get('carPhysics').Volvo });
        car.setBounce(0.5);
        car.setMass(100);

        return car;
    }

    createHead(scene) {

        if (scene.car === undefined) {
            throw new Error(scene.scene.key + ': Car not defined before calling super.createHead()');
        }

        const headRadius = 10;
        const head = this.matter.add.circle(scene.car.x, scene.car.y - scene.car.height / 2 - headRadius, headRadius, { isSensor: true });
        //Add constraint to car
        scene.matter.add.constraint(scene.car, head, 0, 0.1, { pointA: { x: 0, y: -scene.car.height / 2 }, pointB: { x: 0, y: 0 } });

        return head;
    }

    createFlag(scene, x, y) {
        let flag = scene.matter.add.sprite(x, y, 'flag');
        flag.setStatic(true);

        return flag;
    }

    update(scene) {
        if (this.spacebar.isDown) {
            Phaser.Physics.Matter.Matter.Body.applyForce(scene.car.body, scene.car.body.position, { x: 0.05, y: 0 });
            scene.car.anims.play('accelerating', true);
        } else if (scene.car.body.velocity.x > 0.01) {
            scene.car.anims.play('retarding', true);
        } else {
            scene.car.anims.play('stationary', true);
        }
    }

    levelComplete(scene) {
        if (constants.audioOn) {
            scene.music.stop();
            scene.sound.play('victory');
        }

        scene.car.body.force.x = 0;
        scene.car.body.velocity.x = 0;
        scene.car.anims.stop();

        scene.cameras.main.stopFollow();
        scene.cameras.main.pan(0, 0, 3000, 'Power2');
        scene.cameras.main.fade(2000, 0, 0, 0, false, function(camera, progress) {
            if (progress === 1) {
                scene.scene.start('LevelSelect');
            }
        });
    }

    levelFailed(scene) {
        if (constants.audioOn) {
            scene.music.stop();
            scene.sound.play('explosion');
        }

        scene.car.body.force.x = 0;
        scene.car.body.velocity.x = 0;
        scene.car.anims.stop();

        scene.cameras.main.stopFollow();
        scene.cameras.main.pan(0, 0, 1000, 'Power2');
        scene.cameras.main.zoomTo(0.5, 1000, 'Power2');
        scene.cameras.main.fade(1000, 0, 0, 0, false, function(camera, progress) {
            if (progress === 1) {
                scene.scene.restart();
            }
        });
    }
        
}

export default Level_Base;