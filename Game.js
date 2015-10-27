AdventureGame.Game = function(game) {
  this.platforms;
  this.player;
  this.cursors;
};

AdventureGame.Game.prototype = {
  create: function() {
    this.stage.backgroundColor = '#2AE';

    this.physics.startSystem(Phaser.Physics.ARCADE);
    platforms = this.add.group();
    platforms.enableBody = true;

    island = platforms.create(this.world.centerX-150, this.world.centerY, 'island');
    island.body.immovable = true;
    island = platforms.create(this.world.centerX+50, this.world.centerY-20, 'island');
    island.body.immovable = true;

    player = this.add.sprite(this.world.centerX-80, this.world.centerY-50, 'dude');
    this.physics.arcade.enable(player);
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    cursors = this.input.keyboard.createCursorKeys();
  },

  update: function() {
    this.physics.arcade.collide(player, platforms);
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -175;
    }
  }
};