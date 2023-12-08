import constants from '../utils/physicsUtils.js';

import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

class Level_Base extends Phaser.Scene {
    constructor(key) {
        super({key: key});

        this.spacebar               = null;
        this.isLevelCompleteRunning = false;
        this.isLevelFailedRunning   = false;
    }

    preload() {
        this.load.spritesheet('volvo', 'assets/volvo.png', { frameWidth: 101, frameHeight: 54 });
        this.load.json('volvoPhysics', 'assets/json/Volvo.json');

        this.load.spritesheet('flag', 'assets/flags.png', { frameWidth: 79, frameHeight: 131 });
        this.load.json('flagPhysics', 'assets/json/Flag.json');
    
        this.load.audio('explosion', 'assets/music/sfx/car-explode.wav');
        this.load.audio('victory', 'assets/music/sfx/car-victory.wav');
    }

    create(scene) {

        // Backup background color
        this.cameras.main.setBackgroundColor('#87CEEB'); // Sky blue

        console.debug('create: Creating animations');
        // Create animations if not yet created
        if (this.anims.get('stationary') === undefined) {
            // Stationary
            this.anims.create({
                key: 'stationary',
                frames: [{ key: 'volvo', frame: 0 }],
                frameRate: 10
            });
        }

        if (this.anims.get('accelerating') === undefined) {
            // Accelerating
            this.anims.create({
                key: 'accelerating',
                frames: this.anims.generateFrameNumbers('volvo', { start: 1, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (this.anims.get('retarding') === undefined) {
            // Retarding
            this.anims.create({
                key: 'retarding',
                frames: this.anims.generateFrameNumbers('volvo', { start: 4, end: 6 }),
                frameRate: 10,
                repeat: -1
            });
        }

        // Spacebar
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        if (this.anims.get('flag-wave') === undefined) {
            this.anims.create({
                key: 'flag-wave',
                frames: this.anims.generateFrameNumbers('flag', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1
            });
        }
    }

    createCamera(obj) {
        // Camera
        this.cam = this.cameras.main;

        // Set the bounds of the camera. The camera will not move outside these bounds.
        this.cam.setBounds(0, 0, Infinity, this.game.config.height);

        // Set the camera to follow the obj sprite. The camera will smoothly follow the car as it moves.
        const yOffset = -obj.height * 0.75;
        this.cam.startFollow(obj, false, 0.05, 1);
        this.cam.setFollowOffset(0, yOffset);

        return this.cam;
    }

    update(scene) {
        if (this.spacebar.isDown) {
            scene.car.body.force.x = constants.acceleration;
            scene.car.anims.play('accelerating', true);
        } else {
            if (scene.car.body.velocity.x > 0) {
                scene.car.body.force.x = 0;
                // Simulate drag by reducing the velocity
                scene.car.body.velocity.x *= 0.9;
                scene.car.anims.play('retarding', true);
            } else {
                scene.car.anims.play('stationary', true);
            }
        }

        // Limit the maximum speed
        if (scene.car.body.velocity.x > constants.maxSpeed) {
            scene.car.body.velocity.x = constants.maxSpeed;
        }
        else if (scene.car.body.velocity.x < -constants.maxSpeed) {
            scene.car.body.velocity.x = -constants.maxSpeed;
        }
    }

    levelComplete(scene) {

        console.debug('levelComplete: Level complete');

        if (constants.audioOn === true) {
            scene.music.stop();
            this.sound.play('victory');
        }
        this.scene.start('MainMenu');
        return;

        // Add victory text
        const camera = scene.cameras.main;
        const midPoint = camera.midPoint;
        scene.add.text(midPoint.x, midPoint.y - 100, 'Level complete', { fontSize: '64px', fill: '#000' });
        
        // Fade out
        scene.cam.fadeOut(4000);

        // Wait 1 second
        scene.time.delayedCall(4000, () => {
            // Stop music
            if (constants.audioOn === true) {
                scene.music.stop();
                this.sound.play('victory');
            }
            this.scene.start('MainMenu');
        }, [], scene);

        
    }

    levelFailed(scene) {

        console.debug('levelFailed: Level failed');

        if (constants.audioOn === true) {
            scene.music.stop();
            this.sound.play('explosion');
        }
        this.scene.start('level_1');
        return;

        // Add failure text
        scene.add.text(100, 100, 'Level failed', { fontSize: '32px', fill: '#000' });

        // Wait 1 second
        scene.time.delayedCall(1000, () => {
            // Stop music
            if (constants.audioOn === true) {
                scene.music.stop();
                this.sound.play('explosion');
                scene.music.play(scene.music);
            }
            this.scene.start(scene.scene.key);
        }, [], scene);

        this.isLevelFailedRunning = false;
    }

    createFlag(x, y, scene) {
        const flag = scene.matter.add.sprite(x, y, 'flag').play('flag-wave');
        flag.setIgnoreGravity(true); // Matter.js sprites are affected by gravity by default

        // Get the physics data from the 'flagPhysics' JSON file
        const flagPhysics = scene.cache.json.get('flagPhysics');
        flag.setBody(flagPhysics);

        // If there exists a car in the scene, make collider
        if (scene.car !== null) {
            scene.matterCollision.addOnCollideStart({
                objectA: flag,
                objectB: scene.car,
                callback: () => this.levelComplete(scene),
                context: scene
            });
        } else {
            console.debug('createFlag: No car in scene, no collider added');
        }

        return flag;
    }

    createCar(x, y, scene) {
        console.debug('createCar: Creating car')
        const car = scene.matter.add.sprite(x, y, 'volvo').play('stationary');
        car.setIgnoreGravity(false); // Matter.js sprites ignore gravity by default

        // Get the physics data from the 'volvoPhysics' JSON file
        const carPhysics = scene.cache.json.get('volvoPhysics');
        car.setBody(carPhysics);

        // Set acceleration
        car.setFrictionAir(constants.acceleration);

        // If there exists a flag in the scene, make collider
        if (scene.flag !== null) {
            scene.matterCollision.addOnCollideStart({
                objectA: car,
                objectB: scene.flag,
                callback: () => this.levelComplete(scene),
                context: scene
            });
        } else {
            console.debug('createCar: No flag in scene, no collider added');
        }

        return car;
    }

}

export default Level_Base;