import Level_Base from './level_base.js';
import constants from '../utils/constants.js';

import Phaser from 'phaser';
import MatterCollisionPlugin from 'phaser-matter-collision-plugin';

class Level_1 extends Level_Base {
    constructor() {
        super('Level_1');
    }

    preload() {
        super.preload();
        
        this.load.image('background', 'assets/level_1/background.png');

        this.load.spritesheet('lava-1', 'assets/level_1/lava-1.png', { frameWidth: 254, frameHeight: 206 });
        this.load.spritesheet('lava-2', 'assets/level_1/lava-2.png', { frameWidth: 749, frameHeight: 206 });
        this.load.spritesheet('lava-3', 'assets/level_1/lava-3.png', { frameWidth: 501, frameHeight: 206 });

        this.load.image('ground-1', 'assets/level_1/ground-1.png');
        this.load.json('ground-1-physics', 'assets/json/level_1/ground-1.json');
        this.load.image('ground-2', 'assets/level_1/ground-2.png');
        this.load.json('ground-2-physics', 'assets/json/level_1/ground-2.json');
        this.load.image('ground-3-6', 'assets/level_1/ground-3-6.png');
        this.load.image('ground-4', 'assets/level_1/ground-4.png');
        this.load.json('ground-4-physics', 'assets/json/level_1/ground-4.json');
        this.load.image('ground-5-8', 'assets/level_1/ground-5-8.png');
        this.load.json('ground-5-8-physics', 'assets/json/level_1/ground-5-8.json');
        this.load.image('ground-7-9', 'assets/level_1/ground-7-9.png');
        this.load.json('ground-7-9-physics', 'assets/json/level_1/ground-7-9.json');
        this.load.image('ground-10', 'assets/level_1/ground-10.png');
        
        this.load.image('clouds-1', 'assets/level_1/clouds-1.png');
        this.load.image('clouds-2', 'assets/level_1/clouds-2.png');

        this.load.audio('background-music', 'assets/music/background/level_1.mp3');
    }

    create() {
        this.car = super.createCar(this, 400, this.worldBounds.height - 300);
        this.flag = super.createFlag(this, this.worldBounds.width - 300 , this.worldBounds.height - 280);
        this.head = super.createHead(this);

        super.create(this);

        // Background image
        this.add.image(0, 0, 'background').setOrigin(0, 0).setDepth(-1).setScrollFactor(0);

        // Music
        if (constants.audioOn === true) {
            this.music = this.sound.add('background-music');
            this.music.setLoop(true);
            this.music.play();
        }

        this.createGround();

    }

    update() {
        super.update(this);
    }

    createGround() {
        const magicNumber = 1000;
        let ground1 = this.matter.add.image(300, magicNumber, 'ground-1', null, { shape: this.cache.json.get('ground-1-physics').ground1 });

        this.anims.create({
            key: 'lava-1',
            frames: this.anims.generateFrameNames('lava-1', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });

        let lava1Width = 254;
        let lava1 = this.add.sprite(ground1.getBottomRight().x + lava1Width / 2, magicNumber, 'lava-1');
        lava1.anims.play('lava-1');

        let ground2Width = 709;
        let ground2 = this.matter.add.image(lava1.getBottomRight().x + ground2Width / 2 + 50, magicNumber, 'ground-2', null, { shape: this.cache.json.get('ground-2-physics').ground2 });

        let lava1_2 = this.add.sprite(ground2.getBottomRight().x + lava1Width / 2, magicNumber, 'lava-1');
        lava1_2.anims.play('lava-1');

        let ground3_6Width = 460;
        let ground3 = this.matter.add.image(lava1_2.getBottomRight().x + ground3_6Width / 2, magicNumber, 'ground-3-6');
        ground3.setStatic(true);

        let lava1_3 = this.add.sprite(ground3.getBottomRight().x + lava1Width / 2, magicNumber, 'lava-1');
        lava1_3.anims.play('lava-1');

        let ground4Width = 1319;
        let ground4 = this.matter.add.image(lava1_3.getBottomRight().x + ground4Width / 2, magicNumber, 'ground-4', null, { shape: this.cache.json.get('ground-4-physics').ground4 });

        this.anims.create({
            key: 'lava-2',
            frames: this.anims.generateFrameNames('lava-2', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });

        let lava2Width = 749;
        let lava2 = this.add.sprite(ground4.getBottomRight().x + lava2Width / 2, magicNumber, 'lava-2');
        lava2.anims.play('lava-2');

        let ground5_8Width = 866;
        let ground5 = this.matter.add.image(lava2.getBottomRight().x + ground5_8Width / 2, magicNumber - 100, 'ground-5-8', null, { shape: this.cache.json.get('ground-5-8-physics').ground });

        let lava1_4 = this.add.sprite(ground5.getBottomRight().x + lava1Width / 2, magicNumber, 'lava-1');
        lava1_4.anims.play('lava-1');

        let ground7_9Width = 493;
        let ground7 = this.matter.add.image(lava1_4.getBottomRight().x + ground7_9Width / 2, magicNumber, 'ground-7-9', null, { shape: this.cache.json.get('ground-7-9-physics').ground });

        this.anims.create({
            key: 'lava-3',
            frames: this.anims.generateFrameNames('lava-3', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });

        let lava3Width = 501;
        let lava3 = this.add.sprite(ground7.getBottomRight().x + lava3Width / 2, magicNumber, 'lava-3');
        lava3.anims.play('lava-3');

        let ground8 = this.matter.add.image(lava3.getBottomRight().x + ground5_8Width / 2, magicNumber - 100, 'ground-5-8', null, { shape: this.cache.json.get('ground-5-8-physics').ground });

        let lava1_5 = this.add.sprite(ground8.getBottomRight().x + lava1Width / 2, magicNumber, 'lava-1');
        lava1_5.anims.play('lava-1');

        let ground9 = this.matter.add.image(lava1_5.getBottomRight().x + ground7_9Width / 2, magicNumber, 'ground-7-9', null, { shape: this.cache.json.get('ground-7-9-physics').ground });

        let lava1_6 = this.add.sprite(ground9.getBottomRight().x + lava1Width / 2, magicNumber, 'lava-1');
        lava1_6.anims.play('lava-1');

        let ground10Width = 423;
        let ground10 = this.matter.add.image(lava1_6.getBottomRight().x + ground10Width / 2, magicNumber, 'ground-10');
        ground10.setStatic(true);

        let ground10_2 = this.matter.add.image(ground10.getBottomRight().x + ground10Width / 2, magicNumber, 'ground-10');
        ground10_2.setStatic(true);

        let ground10_3 = this.matter.add.image(ground10_2.getBottomRight().x + ground10Width / 2, magicNumber, 'ground-10');
        ground10_3.setStatic(true);

        let ground10_4 = this.matter.add.image(ground10_3.getBottomRight().x + ground10Width / 2, magicNumber, 'ground-10');
        ground10_4.setStatic(true);
    }

    class chooseGravity extends Phaser.Scene {
        constructor() {
            key: 'chooseGravity'
        }

        create() {
            // Create the slider bar
            let sliderBar = this.add.graphics();
            sliderBar.fillStyle(0xaaaaaa);
            sliderBar.fillRect(100, 100, 200, 20);

            // Create the slider handle
            let sliderHandle = this.add.graphics();
            sliderHandle.fillStyle(0xffffff);
            sliderHandle.fillRect(100, 100, 20, 20);
            sliderHandle.setInteractive();
            sliderHandle.setData('value', 0);

            // Enable dragging on the slider handle
            this.input.setDraggable(sliderHandle);

            // When the slider handle is dragged, update its position and the gravity
            this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
                let newValue = Phaser.Math.Clamp(dragX, 100, 300);
                gameObject.x = newValue;
                gameObject.setData('value', (newValue - 100) / 200);
                this.physics.world.gravity.y = gameObject.getData('value') * 1000; // Adjust as needed
            });
        }
    }
}

export {Level_1};