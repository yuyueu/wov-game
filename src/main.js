// Create a new Phaser game configuration

import Phaser from 'phaser';

import constants from './utils/physicsUtils.js';

import MainMenu from './scenes/main_menu.js';
import LevelSelect from './scenes/level_select.js';
import Info from './scenes/info.js';
import Settings from './scenes/settings.js';
import {Level_1} from './scenes/level_1.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game',
  backgroundColor: '#87CEEB',
  physics: {
    default: "matter",
    arcade: {
        gravity: { y: 0.5 },
        debug: true
    }
  },
  scene: [MainMenu, LevelSelect, Info, Settings, Level_1]
};

// Create a new Phaser game instance
const game = new Phaser.Game(config);