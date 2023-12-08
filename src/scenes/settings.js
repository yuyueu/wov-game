import constants from '../utils/physicsUtils.js';

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
        const audioButton = this.add.text(100, 200, (constants.audioOn ? "Audio: On" : "Audio: Off"), { fontSize: '20px', fill: '#000' });
        audioButton.setInteractive();
        audioButton.on('pointerdown', () => {
            if (constants.audioOn) {
                constants.audioOn = false;
                audioButton.setText('Audio: Off');
            } else {
                constants.audioOn = true;
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

export default Settings;