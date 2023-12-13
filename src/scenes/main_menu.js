class MainMenu extends Phaser.Scene {
    constructor() {
        super({key: 'MainMenu'});
    }

    create() {

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

export default MainMenu;