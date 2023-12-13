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

export default LevelSelect;