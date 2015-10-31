AdventureGame.Game = function(game) {
  this.platforms;
  this.player;
  this.crate;
  this.cursors;

  this.test = false;
};

AdventureGame.Game.prototype = {
  create: function() {
    this.stage.backgroundColor = '#2AE';

    this.physics.startSystem(Phaser.Physics.ARCADE);
    platforms = this.add.group();
    platforms.enableBody = true;

    island = platforms.create(this.world.centerX-150, this.world.centerY, 'island');
    island.body.immovable = true;
    island = platforms.create(this.world.centerX+50, this.world.centerY-30, 'island');
    island.body.immovable = true;

    player = this.add.sprite(this.world.centerX-80, this.world.centerY-50, 'dude');
    this.physics.arcade.enable(player);
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = false;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    crate = this.add.sprite(this.world.centerX+125, this.world.centerY-150, 'crate');
    this.physics.arcade.enable(crate);
    crate.body.gravity.y = 800;
    crate.body.collideWorldBounds = false;
    crate.scale.setTo(0.8, 0.8);

    cursors = this.input.keyboard.createCursorKeys();
    this.input.maxPointers = 2;
  },

  update: function() {
    this.physics.arcade.collide(player, platforms);
    this.physics.arcade.collide(crate, platforms);
    this.physics.arcade.collide(player, crate);

    player.body.velocity.x = 0;
    crate.body.velocity.x = 0;

    if (this.input.pointer1.isDown) {
      var wx = this.world.centerX;
      var px = this.input.pointer1.x;
      player.body.velocity.x = (px < wx) ? -150 : 150;

      if (this.input.pointer2.isDown && player.body.touching.down) {
        player.body.velocity.y = -175;
      }
    }
    else if (cursors.left.isDown) {
      player.body.velocity.x = -150;
    }
    else if (cursors.right.isDown) {
      player.body.velocity.x = 150;
    }
    
    if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -175;
    }

    if (player.body.velocity.x < 0) {
      player.animations.play('left');
    }
    else if (player.body.velocity.x > 0) {
      player.animations.play('right');
    }
    else {
      player.animations.stop();
      player.frame = 4;
    }

  }
};