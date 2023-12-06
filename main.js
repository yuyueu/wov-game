var audioOn = true;

class MainMenu extends Phaser.Scene {
    constructor() {
        super({key: 'MainMenu'});
    }

    create() {

        // // Debug mode
        // if (config.physics.arcade.debug === true) {
        //     console.log('debug mode');
        //     this.scene.start('Level_1');
        // }

        // Set background color
        this.cameras.main.setBackgroundColor('#909acd'); // Replace '#ffffff' with the desired color

        // Title
        this.add.text(100, 100, 'Car Game', { fontSize: '32px', fill: '#000' });

        // Level Select button
        const levelSelectButton = this.add.text(100, 200, 'Level Select', { fontSize: '20px', fill: '#000' });
        levelSelectButton.setInteractive();
        levelSelectButton.on('pointerdown', () => {
            this.scene.start('LevelSelect');
        });

        // Help button
        const infoButton = this.add.text(100, 250, 'Info', { fontSize: '20px', fill: '#000' });
        infoButton.setInteractive();
        infoButton.on('pointerdown', () => {
            this.scene.start('Info');
        });

        // Settings button
        const settingsButton = this.add.text(100, 300, 'Settings', { fontSize: '20px', fill: '#000' });
        settingsButton.setInteractive();
        settingsButton.on('pointerdown', () => {
            this.scene.start('Settings');
        });
    }
}

class LevelSelect extends Phaser.Scene {
    constructor() {
        super({key: 'LevelSelect'});
    }

    create() {

        // Background color
        this.cameras.main.setBackgroundColor('#909acd'); // Replace '#ffffff' with the desired color

        // Title
        this.add.text(100, 100, 'Level Select', { fontSize: '32px', fill: '#000' });

        // Level 1 button
        const level1Button = this.add.text(100, 200, 'Level 1', { fontSize: '20px', fill: '#000' });
        level1Button.setInteractive();
        level1Button.on('pointerdown', () => {
            this.scene.start('Level_1');
        });

        // Level 2 button
        const level2Button = this.add.text(100, 250, 'Level 2', { fontSize: '20px', fill: '#000' });
        level2Button.setInteractive();
        level2Button.on('pointerdown', () => {
            this.scene.start('Level_2');
        });

        // Level 3 button
        const level3Button = this.add.text(100, 300, 'Level 3', { fontSize: '20px', fill: '#000' });
        level3Button.setInteractive();
        level3Button.on('pointerdown', () => {
            this.scene.start('Level_3');
        });

        // Level 4 button
        const level4Button = this.add.text(100, 350, 'Level 4', { fontSize: '20px', fill: '#000' });
        level4Button.setInteractive();
        level4Button.on('pointerdown', () => {
            this.scene.start('Level_4');
        });

        // Level 5 button
        const level5Button = this.add.text(100, 400, 'Level 5', { fontSize: '20px', fill: '#000' });
        level5Button.setInteractive();
        level5Button.on('pointerdown', () => {
            this.scene.start('Level_5');
        });

        // Back button
        const backButton = this.add.text(100, 450, 'Back', { fontSize: '20px', fill: '#000' });
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}

class Info extends Phaser.Scene {
    constructor() {
        super({key: 'Info'});
    }

    create() {

        // Background color
        this.cameras.main.setBackgroundColor('#909acd'); // Replace '#ffffff' with the desired color

        // Title
        this.add.text(100, 100, 'Info', { fontSize: '32px', fill: '#000' });

        this.add.text(100, 150, 'Programming: Wilfred Maloney', { fontSize: '20px', fill: '#000' });
        this.add.text(100, 200, 'Design: Helen Gunnarson', { fontSize: '20px', fill: '#000' });
        
        this.add.text(100, 300, 'Created Dec 2023 by \nProduction for Future on behalf of World of Volvo!', { fontSize: '20px', fill: '#000' });
        this.add.text(100, 350, 'Developed using Phaser3 Game Engine', { fontSize: '20px', fill: '#000' });
        // Back button
        const backButton = this.add.text(100, 450, 'Back', { fontSize: '20px', fill: '#000' });
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}

class Settings extends Phaser.Scene {
    constructor() {
        super({key: 'Settings'});
    }

    create() {

        // Background color
        this.cameras.main.setBackgroundColor('#909acd'); // Replace '#ffffff' with the desired color

        // Title
        this.add.text(100, 100, 'Settings', { fontSize: '32px', fill: '#000' });

        // Audio button
        const audioButton = this.add.text(100, 200, (audioOn ? "Audio: On" : "Audio: Off"), { fontSize: '20px', fill: '#000' });
        audioButton.setInteractive();
        audioButton.on('pointerdown', () => {
            if (audioOn) {
                audioOn = false;
                audioButton.setText('Audio: Off');
            } else {
                audioOn = true;
                audioButton.setText('Audio: On');
            }
        });

        // Back button
        const backButton = this.add.text(100, 250, 'Back', { fontSize: '20px', fill: '#000' });
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}

class Level_Base extends Phaser.Scene {
    constructor() {
        super({key: 'Level_Base'});

        this.acceleration = 150;
        this.maxAcceleration = 200;
        this.maxSpeed = 500;
        this.spacebar = null;
    }

    preload() {
        // Load images from assets
        this.load.spritesheet('volvo', 'assets/volvo.png', { frameWidth: 101, frameHeight: 54 })
        this.load.spritesheet('flag', 'assets/flags.png', { frameWidth: 0 /*TODO: Unknown value */, frameHeight: 131 });
    
        this.load.audio('explosion', 'assets/music/car-explode.wav');
        this.load.audio('victory', 'assets/music/car-victory.wav');
    }

    create(car) {

        // Backup background color
        this.cameras.main.setBackgroundColor('#87CEEB'); // Sky blue

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

        this.anims.create({
            key: 'flag-wave',
            frames: this.anims.generateFrameNumbers('flag', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.createCamera(car);

    }

    createCamera(car) {
        // Camera
        this.cam = this.cameras.main;
    
        this.cam.setBounds(0, 0, Infinity, this.game.config.height);
    
        const yOffset = -car.height * 0.75;
        this.cam.startFollow(car, false, 0.05, 1);
        this.cam.setFollowOffset(0, yOffset);
    }

    update(car) {
        this.updateCar(car);
    }

    updateCar(car) {
        if (this.spacebar.isDown) {
            car.setAccelerationX(this.maxAcceleration);
            car.anims.play('accelerating', true);
        } else {
            if (car.body.velocity.x > 0) {
                car.setAccelerationX(0);
                car.setDragX(this.maxAcceleration * 1.4);
                car.anims.play('retarding', true);
            } else {
                car.anims.play('stationary', true);
            }
        }

        // Limit the maximum speed
        if (car.body.velocity.x > this.maxSpeed) {
            car.setVelocityX(this.maxSpeed);
        }
        else if (car.body.velocity.x < -this.maxSpeed) {
            car.setVelocityX(-this.maxSpeed);
        }
    }

    levelComplete(scene) {
        // Add victory text
        scene.add.text(100, 100, 'Level complete', { fontSize: '32px', fill: '#000' });

        // Fade out
        scene.cam.fadeOut(1000);

        // Wait 1 second
        scene.time.delayedCall(1000, () => {
            // Stop music
            if (audioOn === true) {
                scene.music.stop();
                this.sound.play('victory');
            }
            this.scene.start('MainMenu');
        }, [], scene);
    }

    levelFailed(scene) {
        // Add failure text
        scene.add.text(100, 100, 'Level failed', { fontSize: '32px', fill: '#000' });

        // Wait 1 second
        scene.time.delayedCall(1000, () => {
            // Stop music
            if (audioOn === true) {
                scene.music.stop();
                this.sound.play('explosion');
                scene.music.play(scene.music);
            }
            this.scene.start(scene.scene.key);
        }, [], scene);
    }

    createFlag(x, y, scene) {
        const flag = scene.physics.add.sprite(x, y, 'flag').play('flag-wave');

        // If there exists a car in the scene, make collider
        if (scene.car !== null) {
            scene.physics.add.collider(flag, scene.car, () => this.levelComplete(scene), null, scene);
        } else {
            console.debug('createFlag: No car in scene, no collider added');
        }

        return flag;
    }

    createCar(x, y, scene) {
        const car = scene.physics.add.sprite(x, y, 'volvo').play('stationary');

        // If there exists a flag in the scene, make collider
        if (scene.flag !== null) {
            scene.physics.add.collider(car, scene.flag, () => this.levelComplete(scene), null, scene);
        } else {
            console.debug('createCar: No flag in scene, no collider added');
        }

        return car;
    }

}

class Level_1 extends Level_Base {
    constructor() {
        super({key: 'Level_1'});

        this.car = null;
        this.ground = null;
        this.clouds = null;
        this.flag = null;
        this.startFinishLine = null;
        this.lava = null;
        this.cam = null;
    }

    preload() {

        throw new Error('Level 1 is not yet implemented');

        super.preload();
        // Load images from assets/level_1
        this.load.image('background', 'assets/level_1/background.png');
        this.load.image('clouds-1', 'assets/level_1/clouds-1.png');
        this.load.image('clouds-2', 'assets/level_1/clouds-2.png');
        this.load.image('ground-1', 'assets/level_1/ground-1.png');
        this.load.image('ground-2', 'assets/level_1/ground-2.png');
        this.load.image('ground-3', 'assets/level_1/ground-3.png');
        this.load.image('start-finish-line', 'assets/level_1/start-finish-line.png');
        this.load.spritesheet('lava-1', 'assets/level_1/lava-1.png', { frameWidth: 0 /*TODO: Unkown value */, frameHeight: 82 });
        this.load.spritesheet('lava-2', 'assets/level_1/lava-2.png', { frameWidth: 0 /*TODO: Unkown value */, frameHeight: 82 });

        // Miscellanious: Update HTML elements
        document.querySelector('#dimensions').innerHTML = 'Game dimensions: ' + this.game.config.width + 'x' + this.game.config.height + ' px';
        document.querySelector('#maxSpeed').innerHTML = 'Max speed: ' + this.maxSpeed + ' px/s';
        document.querySelector('#maxAcceleration').innerHTML = 'Max acceleration: ' + this.maxAcceleration + ' px/s²';

        // Load audio from assets
        this.load.audio('background-music', 'assets/music/background/level_1.mp3');

    }

    create() {


        // Car sprite
        this.car = this.physics.add.sprite(400, 300, 'volvo');
        this.car.setAcceleration(this.acceleration);

        super.create(this.car);

        // Background image
        this.add.image(0, 0, 'background').setOrigin(0, 0);

        // Music
        if (audioOn === true) {
            this.music = this.sound.add('background-music');
            this.music.setLoop(true);
            this.music.play();
        }

        // Ground
        this.ground = this.physics.add.staticGroup();
    
        for (let i = 0; i < 20; i++) {
            const x = i * 223; // Adjust as needed
            const y = this.game.config.height; // Adjust as needed
            this.ground.create(x, y, 'ground-3');
        }
    
        // Flag
        this.flag = this.physics.add.sprite(1000, 500, 'flag');

        // Colliders
        this.physics.add.collider(this.car, this.ground);
        this.physics.add.collider(this.car, this.lava, () => super.levelFailed(this.music), null, this);
        this.physics.add.collider(this.flag, this.car, () => super.levelComplete(this.music), null, this);
    }

    update() {
        super.update(this.car);
    }
}

class Level_2 extends Phaser.Scene {
    constructor() {
        super({key: 'Level_2'});

        this.acceleration = 150;
        this.maxAcceleration = 200; // Set your desired maximum acceleration
        this.maxSpeed = 500;
        this.car = null;
        this.platforms = null;
        this.spacebar = null;
        this.cam = null;
        this.flag = null;
    }

    preload() {
        document.querySelector('#dimensions').innerHTML = 'Game dimensions: ' + this.game.config.width + 'x' + this.game.config.height + ' px';
        document.querySelector('#maxSpeed').innerHTML = 'Max speed: ' + this.maxSpeed + ' px/s';
        document.querySelector('#maxAcceleration').innerHTML = 'Max acceleration: ' + this.maxAcceleration + ' px/s²';
    
        this.load.image('car', 'assets/pixel car.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('flag', 'assets/flag.png');

        this.load.spritesheet('volvo', 'assets/volvo.png', { frameWidth: 101, frameHeight: 54 })

        this.load.audio('music', 'assets/music/background/level_2.mp3')
    }

    create() {
        
        // Background color
        this.cameras.main.setBackgroundColor('#f8b9f5'); // Replace '#ffffff' with the desired color

        // Stationary
        this.anims.create({
            key: 'stationary',
            frames: [{ key: 'volvo', frame: 0 }],
            frameRate: 10
        });

        // Accelerating
        this.anims.create({
            key: 'accelerating',
            frames: this.anims.generateFrameNumbers('volvo', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // Retarding
        this.anims.create({
            key: 'retarding',
            frames: this.anims.generateFrameNumbers('volvo', { start: 4, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        // Stationary with backlight
        this.anims.create({
            key: 'stationaryLight',
            frames: [{ key: 'volvo', frame: 7 }],
            frameRate: 10
        });

        this.car = this.physics.add.sprite(400, 300, 'volvo').play('stationary');

        // Music
        if (audioOn === true) {
            this.music = this.sound.add('music');
            this.music.setLoop(true);
            this.music.play();
        }

        this.platforms = this.physics.add.staticGroup();
    
        for (let i = 0; i < 3; i++) {
            const x = i * 800; // Adjust as needed
            const y = this.game.config.height; // Adjust as needed
            this.platforms.create(x, y, 'ground').setScale(2).refreshBody();
        }

    
        this.physics.add.collider(this.car, this.platforms);
    
        this.car.setAcceleration(this.acceleration);
    
        // Flag
        this.flag = this.physics.add.staticGroup();
        this.flag.create(1000, 500, 'flag').setScale(2).refreshBody();
    
        this.physics.add.collider(this.flag, this.car, this.levelComplete, null, this);
    
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
        // Camera
        this.cam = this.cameras.main;
    
        this.cam.setBounds(0, 0, Infinity, this.game.config.height);
    
        const yOffset = -this.car.height * 0.75;
        this.cam.startFollow(this.car, false, 0.05, 1);
        this.cam.setFollowOffset(0, yOffset);
    }

    update() {
        if (this.spacebar.isDown) {
            this.car.setAccelerationX(this.maxAcceleration);
            this.car.anims.play('accelerating', true);
        } else {
            if (this.car.body.velocity.x > 0) {
                this.car.setAccelerationX(0);
                this.car.setDragX(this.maxAcceleration * 1.4);
                this.car.anims.play('retarding', true);
            } else {
                this.car.anims.play('stationary', true);
            }
        }

        // Limit the maximum speed
        if (this.car.body.velocity.x > this.maxSpeed) {
            this.car.setVelocityX(this.maxSpeed);
        }
        else if (this.car.body.velocity.x < -this.maxSpeed) {
            this.car.setVelocityX(-this.maxSpeed);
        }
    
        // Update function
        if (this.car.x < this.platforms.getChildren()[1].x - this.platforms.getChildren()[2].width / 2) {
            // Remove the last platform
            this.platforms.getChildren()[0].destroy();
    
            // Add a new platform at the beginning
            const x = this.platforms.getChildren()[1].x - 800; // Adjust as needed
            const y = this.game.config.height; // Adjust as needed
            this.platforms.create(x, y, 'ground').setScale(2).refreshBody();
        }
    }

    levelComplete() {
        console.log('level 2 complete');
        if (audioOn === true) {
            this.music.stop();
        }
        this.scene.start('MainMenu');
    }
}

class Level_3 extends Phaser.Scene {
    constructor() {
        super({key: 'Level_3'});

        this.acceleration = 150;
        this.maxAcceleration = 200; // Set your desired maximum acceleration
        this.maxSpeed = 500;
        this.car = null;
        this.platforms = null;
        this.spacebar = null;
        this.cam = null;
        this.flag = null;
    }

    preload() {
        document.querySelector('#dimensions').innerHTML = 'Game dimensions: ' + this.game.config.width + 'x' + this.game.config.height + ' px';
        document.querySelector('#maxSpeed').innerHTML = 'Max speed: ' + this.maxSpeed + ' px/s';
        document.querySelector('#maxAcceleration').innerHTML = 'Max acceleration: ' + this.maxAcceleration + ' px/s²';
    
        this.load.image('car', 'assets/pixel car.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('flag', 'assets/flag.png');

        this.load.spritesheet('volvo', 'assets/volvo.png', { frameWidth: 101, frameHeight: 54 })

        this.load.audio('background-music-3', 'assets/music/background/level_3.mp3')
        this.load.audio('victory', 'assets/music/car-victory.wav');
    }

    create() {
        
        // Background color
        this.cameras.main.setBackgroundColor('#ff503e'); // Replace '#ffffff' with the desired color

        // Stationary
        this.anims.create({
            key: 'stationary',
            frames: [{ key: 'volvo', frame: 0 }],
            frameRate: 10
        });

        // Accelerating
        this.anims.create({
            key: 'accelerating',
            frames: this.anims.generateFrameNumbers('volvo', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // Retarding
        this.anims.create({
            key: 'retarding',
            frames: this.anims.generateFrameNumbers('volvo', { start: 4, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        // Stationary with backlight
        this.anims.create({
            key: 'stationaryLight',
            frames: [{ key: 'volvo', frame: 7 }],
            frameRate: 10
        });

        this.car = this.physics.add.sprite(400, 300, 'volvo').play('stationary');

        // Music
        if (audioOn === true) {
            this.music = this.sound.add('background-music-3');
            this.music.setLoop(true);
            this.music.play();
        }

        this.platforms = this.physics.add.staticGroup();
    
        for (let i = 0; i < 3; i++) {
            const x = i * 800; // Adjust as needed
            const y = this.game.config.height; // Adjust as needed
            this.platforms.create(x, y, 'ground').setScale(2).refreshBody();
        }

    
        this.physics.add.collider(this.car, this.platforms);
    
        this.car.setAcceleration(this.acceleration);
    
        // Flag
        this.flag = this.physics.add.staticGroup();
        this.flag.create(1000, 500, 'flag').setScale(2).refreshBody();
    
        this.physics.add.collider(this.flag, this.car, this.levelComplete, null, this);
    
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
        // Camera
        this.cam = this.cameras.main;
    
        this.cam.setBounds(0, 0, Infinity, this.game.config.height);
    
        const yOffset = -this.car.height * 0.75;
        this.cam.startFollow(this.car, false, 0.05, 1);
        this.cam.setFollowOffset(0, yOffset);
    }

    update() {
        if (this.spacebar.isDown) {
            this.car.setAccelerationX(this.maxAcceleration);
            this.car.anims.play('accelerating', true);
        } else {
            if (this.car.body.velocity.x > 0) {
                this.car.setAccelerationX(0);
                this.car.setDragX(this.maxAcceleration * 1.4);
                this.car.anims.play('retarding', true);
            } else {
                this.car.anims.play('stationary', true);
            }
        }

        // Limit the maximum speed
        if (this.car.body.velocity.x > this.maxSpeed) {
            this.car.setVelocityX(this.maxSpeed);
        }
        else if (this.car.body.velocity.x < -this.maxSpeed) {
            this.car.setVelocityX(-this.maxSpeed);
        }
    
        // Update function
        if (this.car.x < this.platforms.getChildren()[1].x - this.platforms.getChildren()[2].width / 2) {
            // Remove the last platform
            this.platforms.getChildren()[0].destroy();
    
            // Add a new platform at the beginning
            const x = this.platforms.getChildren()[1].x - 800; // Adjust as needed
            const y = this.game.config.height; // Adjust as needed
            this.platforms.create(x, y, 'ground').setScale(2).refreshBody();
        }
    }

    levelComplete() {
        console.log('level 3 complete');
        if (audioOn === true) {
            this.music.stop();
            this.sound.play('victory');
        }
        this.scene.start('MainMenu');
    }
}

class Level_4 extends Phaser.Scene {
    constructor() {
        super({key: 'Level_4'});

        this.acceleration = 150;
        this.maxAcceleration = 200; // Set your desired maximum acceleration
        this.maxSpeed = 500;
        this.car = null;
        this.platforms = null;
        this.spacebar = null;
        this.cam = null;
        this.flag = null;
    }

    preload() {
        document.querySelector('#dimensions').innerHTML = 'Game dimensions: ' + this.game.config.width + 'x' + this.game.config.height + ' px';
        document.querySelector('#maxSpeed').innerHTML = 'Max speed: ' + this.maxSpeed + ' px/s';
        document.querySelector('#maxAcceleration').innerHTML = 'Max acceleration: ' + this.maxAcceleration + ' px/s²';
    
        this.load.image('car', 'assets/pixel car.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('flag', 'assets/flag.png');

        this.load.spritesheet('volvo', 'assets/volvo.png', { frameWidth: 101, frameHeight: 54 })

        this.load.audio('background-music-4', 'assets/music/background/level_4.mp3')
    }

    create() {
        
        // Background color
        this.cameras.main.setBackgroundColor('#57756b'); // Replace '#ffffff' with the desired color

        // Stationary
        this.anims.create({
            key: 'stationary',
            frames: [{ key: 'volvo', frame: 0 }],
            frameRate: 10
        });

        // Accelerating
        this.anims.create({
            key: 'accelerating',
            frames: this.anims.generateFrameNumbers('volvo', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // Retarding
        this.anims.create({
            key: 'retarding',
            frames: this.anims.generateFrameNumbers('volvo', { start: 4, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        // Stationary with backlight
        this.anims.create({
            key: 'stationaryLight',
            frames: [{ key: 'volvo', frame: 7 }],
            frameRate: 10
        });

        this.car = this.physics.add.sprite(400, 300, 'volvo').play('stationary');

        // Music
        if (audioOn === true) {
            this.music = this.sound.add('background-music-4');
            this.music.setLoop(true);
            this.music.play();
        }

        this.platforms = this.physics.add.staticGroup();
    
        for (let i = 0; i < 3; i++) {
            const x = i * 800; // Adjust as needed
            const y = this.game.config.height; // Adjust as needed
            this.platforms.create(x, y, 'ground').setScale(2).refreshBody();
        }

    
        this.physics.add.collider(this.car, this.platforms);
    
        this.car.setAcceleration(this.acceleration);
    
        // Flag
        this.flag = this.physics.add.staticGroup();
        this.flag.create(1000, 500, 'flag').setScale(2).refreshBody();
    
        this.physics.add.collider(this.flag, this.car, this.levelComplete, null, this);
    
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
        // Camera
        this.cam = this.cameras.main;
    
        this.cam.setBounds(0, 0, Infinity, this.game.config.height);
    
        const yOffset = -this.car.height * 0.75;
        this.cam.startFollow(this.car, false, 0.05, 1);
        this.cam.setFollowOffset(0, yOffset);
    }

    update() {
        if (this.spacebar.isDown) {
            this.car.setAccelerationX(this.maxAcceleration);
            this.car.anims.play('accelerating', true);
        } else {
            if (this.car.body.velocity.x > 0) {
                this.car.setAccelerationX(0);
                this.car.setDragX(this.maxAcceleration * 1.4);
                this.car.anims.play('retarding', true);
            } else {
                this.car.anims.play('stationary', true);
            }
        }

        // Limit the maximum speed
        if (this.car.body.velocity.x > this.maxSpeed) {
            this.car.setVelocityX(this.maxSpeed);
        }
        else if (this.car.body.velocity.x < -this.maxSpeed) {
            this.car.setVelocityX(-this.maxSpeed);
        }
    
        // Update function
        if (this.car.x < this.platforms.getChildren()[1].x - this.platforms.getChildren()[2].width / 2) {
            // Remove the last platform
            this.platforms.getChildren()[0].destroy();
    
            // Add a new platform at the beginning
            const x = this.platforms.getChildren()[1].x - 800; // Adjust as needed
            const y = this.game.config.height; // Adjust as needed
            this.platforms.create(x, y, 'ground').setScale(2).refreshBody();
        }
    }

    levelComplete() {
        console.log('level 4 complete');
        if (audioOn === true) {
            this.music.stop();
        }
        this.scene.start('MainMenu');
    }
}

class Level_5 extends Phaser.Scene {
    constructor() {
        super({key: 'Level_5'});

        this.acceleration = 150;
        this.maxAcceleration = 200; // Set your desired maximum acceleration
        this.maxSpeed = 500;
        this.car = null;
        this.platforms = null;
        this.spacebar = null;
        this.cam = null;
        this.flag = null;
    }

    preload() {
        document.querySelector('#dimensions').innerHTML = 'Game dimensions: ' + this.game.config.width + 'x' + this.game.config.height + ' px';
        document.querySelector('#maxSpeed').innerHTML = 'Max speed: ' + this.maxSpeed + ' px/s';
        document.querySelector('#maxAcceleration').innerHTML = 'Max acceleration: ' + this.maxAcceleration + ' px/s²';
    
        this.load.image('car', 'assets/pixel car.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('flag', 'assets/flag.png');

        this.load.spritesheet('volvo', 'assets/volvo.png', { frameWidth: 101, frameHeight: 54 })

        this.load.audio('background-music-5', 'assets/music/background/level_5.mp3')
    }

    create() {
        
        // Background color
        this.cameras.main.setBackgroundColor('#5f767b'); // Replace '#ffffff' with the desired color

        // Stationary
        this.anims.create({
            key: 'stationary',
            frames: [{ key: 'volvo', frame: 0 }],
            frameRate: 10
        });

        // Accelerating
        this.anims.create({
            key: 'accelerating',
            frames: this.anims.generateFrameNumbers('volvo', { start: 1, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        // Retarding
        this.anims.create({
            key: 'retarding',
            frames: this.anims.generateFrameNumbers('volvo', { start: 4, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        // Stationary with backlight
        this.anims.create({
            key: 'stationaryLight',
            frames: [{ key: 'volvo', frame: 7 }],
            frameRate: 10
        });

        this.car = this.physics.add.sprite(400, 300, 'volvo').play('stationary');

        // Music
        if (audioOn === true) {
            this.music = this.sound.add('background-music-5');
            this.music.setLoop(true);
            this.music.play();
        }

        this.platforms = this.physics.add.staticGroup();
    
        for (let i = 0; i < 3; i++) {
            const x = i * 800; // Adjust as needed
            const y = this.game.config.height; // Adjust as needed
            this.platforms.create(x, y, 'ground').setScale(2).refreshBody();
        }

    
        this.physics.add.collider(this.car, this.platforms);
    
        this.car.setAcceleration(this.acceleration);
    
        // Flag
        this.flag = this.physics.add.staticGroup();
        this.flag.create(1000, 500, 'flag').setScale(2).refreshBody();
    
        this.physics.add.collider(this.flag, this.car, this.levelComplete, null, this);
    
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
        // Camera
        this.cam = this.cameras.main;
    
        this.cam.setBounds(0, 0, Infinity, this.game.config.height);
    
        const yOffset = -this.car.height * 0.75;
        this.cam.startFollow(this.car, false, 0.05, 1);
        this.cam.setFollowOffset(0, yOffset);
    }

    update() {
        if (this.spacebar.isDown) {
            this.car.setAccelerationX(this.maxAcceleration);
            this.car.anims.play('accelerating', true);
        } else {
            if (this.car.body.velocity.x > 0) {
                this.car.setAccelerationX(0);
                this.car.setDragX(this.maxAcceleration * 1.4);
                this.car.anims.play('retarding', true);
            } else {
                this.car.anims.play('stationary', true);
            }
        }

        // Limit the maximum speed
        if (this.car.body.velocity.x > this.maxSpeed) {
            this.car.setVelocityX(this.maxSpeed);
        }
        else if (this.car.body.velocity.x < -this.maxSpeed) {
            this.car.setVelocityX(-this.maxSpeed);
        }
    
        // Update function
        if (this.car.x < this.platforms.getChildren()[1].x - this.platforms.getChildren()[2].width / 2) {
            // Remove the last platform
            this.platforms.getChildren()[0].destroy();
    
            // Add a new platform at the beginning
            const x = this.platforms.getChildren()[1].x - 800; // Adjust as needed
            const y = this.game.config.height; // Adjust as needed
            this.platforms.create(x, y, 'ground').setScale(2).refreshBody();
        }
    }

    levelComplete() {
        console.log('level 5 complete');
        if (audioOn === true) {
            this.music.stop();
        }
        this.scene.start('MainMenu');
    }
}

// Create a new Phaser game configuration
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  backgroundColor: '#87CEEB',
  physics: {
    default: "arcade",
    arcade: {
        gravity: { y: 300 },
        debug: true
    }
  },
  scene: [MainMenu, LevelSelect, Info, Settings, Level_1, Level_2, Level_3, Level_4, Level_5]
};

// Create a new Phaser game instance
const game = new Phaser.Game(config);