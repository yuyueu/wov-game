import Level_Base from './level_base.js';

class Level_1 extends Level_Base {
    constructor() {
        super('Level_1');

        this.car = null;
        this.ground = null;
        this.clouds = null;
        this.flag = null;
        this.startFinishLine = null;
        this.lava = null;
        this.cam = null;
    }

    preload() {
        super.preload();
        // Load images from assets/level_1
        this.load.image('background', 'assets/level_1/background.png');
        this.load.image('clouds-1', 'assets/level_1/clouds-1.png');
        this.load.image('clouds-2', 'assets/level_1/clouds-2.png');
        this.load.image('ground-1', 'assets/level_1/ground-1.png');
        this.load.image('ground-2', 'assets/level_1/ground-2.png');
        this.load.image('ground-3', 'assets/level_1/ground-3.png');
        this.load.image('start-finish-line', 'assets/level_1/start-finish-line.png');
        this.load.spritesheet('lava-1', 'assets/level_1/lava-1.png', { frameWidth: 136, frameHeight: 82 });
        this.load.spritesheet('lava-2', 'assets/level_1/lava-2.png', { frameWidth: 136, frameHeight: 82 });

        // Load audio from assets
        this.load.audio('background-music', 'assets/music/background/level_1.mp3');

    }

    create() {

        // Background image
        this.add.image(0, 0, 'background').setOrigin(0, 0).setDepth(-1).setScrollFactor(0);

        // Car sprite
        this.car = super.createCar(400, 300, this);

        super.create(this);

        this.flag = super.createFlag(223 * 20, 600 - 138, this);

        // Music
        if (audioOn === true) {
            this.music = this.sound.add('background-music');
            this.music.setLoop(true);
            this.music.play();
        }

        // Ground
        this.ground = [];
    
        for (let i = 0; i < 20; i++) {
            const x = i * 223; // Adjust as needed
            const y = this.game.config.height; // Adjust as needed
            const groudSegment = this.matter.add.image(x, y, 'ground-3');
            groudSegment.setStatic(true);
            this.ground.push(groudSegment);
        }

        // Colliders

        
        console.debug('this.car:', this.car);
        console.debug('this.ground:', this.ground);
        console.debug('this.flag:', this.flag);
        console.debug('this.lava:', this.lava);


        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if ((bodyA === this.car.body && bodyB === this.flag.body) || (bodyA === this.flag.body && bodyB === this.car.body)) {
                super.levelComplete(this);
            }
            // Uncomment the following lines if you want to handle collisions with lava
            /*
            if ((bodyA === this.car.body && bodyB === this.lava.body) || (bodyA === this.lava.body && bodyB === this.car.body)) {
                super.levelFailed(this);
            }
            */
            // Handle car/ground collision
            this.ground.forEach(groundSegment => {
                if ((bodyA === this.car.body && bodyB === groundSegment.body) || (bodyA === groundSegment.body && bodyB === this.car.body)) {
                    // Handle the collision
                }
            });
        });
    }

    update() {
        super.update(this);
    }
}

export default Level_1;