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
    }
}

export {Level_1};