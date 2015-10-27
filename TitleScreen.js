AdventureGame.TitleScreen = function(game) {
  this.titleLogo;
  this.newGameBtn;
  this.startPrompt;
};

AdventureGame.TitleScreen.prototype = {
  create: function() {
    titleLogo = this.add.image(this.world.centerX, this.world.centerY-125, 'logo');
    titleLogo.anchor.setTo(0.5, 0.5);
    newGameBtn = this.add.image(this.world.centerX, this.world.centerY+25, 'new-game-btn');
    newGameBtn.anchor.setTo(0.5, 0.5);
    this.stage.backgroundColor = '#CCC';

    newGameBtn.inputEnabled = true;
    newGameBtn.events.onInputDown.addOnce(this.startGame, this);
  },

  startGame: function() {
    this.state.start('Game');
  }
};