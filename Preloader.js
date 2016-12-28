AdventureGame.Preloader = function(game) {
  this.preloadBar = null;
  this.ready = false;
};

AdventureGame.Preloader.prototype = {
  preload: function() {
    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'loading-bar');
    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.preloadBar);

    this.load.image('logo', 'images/logo.png');
    this.load.image('new-game-btn', 'images/btns/new-game.png');
    this.load.image('island', 'images/island.png');
    this.load.image('crate', 'images/crate.png');
    this.load.spritesheet('dansheet', 'images/dansheet.png', 16, 16);
    this.load.spritesheet('dude', 'images/dude.png', 32, 48);
    this.load.spritesheet('fruit', 'images/glowing-fruit.png', 22, 22);
    this.load.spritesheet('portal', 'images/portal.png', 22, 50);

    this.load.spritesheet('newguy', 'images/newguy.png', 9, 22);
    this.load.tilemap('level1', 'maps/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('blue', 'images/tiles/blue.png');
  },

  create: function() {
    this.preloadBar.cropEnabled = false;
  },

  update: function() {
    this.ready = true;
    this.state.start('TitleScreen');
  }
};
