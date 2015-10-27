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
    this.load.spritesheet('dude', 'images/dude.png', 32, 48);
  },

  create: function() {
    this.preloadBar.cropEnabled = false;
  },

  update: function() {
    this.ready = true;
    this.state.start('TitleScreen');
  }
};