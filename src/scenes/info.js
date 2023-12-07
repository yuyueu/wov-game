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

export default Info;