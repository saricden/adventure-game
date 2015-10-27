var AdventureGame = {};

AdventureGame.Boot = function(game) {};

AdventureGame.Boot.prototype = {
  preload: function() {
    this.load.image('loading-bar', 'images/loading-bar.png');
  },

  create: function() {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = false;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    this.stage.backgroundColor = '#333';

    this.state.start('Preloader');
  }
};