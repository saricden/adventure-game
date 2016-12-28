AdventureGame.Game2 = function(game) {
  this.map;
  this.layer;
  this.player;
  this.cursors;

  this.jumpHeight = 200;
};

AdventureGame.Game2.prototype = {
  create: function() {
    this.stage.backgroundColor = '#2AE';
    this.map = this.add.tilemap('level1');
    this.map.addTilesetImage('blue');
    this.layer = this.map.createLayer('Tile Layer 1');
    this.layer.resizeWorld();
    this.map.setCollisionBetween(1, 13);

    this.player = this.add.sprite(0, 0, 'newguy');
    this.player.scale.setTo(2);
    this.player.anchor.setTo(0.5, 0);
    this.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 400;
    this.player.body.collideWorldBounds = false;
    this.player.animations.add('idle', [0, 1, 2, 3], 5, true);
    this.player.animations.add('run', [4, 5], 10, true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.maxPointers = 2;

    this.game.camera.follow(this.player);
    this.game.camera.bounds = null;
  },
  update: function() {
    this.physics.arcade.collide(this.player, this.layer);

    // Handle movement / controls
    this.player.body.velocity.x = 0;
    if (this.input.pointer1.isDown) {
      var wx = this.world.centerX;
      var px = this.input.pointer1.x;
      this.player.body.velocity.x = (px < wx) ? -150 : 150;

      if (this.input.pointer2.isDown && this.player.body.touching.down) {
        this.player.body.velocity.y = -this.jumpHeight;
      }
    }
    else if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150;
    }
    else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150;
    }
    
    if (this.cursors.up.isDown) {
      this.player.body.velocity.y = -this.jumpHeight;
    }

    // Handle animations
    if (this.player.body.velocity.x < 0 && this.player.body.blocked.down) {
      this.player.animations.play('run');
    }
    else if (this.player.body.velocity.x > 0 && this.player.body.blocked.down) {
      this.player.scale.x = 2;
      this.player.animations.play('run');
    }
    else if (this.player.body.blocked.down) {
      this.player.animations.play('idle');
    }
    else if (this.player.body.velocity.y < 0) {
      this.player.frame = 7; // jumping
    }
    else if (this.player.body.velocity.y > 0) {
      this.player.frame = 6; // falling
    }

    // Flipping left and right
    if (this.player.body.velocity.x < 0) {
      this.player.scale.x = -2;
    }
    else if (this.player.body.velocity.x > 0) {
      this.player.scale.x = 2;
    }

    console.log();

  }
};