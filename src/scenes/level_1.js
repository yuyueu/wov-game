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
        this.load.spritesheet('lava-2', 'assets/level_1/lava-2.png', { frameWidth: 501, frameHeight: 206 });
        this.load.spritesheet('lava-3', 'assets/level_1/lava-3.png', { frameWidth: 749, frameHeight: 206 });

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
        this.flag = super.createFlag(this, this.worldBounds.width - 300 , this.worldBounds.height - 100);
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
        let ground1 = this.matter.add.image(0, 0, 'ground-1', null, { shape: this.cache.json.get('ground-1-physics').ground1 });
        ground1.setOrigin(0, 1);
        //ground1.setExistingBody(ground1.body, true);
        ground1.setPosition(400, this.worldBounds.height - 200);

        // this.anims.create({
        //     key: 'lava-1',
        //     frames: this.anims.generateFrameNumbers('lava-1', { start: 0, end: 2 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // let lava1 = this.matter.add.sprite(0, 0, 'lava-1');
        // // lava1.setOrigin(0, 1);
        // lava1.setPosition(ground1.displayWidth, this.worldBounds.height);
        // lava1.anims.play('lava-1');

        // let ground2 = this.matter.add.image(0, 0, 'ground-2', null, { shape: this.cache.json.get('ground-2-physics').ground2 });
        // // ground2.setOrigin(0, 1);
        // ground2.setPosition(lava1.x + lava1.displayWidth, this.worldBounds.height);

        // let lava1_2 = this.matter.add.sprite(0, 0, 'lava-1');
        // // lava1_2.setOrigin(0, 1);
        // lava1_2.setPosition(ground2.x + ground2.displayWidth, this.worldBounds.height);
        // lava1_2.anims.play('lava-1');

        // let ground3 = this.matter.add.image(0, 0, 'ground-3-6');
        // // ground3.setOrigin(0, 1);
        // ground3.setPosition(lava1_2.x + lava1_2.displayWidth, this.worldBounds.height);

        // let lava1_3 = this.matter.add.sprite(0, 0, 'lava-1');
        // // lava1_3.setOrigin(0, 1);
        // lava1_3.setPosition(ground3.x + ground3.displayWidth, this.worldBounds.height);
        // lava1_3.anims.play('lava-1');

        // let ground4 = this.matter.add.image(0, 0, 'ground-4', null, { shape: this.cache.json.get('ground-4-physics').ground4 });
        // // ground4.setOrigin(0, 1);
        // ground4.setPosition(lava1_3.x + lava1_3.displayWidth, this.worldBounds.height);

        // this.anims.create({
        //     key: 'lava-2',
        //     frames: this.anims.generateFrameNumbers('lava-2', { start: 0, end: 2 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // let lava2 = this.matter.add.sprite(0, 0, 'lava-2');
        // // lava2.setOrigin(0, 1);
        // lava2.setPosition(ground4.x + ground4.displayWidth, this.worldBounds.height);
        // lava2.anims.play('lava-2');

        // let ground5 = this.matter.add.image(0, 0, 'ground-5-8', null, { shape: this.cache.json.get('ground-5-8-physics').ground });
        // // ground5.setOrigin(0, 1);
        // ground5.setPosition(lava2.x + lava2.displayWidth, this.worldBounds.height);

        // let lava1_4 = this.matter.add.sprite(0, 0, 'lava-1');
        // // lava1_4.setOrigin(0, 1);
        // lava1_4.setPosition(ground5.x + ground5.displayWidth, this.worldBounds.height);
        // lava1_4.anims.play('lava-1');

        // let ground6 = this.matter.add.image(0, 0, 'ground-3-6');
        // // ground6.setOrigin(0, 1);
        // ground6.setPosition(lava1_4.x + lava1_4.displayWidth, this.worldBounds.height);

        // let lava1_5 = this.matter.add.sprite(0, 0, 'lava-1');
        // // lava1_5.setOrigin(0, 1);
        // lava1_5.setPosition(ground6.x + ground6.displayWidth, this.worldBounds.height);
        // lava1_5.anims.play('lava-1');

        // let ground7 = this.matter.add.image(0, 0, 'ground-7-9', null, { shape: this.cache.json.get('ground-7-9-physics').ground });
        // // ground7.setOrigin(0, 1);
        // ground7.setPosition(lava1_5.x + lava1_5.displayWidth, this.worldBounds.height);

        // this.anims.create({
        //     key: 'lava-3',
        //     frames: this.anims.generateFrameNumbers('lava-3', { start: 0, end: 2 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // let lava3 = this.matter.add.sprite(0, 0, 'lava-3');
        // // lava3.setOrigin(0, 1);
        // lava3.setPosition(ground7.x + ground7.displayWidth, this.worldBounds.height);
        // lava3.anims.play('lava-3');

        // let ground8 = this.matter.add.image(0, 0, 'ground-5-8', null, { shape: this.cache.json.get('ground-5-8-physics').ground });
        // // ground8.setOrigin(0, 1);
        // ground8.setPosition(lava3.x + lava3.displayWidth, this.worldBounds.height);

        // let lava1_6 = this.matter.add.sprite(0, 0, 'lava-1');
        // // lava1_6.setOrigin(0, 1);
        // lava1_6.setPosition(ground8.x + ground8.displayWidth, this.worldBounds.height);
        // lava1_6.anims.play('lava-1');

        // let ground9 = this.matter.add.image(0, 0, 'ground-7-9', null, { shape: this.cache.json.get('ground-7-9-physics').ground });
        // // ground9.setOrigin(0, 1);
        // ground9.setPosition(lava1_6.x + lava1_6.displayWidth, this.worldBounds.height);

        // let lava1_7 = this.matter.add.sprite(0, 0, 'lava-1');
        // // lava1_7.setOrigin(0, 1);
        // lava1_7.setPosition(ground9.x + ground9.displayWidth, this.worldBounds.height);
        // lava1_7.anims.play('lava-1');

        // let ground10 = this.matter.add.image(0, 0, 'ground-10');
        // // ground10.setOrigin(0, 1);
        // ground10.setPosition(lava1_7.x + lava1_7.displayWidth, this.worldBounds.height);

    }
}

export {Level_1};