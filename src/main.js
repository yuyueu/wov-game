// Create a new Phaser game configuration

import Phaser from 'phaser';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

import MainMenu from './scenes/main_menu.js';
import LevelSelect from './scenes/level_select.js';
import Info from './scenes/info.js';
import Settings from './scenes/settings.js';
import {Level_1} from './scenes/level_1.js';

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  parent: 'game',
  backgroundColor: '#87CEEB',
  physics: {
    default: "matter",
    matter: {
        gravity: { y: 1 },
        debug: true
    }
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin, // The plugin class
        key: "matterCollision", // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        mapping: "matterCollision" // Where to store in the Scene, e.g. scene.matterCollision
      }
    ]
  },
  scene: [MainMenu, LevelSelect, Info, Settings, Level_1]
};

// Create a new Phaser game instance
const game = new Phaser.Game(config);