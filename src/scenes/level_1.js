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
        const worldWidth = 1920 * 5;
        const worldHeight = 1080;
        this.matter.world.setBounds(0, 0, worldWidth, worldHeight, 64, true, false, true, true);

        this.car = super.createCar(this, 400, this.sys.game.config.height - 300);
        this.flag = super.createFlag(this, worldWidth - 300 , this.sys.game.config.height - 100);
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

    }

    update() {
        super.update(this);
    }
}

export {Level_1};